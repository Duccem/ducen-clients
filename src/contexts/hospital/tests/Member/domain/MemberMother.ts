import { DateValueObject, EmailMother, Primitives, UuidMother, WordMother } from 'core';
import { Member } from '../../../src/Member/domain/Member';
import { MemberGender } from '../../../src/Member/domain/MemberGender';
import { MemberAddressMother } from './MemberAddressMother';
import { MemberDataMother } from './MemberDataMother';
import { MemberNameMother } from './MemberNameMother';

export class MemberMother {
  static create(data?: Partial<Primitives<Member>>): Member {
    return new Member({
      id: UuidMother.random(),
      firstName: MemberNameMother.firstName(),
      lastName: MemberNameMother.lastName(),
      email: EmailMother.random({}),
      biography: MemberDataMother.biography(),
      password: MemberDataMother.password(),
      birthDate: DateValueObject.today().value,
      gender: MemberGender.male().value,
      photo: WordMother.image(),
      guildId: UuidMother.random(),
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
      roleId: UuidMother.random(),
      nickname: MemberDataMother.nickname(),
      phoneNumber: MemberDataMother.phoneNumber(),
      configuration: {
        lang: WordMother.random({ maxLength: 2 }),
        timezone: WordMother.timezone(),
        theme: WordMother.random({ maxLength: 10 }),
      },
      address: MemberAddressMother.random(),
      ...data,
    });
  }
}
