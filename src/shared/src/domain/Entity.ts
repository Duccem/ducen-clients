import { Nullable } from './Types/Nullable';
import { Primitives } from './Types/Primitives';
import { TimeStamp } from './ValueObjects/TimeStamp';
import { Uuid } from './ValueObjects/Uuid';

export abstract class Entity {
  public id: Uuid;
  public createdAt: Nullable<TimeStamp>;
  public updatedAt: Nullable<TimeStamp>;

  constructor(id: Uuid, createdAt?: TimeStamp, updatedAt?: TimeStamp) {
    this.id = id || Uuid.random();
    this.createdAt = createdAt || TimeStamp.now();
    this.updatedAt = updatedAt || TimeStamp.now();
  }
  public static toArray(entities: Entity[]): Primitives<Entity>[] {
    return entities.map((entity) => entity.toPrimitives());
  }
  public abstract toPrimitives(): Primitives<Entity>;
  public static fromPrimitives: (data: Primitives<Entity>) => Entity;
}
