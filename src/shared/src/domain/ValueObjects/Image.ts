import { ValueObject } from '../ValueObject';

export class Image extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  protected validate(value: string): boolean {
    if (!value) {
      throw new Error(`<${Image.name}> does not allow the value <${value}>`);
    }
    return true;
  }
  public static isValid(value: string): string {
    if (!value) return 'Image is required';
    return null;
  }
  public getValue(): string {
    return this.value.toString();
  }

  public toFile(name: string): File {
    const blob = new Blob([this.value], { type: 'image/jpeg' });
    return new File([blob], name, { type: 'image/jpeg' });
  }
}
