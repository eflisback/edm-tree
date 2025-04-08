import { usePlayerStore } from '../../store/playerStore'
import { Track } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SpotifyPlayer {
  addListener: (event: string, callback: any) => void
  pause: () => Promise<void>
  resume: () => Promise<void>
  seek: (time: number) => Promise<void>
  connect: () => Promise<void>
}

let player: SpotifyPlayer
let accessToken: string
let devideId: string
let initialized = false

const { setCurrentTrack, setIsPaused } = usePlayerStore.getState()

export const initialize = (token: string) => {
  if (initialized) return

  initialized = true

  console.log('Wow!')

  accessToken = token
  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  script.async = true
  document.body.appendChild(script)

  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new window.Spotify.Player({
      name: 'EDM Tree Spotify Player',
      getOAuthToken: (cb: any) => cb(accessToken),
      volume: 0.5,
    })

    if (player === null) {
      throw new Error('Player is null')
    }

    player.addListener('ready', ({ device_id }: { device_id: string }) => {
      devideId = device_id
      console.log('Spotify Player ready with device id: ', device_id)
    })

    player.connect()
  }
}

export const playTrack = async (track: Track) => {
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${devideId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: [track.uri],
    }),
  })
  setCurrentTrack(track)
}

export const pause = async () => {
  await player.pause()
  setIsPaused(true)
}

export const resume = async () => {
  await player.resume()
  setIsPaused(false)
}

export const getRandomTrackFromPlaylist = async (playlistId: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await res.json()
  const items = data.items as { track: Track }[]
  const tracks = items.map((i) => i.track)
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
  return randomTrack
}
