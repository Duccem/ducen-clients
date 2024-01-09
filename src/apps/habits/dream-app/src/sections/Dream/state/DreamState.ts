import { useReducer } from "react";

export interface DreamState {
  dream: {
    id: string;
    date: Date;
    start: Date;
    end: Date;
    duration: number;
    quality: number;
    lucidity: number;
    state: string;
  };
}

export const initialDreamState: DreamState = {
  dream: {
    id: "",
    date: new Date(),
    start: new Date(),
    end: new Date(),
    duration: 0,
    quality: 0,
    lucidity: 0,
    state: "",
  },
};

type SetDream = { type: "set_dream"; payload: DreamState["dream"] };

export type DreamActions = SetDream;

export const reducers = {
  set_dream: (state: DreamState, action: SetDream) => {
    return { ...state, dream: action.payload };
  },
};

export function DreamReducer(state: DreamState, action: DreamActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useDreamState() {
  const [dreamState, dispatch] = useReducer(DreamReducer, initialDreamState);

  const setDream = (payload: DreamState["dream"]) => {
    dispatch({ type: "set_dream", payload });
  };
  return { dreamState, setDream };
}

export type DreamStoreActions = ReturnType<typeof useDreamState>;
