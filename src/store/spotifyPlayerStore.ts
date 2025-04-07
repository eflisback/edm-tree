/* eslint-disable @typescript-eslint/no-explicit-any */
// spotifyPlayerStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getRandomTrackFromPlaylist } from '../components/spotify-player/getRandomTrackFromPlaylist'
import { playTrack } from '../components/spotify-player/playTrack'

interface SpotifyPlayerState {
  player: any | null
  deviceId: string | null
  isReady: boolean
  setPlayer: (player: any) => void
  setDeviceId: (id: string) => void
  playRandomFromPlaylist: (playlistId: string, accessToken: string) => Promise<void>
}

export const useSpotifyPlayerStore = create<SpotifyPlayerState>()(
  devtools((set, get) => ({
    player: null,
    deviceId: null,
    isReady: false,
    setPlayer: (player) => set({ player, isReady: true }),
    setDeviceId: (deviceId) => set({ deviceId }),
    playRandomFromPlaylist: async (playlistId, accessToken) => {
      const { deviceId } = get()
      if (!deviceId) {
        console.warn('No Spotify device ID available yet')
        return
      }
      const trackUri = await getRandomTrackFromPlaylist(playlistId, accessToken)
      await playTrack(deviceId, trackUri, accessToken)
    },
  })),
)
