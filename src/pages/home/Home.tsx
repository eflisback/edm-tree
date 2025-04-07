import { OrbitControls } from '@react-three/drei'
import styles from './Home.module.scss'
import { Canvas } from '@react-three/fiber'
import GenreTree from '../../components/genre-tree/GenreTree'

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
      <Canvas orthographic>
        <GenreTree />
        <OrbitControls enableRotate={false} />
      </Canvas>
    </div>
  )
}

export default Home
