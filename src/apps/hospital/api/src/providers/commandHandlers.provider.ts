import { Provider } from '@nestjs/common';
import { ChangePasswordHandler, RecoveryPasswordHandler, UserRegisterHandler } from 'hospital';

export const commandHandlers: Provider[] = [
  {
    provide: UserRegisterHandler,
    inject: ['USER_REPOSITORY', 'EVENT_BUS'],
    useFactory: (repository: any, eventBus: any) => new UserRegisterHandler(repository, eventBus),
  },
  {
    provide: RecoveryPasswordHandler,
    inject: ['USER_REPOSITORY', 'EMAIL_SERVICE', 'SERVER_CONFIGURATION'],
    useFactory: (memberRepository: any, emailSender: any, conf: any) =>
      new RecoveryPasswordHandler(memberRepository, emailSender, conf.frontendUrl),
  },
  {
    provide: ChangePasswordHandler,
    inject: ['USER_REPOSITORY'],
    useFactory: (memberRepository: any) => new ChangePasswordHandler(memberRepository),
  },
];

export const commandHandlersRegister = [UserRegisterHandler, RecoveryPasswordHandler, ChangePasswordHandler];
