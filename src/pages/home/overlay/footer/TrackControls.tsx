import { Slider } from '@mui/material'
import { FaBackwardStep, FaPlay, FaPause, FaForwardStep } from 'react-icons/fa6'
import {
  seek,
  resume,
  pause,
  getRandomTrackFromPlaylist,
  playTrack,
} from '../../../../components/spotify-player/spotify'
import { usePlayerStore } from '../../../../store/playerStore'
import styles from './Footer.module.scss'
import { formatDuration } from './formatDuration'
import { useGenreTreeStore } from '../../../../store/genreTreeStore'
import { useKey } from 'react-use'

const areControlsDisabledNow = () => {
  const { isLoading, currentTrack } = usePlayerStore.getState()
  return isLoading || !currentTrack
}

const isPausedNow = () => {
  const { isPaused } = usePlayerStore.getState()
  return isPaused
}

const TrackControls = () => {
  const { isLoading, isPaused, timeMs, currentTrack } = usePlayerStore()
  const { selectedGenre } = useGenreTreeStore()

  const togglePause = () => (isPausedNow() ? resume() : pause())

  useKey(' ', () => {
    if (!areControlsDisabledNow()) {
      togglePause()
    }
  })

  const controlsDisabled = areControlsDisabledNow()

  return (
    <section className={styles.trackControls}>
      <div className={styles.topRow}>
        <span className={styles.timeLabel}>
          {isLoading || !currentTrack ? '--/--' : formatDuration(timeMs / 1000)}
        </span>
        <div className={styles.buttons}>
          <button onClick={() => seek(0)} title='Restart' disabled={controlsDisabled}>
            <FaBackwardStep />
          </button>
          <button onClick={togglePause} disabled={controlsDisabled}>
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
          <button
            onClick={async () => {
              const newTrack = await getRandomTrackFromPlaylist(selectedGenre!.playlistId, true)
              playTrack(newTrack)
            }}
            disabled={controlsDisabled}
            title='Next song'
          >
            <FaForwardStep />
          </button>
        </div>
        <span className={styles.timeLabel}>
          {isLoading || !currentTrack ? '--/--' : formatDuration(currentTrack.duration_ms / 1000)}
        </span>
      </div>
      <Slider
        aria-label='time-indicator'
        size='small'
        min={0}
        max={currentTrack ? currentTrack.duration_ms / 1000 : 100}
        step={1}
        disabled={controlsDisabled}
        value={isLoading ? 0 : timeMs / 1000}
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
  )
}

export default TrackControls
