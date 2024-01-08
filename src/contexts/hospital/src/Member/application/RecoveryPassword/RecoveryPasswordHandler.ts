import { Command, CommandHandler, EmailSender } from 'core';
import { MemberNotExist } from '../../domain/MemberNotExist';
import { MemberRepository } from '../../domain/MemberRepository';
import { RecoveryPasswordCommand } from './RecoveryPasswordCommand';

export class RecoveryPasswordHandler implements CommandHandler<RecoveryPasswordCommand> {
  constructor(
    private readonly memberRepository: MemberRepository,
    private mailSender: EmailSender,
    private baseUrl: string,
  ) {}
  subscribedTo(): Command {
    return RecoveryPasswordCommand;
  }

  async handle({ email }: RecoveryPasswordCommand): Promise<void> {
    const member = await this.memberRepository.getByEmail(email);
    if (!member) throw new MemberNotExist();

    await this.mailSender.SendEmail(email, 'Ducen - Recovery Password', 'recovery-password', {
      name: `${member.firstName.value} ${member.lastName.value}`,
      link: `${this.baseUrl}/auth/new-password?id=${member.id.value}`,
    });
  }
}
