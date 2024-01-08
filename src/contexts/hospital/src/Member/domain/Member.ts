import { faker } from '@faker-js/faker';
import { Aggregate, Email, Image, Primitives, StringValueObject, Uuid } from 'core';

import { IncorrectPassword } from './IncorrectPassword';
import { MemberAddress } from './MemberAddress';
import { MemberBirthDate } from './MemberBirthDate';
import { MemberConfiguration } from './MemberConfiguration';
import { MemberCreatedDomainEvent } from './MemberCreatedDomainEvent';
import { MemberGender } from './MemberGender';
import { MemberPassword } from './MemberPassword';

export class Member extends Aggregate {
  guildId: Uuid;
  roleId: StringValueObject;

  nickname: StringValueObject;
  password: MemberPassword;
  birthDate: MemberBirthDate;
  email: Email;
  address: MemberAddress;
  photo: Image;
  firstName: StringValueObject;
  lastName: StringValueObject;
  biography: StringValueObject;
  gender: MemberGender;
  phoneNumber: StringValueObject;
  configuration: MemberConfiguration;

  constructor(data: Primitives<Member>) {
    super(data);
    this.guildId = data.guildId ? new Uuid(data.guildId) : null;
    this.roleId = data.roleId ? new StringValueObject(data.roleId) : null;
    this.nickname = data.nickname ? new StringValueObject(data.nickname) : new StringValueObject(data.email);
    this.password = data.password ? new MemberPassword(data.password) : new MemberPassword(faker.helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/));
    this.birthDate = new MemberBirthDate(data.birthDate);
    this.email = new Email(data.email);
    this.address = new MemberAddress(data.address);
    this.photo = data.photo ? new Image(data.photo) : null;
    this.firstName = new StringValueObject(data.firstName);
    this.lastName = new StringValueObject(data.lastName);
    this.biography = new StringValueObject(data.biography);
    this.gender = new MemberGender(data.gender);
    this.phoneNumber = new StringValueObject(data.phoneNumber);
    this.configuration = new MemberConfiguration(data.configuration);
  }

  static Create(data: Primitives<Member>): Member {
    const member = new Member(data);
    member.password.encrypt();
    const createdEvent = new MemberCreatedDomainEvent({
      aggregateId: member.id.value,
      params: {
        memberId: member.id.value,
      },
    });
    member.record(createdEvent);
    return member;
  }

  public toPrimitives(): Primitives<Member> {
    return {
      id: this.id.value,
      guildId: this.guildId ? this.guildId.value : null,
      roleId: this.roleId ? this.roleId.value : null,
      nickname: this.nickname.value,
      password: this.password ? this.password.value : null,
      birthDate: this.birthDate.value,
      email: this.email.value,
      address: this.address.toPrimitives(),
      photo: this.photo ? this.photo.value : null,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      biography: this.biography.value,
      gender: this.gender.value,
      phoneNumber: this.phoneNumber.value,
      configuration: this.configuration.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt ? this.updatedAt.value : null,
    };
  }

  public generateToken(): any {
    const payload = {
      memberId: this.id.value,
      guildId: this.guildId.value,
      roleId: this.roleId?.value,
      nickname: this.nickname.value,
      configuration: this.configuration.toPrimitives(),
    };
    return payload;
  }

  public validatePassword(password: string): void {
    if (!this.password.compare(password)) throw new IncorrectPassword();
  }

  public changePassword(newPassword: string, oldPassword: string): void {
    if (!this.password.compare(oldPassword)) throw new IncorrectPassword();
    this.password = new MemberPassword(newPassword);
    this.password.encrypt();
  }
}
