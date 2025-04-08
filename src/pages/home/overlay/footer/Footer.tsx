import styles from '../../Home.module.scss'
import { usePlayerStore } from '../../../../store/playerStore'

const Footer = () => {
  const { currentTrack } = usePlayerStore()

  return (
    <div className={styles.footer}>
      {currentTrack === null ? (
        <span>Click a genre node to play song</span>
      ) : (
        <>
          <img className={styles.trackImage} src={currentTrack.album.images[2].url} />
          <div className={styles.infoPanel}>
            <span className={styles.name}>{currentTrack.name}</span>
            <span className={styles.artists}>
              {currentTrack.artists.map((a) => a.name).join(', ')}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default Footer
