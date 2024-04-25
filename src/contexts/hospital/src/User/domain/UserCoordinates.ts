import { Latitude, Longitude, Primitives } from '@ducen-clients/shared';

export class UserCoordinates {
  constructor(public latitude: Latitude, public longitude: Longitude) {}
  public static fromPrimitives(data: Primitives<UserCoordinates>): UserCoordinates {
    return new UserCoordinates(new Latitude(data.latitude), new Longitude(data.longitude));
  }
  public toPrimitives(): Primitives<UserCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }
}
