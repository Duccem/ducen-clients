import { Primitives } from 'core';
import { User } from 'hospital';
import { useReducer } from 'react';

export interface UserState {
  user: Primitives<User>;
}

export const initialUserState: UserState = {
  user: <Primitives<User>>{},
};

type SetUser = { type: 'set_user'; payload: Primitives<User> };
type SetPartialUser = { type: 'set_partial_user'; payload: Partial<Primitives<User>> };
type SetRole = { type: 'set_role'; payload: Primitives<User>['role'] };

export type UserActions = SetUser | SetPartialUser | SetRole;

export const reducers = {
  set_user: (state: UserState, action: SetUser) => {
    return { ...state, user: action.payload };
  },
  set_partial_user: (state: UserState, action: SetPartialUser) => {
    return { ...state, user: { ...state.user, ...action.payload } };
  },
  set_role: (state: UserState, action: SetRole) => {
    return { ...state, user: { ...state.user, role: action.payload } };
  },
};

export function UserReducer(state: UserState, action: UserActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useUserState() {
  const [userState, dispatch] = useReducer(UserReducer, initialUserState);

  const setUser = (payload: Primitives<User>) => {
    dispatch({ type: 'set_user', payload });
  };

  const setPartialUser = (payload: Partial<Primitives<User>>) => {
    dispatch({ type: 'set_partial_user', payload });
  };

  const setRole = (payload: Primitives<User>['role']) => {
    dispatch({ type: 'set_role', payload });
  };

  return { userState, setUser, setPartialUser, setRole };
}
