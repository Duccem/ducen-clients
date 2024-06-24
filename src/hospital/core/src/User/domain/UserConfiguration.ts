import { Primitives, ValueObject } from '@ducen/shared';

export class UserConfiguration {
  constructor(
    public timezone: UserConfigurationTimezone,
    public lang: UserConfigurationLang,
    public theme: UserConfigurationTheme
  ) {}

  public static fromPrimitives(data: Primitives<UserConfiguration>): UserConfiguration {
    return new UserConfiguration(
      new UserConfigurationTimezone(data.timezone),
      new UserConfigurationLang(data.lang),
      new UserConfigurationTheme(data.theme)
    );
  }

  public toPrimitives(): Primitives<UserConfiguration> {
    return {
      lang: this.lang.value,
      theme: this.theme.value,
      timezone: this.timezone.value,
    };
  }
}

export class UserConfigurationLang extends ValueObject<string> {}
export class UserConfigurationTheme extends ValueObject<string> {}
export class UserConfigurationTimezone extends ValueObject<string> {}
