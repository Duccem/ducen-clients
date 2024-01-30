import { createContext, useContext } from "react";
import { AuthServices, useAuthService } from "./AuthService";
import { AuthStoreActions, useAuthState } from "./AuthState";

export const AuthContext = createContext<AuthStoreActions & AuthServices>({} as AuthStoreActions & AuthServices);

export const AuthProvider = ({ children }: any) => {
  const state = useAuthState();
  const services = useAuthService(state);
  return (
    <AuthContext.Provider value={{...state, ...services}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
