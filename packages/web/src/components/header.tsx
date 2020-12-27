import { useMemo } from 'react'
import styles from '../styles/components/header.module.css'

interface HeaderProps {
  image?: string
}

const Header: React.FC<HeaderProps> = ({
  image,
  children = 'Space Explorer'
}) => {
  const email =
    typeof window === 'undefined'
      ? ''
      : atob(localStorage.getItem('token') as string)

  const avatar = useMemo(() => {
    if (image) {
      return image
    }

    const avatars = ['images/dog-1.png', 'images/dog-1.png', 'images/dog-1.png']
    const maxIndex = avatars.length - 1
    const max = 25 // 25 letters in the alphabet
    const offset = 97 // letter A's charcode is 97
    const charCode = email.toLowerCase().charCodeAt(0) - offset
    const percentile = Math.max(0, Math.min(max, charCode)) / max
    return avatars[Math.round(maxIndex * percentile)]
  }, [email, image])

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={avatar} alt="Space dog" />
      <div>
        <h2>{children}</h2>
        <h5 className={styles.subheading}>{email}</h5>
      </div>
    </div>
  )
}

export default Header
