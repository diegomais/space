import { InMemoryCache, makeVar, Reference } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read: () => cartItemsVar()
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

export const cartItemsVar = makeVar<string[]>([])
