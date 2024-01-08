import { Uuid, Nullable } from "core";
import { Payment } from "./Payment";

export interface PaymentService {
  createSession(guildId: Uuid, period: string): Promise<void>;
  getLastSession(guildId: Uuid): Promise<Nullable<Payment>>;
}
