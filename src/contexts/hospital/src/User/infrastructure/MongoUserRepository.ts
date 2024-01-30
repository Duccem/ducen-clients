import { Criteria, MongoConnection, MongoRepository, Primitives, Uuid } from 'core';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  constructor(connection: MongoConnection) {
    super(connection, User);
  }

  async save(id: Uuid, aggregate: User): Promise<void> {
    await this.persist(id.value, aggregate);
  }
  async getUserByCriteria(criteria: Criteria): Promise<User> {
    const { filter } = this.converter.Criteria(criteria);
    let user = await this.collection.findOne<Primitives<User>>(filter);
    return user ? User.fromPrimitives(user) : null;
  }

  async listUsersByCriteria(criteria?: Criteria): Promise<User[]> {
    const { filter, limit, skip, sort } = this.converter.Criteria(criteria);
    const users = await this.collection.find<Primitives<User>>(filter).sort(sort).skip(skip).limit(limit).toArray();
    return users.map((user) => User.fromPrimitives(user));
  }
}
