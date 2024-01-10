import { useReducer } from 'react';
import { User } from '../../../modules/user/domain/User';

export interface AuthState {
  token: string;
  loginCredentials: {
    email: string;
    password: string;
  };
  registerType: 'DOCTOR' | 'PATIENT';
  user: User;
}

export const initialAuthState: AuthState = {
  token: '',
  loginCredentials: {
    email: '',
    password: '',
  },
  registerType: 'PATIENT',
  user: {
    name: {
      firstName: '',
      lastName: '',
    },
    password: '',
    email: '',
    birthDate: new Date(),
    role: 'PATIENT',
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
    phoneNumber: '',
    gender: 'MALE',
    photo: '',
    configuration: {
      timezone: '',
      lang: '',
      theme: '',
    },
  },
};

type SetToken = { type: 'set_token'; payload: AuthState['token'] };
type SetLoginCredentials = { type: 'set_login_credentials'; payload: AuthState['loginCredentials'] };
type SetUser = { type: 'set_user'; payload: AuthState['user'] };
type SetRegisterType = { type: 'set_register_type'; payload: AuthState['registerType'] };
type SetRole = { type: 'set_role'; payload: AuthState['user']['role'] };

export type AuthActions = SetToken | SetLoginCredentials | SetUser | SetRegisterType | SetRole;

export const reducers = {
  set_token: (state: AuthState, action: SetToken) => {
    return { ...state, token: action.payload };
  },
  set_login_credentials: (state: AuthState, action: SetLoginCredentials) => {
    return { ...state, loginCredentials: action.payload };
  },
  set_user: (state: AuthState, action: SetUser) => {
    return { ...state, user: action.payload };
  },
  set_register_type: (state: AuthState, action: SetRegisterType) => {
    return { ...state, registerType: action.payload };
  },
  set_role: (state: AuthState, action: SetRole) => {
    return { ...state, user: { ...state.user, role: action.payload } };
  },
};

export function AuthReducer(state: AuthState, action: AuthActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useAuthState() {
  const [authState, dispatch] = useReducer(AuthReducer, initialAuthState);

  const setToken = (payload: AuthState['token']) => {
    dispatch({ type: 'set_token', payload });
  };
  const setLoginCredentials = (payload: AuthState['loginCredentials']) => {
    dispatch({ type: 'set_login_credentials', payload });
  };
  const setUser = (payload: AuthState['user']) => {
    dispatch({ type: 'set_user', payload });
  };

  const setRegisterType = (payload: AuthState['registerType']) => {
    dispatch({ type: 'set_register_type', payload });
    dispatch({ type: 'set_role', payload });
  };
  return { authState, setToken, setLoginCredentials, setRegisterType, setUser };
}

export type AuthStoreActions = ReturnType<typeof useAuthState>;
