import { DomainEvent } from 'core';

export type MemberCreatedAttributes = {
  memberId: string;
};
export class MemberCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'member.created';
  readonly memberId: string;

  constructor({
    params,
    eventId,
    ocurredOn,
    aggregateId,
  }: {
    params: MemberCreatedAttributes;
    aggregateId: string;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(MemberCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, ocurredOn);
    this.memberId = params.memberId;
  }
  public toPrimitive(): MemberCreatedAttributes {
    return {
      memberId: this.memberId,
    };
  }
  public static fromPrimitives(params: {
    aggregateId?: string;
    attributes: MemberCreatedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): MemberCreatedDomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MemberCreatedDomainEvent({
      aggregateId,
      ocurredOn: occurredOn,
      eventId,
      params: attributes,
    });
  }
}
