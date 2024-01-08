import { Nullable } from 'core';
import { Payment } from './Payment';

export interface PaymentRepository {
  save(payment: Payment): Promise<void>;
  findBySessionId(sessionId: string): Promise<Nullable<Payment>>;
  findLastPaymentPendingByGuildId(guildId: string): Promise<Nullable<Payment>>;
}
