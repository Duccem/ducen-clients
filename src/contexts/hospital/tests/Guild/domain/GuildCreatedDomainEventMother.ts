import { Guild } from '../../../src/Guild/domain/Guild';
import { GuildCreatedDomainEvent } from '../../../src/Guild/domain/GuildCreatedDomainEvent';

export class GuildCreatedDomainEventMother {
  static fromGuild(guild: Guild): GuildCreatedDomainEvent {
    return new GuildCreatedDomainEvent({
      aggregateId: guild.id.value,
      params: {
        guildId: guild.id.value,
      },
    });
  }
}
