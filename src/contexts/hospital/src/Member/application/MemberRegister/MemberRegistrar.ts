
import { EventBus, Primitives } from "core";
import { IdentifyBy } from "../../domain/IdentifyBy";
import { Member } from "../../domain/Member";
import { MemberAlreadyExistError } from "../../domain/MemberAlreadyExistError";
import { MemberRepository } from "../../domain/MemberRepository";

export class MemberRegistrar {
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventBus: EventBus,
  ) {}

  async register(member: Primitives<Member>) {
    const [existUserByUsername, existUserByEmail] = await Promise.all([
      this.repository.getMemberByCriteria(new IdentifyBy('nickname', member.nickname ? member.nickname : member.email)),
      this.repository.getMemberByCriteria(new IdentifyBy('email', member.email)),
    ]);
    if (existUserByUsername) throw new MemberAlreadyExistError(member.nickname);
    if (existUserByEmail) throw new MemberAlreadyExistError(member.email);

    const newMember = Member.Create(member);

    await this.repository.save(newMember.id, newMember);
    await this.eventBus.publish(newMember.pullDomainEvents());
  }
}
