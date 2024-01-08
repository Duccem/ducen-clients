import { DomainEvent } from 'core';

export type GuildCreatedAttributes = {
  guildId: string;
};
export class GuildCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'guild.created';
  readonly guildId: string;

  constructor({
    params,
    eventId,
    ocurredOn,
    aggregateId,
  }: {
    params: GuildCreatedAttributes;
    aggregateId: string;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(GuildCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, ocurredOn);
    this.guildId = params.guildId;
  }
  public toPrimitive(): GuildCreatedAttributes {
    return {
      guildId: this.guildId,
    };
  }
  public static fromPrimitives(params: {
    aggregateId?: string;
    attributes: GuildCreatedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): GuildCreatedDomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new GuildCreatedDomainEvent({
      aggregateId,
      ocurredOn: occurredOn,
      eventId,
      params: attributes,
    });
  }
}
