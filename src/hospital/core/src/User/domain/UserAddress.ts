import { Primitives, ValueObject } from '@ducen/shared';
import { UserCoordinates } from './UserCoordinates';

export class UserAddress {
  constructor(
    public country: UserAddressCountry,
    public city: UserAddressCity,
    public street: UserAddressStreet,
    public zipCode: UserAddressZipCode,
    public coordinates: UserCoordinates
  ) {}
  public static fromPrimitives(data: Primitives<UserAddress>): UserAddress {
    return new UserAddress(
      new UserAddressCountry(data.country),
      new UserAddressCity(data.city),
      new UserAddressStreet(data.street),
      new UserAddressZipCode(data.zipCode),
      UserCoordinates.fromPrimitives(data.coordinates)
    );
  }
  public toPrimitives(): Primitives<UserAddress> {
    return {
      city: this.city.value,
      country: this.country.value,
      zipCode: this.zipCode.value,
      street: this.street.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }
}

export class UserAddressCountry extends ValueObject<string> {}
export class UserAddressCity extends ValueObject<string> {}
export class UserAddressStreet extends ValueObject<string> {}
export class UserAddressZipCode extends ValueObject<string> {}
