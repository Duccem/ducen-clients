import { Command, Primitives } from 'core';
import { Member } from '../../domain/Member';

export class MemberRegisterCommand extends Command {
  readonly member: Primitives<Member>;
  constructor(member: Primitives<Member>) {
    super();
    this.member = member;
  }
}
