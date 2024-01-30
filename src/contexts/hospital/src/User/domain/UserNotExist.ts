import { NotFoundError } from 'core';

export class UserNotExist extends NotFoundError {
  constructor() {
    super(`User not exist`);
  }
}
