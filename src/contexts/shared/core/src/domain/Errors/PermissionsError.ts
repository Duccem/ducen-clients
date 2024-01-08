import { Error } from '../Error';

export class PermissionsError extends Error {
  constructor(message: string) {
    super(message, 403);
  }
}
