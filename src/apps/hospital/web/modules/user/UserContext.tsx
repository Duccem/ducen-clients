import { UserServices, UserStoreActions, useUserService, useUserStore } from "hospital";
import { PropsWithChildren, createContext, useContext } from "react";
import { useRepositoryContext } from "../shared/RepositoryContext";


export const UserStoreContext = createContext<UserStoreActions & UserServices>({} as UserStoreActions & UserServices);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { userRepository } = useRepositoryContext()
  const state = useUserStore();
  const services = useUserService(state, userRepository);
  return (
    <UserStoreContext.Provider value={{...state, ...services}}>
        {children}
    </UserStoreContext.Provider>
  )
}

export const useUserContext = () => useContext(UserStoreContext);
