import { FormatError } from 'core';

export class GuildAlreadyExistError extends FormatError {
  constructor(name: string) {
    super(`Guild ${name} already exists`);
  }
}
