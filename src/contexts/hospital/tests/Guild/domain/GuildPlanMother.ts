import { GuildPlan, GuildPlanEnum } from '../../../src/Guild/domain/GuildPlan';

export class GuildPlanMother {
  static random() {
    const plans = Object.values(GuildPlanEnum);
    return new GuildPlan(plans[Math.floor(Math.random() * plans.length)]);
  }
}
