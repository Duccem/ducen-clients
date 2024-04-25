export abstract class ValueObject<T> {
  public readonly value: T;
  constructor(value: T) {
    this.validate(value);
    this.value = value;
  }
  public equal(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
  protected validate(value: T): boolean {
    if (!value) return false;
    return true;
  }
  public getValue(): T {
    return this.value;
  }
  public static isValid: (value: any) => string | null | undefined;
}
