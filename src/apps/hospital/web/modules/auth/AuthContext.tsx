import { PropsWithChildren, createContext, useContext } from "react";
import { AuthServices, useAuthService } from "./AuthService";
import { AuthStoreActions, useAuthStore } from "./AuthState";

export const AuthStoreContext = createContext<AuthStoreActions & AuthServices>({} as AuthStoreActions & AuthServices);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const state = useAuthStore();
  const services = useAuthService(state);
  return (
    <AuthStoreContext.Provider value={{...state, ...services}}>
        {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthStoreContext);
