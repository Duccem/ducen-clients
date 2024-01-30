import { Provider } from '@nestjs/common';
import { LoginHandler } from 'hospital';

export const queryHandlers: Provider[] = [
  {
    provide: LoginHandler,
    inject: ['USER_REPOSITORY', 'AUTH_SERVICE'],
    useFactory: (repository: any, authService: any) => new LoginHandler(repository, authService),
  },
];

export const queryHandlersRegister = [LoginHandler];
