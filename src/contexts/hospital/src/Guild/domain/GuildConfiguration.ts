import { BaseObject, DateValueObject, Primitives, StringValueObject } from 'core';
import { GuildPlan } from './GuildPlan';
import { GuildPlanStatus, GuildPlanStatusEnum } from './GuildPlanStatus';

export class GuildConfiguration extends BaseObject {
  category: StringValueObject;
  plan: GuildPlan;
  timezone: StringValueObject;
  lang: StringValueObject;
  lastPayment: DateValueObject;
  nextPayment: DateValueObject;
  planStatus: GuildPlanStatus;

  constructor(data: Primitives<GuildConfiguration>) {
    super();
    this.category = new StringValueObject(data.category);
    this.plan = new GuildPlan(data.plan);
    this.timezone = new StringValueObject(data.timezone);
    this.lang = new StringValueObject(data.lang);
    this.nextPayment = data.nextPayment ? new DateValueObject(data.nextPayment) : DateValueObject.today();
    this.lastPayment = data.nextPayment ? new DateValueObject(data.nextPayment) : DateValueObject.today();
    this.planStatus = new GuildPlanStatus(data.planStatus || GuildPlanStatusEnum.PAID);
  }

  public toPrimitives(): Primitives<GuildConfiguration> {
    return {
      category: this.category.value,
      plan: this.plan.value,
      timezone: this.timezone.value,
      lang: this.lang.value,
      nextPayment: this.nextPayment.value,
      lastPayment: this.lastPayment.value,
      planStatus: this.planStatus.value,
    };
  }
}
