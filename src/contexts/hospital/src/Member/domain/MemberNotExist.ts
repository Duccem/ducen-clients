import { AuthorizationError } from 'core';

export class MemberNotExist extends AuthorizationError {
  constructor() {
    super("Member doesn't exist");
  }
}
