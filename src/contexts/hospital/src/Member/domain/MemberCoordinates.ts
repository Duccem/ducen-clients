import { BaseObject, Latitude, Longitude, Primitives } from 'core';

export class MemberCoordinates extends BaseObject {
  latitude: Latitude;
  longitude: Longitude;
  constructor(data: Primitives<MemberCoordinates>) {
    super();
    this.latitude = new Latitude(data.latitude);
    this.longitude = new Longitude(data.longitude);
  }

  public toPrimitives(): Primitives<MemberCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }
}
