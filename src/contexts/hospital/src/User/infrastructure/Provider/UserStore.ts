import { Primitives } from '@ducen-clients/shared';
import { useReducer } from 'react';
import { User } from '../../domain/User';
import { UserGenders } from '../../domain/UserGender';
import { UserRoles } from '../../domain/UserRole';

export type UserState = {
  registerType: 'DOCTOR' | 'PATIENT';
  loginCredentials: {
    email: string;
    password: string;
  };
  step: number;
  user: Primitives<User>;
  token: string;
};
export const initialUserState: UserState = {
  registerType: 'PATIENT',
  token: '',
  loginCredentials: {
    email: '',
    password: '',
  },
  step: 1,
  user: {
    id: '',
    photo: '',
    name: {
      firstName: '',
      lastName: '',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
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

type SetRegisterType = { type: 'set_register_type'; payload: UserState['registerType'] };
type SetLoginCredentials = { type: 'set_login_credentials'; payload: UserState['loginCredentials'] };
type SetUser = { type: 'set_user'; payload: UserState['user'] };
type SetPartialUser = { type: 'set_partial_user'; payload: Partial<UserState['user']> };
type SetToken = { type: 'set_token'; payload: UserState['token'] };

export type AuthActions = SetRegisterType | SetLoginCredentials | SetUser | SetPartialUser | SetToken;

const reducers = {
  set_register_type: (state: UserState, action: SetRegisterType): UserState => ({
    ...state,
    registerType: action.payload,
  }),
  set_login_credentials: (state: UserState, action: SetLoginCredentials): UserState => ({
    ...state,
    loginCredentials: action.payload,
  }),
  set_user: (state: UserState, action: SetUser): UserState => ({ ...state, user: action.payload }),
  set_partial_user: (state: UserState, action: SetPartialUser): UserState => ({
    ...state,
    user: { ...state.user, ...action.payload },
  }),
  set_token: (state: UserState, action: SetToken): UserState => ({ ...state, token: action.payload }),
};

export function UserReducer(state: UserState, action: AuthActions) {
  const updateState = reducers[action.type];
  return updateState(state, action as never);
}

export function useUserStore() {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

  const setRegisterType = (payload: 'DOCTOR' | 'PATIENT') => {
    userDispatch({ type: 'set_register_type', payload });
  };

  const setLoginCredentials = (payload: UserState['loginCredentials']) => {
    userDispatch({ type: 'set_login_credentials', payload });
  };

  const setUser = (payload: UserState['user']) => {
    userDispatch({ type: 'set_user', payload });
  };

  const setPartialUser = (payload: Partial<UserState['user']>) => {
    userDispatch({ type: 'set_partial_user', payload });
  };

  const setToken = (payload: UserState['token']) => {
    userDispatch({ type: 'set_token', payload });
  };

  const getRegisterType = () => userState.registerType;

  return {
    userState,
    setRegisterType,
    getRegisterType,
    setLoginCredentials,
    setUser,
    setPartialUser,
    setToken,
  };
}
export type UserStoreActions = ReturnType<typeof useUserStore>;
