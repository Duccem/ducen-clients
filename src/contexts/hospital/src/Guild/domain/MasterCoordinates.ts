import { BaseObject, Latitude, Longitude, Primitives } from "core";

export class MasterCoordinates extends BaseObject {
  latitude: Latitude;
  longitude: Longitude;
  constructor(data: Primitives<MasterCoordinates>) {
    super();
    this.latitude = new Latitude(data.latitude);
    this.longitude = new Longitude(data.longitude);
  }

  public toPrimitives(): Primitives<MasterCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }
}
