import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { cache } from './cache'

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'https://diegomais-space.herokuapp.com/graphql'
})
