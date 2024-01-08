import { Enum } from 'core';

export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class PaymentStatus extends Enum<PaymentStatusEnum> {
  constructor(value: PaymentStatusEnum) {
    super(value, Object.values(PaymentStatusEnum));
  }

  public toString(): string {
    return this.value;
  }

  static Pending(): PaymentStatus {
    return new PaymentStatus(PaymentStatusEnum.PENDING);
  }

  static Success(): PaymentStatus {
    return new PaymentStatus(PaymentStatusEnum.SUCCESS);
  }

  static Failed(): PaymentStatus {
    return new PaymentStatus(PaymentStatusEnum.FAILED);
  }
}
