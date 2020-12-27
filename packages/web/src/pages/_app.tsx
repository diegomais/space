import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { client } from '../lib/apollo/client'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp
