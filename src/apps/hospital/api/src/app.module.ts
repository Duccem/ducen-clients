import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getEnv } from './config/env.config';

import { OpenTelemetryModule } from '@amplication/opentelemetry-nestjs';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
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
      csrfPrevention: false,
    }),
    OpenTelemetryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        serviceName: configService.get('server.service'),
        metricReader: new PrometheusExporter({
          port: 8081,
        }),
        spanProcessor: new SimpleSpanProcessor(
          new OTLPTraceExporter({
            url: configService.get('server.traceUrl'),
          }),
        ),
      }),
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
