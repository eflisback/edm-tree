import { useEffect } from 'react'
import { edm } from './data'
import GenreNode from './GenreNode'
import { getRandomTrackFromPlaylist, playTrack } from '../spotify-player/spotify'
import { useGenreTreeStore } from '../../store/genreTreeStore'

const GenreTree = () => {
  const { selectedGenre } = useGenreTreeStore()

  useEffect(() => {
    if (!selectedGenre) return

    const playRandomTrack = async () => {
      const track = await getRandomTrackFromPlaylist(selectedGenre.playlistId, true)
      await playTrack(track)
    }

    playRandomTrack()
  }, [selectedGenre])

  return <GenreNode genre={edm} position={{ x: 0, y: 0 }} depth={0} />
}

export default GenreTree
