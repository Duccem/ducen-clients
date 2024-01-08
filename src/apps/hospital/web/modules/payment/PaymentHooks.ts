import { Uuid } from "core";
import { useDucenContext } from "../shared/common/DucenContext";
import { PaymentStoreActions } from "./PaymentState";

export const usePaymentHooks = (paymentStore: PaymentStoreActions) => {
  const { paymentState } = paymentStore;
  const { paymentService } = useDucenContext();

  const createPaymentSession = async () => {
    const { guildId, period } = paymentState;
    await paymentService.createSession(new Uuid(guildId), period);
  }

  const getLastPaymentSession = async () => {
    const { guildId } = paymentState;
    const paymentSession = await paymentService.getLastSession(new Uuid(guildId));
    return paymentSession;
  }

  return {
    createPaymentSession,
    getLastPaymentSession
  }
}

export type PaymentHooks = ReturnType<typeof usePaymentHooks>;
