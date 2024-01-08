import { Entity, Primitives, StringValueObject, Uuid } from "core";
import { MasterAddress } from "./MasterAddress";
import { MasterConfiguration } from "./MasterConfiguration";

export class Master extends Entity {

  guildId: Uuid;
  roleId: StringValueObject;
  email: StringValueObject;
  birthDate: StringValueObject;
  firstName: StringValueObject;
  lastName: StringValueObject;
  phoneNumber: StringValueObject;
  gender: StringValueObject;
  biography: StringValueObject;
  configuration: MasterConfiguration;
  address: MasterAddress;

  constructor(data: Primitives<Master>) {
    super(data);
    this.guildId = new Uuid(data.guildId);
    this.roleId = new StringValueObject('MASTER');
    this.email = new StringValueObject(data.email);
    this.birthDate = new StringValueObject(data.birthDate);
    this.firstName = new StringValueObject(data.firstName);
    this.lastName = new StringValueObject(data.lastName);
    this.phoneNumber = new StringValueObject(data.phoneNumber);
    this.gender = new StringValueObject(data.gender);
    this.biography = new StringValueObject(data.biography);
    this.configuration = new MasterConfiguration(data.configuration);
    this.address = new MasterAddress(data.address);
  }

  public toPrimitives(): Primitives<Master> {
    return {
      id: this.id.value,
      guildId: this.guildId.value,
      roleId: this.roleId.value,
      email: this.email.value,
      birthDate: this.birthDate.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phoneNumber: this.phoneNumber.value,
      biography: this.biography.value,
      gender: this.gender.value,
      configuration: this.configuration.toPrimitives(),
      address: this.address.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt ? this.updatedAt.value : null,
    }
  }
}
