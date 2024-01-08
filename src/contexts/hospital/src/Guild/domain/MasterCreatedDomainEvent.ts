import { DomainEvent, Primitives } from "core";
import { Master } from "./Master";

export class MasterCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME: string = "guild.master.created";
  public readonly master: Primitives<Master>;

  constructor({
    params,
    aggregateId,
    eventId,
    occurredOn
  }: {
    params: Primitives<Master>,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  }) {
    super(MasterCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.master = params;
  }

  public toPrimitive() {
    return this.master;
  }

  public static fromPrimitives(params: {
    aggregateId?: string;
    attributes: Primitives<Master>;
    eventId?: string;
    occurredOn?: Date;
  }): MasterCreatedDomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new MasterCreatedDomainEvent({
      aggregateId,
      occurredOn: occurredOn,
      eventId,
      params: attributes,
    });
  }
}
