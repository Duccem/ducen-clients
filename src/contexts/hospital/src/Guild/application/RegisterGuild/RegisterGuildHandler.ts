import { Command, CommandHandler, EventBus } from 'core';
import { GuildRepository } from '../../domain/GuildRepository';
import { GuildRegistrar } from './GuildRegistrar';
import { RegisterGuildCommand } from './RegisterGuildCommand';

export class RegisterGuildHandler implements CommandHandler<RegisterGuildCommand> {
  private GuildRegistrar: GuildRegistrar;
  constructor(
    private guildRepository: GuildRepository,
    private eventBus: EventBus,
  ) {
    this.GuildRegistrar = new GuildRegistrar(this.guildRepository, this.eventBus);
  }
  subscribedTo(): Command {
    return RegisterGuildCommand;
  }

  async handle({ guild }: RegisterGuildCommand): Promise<void> {
    await this.GuildRegistrar.register(guild);
  }
}
