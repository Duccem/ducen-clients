
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UserState, useUserStore } from "./UserStore";
import { StoreUserRepository } from "./persistence/StoreUserRepository";

export interface UserContext {
  state: UserState;
  repository: StoreUserRepository;
}

export const UserStoreContext = createContext<UserContext>({} as any);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { userDispatch, userState } = useUserStore();
  const repository = new StoreUserRepository(userDispatch, userState);
  return (
    <UserStoreContext.Provider value={{ state: userState, repository }}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserContext = () => useContext(UserStoreContext);
