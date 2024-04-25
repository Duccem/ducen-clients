import { Email, Entity, Image, Primitives, TimeStamp, Uuid } from '@ducen-clients/shared';
import { UserAddress } from './UserAddress';
import { UserBirthDate } from './UserBirthDate';
import { UserConfiguration } from './UserConfiguration';
import { UserGender, UserGenders } from './UserGender';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import { UserRole, UserRoles } from './UserRole';

export class User extends Entity {
  constructor(
    id: Uuid,
    public name: UserName,
    public email: Email,
    private password: UserPassword,
    public role: UserRole,
    public birthDate: UserBirthDate,
    public address: UserAddress,
    public phoneNumber: UserPhoneNumber,
    public photo: Image,
    public gender: UserGender,
    public configuration: UserConfiguration,
    createdAt?: TimeStamp,
    updatedAt?: TimeStamp
  ) {
    super(id, createdAt, updatedAt);
  }

  public static fromPrimitives(data: Primitives<User>): User {
    return new User(
      new Uuid(data.id),
      UserName.fromPrimitives(data.name),
      new Email(data.email),
      new UserPassword(''),
      new UserRole(data.role),
      new UserBirthDate(data.birthDate),
      UserAddress.fromPrimitives(data.address),
      new UserPhoneNumber(data.phoneNumber),
      new Image(data.photo),
      new UserGender(data.gender),
      UserConfiguration.fromPrimitives(data.configuration),
      new TimeStamp(data.createdAt || new Date()),
      new TimeStamp(data.updatedAt || new Date())
    );
  }
  public static create(
    id: string,
    name: {
      firstName: string;
      lastName: string;
    },
    email: string,
    password: string,
    role: string,
    birthDate: Date,
    address: {
      country: string;
      city: string;
      street: string;
      zipCode: string;
      coordinates: { latitude: number; longitude: number };
    },
    phoneNumber: string,
    gender: string,
    photo: string,
    configuration: {
      timezone: string;
      lang: string;
      theme: string;
    }
  ): User {
    const user = new User(
      new Uuid(id),
      UserName.fromPrimitives(name),
      new Email(email),
      new UserPassword(password),
      new UserRole(role as UserRoles),
      new UserBirthDate(birthDate),
      UserAddress.fromPrimitives(address),
      new UserPhoneNumber(phoneNumber),
      new Image(photo),
      new UserGender(gender as UserGenders),
      UserConfiguration.fromPrimitives(configuration),
      new TimeStamp(new Date()),
      new TimeStamp(new Date())
    );
    return user;
  }
  public toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      name: this.name.toPrimitives(),
      email: this.email.value,
      role: this.role.value,
      birthDate: this.birthDate.value,
      address: this.address.toPrimitives(),
      phoneNumber: this.phoneNumber.value,
      photo: this.photo.value,
      gender: this.gender.value,
      configuration: this.configuration.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  public getPassword(): UserPassword {
    return this.password;
  }
}
