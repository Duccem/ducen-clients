import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';
import { ApolloUserRepository } from 'hospital';
import { createContext, useContext } from "react";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
const client = new ApolloClient({
  uri: 'https://rs28wkcq-3000.use2.devtunnels.ms/api/graphql',
  cache: new InMemoryCache(),
  defaultOptions,
});
export interface RepositoryContextProps {
  userRepository: ApolloUserRepository;
}

const RepositoryContext = createContext<RepositoryContextProps>({} as RepositoryContextProps);

export const RepositoryProvider = ({ children }: any) => {
  const userRepository = new ApolloUserRepository(client);

  return (
    <RepositoryContext.Provider value={{ userRepository }} >
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositoryContext = () => useContext(RepositoryContext);
