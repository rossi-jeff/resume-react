import { graphQLUrl } from './lib';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphQLClient = new ApolloClient({
  uri: graphQLUrl,
  cache: new InMemoryCache()
});
