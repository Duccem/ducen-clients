import { DomainEventClass, DomainEventSubscriber, EventBus, Primitives } from "core";
import { MasterCreatedDomainEvent } from "../../../Guild/domain/MasterCreatedDomainEvent";
import { Member } from "../../domain/Member";
import { MemberRepository } from "../../domain/MemberRepository";
import { MemberRegistrar } from "./MemberRegistrar";

export class RegisterMemberOnMasterCreated implements DomainEventSubscriber {
  private memberRegistrar: MemberRegistrar;
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventBus: EventBus
  ) {
    this.memberRegistrar = new MemberRegistrar(this.repository, this.eventBus);
  }
  subscribedTo(): DomainEventClass[] {
    return [MasterCreatedDomainEvent];
  }

  async on(domainEvent: MasterCreatedDomainEvent): Promise<void> {
    try {
      await this.memberRegistrar.register(domainEvent.toPrimitive() as unknown as Primitives<Member>)
    } catch (error) {
      console.log('ERROR', error)
    }
  }
}
