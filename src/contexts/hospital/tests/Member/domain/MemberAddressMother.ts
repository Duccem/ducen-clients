import { MotherCreator, Primitives } from 'core';
import { MemberAddress } from '../../../src/Member/domain/MemberAddress';

export class MemberAddressMother {
  static random(): Primitives<MemberAddress> {
    return {
      city: MotherCreator.random().location.city(),
      country: MotherCreator.random().location.country(),
      postal: MotherCreator.random().location.zipCode(),
      direction: MotherCreator.random().location.streetAddress(),
      coordinates: {
        latitude: MotherCreator.random().location.latitude(),
        longitude: MotherCreator.random().location.longitude(),
      },
    };
  }
}
