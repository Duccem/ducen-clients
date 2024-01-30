import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';
import { createContext, useContext } from "react";
import { ApolloUserRepository } from '../../../modules/user/infrastructure/ApolloUserRepository';
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
export interface ServicesContextProps {
  userRepository: ApolloUserRepository;
}

const ServicesContext = createContext<ServicesContextProps>({} as ServicesContextProps);

export const ServicesProvider = ({ children }: any) => {
  const userRepository = new ApolloUserRepository(client);

  return (
    <ServicesContext.Provider value={{ userRepository }} >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = () => useContext(ServicesContext);
