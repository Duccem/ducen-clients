import { AuthorizationError } from 'core';

export class IncorrectPassword extends AuthorizationError {
  constructor() {
    super('Incorrect password');
  }
}
