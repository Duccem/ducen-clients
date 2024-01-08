import { BaseObject, Primitives, StringValueObject } from 'core';

export class MemberConfiguration extends BaseObject {
  public timezone: StringValueObject;
  public lang: StringValueObject;
  public theme: StringValueObject;

  constructor(data: Primitives<MemberConfiguration>) {
    super();
    this.lang = new StringValueObject(data.lang);
    this.theme = new StringValueObject(data.theme);
    this.timezone = new StringValueObject(data.timezone);
  }

  public toPrimitives(): Primitives<MemberConfiguration> {
    return {
      lang: this.lang.value,
      theme: this.theme.value,
      timezone: this.timezone.value,
    };
  }
}
