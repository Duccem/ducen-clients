import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../../../src/infrastructure/Persistence/Mongo/MongoConnection';

export class RabbitMQMongoClientMother {
  static async create() {
    const client = await MongoClient.connect('mongodb://localhost:27017/test-ducen');
    return new MongoConnection(client);
  }

  static double() {
    return new MongoConnection(null as unknown as MongoClient);
  }
}
