import { Primitives, ValueObject } from '@ducen/shared';

export class UserName {
  constructor(public firstName: UserFirstName, public lastName: UserLastName) {}
  public static fromPrimitives(data: Primitives<UserName>): UserName {
    return new UserName(new UserFirstName(data.firstName), new UserLastName(data.lastName));
  }
  public toPrimitives(): Primitives<UserName> {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
  }

  public fullName(): string {
    return `${this.firstName.value} ${this.lastName.value}`;
  }
}

export class UserFirstName extends ValueObject<string> {}
export class UserLastName extends ValueObject<string> {}
