import { NotFoundError, Query, QueryHandler } from 'core';
import { Payment } from '../../domain/Payment';
import { PaymentRepository } from '../../domain/PaymentRepository';
import { GetLastSessionQuery } from './GetLastSessionQuery';

export class GetLastSessionHandler implements QueryHandler<GetLastSessionQuery> {
  constructor(private readonly paymentRepository: PaymentRepository) {}
  subscribedTo(): Query {
    return GetLastSessionQuery;
  }

  async handle({ guildId }: GetLastSessionQuery): Promise<Payment> {
    const paymentSession = await this.paymentRepository.findLastPaymentPendingByGuildId(guildId);
    if (!paymentSession) throw new NotFoundError('No payment session found');

    return paymentSession;
  }
}
