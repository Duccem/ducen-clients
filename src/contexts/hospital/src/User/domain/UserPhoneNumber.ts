import { ValueObject } from '@ducen-clients/shared';

export class UserPhoneNumber extends ValueObject<string> {
  public static isValid(phoneNumber: string): string {
    if (!/^04[0,1,2,4,6]{2}[-]{0,1}[0-9]{7}$/g.test(phoneNumber)) {
      return 'Phone number must be in the format 04xx-xxxxxx';
    }
    return null;
  }
}
