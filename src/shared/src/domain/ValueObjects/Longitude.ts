import { ValueObject } from '../ValueObject';

export class Longitude extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): boolean {
    if (value < -180 || value > 180) {
      throw new Error(`<${Longitude.name}> does not allow the value <${value}>`);
    }
    return true;
  }

  public static isValid(value: number): string {
    if (value < -180 || value > 180) return 'Longitude must be between -180 and 180';
    return null;
  }

  public getValue(): number {
    return this.value;
  }
}
