import { Enum } from 'core';
export enum GuildPlanEnum {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}
export class GuildPlan extends Enum<GuildPlanEnum> {
  constructor(value: GuildPlanEnum) {
    super(value, Object.values(GuildPlanEnum));
  }
  static Free(): GuildPlan {
    return new GuildPlan(GuildPlanEnum.FREE);
  }
  static Basic(): GuildPlan {
    return new GuildPlan(GuildPlanEnum.BASIC);
  }
  static Premium(): GuildPlan {
    return new GuildPlan(GuildPlanEnum.PREMIUM);
  }
  public toString(): string {
    return this.value;
  }
}
