import { useReducer } from 'react';
import { Flag } from '../../domain/Flag';

export type FlagState = {
  flags: Flag[];
};

export const initialFlagState: FlagState = {
  flags: [],
};

type SetFlags = { type: 'set_flags'; payload: FlagState['flags'] };

export type FlagActions = SetFlags;

const reducers = {
  set_flags: (state: FlagState, action: SetFlags): FlagState => ({
    ...state,
    flags: action.payload,
  }),
};

export function FlagReducer(state: FlagState, action: FlagActions) {
  const updateState = reducers[action.type];
  return updateState(state, action as never);
}

export function useFlagStore() {
  const [flagState, flagDispatch] = useReducer(FlagReducer, initialFlagState);

  const setFlags = (payload: FlagState['flags']) => {
    flagDispatch({ type: 'set_flags', payload });
  };

  return {
    flagState,
    setFlags,
  };
}

export type FlagStoreActions = ReturnType<typeof useFlagStore>;
