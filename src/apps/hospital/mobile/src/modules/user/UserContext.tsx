import { UserServices, UserStoreActions, useUserService, useUserStore } from "hospital";
import { createContext, useContext } from "react";
import { useRepositoryContext } from "../shared/ServicesContext";

export const UserContext = createContext<UserStoreActions & UserServices>({} as UserStoreActions & UserServices);

export const UserProvider = ({ children }: any) => {
  const { userRepository } = useRepositoryContext()
  const state = useUserStore();
  const services = useUserService(state, userRepository);
  return (
    <UserContext.Provider value={{...state, ...services}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
