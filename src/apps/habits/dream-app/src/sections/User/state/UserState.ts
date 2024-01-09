import { useReducer } from "react";

export interface UserState {
  user: {
    name: string;
    email: string;
  };
}

export const initialUserState: UserState = {
  user: {
    name: "",
    email: "",
  },
};

type SetUser = { type: "set_user"; payload: UserState["user"] };
type SetName = { type: "set_name"; payload: UserState["user"]["name"] };

export type UserActions = SetUser | SetName;

export const reducers = {
  set_user: (state: UserState, action: SetUser) => {
    return { ...state, user: action.payload };
  },
  set_name: (state: UserState, action: SetName) => {
    console.log("en el reducer", action);
    return { ...state, user: { ...state.user, name: action.payload } };
  },
};

export function UserReducer(state: UserState, action: UserActions) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action as any);
}

export function useUserState() {
  const [userState, dispatch] = useReducer(UserReducer, initialUserState);

  const setUser = (payload: UserState["user"]) => {
    dispatch({ type: "set_user", payload });
  };
  const setName = (payload: UserState["user"]["name"]) => {
    console.log("en el hook", payload);
    dispatch({ type: "set_name", payload });
  };
  return { userState, setUser, setName };
}

export type UserStoreActions = ReturnType<typeof useUserState>;
