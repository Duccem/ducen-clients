import { Command } from 'core';

export class ChangePasswordCommand extends Command {
  constructor(
    public readonly memberId: string,
    public readonly newPassword: string,
    public readonly oldPassword: string,
  ) {
    super();
  }
}
