import { InMemoryCache, makeVar, Reference } from '@apollo/client'
import { TOKEN } from '../../constants/local-storage'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read: () => cartItemsVar()
        },
        isLoggedIn: {
          read: () => isLoggedInVar()
        },
        launches: {
          keyArgs: false,
          merge: (existing, incoming) => {
            let launches: Reference[] = []
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches)
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches)
            }
            return {
              ...incoming,
              launches
            }
          }
        }
      }
    }
  }
})

export const isLoggedInVar = makeVar<boolean>(
  process.browser ? !!localStorage.getItem(TOKEN) : false
)

export const cartItemsVar = makeVar<string[]>([])
