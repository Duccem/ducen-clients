import { DomainEventClass, DomainEventSubscriber, Uuid } from 'core';
import { PaymentSuccessEvent } from '../../../Payment/domain/PaymentSuccessEvent';
import { GuildNotFoundError } from '../../domain/GuildNotFoundError';
import { GuildRepository } from '../../domain/GuildRepository';

export class GuildPlanPaidSubscriber implements DomainEventSubscriber {
  constructor(private readonly guildRepository: GuildRepository) {}
  subscribedTo(): DomainEventClass[] {
    return [PaymentSuccessEvent];
  }
  async on(domainEvent: PaymentSuccessEvent): Promise<void> {
    const guild = await this.guildRepository.findGuildById(new Uuid(domainEvent.guildId));
    if (!guild) throw new GuildNotFoundError(domainEvent.guildId);
    guild.payPlan();
    await this.guildRepository.registerGuild(guild);
  }
}
