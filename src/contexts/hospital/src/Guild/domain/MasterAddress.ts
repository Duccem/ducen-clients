import { BaseObject, Primitives, StringValueObject } from "core";
import { MasterCoordinates } from "./MasterCoordinates";

export class MasterAddress extends BaseObject {
  country: StringValueObject;
  city: StringValueObject;
  direction: StringValueObject;
  postal: StringValueObject;
  coordinates: MasterCoordinates;

  constructor(data: Primitives<MasterAddress>) {
    super();
    this.country = new StringValueObject(data.country);
    this.city = new StringValueObject(data.city);
    this.direction = new StringValueObject(data.direction);
    this.postal = new StringValueObject(data.postal);
    this.coordinates = new MasterCoordinates(data.coordinates);
  }

  public toPrimitives(): Primitives<MasterAddress> {
    return {
      city: this.city.value,
      country: this.country.value,
      postal: this.postal.value,
      direction: this.direction.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }
}
