import { useMemo } from 'react'
import styles from '../styles/components/launch-detail.module.css'
import { getBackgroundImage } from '../utils/image'

interface Props {
  id: string
  site: string
  rocket?: {
    name: string
    type: string
  }
}

const LaunchDetail: React.FC<Props> = ({ id, site, rocket }) => {
  const backgroundImage = useMemo(() => getBackgroundImage(id), [id])

  return (
    <div className={styles.card} style={{ backgroundImage }}>
      <h3>
        {rocket && rocket.name} ({rocket && rocket.type})
      </h3>
      <h5>{site}</h5>
    </div>
  )
}

export default LaunchDetail
