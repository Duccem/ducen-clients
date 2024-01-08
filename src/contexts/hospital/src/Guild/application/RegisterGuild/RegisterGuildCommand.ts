import { Command, Primitives } from 'core';
import { Guild } from '../../domain/Guild';

export class RegisterGuildCommand extends Command {
  readonly guild: Primitives<Guild>;

  constructor(guild: Primitives<Guild>) {
    super();
    this.guild = guild;
  }
}
