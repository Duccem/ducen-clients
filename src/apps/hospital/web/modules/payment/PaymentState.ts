import { useReducer } from "react";

export type PaymentState = {
  plan: string;
  period: string;
  guildId: string;
};

export const initialPaymentState: PaymentState = {
  plan: '',
  period: '',
  guildId: '',
};

type SetPlan = { type: 'set_plan'; payload: string };
type SetPeriod = { type: 'set_period'; payload: string };
type SetGuildID = { type: 'set_guild_id'; payload: string };

export type PaymentActions = SetPlan | SetPeriod | SetGuildID;

const reducers = {
  set_plan: (state: PaymentState, action: SetPlan): PaymentState => ({ ...state, plan: action.payload }),
  set_period: (state: PaymentState, action: SetPeriod): PaymentState => ({ ...state, period: action.payload }),
  set_guild_id: (state: PaymentState, action: SetGuildID): PaymentState => ({ ...state, guildId: action.payload }),
};

export function PaymentReducer(state: PaymentState, action: PaymentActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function usePaymentStore() {
  const [paymentState, paymentDispatch] = useReducer(PaymentReducer, initialPaymentState);

  const setPlan = (payload: string) => {
    paymentDispatch({ type: 'set_plan', payload });
  }

  const setPeriod = (payload: string) => {
    paymentDispatch({ type: 'set_period', payload });
  }

  const setGuildID = (payload: string) => {
    paymentDispatch({ type: 'set_guild_id', payload });
  }

  return {
    paymentState,
    setPlan,
    setPeriod,
    setGuildID
  }
};

export type PaymentStoreActions = ReturnType<typeof usePaymentStore>;
