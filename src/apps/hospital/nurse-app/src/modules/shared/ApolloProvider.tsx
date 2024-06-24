import { ApolloClient, ApolloLink, DefaultOptions, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
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



export interface ApolloClientProps {
  client: ApolloClient<NormalizedCacheObject>;
}

const ApolloContext = createContext<ApolloClientProps>({} as ApolloClientProps);

export const ApolloClientProvider = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: localStorage.getItem('token') || null,
        },
      });
      return forward(operation);
    }).concat(new HttpLink({ uri: 'http://localhost:3001/api/graphql' })),
  });
  return (
    <ApolloContext.Provider value={{ client }} >
      {children}
    </ApolloContext.Provider>
  );
}

export const useApolloContext = () => useContext(ApolloContext);
