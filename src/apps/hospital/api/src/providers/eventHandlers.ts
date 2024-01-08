import { Provider } from '@nestjs/common';
import { DomainEventRegisterObservers, DomainEventSubscriber } from 'core';
import { GUILD_REPOSITORY, GuildPlanPaidSubscriber, RegisterMemberOnMasterCreated } from 'hospital';

export const eventHandlers: Provider[] = [
  {
    provide: GuildPlanPaidSubscriber,
    inject: [GUILD_REPOSITORY],
    useFactory: (repository: any) => new GuildPlanPaidSubscriber(repository),
  },
  {
    provide: RegisterMemberOnMasterCreated,
    inject: ['MEMBER_REPOSITORY', 'EVENT_BUS'],
    useFactory: (repository: any, eventBus: any) => new RegisterMemberOnMasterCreated(repository, eventBus),
  },
];

export const eventHandlersRegister = [GuildPlanPaidSubscriber, RegisterMemberOnMasterCreated];

export const EventSubscribers = {
  provide: 'EVENT_SUBSCRIBERS',
  inject: ['EVENT_BUS', ...eventHandlersRegister],
  useFactory: (eventBus: any, ...handlers: DomainEventSubscriber[]) => {
    const subscribers = new DomainEventRegisterObservers(handlers);
    eventBus.addSubscribers(subscribers);
    return subscribers;
  },
};
