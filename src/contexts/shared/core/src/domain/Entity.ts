import { BaseObject } from './BaseObject';
import { Primitives } from './Types/Primitives';
import { Uuid } from './ValueObjects/generics/Uuid';
import { DateValueObject } from './ValueObjects/primitives/DateValueObject';

export abstract class Entity extends BaseObject {
  public id?: Uuid;
  public createdAt?: DateValueObject;
  public updatedAt?: DateValueObject;

  constructor(data: Primitives<Entity>) {
    super();
    this.id = data.id ? new Uuid(data.id) : Uuid.random();
    this.createdAt = data.createdAt ? new DateValueObject(data.createdAt) : DateValueObject.today();
    this.updatedAt = data.updatedAt ? new DateValueObject(data.createdAt) : null;
  }
}
