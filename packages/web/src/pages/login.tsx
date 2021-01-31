import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import { LoginForm, Loading } from '../components'
import { TOKEN, USER_ID } from '../constants/local-storage'
import { isLoggedInVar } from '../lib/apollo/cache'
import * as LoginTypes from '../lib/apollo/__generated__/Login'

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`
const Login: React.FC = () => {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem(TOKEN, login.token)
        localStorage.setItem(USER_ID, login.id)
        isLoggedInVar(true)
        Router.push('/launches')
      }
    }
  })

  if (loading) return <Loading />
  if (error) return <p>An error occurred</p>

  return <LoginForm login={login} />
}

export default Login
