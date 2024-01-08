import { PropsWithChildren, createContext, useContext } from "react";
import { AuthStoreActions, useAuthStore } from "./AuthState";

export const AuthStoreContext = createContext({} as AuthStoreActions);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const authStore = useAuthStore();
  return (
    <AuthStoreContext.Provider value={authStore}>
        {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthStoreContext);
