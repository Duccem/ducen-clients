import { createContext, useContext } from "react";
import { PaymentHooks, usePaymentHooks } from "./PaymentHooks";
import { PaymentStoreActions, usePaymentStore } from "./PaymentState";

export const PaymentContext = createContext<PaymentStoreActions & PaymentHooks>({} as PaymentStoreActions & PaymentHooks);

export const PaymentProvider = ({ children }: any) => {
  const paymentStore = usePaymentStore();
  const paymentHooks = usePaymentHooks(paymentStore);
  return (
    <PaymentContext.Provider value={{
      ...paymentStore,
      ...paymentHooks
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePaymentContext = () => useContext(PaymentContext);
