import { ValueObject } from '../ValueObject';

export class Latitude extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  protected validate(value: number): boolean {
    if (value < -90 || value > 90) {
      throw new Error(`<${Latitude.name}> does not allow the value <${value}>`);
    }
    return true;
  }

  public static isValid(value: number): string {
    if (value < -90 || value > 90) return 'Latitude must be between -90 and 90';
    return null;
  }

  public getValue(): number {
    return this.value;
  }
}
