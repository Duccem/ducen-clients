import { Provider } from '@nestjs/common';
import { MongoConnection } from 'core';
import { GUILD_REPOSITORY, MongoGuildRepository, MongoMemberRepository, MongoPaymentRepository } from 'hospital';

export const repositories: Provider[] = [
  {
    provide: GUILD_REPOSITORY,
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoGuildRepository(connection),
  },
  {
    provide: 'MEMBER_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoMemberRepository(connection),
  },
  {
    provide: 'PAYMENT_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
    useFactory: (connection: MongoConnection) => new MongoPaymentRepository(connection),
  },
];
