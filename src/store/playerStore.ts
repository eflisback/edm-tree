import { create } from 'zustand'
import { Track } from '../components/spotify-player/types'

interface PlayerStore {
  currentTrack: Track | null
  setCurrentTrack: (newValue: Track) => void
  timeMs: number
  setTimeMs: (newValue: number) => void
  isPaused: boolean
  setIsPaused: (newValue: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentTrack: null,
  setCurrentTrack: (newValue) => set({ currentTrack: newValue }),
  timeMs: 0,
  setTimeMs: (newValue) => set({ timeMs: newValue }),
  isPaused: true,
  setIsPaused: (newValue) => set({ isPaused: newValue }),
}))
