'use client';
import { PropsWithChildren, createContext, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'ui';
import { AppContextProvider } from './AppContext';
import { RepositoryProvider } from './RepositoryContext';
import { TranslateContextProvider } from './TranslateContext';

export interface Configurations {
  baseUrl: string;
  citiesUrl: string;
  countriesUrl: string;
}

export interface PrincipalContextState {
  configurations: Configurations;
}

export const PrincipalContext = createContext<PrincipalContextState>({} as PrincipalContextState);


export const PrincipalContextProvider = ({ children, ...config }: PropsWithChildren<PrincipalContextState>) => {
  return (
    <PrincipalContext.Provider value={{ ...config }}>
      <ThemeProvider theme={theme}>
        <TranslateContextProvider>
          <RepositoryProvider>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </RepositoryProvider>
        </TranslateContextProvider>
      </ThemeProvider>
    </PrincipalContext.Provider>
  );
};

export const usePrincipalContext = () => useContext(PrincipalContext);
