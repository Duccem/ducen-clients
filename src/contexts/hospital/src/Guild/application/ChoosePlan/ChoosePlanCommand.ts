import { Command } from 'core';

export class ChoosePlanCommand extends Command {
  public plan: string;
  public guildId: string;
  constructor(data: { plan: string; guildId: string }) {
    super();
    this.plan = data.plan;
    this.guildId = data.guildId;
  }
}
