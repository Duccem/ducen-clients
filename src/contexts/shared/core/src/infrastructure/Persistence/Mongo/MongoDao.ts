import { Collection } from 'mongodb';

import { Entity } from '../../../domain/Entity';
import { EntityConstructor } from '../../../domain/Types/EntityConstructor';
import { Nullable } from '../../../domain/Types/Nullable';
import { Primitives } from '../../../domain/Types/Primitives';
import { MongoConnection } from './MongoConnection';
import { MongoSort } from './MongoCriteriaConverter';

export class MongoDao<E extends Entity> {
  constructor(
    protected connection: MongoConnection,
    protected entity: EntityConstructor<E>,
  ) {}

  protected get collection(): Collection {
    return this.connection.getConnection().collection(this.model);
  }

  protected get model(): string {
    return this.entity.name.toLowerCase();
  }

  async persist(id: string, entity: E): Promise<void> {
    await this.collection.updateOne({ id }, { $set: entity.toPrimitives() }, { upsert: true });
  }

  async get(query: any): Promise<Nullable<E>> {
    const entity = await this.collection.findOne<Nullable<Primitives<E>>>(query);
    return entity ? new this.entity(entity) : null;
  }

  async list(filter: any = {}, limit = 50, skip = 0, sort: MongoSort = { id: -1 }): Promise<Array<E>> {
    const results = await this.collection.find<Primitives<E>>(filter).sort(sort).skip(skip).limit(limit).toArray();
    return results.map((result) => new this.entity(result));
  }
}
