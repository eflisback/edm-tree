import { create } from 'zustand'
import { Genre } from '../components/genre-tree/types'
import { getRandomGenre } from '../components/genre-tree/getRandomGenre'
import { edm } from '../components/genre-tree/data'

interface GenreTreeStore {
  selectedGenre: Genre | null
  setSelectedGenre: (newValue: Genre) => void
  randomizeGenre: () => void
}

export const useGenreTreeStore = create<GenreTreeStore>((set) => ({
  selectedGenre: null,
  setSelectedGenre: (newValue) => set({ selectedGenre: newValue }),
  randomizeGenre: () => set({ selectedGenre: getRandomGenre(edm) }),
}))
