import styles from './Footer.module.scss'
import { FaDiceSix, FaList, FaHeart, FaRegHeart } from 'react-icons/fa6'
import { unlikeTrack, likeTrack } from '../../../../components/spotify-player/spotify'
import { useGenreTreeStore } from '../../../../store/genreTreeStore'
import { usePlayerStore } from '../../../../store/playerStore'

const MiscControls = () => {
  const { currentTrack, isCurrentTrackLiked } = usePlayerStore()
  const { selectedGenre, randomizeGenre } = useGenreTreeStore()

  return (
    <section className={styles.miscControls}>
      <button onClick={randomizeGenre} title='Play random genre'>
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
