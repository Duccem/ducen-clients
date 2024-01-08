import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { getEnv } from './config/env.config';

import { busesProvider } from './providers/buses.provider';
import { commandHandlers } from './providers/commandHandlers.provider';
import { confFiles, configurations } from './providers/confIgurations.provider';
import { connections } from './providers/connections.provider';
import { controllers } from './providers/controllers.provider';
import { EventSubscribers, eventHandlers } from './providers/eventHandlers';
import { queryHandlers } from './providers/queryHandlers.provider';
import { repositories } from './providers/repositories.provider';
import { resolvers } from './providers/resolvers.provider';
import { services } from './providers/services.providers';
import { GraphQLErrorHandling } from './utils/ErrorHandlers/GQLErrorHandler';
import { LoggerMiddleware } from './utils/middlewares/LoggerMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [...confFiles],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/schemas/*.graphql'],
      formatError: GraphQLErrorHandling,
      useGlobalPrefix: true,
    }),
  ],
  controllers: [...controllers],
  providers: [
    ...configurations,
    ...connections,
    ...services,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    EventSubscribers,
    ...busesProvider,
    ...resolvers,

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
