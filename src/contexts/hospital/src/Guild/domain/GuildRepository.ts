import { Criteria, Nullable, Uuid } from 'core';
import { Guild } from './Guild';

export interface GuildRepository {
  registerGuild(guild: Guild): Promise<void>;
  findGuildByName(guildName: string): Promise<Nullable<Guild>>;
  findGuildById(guildId: Uuid): Promise<Nullable<Guild>>;
  findGuildByCriteria(criteria: Criteria): Promise<Nullable<Guild>>;
}

export const GUILD_REPOSITORY = Symbol('GUILD_REPOSITORY');
