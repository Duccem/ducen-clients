import { FormatError } from 'core';

export class DoctorExistError extends FormatError {
  constructor() {
    super(`The doctor already exists`);
  }
}
