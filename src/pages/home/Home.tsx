import styles from './Home.module.scss'
import { Canvas } from '@react-three/fiber'
import GenreTree from '../../components/genre-tree/GenreTree'
import CameraControls from './scene/CameraControls'
import useAuthStore from '../../store/authStore'
import { initialize } from '../../components/spotify-player/spotify'
import { useEffect } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
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
      <Canvas orthographic camera={{ zoom: 3 }}>
        <GenreTree />
        <EffectComposer>
          <Bloom intensity={0.05} luminanceThreshold={0} luminanceSmoothing={0.5} />
        </EffectComposer>
        <CameraControls />
      </Canvas>
      <Overlay />
    </div>
  )
}

export default Home
