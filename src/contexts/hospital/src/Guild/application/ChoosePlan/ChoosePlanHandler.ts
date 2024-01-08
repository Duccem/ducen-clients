import { Command, CommandHandler } from 'core';
import { GuildRepository } from '../../domain/GuildRepository';
import { ChoosePlanCommand } from './ChoosePlanCommand';
import { PlanChanger } from './PlanChanger';

export class ChoosePlanHandler implements CommandHandler<ChoosePlanCommand> {
  private planChanger: PlanChanger;
  constructor(private readonly guildRepository: GuildRepository) {
    this.planChanger = new PlanChanger(this.guildRepository);
  }
  subscribedTo(): Command {
    return ChoosePlanCommand;
  }

  async handle({ guildId, plan }: ChoosePlanCommand): Promise<void> {
    await this.planChanger.run(guildId, plan);
  }
}
