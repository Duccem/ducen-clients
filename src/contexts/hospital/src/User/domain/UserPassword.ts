import { ValueObject } from '@ducen-clients/shared';

export class UserPassword extends ValueObject<string> {
  protected validate(_value: string): boolean {
    return true;
  }
  public static isValid(password: string): string {
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(password)) {
      return 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    }
    return null;
  }
}
