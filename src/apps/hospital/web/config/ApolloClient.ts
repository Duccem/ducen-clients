import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';
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

export const getClient = (baseUrl: string) => {
  return new ApolloClient({
    uri: `${baseUrl}/api/graphql`,
    cache: new InMemoryCache(),
    defaultOptions,
  });
};
