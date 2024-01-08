import { MongoConnection, MongoRepository, Nullable, Primitives } from 'core';
import { Payment } from '../domain/Payment';
import { PaymentRepository } from '../domain/PaymentRepository';
import { PaymentStatusEnum } from '../domain/PaymentStatus';

export class MongoPaymentRepository extends MongoRepository<Payment> implements PaymentRepository {
  constructor(connection: MongoConnection) {
    super(connection, Payment);
  }

  async save(payment: Payment): Promise<void> {
    await this.persist(payment.id.value, payment);
  }

  async findBySessionId(sessionId: string): Promise<Nullable<Payment>> {
    const payment = await this.collection.findOne<Primitives<Payment>>({ sessionId });
    return payment ? new Payment(payment) : null;
  }

  async findLastPaymentPendingByGuildId(guildId: string): Promise<Nullable<Payment>> {
    const payments = await this.collection
      .find<Primitives<Payment>>({ guildId, status: PaymentStatusEnum.PENDING })
      .sort({ createdAt: -1 })
      .toArray();
    return payments.length > 0 ? new Payment(payments[0]) : null;
  }
}
