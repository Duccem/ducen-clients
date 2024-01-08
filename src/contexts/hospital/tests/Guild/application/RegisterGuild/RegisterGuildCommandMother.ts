import { RegisterGuildCommand } from '../../../../src/Guild/application/RegisterGuild/RegisterGuildCommand';
import { GuildMother } from '../../domain/GuildMother';

export class RegisterGuildCommandMother {
  static create(): RegisterGuildCommand {
    return new RegisterGuildCommand(GuildMother.create().toPrimitives());
  }
}
