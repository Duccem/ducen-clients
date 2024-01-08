import { DateValueObject, EmailMother, MotherCreator, Primitives, UuidMother, WordMother } from 'core';
import { Guild } from '../../../src/Guild/domain/Guild';
import { GuildPlan } from '../../../src/Guild/domain/GuildPlan';
import { GuildPlanStatus } from '../../../src/Guild/domain/GuildPlanStatus';

export class GuildMother {
  static create(data?: Partial<Primitives<Guild>>): Guild {
    return new Guild({
      id: UuidMother.random(),
      name: WordMother.random({ maxLength: 20 }),
      email: EmailMother.random({}),
      country: WordMother.country(),
      image: WordMother.image(),
      objective: WordMother.random({ maxLength: 20 }),
      description: WordMother.random({ maxLength: 20 }),
      configuration: {
        category: WordMother.random({ maxLength: 10 }),
        lang: WordMother.random({ maxLength: 2 }),
        lastPayment: DateValueObject.today().value,
        nextPayment: DateValueObject.today().addDays(30).value,
        plan: GuildPlan.Free().value,
        planStatus: GuildPlanStatus.None().value,
        timezone: WordMother.timezone(),
      },
      foundationDate: DateValueObject.today().value,
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
      master: {
        id: UuidMother.random(),
        firstName: MotherCreator.random().person.firstName(),
        lastName: MotherCreator.random().person.lastName(),
        email: EmailMother.random({}),
        biography: MotherCreator.random().person.bio(),
        birthDate: DateValueObject.today().value.toISOString(),
        gender: 'MALE',
        guildId: UuidMother.random(),
        createdAt: DateValueObject.today().value,
        updatedAt: DateValueObject.today().value,
        roleId: UuidMother.random(),
        phoneNumber: MotherCreator.random().phone.number(),
        configuration: {
          lang: WordMother.random({ maxLength: 2 }),
          timezone: WordMother.timezone(),
          theme: WordMother.random({ maxLength: 10 }),
        },
        address: {
          city: MotherCreator.random().location.city(),
          country: MotherCreator.random().location.country(),
          postal: MotherCreator.random().location.zipCode(),
          direction: MotherCreator.random().location.streetAddress(),
          coordinates: {
            latitude: MotherCreator.random().location.latitude(),
            longitude: MotherCreator.random().location.longitude(),
          },
        },
      },
      ...data,
    });
  }
}
