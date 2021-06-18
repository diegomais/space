import { ApolloProvider, gql, useQuery } from '@apollo/client'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { useEffect } from 'react'
import { client } from '../lib/apollo/client'
import '../styles/globals.css'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const IsLoggedIn: React.FC = ({ children }) => {
  const { data } = useQuery(IS_LOGGED_IN)
  useEffect(() => {
    if (!data.isLoggedIn && window.location.pathname !== '/login') {
      Router.push('/login')
    }
  })
  return <>{children}</>
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <IsLoggedIn>
      <Component {...pageProps} />
    </IsLoggedIn>
  </ApolloProvider>
)
export default MyApp
