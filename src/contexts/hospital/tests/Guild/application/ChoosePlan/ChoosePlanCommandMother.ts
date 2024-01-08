import { ChoosePlanCommand } from '../../../../src/Guild/application/ChoosePlan/ChoosePlanCommand';
import { GuildPlanMother } from '../../domain/GuildPlanMother';

export class ChoosePlanCommandMother {
  static random(guildId: string) {
    const plan = GuildPlanMother.random().value;
    return new ChoosePlanCommand({ plan, guildId });
  }
}
