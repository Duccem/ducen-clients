import { Collection } from 'mongodb';
import { Aggregate } from '../../../domain/Aggregate';
import { Criteria } from '../../../domain/Criteria/Criteria';
import { InternalError } from '../../../domain/Errors/InternalError';
import { Logger } from '../../../domain/Logger';
import { NewableClass } from '../../../domain/Types/NewableClass';
import { Primitives } from '../../../domain/Types/Primitives';
import { MongoConnection } from './MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';
export abstract class MongoRepository<T extends Aggregate> {
  protected converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(protected entity: NewableClass<T>, protected connection: MongoConnection, protected readonly logger: Logger) {}
  protected get collection(): Collection {
    return this.connection.getConnection()!.collection(this.model);
  }
  protected get model() {
    return this.entity.name.toLowerCase();
  }

  protected async searchByCriteria(criteria: Criteria): Promise<Primitives<T>[]> {
    try {
      const { filter, limit, skip, sort } = this.converter.Criteria(criteria);
      return await this.collection.find<Primitives<T>>(filter).sort(sort).skip(skip).limit(limit).toArray();
    } catch (error) {
      this.logger.error(`Error searching by criteria: ${error.message}`);
      throw new InternalError(`Error searching by criteria: ${error.message}`);
    }
  }

  protected async searchByText(text: string): Promise<Primitives<T>[]> {
    try {
      const filter = this.converter.Search(text);
      return await this.collection.aggregate<Primitives<T>>(filter).toArray();
    } catch (error) {
      this.logger.error(`Error searching by text: ${error.message}`);
      throw new InternalError(`Error searching by text: ${error.message}`);
    }
  }

  protected async persist(id: string, aggregate: T): Promise<void> {
    try {
      await this.collection.updateOne({ id }, { $set: aggregate.toPrimitives() }, { upsert: true });
    } catch (error) {
      this.logger.error(`Error persisting aggregate: ${error.message}`);
      throw new InternalError(`Error persisting aggregate: ${error.message}`);
    }
  }
}
