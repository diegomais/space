import { useCallback, useState } from 'react'
import Curve from '../assets/curve.svg'
import Logo from '../assets/logo.svg'
import Rocket from '../assets/rocket.svg'
import styles from '../styles/components/login-form.module.css'

interface LoginFormProps {
  login(a: { variables: { email: string } }): void
}

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  const [email, setEmail] = useState('')

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setEmail(email)
  }, [])

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      login({ variables: { email } })
    },
    [email, login]
  )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Curve className={styles.curve} />
        <Logo className={styles.logo} />
      </header>
      <Rocket className={styles.rocket} />
      <h1 className={styles.heading}>Space Explorer</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          data-testid="login-input"
          name="email"
          onChange={onChange}
          placeholder="Email"
          required
          type="email"
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
