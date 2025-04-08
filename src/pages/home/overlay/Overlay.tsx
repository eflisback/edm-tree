import styles from '../Home.module.scss'
import Footer from './footer/Footer'

const Overlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.header}>temp header</div>
      <Footer />
    </div>
  )
}

export default Overlay
