import { EventBus, Primitives } from "core";
import { FindByName } from "../../domain/FindByName";
import { Guild } from "../../domain/Guild";
import { GuildAlreadyExistError } from "../../domain/GuildAlreadyExistError";
import { GuildRepository } from "../../domain/GuildRepository";

export class GuildRegistrar {
  constructor(
    private guildRepository: GuildRepository,
    private eventBus: EventBus
  ) {}

  async register(guild: Primitives<Guild>) {
    const newGuild = Guild.Create(guild);

    const criteria = new FindByName(newGuild.name.value);

    const existGuild = await this.guildRepository.findGuildByCriteria(criteria);
    if (existGuild) throw new GuildAlreadyExistError(guild.name);

    await this.guildRepository.registerGuild(newGuild);
    await this.eventBus.publish(newGuild.pullDomainEvents());
  }
}
