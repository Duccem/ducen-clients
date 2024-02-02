import { Primitives } from 'core';
import { User, UserGenders, UserRoles } from 'hospital';
import { useReducer } from 'react';

export type AuthState = {
  registerType: 'DOCTOR' | 'PATIENT';
  loginCredentials: {
    email: string;
    password: string;
  };
  token: string;
  step: number;
  user: Primitives<User>;
};

export const initialAuthState: AuthState = {
  registerType: 'PATIENT',
  loginCredentials: {
    email: '',
    password: '',
  },
  token: '',
  step: 1,
  user: {
    id: '',
    photo: '',
    name: {
      firstName: '',
      lastName: '',
    },
    password: '',
    email: '',
    birthDate: new Date(),
    role: UserRoles.PATIENT,
    phoneNumber: '',
    gender: UserGenders.MALE,
    address: {
      country: '',
      city: '',
      street: '',
      zipCode: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    configuration: {
      timezone: '',
      lang: '',
      theme: '',
    },
  },
};

type SetRegisterType = { type: 'set_register_type'; payload: AuthState['registerType'] };
type SetToken = { type: 'set_token'; payload: string };
type SetLoginCredentials = { type: 'set_login_credentials'; payload: AuthState['loginCredentials'] };
type SetStep = { type: 'set_step'; payload: number };
type SetUser = { type: 'set_user'; payload: AuthState['user'] };
type SetPartialUser = { type: 'set_partial_user'; payload: Partial<AuthState['user']> };

export type AuthActions = SetRegisterType | SetStep | SetToken | SetLoginCredentials | SetUser | SetPartialUser;

const reducers = {
  set_register_type: (state: AuthState, action: SetRegisterType): AuthState => ({ ...state, registerType: action.payload }),
  set_step: (state: AuthState, action: SetStep): AuthState => ({ ...state, step: action.payload }),
  set_token: (state: AuthState, action: SetToken): AuthState => ({ ...state, token: action.payload }),
  set_login_credentials: (state: AuthState, action: SetLoginCredentials): AuthState => ({
    ...state,
    loginCredentials: action.payload,
  }),
  set_user: (state: AuthState, action: SetUser): AuthState => ({ ...state, user: action.payload }),
  set_partial_user: (state: AuthState, action: SetPartialUser): AuthState => ({
    ...state,
    user: { ...state.user, ...action.payload },
  }),
};

export function AuthReducer(state: AuthState, action: AuthActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useAuthStore() {
  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);

  const setRegisterType = (payload: 'DOCTOR' | 'PATIENT') => {
    authDispatch({ type: 'set_register_type', payload });
  };

  const setStep = (payload: number) => {
    authDispatch({ type: 'set_step', payload });
  };

  const setLoginCredentials = (payload: AuthState['loginCredentials']) => {
    authDispatch({ type: 'set_login_credentials', payload });
  };

  const setToken = (payload: string) => {
    authDispatch({ type: 'set_token', payload });
  };

  const setUser = (payload: AuthState['user']) => {
    authDispatch({ type: 'set_user', payload });
  };

  const setPartialUser = (payload: Partial<AuthState['user']>) => {
    authDispatch({ type: 'set_partial_user', payload });
  };

  const getRegisterType = () => authState.registerType;

  return {
    authState,
    setRegisterType,
    setStep,
    getRegisterType,
    setLoginCredentials,
    setToken,
    setUser,
    setPartialUser,
  };
}
export type AuthStoreActions = ReturnType<typeof useAuthStore>;
