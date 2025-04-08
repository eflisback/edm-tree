import styles from './Home.module.scss'
import { Canvas } from '@react-three/fiber'
import GenreTree from '../../components/genre-tree/GenreTree'
import CameraControls from './scene/CameraControls'
import useAuthStore from '../../store/authStore'
import { initialize } from '../../components/spotify-player/spotify'
import { useEffect } from 'react'
import Overlay from './overlay/Overlay'

const Home = () => {
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (accessToken) {
      initialize(accessToken)
    }
  }, [accessToken])

  return (
    <div className={styles.container}>
      <Canvas orthographic>
        <GenreTree />
        <CameraControls />
      </Canvas>
      <Overlay />
    </div>
  )
}

export default Home
