import { Command, CommandHandler, EventBus, FormatError, NotFoundError } from 'core';
import { PaymentEventType } from '../../domain/PaymentEventType';
import { PaymentRepository } from '../../domain/PaymentRepository';
import { SessionStatusChangedCommand } from './SessionStatusChangedCommand';

export class SessionStatusChangedHandler implements CommandHandler<SessionStatusChangedCommand> {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventBus: EventBus,
  ) {}
  subscribedTo(): Command {
    return SessionStatusChangedCommand;
  }
  async handle({ sessionId, event, sig }: SessionStatusChangedCommand): Promise<void> {
    if (!sig) throw new FormatError('Signature not found');
    const payment = await this.paymentRepository.findBySessionId(sessionId);
    if (!payment) throw new NotFoundError('Payment not found');
    switch (event) {
      case PaymentEventType.SuccessSession:
        payment.successSession();
        break;
      case PaymentEventType.FailSession:
        payment.failSession();
        break;
      default:
        break;
    }
    await this.paymentRepository.save(payment);
    await this.eventBus.publish(payment.pullDomainEvents());
  }
}
