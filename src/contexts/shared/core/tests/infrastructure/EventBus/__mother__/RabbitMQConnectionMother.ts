import { ConfirmChannel, Connection, connect } from 'amqplib';
import { RabbitMQConnection } from '../../../../src/infrastructure/Events/RabbitMQ/RabbitMQConnection';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';

export class RabbitMQConnectionMother {
  static async create() {
    const connection = await connect('amqp://localhost:5672');
    const channel = await connection.createConfirmChannel();
    await channel.prefetch(1);
    return new RabbitMQConnection(channel, connection);
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(null as ConfirmChannel, null as Connection);
  }
}
