import { PaymentProvider } from "../../../src/Payment/domain/PaymentProvider";

export class MockPaymentService implements PaymentProvider {
  createSessionMock = jest.fn();
  async createSession(plan: string, period: string): Promise<{ sessionId: string; url: string; }> {
    return this.createSessionMock(plan, period);
  }

  assertCreateSessionIsCalledWith(plan: string, period: string) {
    expect(this.createSessionMock).toHaveBeenCalledWith(plan, period);
  }

  returnCreateSession(sessionId: string, url: string) {
    this.createSessionMock.mockReturnValue({ sessionId, url });
  }
}
