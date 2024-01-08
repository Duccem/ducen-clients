import { Provider } from '@nestjs/common';
import { GUILD_REPOSITORY, GetGuildInformationHandler, GetLastSessionHandler, GetMemberMasterHandler, LoginHandler } from 'hospital';

export const queryHandlers: Provider[] = [
  {
    provide: GetGuildInformationHandler,
    inject: [GUILD_REPOSITORY],
    useFactory: (repository: any) => new GetGuildInformationHandler(repository),
  },
  {
    provide: GetLastSessionHandler,
    inject: ['PAYMENT_REPOSITORY'],
    useFactory: (repository: any) => new GetLastSessionHandler(repository),
  },
  {
    provide: LoginHandler,
    inject: ['MEMBER_REPOSITORY', 'AUTH_SERVICE'],
    useFactory: (repository: any, authService: any) => new LoginHandler(repository, authService),
  },
  {
    provide: GetMemberMasterHandler,
    inject: ['MEMBER_REPOSITORY'],
    useFactory: (repository: any) => new GetMemberMasterHandler(repository),
  },
];

export const queryHandlersRegister = [GetGuildInformationHandler, GetLastSessionHandler, LoginHandler, GetMemberMasterHandler];
