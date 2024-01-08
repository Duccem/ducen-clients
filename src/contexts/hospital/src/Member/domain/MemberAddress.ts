import { BaseObject, Primitives, StringValueObject } from 'core';
import { MemberCoordinates } from './MemberCoordinates';

export class MemberAddress extends BaseObject {
  country: StringValueObject;
  city: StringValueObject;
  direction: StringValueObject;
  postal: StringValueObject;
  coordinates: MemberCoordinates;

  constructor(data: Primitives<MemberAddress>) {
    super();
    this.country = new StringValueObject(data.country);
    this.city = new StringValueObject(data.city);
    this.direction = new StringValueObject(data.direction);
    this.postal = new StringValueObject(data.postal);
    this.coordinates = new MemberCoordinates(data.coordinates);
  }

  public toPrimitives(): Primitives<MemberAddress> {
    return {
      city: this.city.value,
      country: this.country.value,
      postal: this.postal.value,
      direction: this.direction.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }
}
