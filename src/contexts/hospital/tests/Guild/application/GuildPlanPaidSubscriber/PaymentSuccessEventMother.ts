import { UuidMother } from 'core';
import { PaymentSuccessEvent } from '../../../../src/Payment/domain/PaymentSuccessEvent';

export class PaymentSuccessEventMother {
  static create(guildId: string) {
    return new PaymentSuccessEvent({
      aggregateId: UuidMother.random(),
      sessionId: UuidMother.hash(),
      guildId,
    });
  }
}
