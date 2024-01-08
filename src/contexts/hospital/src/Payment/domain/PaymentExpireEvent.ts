import { DomainEvent } from 'core';

type PaymentExpireEventAttributes = {
  readonly sessionId: string;
  readonly guildId: string;
};

export class PaymentExpireEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'payment.expire';
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
    super(PaymentExpireEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.sessionId = sessionId;
    this.guildId = guildId;
  }

  public toPrimitive(): PaymentExpireEventAttributes {
    return {
      sessionId: this.sessionId,
      guildId: this.guildId,
    };
  }

  public static fromPrimitives(params: {
    aggregateId: string;
    attributes: PaymentExpireEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): PaymentExpireEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new PaymentExpireEvent({
      aggregateId,
      occurredOn,
      eventId,
      sessionId: attributes.sessionId,
      guildId: attributes.guildId,
    });
  }
}
