import { Skeleton } from '@mui/material'
import styles from './Footer.module.scss'
import { usePlayerStore } from '../../../../store/playerStore'

const TrackInfo = () => {
  const { isLoading, currentTrack } = usePlayerStore()

  return (
    <section className={styles.trackInfo}>
      {isLoading ? (
        <>
          <Skeleton animation='wave' variant='rectangular' width={60} height={60} />
          <div className={styles.infoPanel}>
            <Skeleton animation='wave' variant='text' sx={{ fontSize: '2rem' }} width={150} />
            <Skeleton animation='wave' variant='text' sx={{ fontSize: '1.4rem' }} width={150} />
          </div>
        </>
      ) : (
        <>
          {currentTrack ? (
            <img className={styles.trackImage} src={currentTrack.album.images[2].url} />
          ) : (
            <div className={styles.placeholderImage}>?</div>
          )}

          <div className={styles.infoPanel}>
            <span className={styles.name}>
              {currentTrack ? currentTrack.name : 'Waiting for genre...'}
            </span>
            <span className={styles.artists}>
              {currentTrack
                ? currentTrack.artists.map((a, i) => (
                    <>
                      <a href={`https://open.spotify.com/artist/${a.id}`} target='_blank'>
                        {a.name}
                      </a>
                      {i === currentTrack.artists.length - 1 ? '' : ', '}
                    </>
                  ))
                : 'Select one in the tree!'}
            </span>
          </div>
        </>
      )}
    </section>
  )
}

export default TrackInfo
