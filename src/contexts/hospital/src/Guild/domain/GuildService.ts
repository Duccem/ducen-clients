import { Nullable, Uuid } from "core";
import { Guild } from "./Guild";

export interface GuildService {
  registerGuild(guild: Guild): Promise<void>;
  getGuildInformation(guildId: Uuid): Promise<Nullable<Guild>>;
  choosePlan(guildId: Uuid, plan: string): Promise<void>;
}
