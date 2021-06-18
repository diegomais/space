import { useEffect, useState } from 'react'
import { USER_EMAIL } from '../constants/local-storage'
import styles from '../styles/components/header.module.css'

interface HeaderProps {
  image?: string
}

const Header: React.FC<HeaderProps> = ({
  image,
  children = 'Space Explorer'
}) => {
  const [avatar, setAvatar] = useState(image)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const userEmail = localStorage.getItem(USER_EMAIL) || ''
    setEmail(userEmail)
  }, [])

  useEffect(() => {
    if (!image) {
      const avatars = [
        'images/dog-1.png',
        'images/dog-2.png',
        'images/dog-3.png'
      ]
      const maxIndex = avatars.length - 1
      const max = 25 // 25 letters in the alphabet
      const offset = 97 // letter A's charcode is 97
      const charCode = email.toLowerCase().charCodeAt(0) - offset
      const percentile = Math.max(0, Math.min(max, charCode)) / max
      setAvatar(avatars[Math.round(maxIndex * percentile)])
    }
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
