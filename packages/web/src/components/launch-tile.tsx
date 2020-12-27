import Link from 'next/link'
import { useMemo } from 'react'
import * as LaunchTileTypes from '../lib/apollo/__generated__/LaunchTile'
import styles from '../styles/components/launch-tile.module.css'

const backgrounds = [
  '/images/galaxy.jpg',
  '/images/iss.jpg',
  '/images/moon.jpg'
]

interface LaunchTileProps {
  launch: LaunchTileTypes.LaunchTile
}

const LaunchTile: React.FC<LaunchTileProps> = ({ launch }) => {
  const { id, mission, rocket } = launch

  const backgroundImage = useMemo(() => {
    return `url(${backgrounds[Number(id) % backgrounds.length]})`
  }, [backgrounds, id])

  return (
    <Link href={`/launch/${id}`}>
      <a className={styles.card} style={{ backgroundImage }}>
        <h3>{mission ? mission.name : ''}</h3>
        <h5>{rocket && rocket.name}</h5>
      </a>
    </Link>
  )
}

export default LaunchTile
