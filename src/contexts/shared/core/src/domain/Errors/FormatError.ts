import { Error } from '../Error';

export class FormatError extends Error {
  constructor(message: string) {
    super(message, 400);
  }
}
