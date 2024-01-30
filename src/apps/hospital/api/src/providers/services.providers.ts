import { Provider } from '@nestjs/common';
import { CloudinaryUploader, CustomLogger, FirebaseSender, MailSender, RedisCacheStore } from 'core';
import { JWTAuthService } from 'hospital';

export const services: Provider[] = [
  {
    provide: 'UPLOADER_SERVICE',
    inject: ['IMAGE_CONFIGURATION'],
    useFactory: (imageConf: any) => new CloudinaryUploader(imageConf),
  },
  {
    provide: 'NOTIFICATION_SERVICE',
    inject: ['NOTIFICATION_CONFIGURATION'],
    useFactory: (conf: any) => new FirebaseSender(conf),
  },
  {
    provide: 'EMAIL_SERVICE',
    inject: ['EMAIL_CONFIGURATION'],
    useFactory: (conf: any) => new MailSender(conf.fromEmail, conf.username, conf.password, conf.templatePath),
  },
  {
    provide: 'LOGGER_SERVICE',
    useFactory: () => new CustomLogger(false),
  },
  {
    provide: 'CACHE_STORE',
    inject: ['CACHE_CONNECTION'],
    useFactory: (connection: any) => new RedisCacheStore(connection),
  },
  {
    provide: 'AUTH_SERVICE',
    inject: ['AUTH_CONFIGURATION'],
    useFactory: (conf: any) => new JWTAuthService(conf.authKey),
  },
];
