import { NotFoundError } from 'core';

export class GuildNotFoundError extends NotFoundError {
  constructor(guildId: string) {
    super(`Guild with id ${guildId} not found`);
  }
}
