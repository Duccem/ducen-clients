import { MotherCreator } from 'core';

export class MemberDataMother {
  static password(): string {
    return MotherCreator.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/);;
  }

  static biography(): string {
    return MotherCreator.random().person.bio();
  }

  static nickname(): string {
    return MotherCreator.random().internet.userName();
  }

  static phoneNumber(): string {
    return MotherCreator.random().phone.number();
  }
}
