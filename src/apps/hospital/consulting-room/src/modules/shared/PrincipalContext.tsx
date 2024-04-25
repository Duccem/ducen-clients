import { PropsWithChildren, createContext, useContext } from 'react';
import { ApolloClientProvider } from './ApolloProvider';
import { ErrorProvider } from './ErrorContext';
import { TranslateContextProvider } from './TranslateProvider';

export interface Configurations {
  baseUrl: string;
  citiesUrl: string;
  countriesUrl: string;
}

export interface PrincipalContextState {
  configurations?: Configurations;
}
export const PrincipalContext = createContext<PrincipalContextState>({} as PrincipalContextState);

export function PrincipalContextProvider({ children, configurations }: PropsWithChildren<PrincipalContextState>) {
  return (
    <PrincipalContext.Provider value={{ configurations }}>
      <ErrorProvider>
        <TranslateContextProvider>
          <ApolloClientProvider>
            {children}
          </ApolloClientProvider>
        </TranslateContextProvider>
      </ErrorProvider>
    </PrincipalContext.Provider>
  );
}
export const usePrincipalContext = () => useContext(PrincipalContext);
