import { Command, CommandHandler, Uuid } from 'core';
import { GetMemberById } from '../../domain/GetMemberById';
import { MemberNotExist } from '../../domain/MemberNotExist';
import { MemberRepository } from '../../domain/MemberRepository';
import { ChangePasswordCommand } from './ChangePasswordCommand';

export class ChangePasswordHandler implements CommandHandler<ChangePasswordCommand> {
  constructor(private readonly memberRepository: MemberRepository) {}
  subscribedTo(): Command {
    return ChangePasswordCommand;
  }

  async handle({ memberId, newPassword, oldPassword }: ChangePasswordCommand): Promise<void> {
    const member = await this.memberRepository.getMemberByCriteria(new GetMemberById(new Uuid(memberId)));
    if (!member) throw new MemberNotExist();

    member.changePassword(newPassword, oldPassword);

    await this.memberRepository.save(member.id, member);
  }
}
