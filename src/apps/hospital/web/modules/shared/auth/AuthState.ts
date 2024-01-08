import { useReducer } from "react";

export type AuthState = {
  registerType: 'member' | 'guild';
  token: string;
  step: number;
};

export const initialAuthState: AuthState = {
  registerType: 'member',
  token: '',
  step: 1,
};

type SetRegisterType = { type: 'set_register_type'; payload: 'member' | 'guild' };
type SetStep = { type: 'set_step'; payload: number };

export type AuthActions = SetRegisterType  | SetStep ;

const reducers = {
  set_register_type: (state: AuthState, action: SetRegisterType): AuthState => ({ ...state, registerType: action.payload }),
  set_step: (state: AuthState, action: SetStep): AuthState => ({ ...state, step: action.payload }),
};

export function AuthReducer(state: AuthState, action: AuthActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useAuthStore() {
  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);

  const setRegisterType = (payload: 'guild' | 'member') => {
    authDispatch({ type: 'set_register_type', payload });
  };

  const setStep = (payload: number) => {
    authDispatch({ type: 'set_step', payload });
  }

  const getRegisterType = () => authState.registerType;

  return {
    authState: <AuthState>authState,
    setRegisterType,
    setStep,
    getRegisterType
  };
}
export type AuthStoreActions = ReturnType<typeof useAuthStore>;
