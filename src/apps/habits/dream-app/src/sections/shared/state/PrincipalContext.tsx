import { PropsWithChildren, createContext, useContext } from "react";
import { DreamProvider } from "../../Dream/state/DreamContext";
import { UserProvider } from "../../User/state/UserContext";
import { DatabaseConnectionProvider } from "./DatabaseContext";
import { TranslateContextProvider } from "./TranslateContext";
import { combineComponents } from "./combinedProviders";

export const PrincipalContext = createContext({});

const providers = [
  UserProvider,
  DreamProvider
];

export const AppContextProvider = combineComponents(...providers)

export const PrincipalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <PrincipalContext.Provider value={{}}>
      <DatabaseConnectionProvider>
        <TranslateContextProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </TranslateContextProvider>
      </DatabaseConnectionProvider>
      
    </PrincipalContext.Provider>
  )
}

export const usePrincipalContext = () => useContext(PrincipalContext);