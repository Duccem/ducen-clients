import { FormatError } from 'core';

export class PasswordFormatError extends FormatError {
  constructor(error: string) {
    super(error);
  }
}
