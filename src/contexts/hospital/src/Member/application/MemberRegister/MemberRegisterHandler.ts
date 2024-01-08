import { Command, CommandHandler, EventBus } from 'core';
import { MemberRepository } from '../../domain/MemberRepository';
import { MemberRegisterCommand } from './MemberRegisterCommand';
import { MemberRegistrar } from './MemberRegistrar';

export class MemberRegisterHandler implements CommandHandler<MemberRegisterCommand> {
  private memberRegistrar: MemberRegistrar;
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventBus: EventBus,
  ) {
    this.memberRegistrar = new MemberRegistrar(this.repository, this.eventBus);
  }
  subscribedTo(): Command {
    return MemberRegisterCommand;
  }
  async handle({ member }: MemberRegisterCommand): Promise<void> {
    await this.memberRegistrar.register(member);
  }
}
