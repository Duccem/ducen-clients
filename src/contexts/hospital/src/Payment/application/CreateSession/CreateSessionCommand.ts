import { Command } from 'core';

export class CreateSessionCommand extends Command {
  constructor(
    public readonly guildId: string,
    public readonly period: string,
  ) {
    super();
  }
}
