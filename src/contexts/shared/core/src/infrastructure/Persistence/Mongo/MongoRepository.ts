import { Collection } from 'mongodb';
import { Aggregate } from '../../../domain/Aggregate';
import { Criteria } from '../../../domain/Criteria/Criteria';
import { EntityConstructor } from '../../../domain/Types/EntityConstructor';
import { Primitives } from '../../../domain/Types/Primitives';
import { MongoConnection } from './MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';
export abstract class MongoRepository<T extends Aggregate> {
  protected converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(
    protected connection: MongoConnection,
    protected entity: EntityConstructor<T>,
  ) {}
  protected get collection(): Collection {
    return this.connection.getConnection()!.collection(this.model);
  }
  protected get model() {
    return this.entity.name.toLowerCase();
  }

  protected async searchByCriteria(criteria: Criteria): Promise<T[]> {
    const { filter, limit, skip, sort } = this.converter.Criteria(criteria);
    const results = await this.collection.find<Primitives<T>>(filter).sort(sort).skip(skip).limit(limit).toArray();
    return results.map((result) => new this.entity(result));
  }

  protected async searchByText(text: string): Promise<T[]> {
    const filter = this.converter.Search(text);
    const results = await this.collection.aggregate<Primitives<T>>(filter).toArray();
    return results.map((result) => new this.entity(result));
  }

  protected async persist(id: string, aggregate: T): Promise<void> {
    await this.collection.updateOne({ id }, { $set: aggregate.toPrimitives() }, { upsert: true });
  }
}
