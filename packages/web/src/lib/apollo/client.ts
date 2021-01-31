import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { TOKEN } from '../../constants/local-storage'
import { cache } from './cache'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  headers: {
    authorization: !process.browser ? '' : localStorage.getItem(TOKEN) || ''
  },
  typeDefs,
  uri: 'https://diegomais-space.herokuapp.com/graphql'
})
