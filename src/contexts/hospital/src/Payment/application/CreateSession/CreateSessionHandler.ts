import { Command, CommandHandler, Primitives, QueryBus } from 'core';
import { GetGuildInformationQuery } from '../../../Guild/application/GetGuildInformation/GetGuildInformationQuery';
import { Guild } from '../../../Guild/domain/Guild';
import { Payment } from '../../domain/Payment';
import { PaymentProvider } from '../../domain/PaymentProvider';
import { PaymentRepository } from '../../domain/PaymentRepository';
import { PaymentStatusEnum } from '../../domain/PaymentStatus';
import { CreateSessionCommand } from './CreateSessionCommand';

export class CreateSessionHandler implements CommandHandler<CreateSessionCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentService: PaymentProvider,
  ) {}
  subscribedTo(): Command {
    return CreateSessionCommand;
  }

  async handle({ guildId, period }: CreateSessionCommand): Promise<void> {
    const guild = await this.queryBus.ask<Guild>(new GetGuildInformationQuery(guildId));

    const { sessionId, url } = await this.paymentService.createSession(guild.getPlan(), period);
    const paymentData = {
      guildId: guild.id.value,
      sessionId,
      status: PaymentStatusEnum.PENDING,
      paymentDate: new Date(),
      url,
    };
    const payment = new Payment(paymentData as Primitives<Payment>);
    await this.paymentRepository.save(payment);
  }
}
