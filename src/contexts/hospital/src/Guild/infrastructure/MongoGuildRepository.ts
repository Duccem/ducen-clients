import { Criteria, MongoConnection, MongoRepository, Nullable, Primitives, Uuid } from 'core';
import { Guild } from '../domain/Guild';
import { GuildRepository } from '../domain/GuildRepository';

export class MongoGuildRepository extends MongoRepository<Guild> implements GuildRepository {
  constructor(connection: MongoConnection) {
    super(connection, Guild);
  }

  async findGuildByName(guildName: string): Promise<Nullable<Guild>> {
    const guild = await this.collection.findOne<Primitives<Guild>>({ name: guildName });
    return guild ? new Guild(guild) : null;
  }

  async findGuildById(guildId: Uuid): Promise<Nullable<Guild>> {
    const guild = await this.collection.findOne<Primitives<Guild>>({ id: guildId.value });
    console.log(guild);
    return guild ? new Guild(guild) : null;
  }

  async registerGuild(guild: Guild): Promise<void> {
    await this.persist(guild.id.value, guild);
  }

  async findGuildByCriteria(criteria: Criteria): Promise<Nullable<Guild>> {
    const { filter } = this.converter.Criteria(criteria);
    const guild = await this.collection.findOne<Primitives<Guild>>(filter);
    return guild ? new Guild(guild) : null;
  }
}
