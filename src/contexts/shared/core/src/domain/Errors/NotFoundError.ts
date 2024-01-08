import { Error } from '../Error';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message, 404);
  }
}
