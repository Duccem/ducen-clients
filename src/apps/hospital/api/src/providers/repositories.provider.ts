import { Provider } from '@nestjs/common';
import { Logger, MongoConnection } from 'core';
import { MongoUserRepository } from 'hospital';

export const repositories: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) => new MongoUserRepository(connection, logger),
  },
];
