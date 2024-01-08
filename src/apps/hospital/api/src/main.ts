import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get('LOGGER_SERVICE');
  const configurations = app.get('SERVER_CONFIGURATION');
  const port = configurations.port || 3000;
  const host = configurations.host || 'http://localhost';
  const globalPrefix = configurations.globalPrefix || 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(logger);
  app.enableCors();
  await app.listen(port || 3000);
  logger.log(`🚀 Application is running on: ${host}:${port}/${globalPrefix}`);
}
bootstrap();
