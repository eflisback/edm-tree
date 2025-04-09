import styles from './Footer.module.scss'
import { usePlayerStore } from '../../../../store/playerStore'
import {
  FaBackwardStep,
  FaDiceSix,
  FaForwardStep,
  FaHeart,
  FaList,
  FaPause,
  FaPlay,
  FaRegHeart,
} from 'react-icons/fa6'
import { Slider } from '@mui/material'
import { formatDuration } from './formatDuration'
import {
  getRandomTrackFromPlaylist,
  likeTrack,
  pause,
  playTrack,
  resume,
  seek,
  unlikeTrack,
} from '../../../../components/spotify-player/spotify'
import { useGenreTreeStore } from '../../../../store/genreTreeStore'

const Footer = () => {
  const { timeMs, currentTrack, isCurrentTrackLiked, isPaused } = usePlayerStore()
  const { selectedGenre, randomizeGenre } = useGenreTreeStore()

  return (
    <div className={styles.footer}>
      {currentTrack === null ? (
        <span>Click a genre node to play song</span>
      ) : (
        <>
          <section className={styles.trackInfo}>
            <img className={styles.trackImage} src={currentTrack.album.images[2].url} />
            <div className={styles.infoPanel}>
              <span className={styles.name}>{currentTrack.name}</span>
              <span className={styles.artists}>
                {currentTrack.artists.map((a) => a.name).join(', ')}
              </span>
            </div>
          </section>
          <section className={styles.trackControls}>
            <div className={styles.topRow}>
              <span className={styles.timeLabel}>{formatDuration(timeMs / 1000)}</span>
              <div className={styles.buttons}>
                <button onClick={() => seek(0)} title='Restart'>
                  <FaBackwardStep />
                </button>
                <button onClick={isPaused ? resume : pause}>
                  {isPaused ? <FaPlay /> : <FaPause />}
                </button>
                <button
                  onClick={async () => {
                    const newTrack = await getRandomTrackFromPlaylist(selectedGenre!.playlistId)
                    playTrack(newTrack)
                  }}
                  title='Next song'
                >
                  <FaForwardStep />
                </button>
              </div>
              <span className={styles.timeLabel}>
                {formatDuration(currentTrack.duration_ms / 1000)}
              </span>
            </div>
            <Slider
              aria-label='time-indicator'
              size='small'
              min={0}
              max={currentTrack.duration_ms / 1000}
              step={1}
              value={timeMs / 1000}
              onChange={(_, value) => {
                seek(value * 1000)
              }}
              sx={(t) => ({
                color: 'rgba(255, 255, 255, 0.87)',
                height: 3,
                padding: 0,
                '& .MuiSlider-thumb': {
                  width: 7,
                  height: 7,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&::before': {
                    boxShadow: '0 2px 7px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 3px ${'rgb(0 0 0 / 16%)'}`,
                    ...t.applyStyles('dark', {
                      boxShadow: `0px 0px 0px 3px ${'rgb(255 255 255 / 16%)'}`,
                    }),
                  },
                  '&.Mui-active': {
                    width: 9,
                    height: 9,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
                ...t.applyStyles('dark', {
                  color: '#fff',
                }),
              })}
            />
          </section>
          <section className={styles.miscControls}>
            <button onClick={randomizeGenre} title='Play random genre'>
              <FaDiceSix />
            </button>
            <a
              href={`https://open.spotify.com/playlist/${selectedGenre!.playlistId}`}
              target='_blank'
              title='View playlist'
            >
              <FaList />
            </a>
            <button title={isCurrentTrackLiked ? 'Unlike track' : 'Like track'}>
              {isCurrentTrackLiked ? (
                <FaHeart onClick={() => unlikeTrack(currentTrack)} />
              ) : (
                <FaRegHeart onClick={() => likeTrack(currentTrack)} />
              )}
            </button>
          </section>
        </>
      )}
    </div>
  )
}

export default Footer
