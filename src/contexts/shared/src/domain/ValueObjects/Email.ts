import { ValueObject } from '../ValueObject';

export class Email extends ValueObject<string> {
  private static rex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): boolean {
    if (!Email.rex.test(value)) throw new Error(`<${Email.name}> does not allow the value <${value}>`);
    return true;
  }
  public static isValid(value: string): string {
    if (!Email.rex.test(value)) return 'Email is required';
    return null;
  }
  public getValue(): string {
    return this.value.toString();
  }
}
