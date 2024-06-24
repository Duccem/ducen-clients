import { Entity, Primitives, TimeStamp, Uuid } from '@ducen/shared';
import { FlagEnabled } from './FlagEnabled';
import { FlagName } from './FlagName';

export class Flag extends Entity {
  constructor(
    public id: Uuid,
    public name: FlagName,
    public enabled: FlagEnabled,
    public createdAt: TimeStamp,
    public updatedAt: TimeStamp
  ) {
    super(id);
  }

  public toPrimitives(): Primitives<Flag> {
    return {
      id: this.id.value,
      name: this.name.value,
      enabled: this.enabled.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Flag>): Flag {
    return new Flag(
      new Uuid(data.id),
      new FlagName(data.name),
      new FlagEnabled(data.enabled),
      new TimeStamp(data.createdAt),
      new TimeStamp(data.updatedAt)
    );
  }

  static create(id: string, name: string, enabled: boolean): Flag {
    return new Flag(new Uuid(id), new FlagName(name), new FlagEnabled(enabled), TimeStamp.now(), TimeStamp.now());
  }
}
