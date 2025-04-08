import { create } from 'zustand'
import { Genre } from '../components/genre-tree/types'

interface GenreTreeStore {
  selectedGenre: Genre | null
  setSelectedGenre: (newValue: Genre) => void
}

export const useGenreTreeStore = create<GenreTreeStore>((set) => ({
  selectedGenre: null,
  setSelectedGenre: (newValue) => set({ selectedGenre: newValue }),
}))
