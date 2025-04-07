import styles from './Home.module.scss'
import { Canvas } from '@react-three/fiber'
import GenreTree from '../../components/genre-tree/GenreTree'
import CameraControls from './scene/CameraControls'
import SpotifyPlayer from '../../components/spotify-player/SpotifyPlayer'

const Overlay = () => {
  return (
    <div className={styles.overlay}>
      <span>yo</span>
    </div>
  )
}

const Home = () => {
  return (
    <div className={styles.container}>
      <Overlay />
      <SpotifyPlayer />
      <Canvas orthographic>
        <GenreTree />
        <CameraControls />
      </Canvas>
    </div>
  )
}

export default Home
