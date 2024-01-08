import { Enum } from 'core';
export enum MemberGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export class MemberGender extends Enum<MemberGenderEnum> {
  constructor(value: MemberGenderEnum) {
    super(value, Object.values(MemberGenderEnum));
  }
  static male(): MemberGender {
    return new MemberGender(MemberGenderEnum.MALE);
  }
  static female(): MemberGender {
    return new MemberGender(MemberGenderEnum.FEMALE);
  }
  static other(): MemberGender {
    return new MemberGender(MemberGenderEnum.OTHER);
  }
  public toString(): string {
    return this.value;
  }
}
