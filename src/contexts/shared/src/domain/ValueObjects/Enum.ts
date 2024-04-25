import { ValueObject } from '../ValueObject';

export class Enum<T> extends ValueObject<T> {
  constructor(value: T, public readonly validValues: T[]) {
    super(value);
    this.ensureValidValue(value);
  }
  protected validate(value: T): boolean {
    if (value === null || value === undefined) {
      throw new Error('Value string must be defined');
    }
    return true;
  }

  protected ensureValidValue(value: T): void {
    if (!this.validValues.includes(value)) {
      throw new Error(`Invalid value for enum ${this.constructor.name}: ${value}`);
    }
  }
}
