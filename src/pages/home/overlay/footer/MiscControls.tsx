import styles from './Footer.module.scss'
import { FaDiceSix, FaList, FaHeart, FaRegHeart } from 'react-icons/fa6'
import { unlikeTrack, likeTrack, pause } from '../../../../components/spotify-player/spotify'
import { useGenreTreeStore } from '../../../../store/genreTreeStore'
import { usePlayerStore } from '../../../../store/playerStore'

const MiscControls = () => {
  const { currentTrack, isLoading, isCurrentTrackLiked } = usePlayerStore()
  const { selectedGenre, randomizeGenre } = useGenreTreeStore()

  return (
    <section className={styles.miscControls}>
      <button
        onClick={() => {
          pause()
          randomizeGenre()
        }}
        title='Play random genre'
        disabled={isLoading}
      >
        <FaDiceSix />
      </button>
      {currentTrack && selectedGenre ? (
        <>
          <a
            href={`https://open.spotify.com/playlist/${selectedGenre.playlistId}`}
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
        </>
      ) : (
        ''
      )}
    </section>
  )
}

export default MiscControls
