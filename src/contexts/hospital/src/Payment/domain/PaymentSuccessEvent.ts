import { DomainEvent } from 'core';

type PaymentSuccessEventAttributes = {
  readonly sessionId: string;
  readonly guildId: string;
};

export class PaymentSuccessEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'payment.success';
  readonly sessionId: string;
  readonly guildId: string;

  constructor({
    aggregateId,
    eventId,
    guildId,
    sessionId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    sessionId: string;
    guildId: string;
    occurredOn?: Date;
  }) {
    super(PaymentSuccessEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.sessionId = sessionId;
    this.guildId = guildId;
  }

  public toPrimitive(): PaymentSuccessEventAttributes {
    return {
      sessionId: this.sessionId,
      guildId: this.guildId,
    };
  }

  public static fromPrimitives(params: {
    aggregateId: string;
    attributes: PaymentSuccessEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): PaymentSuccessEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new PaymentSuccessEvent({
      aggregateId,
      occurredOn,
      eventId,
      sessionId: attributes.sessionId,
      guildId: attributes.guildId,
    });
  }
}
