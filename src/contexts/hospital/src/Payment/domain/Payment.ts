import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from 'core';
import { PaymentExpireEvent } from './PaymentExpireEvent';
import { PaymentStatus } from './PaymentStatus';
import { PaymentSuccessEvent } from './PaymentSuccessEvent';

export class Payment extends Aggregate {
  guildId: Uuid;
  sessionId: StringValueObject;
  paymentDate: DateValueObject;
  status: PaymentStatus;
  url: StringValueObject;

  constructor(data: Primitives<Payment>) {
    super(data);
    this.guildId = new Uuid(data.guildId);
    this.sessionId = new StringValueObject(data.sessionId);
    this.paymentDate = new DateValueObject(data.paymentDate);
    this.status = new PaymentStatus(data.status);
    this.url = new StringValueObject(data.url);
  }

  public successSession() {
    this.status = PaymentStatus.Success();
    this.updatedAt = DateValueObject.today();
    this.record(
      new PaymentSuccessEvent({
        aggregateId: this.id.value,
        guildId: this.guildId.value,
        sessionId: this.sessionId.value,
      }),
    );
  }

  public failSession() {
    this.status = PaymentStatus.Failed();
    this.updatedAt = DateValueObject.today();
    this.record(
      new PaymentExpireEvent({
        aggregateId: this.id.value,
        guildId: this.guildId.value,
        sessionId: this.sessionId.value,
      }),
    );
  }

  public toPrimitives(): Primitives<Payment> {
    return {
      id: this.id.value,
      guildId: this.guildId.value,
      sessionId: this.sessionId.value,
      paymentDate: this.paymentDate.value,
      status: this.status.value,
      url: this.url.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
