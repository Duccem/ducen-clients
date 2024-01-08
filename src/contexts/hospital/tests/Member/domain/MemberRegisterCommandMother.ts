import { Primitives } from 'core';
import { MemberRegisterCommand } from '../../../src/Member/application/MemberRegister/MemberRegisterCommand';
import { Member } from '../../../src/Member/domain/Member';
import { MemberMother } from './MemberMother';

export class MemberRegisterCommandMother {
  static fromPrimitives(data?: Primitives<Member>) {
    const newMember = data ? data : MemberMother.create().toPrimitives();
    return new MemberRegisterCommand(newMember);
  }
}
