import { Command } from 'core';
import { PaymentEventType } from '../../domain/PaymentEventType';

export class SessionStatusChangedCommand extends Command {
  constructor(
    public readonly sessionId: string,
    readonly event: PaymentEventType,
    readonly sig: string,
  ) {
    super();
  }
}
