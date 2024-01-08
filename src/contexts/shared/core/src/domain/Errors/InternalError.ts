import { Error } from '../Error';

export class InternalError extends Error {
  constructor(message: string) {
    super(message, 500);
  }
}
