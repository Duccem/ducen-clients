import { Provider } from '@nestjs/common';
import { MongoConnection } from 'core';
import { MongoUserRepository } from 'hospital';

export const repositories: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoUserRepository(connection),
  },
];
