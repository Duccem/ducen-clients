import { PropsWithChildren, createContext, useContext } from "react";
import { UserProvider } from "../user/UserContext";
import { DatabaseConnectionProvider } from "./DatabaseContext";
import { RepositoryProvider } from "./ServicesContext";
import { TranslateContextProvider } from "./TranslateContext";
import { combineComponents } from "./combinedProviders";

export const PrincipalContext = createContext({});

const providers: any[] = [
  UserProvider
];

export const AppContextProvider = combineComponents(...providers)

export const PrincipalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <PrincipalContext.Provider value={{}}>
      <DatabaseConnectionProvider>
        <TranslateContextProvider>
          <RepositoryProvider>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </RepositoryProvider>
        </TranslateContextProvider>
      </DatabaseConnectionProvider>
    </PrincipalContext.Provider>
  )
}

export const usePrincipalContext = () => useContext(PrincipalContext);
