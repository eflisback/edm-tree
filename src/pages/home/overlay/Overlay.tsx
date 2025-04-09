import styles from '../Home.module.scss'
import Footer from './footer/Footer'
import Header from './header/Header'

const Overlay = () => {
  return (
    <div className={styles.overlay}>
      <Header />
      <Footer />
    </div>
  )
}

export default Overlay
