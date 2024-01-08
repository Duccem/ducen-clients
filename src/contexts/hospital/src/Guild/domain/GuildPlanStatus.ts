import { Enum } from 'core';
export enum GuildPlanStatusEnum {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
  NONE = 'NONE',
}
export class GuildPlanStatus extends Enum<GuildPlanStatusEnum> {
  constructor(value: GuildPlanStatusEnum) {
    super(value, Object.values(GuildPlanStatusEnum));
  }

  static Pending(): GuildPlanStatus {
    return new GuildPlanStatus(GuildPlanStatusEnum.PENDING);
  }
  static Canceled(): GuildPlanStatus {
    return new GuildPlanStatus(GuildPlanStatusEnum.CANCELED);
  }
  static Paid(): GuildPlanStatus {
    return new GuildPlanStatus(GuildPlanStatusEnum.PAID);
  }
  static None(): GuildPlanStatus {
    return new GuildPlanStatus(GuildPlanStatusEnum.NONE);
  }
}
