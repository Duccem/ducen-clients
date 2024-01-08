import { Uuid } from "core";
import { GuildNotFoundError } from "../../domain/GuildNotFoundError";
import { GuildPlanEnum } from "../../domain/GuildPlan";
import { GuildRepository } from "../../domain/GuildRepository";

export class PlanChanger {
  constructor(private readonly guildRepository: GuildRepository) {}

  async run(guildId: string, plan: string): Promise<void> {
    const guild = await this.guildRepository.findGuildById(new Uuid(guildId));
    if (!guild) throw new GuildNotFoundError(guildId);
    guild.changePlan(plan as GuildPlanEnum);
    await this.guildRepository.registerGuild(guild);
  }
}
