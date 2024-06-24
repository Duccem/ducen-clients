import { addDays, subDays } from 'date-fns';
import { ValueObject } from '../ValueObject';

export class TimeStamp extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }

  protected validate(value: Date): boolean {
    if (value.getTime() < 0) {
      throw new Error(`<${TimeStamp.name}> does not allow the value <${value}>`);
    }
    return true;
  }

  public static isValid(value: Date): string {
    if (value.getTime() < 0) return 'TimeStamp must be greater than 0';
    return null;
  }

  public getValue(): Date {
    return this.value;
  }

  public static now(): TimeStamp {
    return new TimeStamp(new Date());
  }

  public addDays(days: number): TimeStamp {
    return new TimeStamp(addDays(this.value, days));
  }

  public subDays(days: number): TimeStamp {
    return new TimeStamp(subDays(this.value, days));
  }
}
