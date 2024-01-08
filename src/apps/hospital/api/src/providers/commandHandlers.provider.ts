import { Provider } from '@nestjs/common';
import {
  ChoosePlanHandler,
  CreateSessionHandler,
  GUILD_REPOSITORY,
  MemberRegisterHandler,
  RecoveryPasswordHandler,
  RegisterGuildHandler,
  SessionStatusChangedHandler,
} from 'hospital';

export const commandHandlers: Provider[] = [
  {
    provide: RegisterGuildHandler,
    inject: [GUILD_REPOSITORY, 'EVENT_BUS'],
    useFactory: (guildRepository: any, eventBus: any) => new RegisterGuildHandler(guildRepository, eventBus),
  },
  {
    provide: MemberRegisterHandler,
    inject: ['MEMBER_REPOSITORY', 'EVENT_BUS'],
    useFactory: (repository: any, eventBus: any) => new MemberRegisterHandler(repository, eventBus),
  },
  {
    provide: ChoosePlanHandler,
    inject: [GUILD_REPOSITORY],
    useFactory: (repository: any) => new ChoosePlanHandler(repository),
  },
  {
    provide: CreateSessionHandler,
    inject: [GUILD_REPOSITORY, 'PAYMENT_REPOSITORY', 'PAYMENT_SERVICE'],
    useFactory: (guildRepository: any, paymentRepository: any, paymentService: any) =>
      new CreateSessionHandler(guildRepository, paymentRepository, paymentService),
  },
  {
    provide: SessionStatusChangedHandler,
    inject: ['PAYMENT_REPOSITORY', 'EVENT_BUS'],
    useFactory: (paymentRepository: any, eventBus: any) => new SessionStatusChangedHandler(paymentRepository, eventBus),
  },
  {
    provide: RecoveryPasswordHandler,
    inject: ['MEMBER_REPOSITORY', 'EMAIL_SERVICE', 'SERVER_CONFIGURATION'],
    useFactory: (memberRepository: any, emailSender: any, conf: any) =>
      new RecoveryPasswordHandler(memberRepository, emailSender, conf.frontendUrl),
  },
];

export const commandHandlersRegister = [
  RegisterGuildHandler,
  MemberRegisterHandler,
  ChoosePlanHandler,
  CreateSessionHandler,
  SessionStatusChangedHandler,
  RecoveryPasswordHandler,
];
