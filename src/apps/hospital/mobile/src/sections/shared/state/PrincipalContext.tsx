import { PropsWithChildren, createContext, useContext } from "react";
import { AuthProvider } from "../../auth/state/AuthContext";
import { DatabaseConnectionProvider } from "./DatabaseContext";
import { ServicesProvider } from "./ServicesContext";
import { TranslateContextProvider } from "./TranslateContext";
import { combineComponents } from "./combinedProviders";

export const PrincipalContext = createContext({});

const providers: any[] = [
  AuthProvider
];

export const AppContextProvider = combineComponents(...providers)

export const PrincipalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <PrincipalContext.Provider value={{}}>
      <DatabaseConnectionProvider>
        <TranslateContextProvider>
          <ServicesProvider>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </ServicesProvider>
        </TranslateContextProvider>
      </DatabaseConnectionProvider>
    </PrincipalContext.Provider>
  )
}

export const usePrincipalContext = () => useContext(PrincipalContext);
