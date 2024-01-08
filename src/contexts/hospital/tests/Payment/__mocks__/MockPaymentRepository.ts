import { Payment } from "../../../src/Payment/domain/Payment";
import { PaymentRepository } from "../../../src/Payment/domain/PaymentRepository";

export class MockPaymentRepository implements PaymentRepository {

  saveMock = jest.fn();
  findBySessionIdMock = jest.fn();
  findLastPaymentPendingByGuildIdMock = jest.fn();
  async save(payment: Payment): Promise<void> {
    this.saveMock(payment);
  }
  async findBySessionId(sessionId: string): Promise<Payment> {
    return this.findBySessionIdMock(sessionId);
  }
  async findLastPaymentPendingByGuildId(guildId: string): Promise<Payment> {
    return this.findLastPaymentPendingByGuildIdMock(guildId);
  }

  assertSaveIsCalledWith() {
    expect(this.saveMock).toHaveBeenCalled();
  }

  assertFindBySessionIdIsCalledWith(sessionId: string) {
    expect(this.findBySessionIdMock).toHaveBeenCalledWith(sessionId);
  }

  assertFindLastPaymentPendingByGuildIdIsCalledWith(guildId: string) {
    expect(this.findLastPaymentPendingByGuildIdMock).toHaveBeenCalledWith(
      guildId
    );
  }

  returnFindBySessionId(payment: Payment) {
    this.findBySessionIdMock.mockReturnValue(payment);
  }

  returnFindLastPaymentPendingByGuildId(payment: Payment) {
    this.findLastPaymentPendingByGuildIdMock.mockReturnValue(payment);
  }
}
