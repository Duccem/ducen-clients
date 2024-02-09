import { Provider } from '@nestjs/common';
import {
  CommandHandlers,
  DomainEventFailOverPublisher,
  InMemoryCommandBus,
  InMemoryQueryBus,
  Logger,
  MongoConnection,
  QueryHandlers,
  RabbitMQConnection,
  RabbitMQEventBus,
} from 'core';
import { commandHandlersRegister } from './commandHandlers.provider';
import { queryHandlersRegister } from './queryHandlers.provider';

export const busesProvider: Provider[] = [
  {
    provide: 'EVENT_BUS',
    inject: ['QUEUE_CONNECTION', 'DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (qConnection: RabbitMQConnection, dbConnection: MongoConnection, logger: Logger) => {
      const failoverPublisher = new DomainEventFailOverPublisher(dbConnection);
      const eventBus = new RabbitMQEventBus(failoverPublisher, qConnection, 'ducen', logger);
      return eventBus;
    },
  },
  {
    provide: 'COMMAND_BUS',
    inject: [...commandHandlersRegister],
    useFactory: (...args) => {
      const handlers = new CommandHandlers(args);
      return new InMemoryCommandBus(handlers);
    },
  },
  {
    provide: 'QUERY_BUS',
    inject: [...queryHandlersRegister],
    useFactory: (...args) => {
      const handlers = new QueryHandlers(args);
      return new InMemoryQueryBus(handlers);
    },
  },
];
