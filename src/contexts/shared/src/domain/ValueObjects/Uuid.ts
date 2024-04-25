import { v4, validate } from 'uuid';
import { ValueObject } from '../ValueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
  public static random(): Uuid {
    return new Uuid(v4());
  }

  public static isValid(id: string): string {
    if (!validate(id)) return 'Uuid is not valid';
    return null;
  }

  protected validate(id: string): boolean {
    if (!validate(id)) {
      throw new Error(`<${Uuid.name}> does not allow the value <${id}>`);
    }
    return true;
  }

  public getValue(): string {
    return this.value.toString();
  }
}
