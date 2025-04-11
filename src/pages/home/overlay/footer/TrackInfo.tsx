import styles from './Footer.module.scss'
import { Skeleton } from '@mui/material'
import { usePlayerStore } from '../../../../store/playerStore'
import { Fragment } from 'react'

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
            <a href={`https://open.spotify.com/track/${currentTrack.id}`} target='_blank'>
              <img className={styles.trackImage} src={currentTrack.album.images[2].url} />
            </a>
          ) : (
            <div className={styles.placeholderImage}>?</div>
          )}
          <div className={styles.infoPanel}>
            {currentTrack ? (
              <a
                className={styles.name}
                href={`https://open.spotify.com/track/${currentTrack.id}`}
                target='_blank'
              >
                {currentTrack.name}
              </a>
            ) : (
              <span className={styles.name}>Waiting for genre...</span>
            )}
            <span className={styles.artists}>
              {currentTrack
                ? currentTrack.artists.map((a, i) => (
                    <Fragment key={i}>
                      <a href={`https://open.spotify.com/artist/${a.id}`} target='_blank'>
                        {a.name}
                      </a>
                      {i === currentTrack.artists.length - 1 ? '' : ', '}
                    </Fragment>
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
