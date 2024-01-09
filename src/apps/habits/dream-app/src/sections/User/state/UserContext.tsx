import { createContext, useContext } from "react";
import { UserStoreActions, useUserState } from "./UserState";

export const UserContext = createContext<UserStoreActions>({} as UserStoreActions);

export const UserProvider = ({ children }: any) => {
  const state = useUserState();
  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);