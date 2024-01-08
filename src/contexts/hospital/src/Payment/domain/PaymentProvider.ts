export interface PaymentProvider {
  createSession(plan: string, period: string): Promise<{ sessionId: string; url: string }>;
}
