import { Member } from "../../../src/Member/domain/Member";
import { MemberCreatedDomainEvent } from "../../../src/Member/domain/MemberCreatedDomainEvent";

export class MemberCreatedDomainEventMother {
  static fromMember(member: Member): MemberCreatedDomainEvent {
    return new MemberCreatedDomainEvent({
      aggregateId: member.id.value,
      params: {
        memberId: member.id.value,
      },
    });
  }
}
