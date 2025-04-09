import styles from './Footer.module.scss'
import TrackInfo from './TrackInfo'
import TrackControls from './TrackControls'
import MiscControls from './MiscControls'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <TrackInfo />
      <TrackControls />
      <MiscControls />
    </footer>
  )
}

export default Footer
