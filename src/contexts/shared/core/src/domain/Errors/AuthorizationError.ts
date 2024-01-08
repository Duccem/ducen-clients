import { Error } from '../Error';

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message, 401);
  }
}
