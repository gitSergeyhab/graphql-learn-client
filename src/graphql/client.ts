import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI || "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});
