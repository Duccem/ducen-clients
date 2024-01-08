import { Query, QueryHandler, Uuid } from 'core';
import { Guild } from '../../domain/Guild';
import { GuildNotFoundError } from '../../domain/GuildNotFoundError';
import { GuildRepository } from '../../domain/GuildRepository';
import { GetGuildInformationQuery } from './GetGuildInformationQuery';

export class GetGuildInformationHandler implements QueryHandler<GetGuildInformationQuery> {
  constructor(private guildRepository: GuildRepository) {}

  subscribedTo(): Query {
    return GetGuildInformationQuery;
  }

  async handle({ guildId }: GetGuildInformationQuery): Promise<Guild> {
    const guild = await this.guildRepository.findGuildById(new Uuid(guildId));
    if (!guild) throw new GuildNotFoundError(guildId);
    return guild;
  }
}
