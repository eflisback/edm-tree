import { usePlayerStore } from '../../store/playerStore'
import { Track, WebPlaybackState } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SpotifyPlayer {
  addListener: (event: string, callback: any) => void
  pause: () => Promise<void>
  resume: () => Promise<void>
  seek: (time: number) => Promise<void>
  getCurrentState: () => Promise<WebPlaybackState | null>
  connect: () => Promise<void>
}

let player: SpotifyPlayer
let accessToken: string
let devideId: string
let initialized = false

const { setCurrentTrack, setIsPaused, setIsLoading, setIsCurrentTrackLiked, setTimeMs } =
  usePlayerStore.getState()

export const initialize = (token: string) => {
  if (initialized) return

  initialized = true

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
      pollPlaybackState()
    })

    // player.addListener('player_state_changed', (state: any) => {
    //   console.log(state)
    // })

    player.connect()
  }
}

export const playTrack = async (track: Track) => {
  setIsLoading(true)
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
  setIsPaused(false)
  setIsLoading(false)

  const isLiked = await isTrackLiked(track)
  setIsCurrentTrackLiked(isLiked)
}

export const seek = async (timeMs: number) => {
  await player.seek(timeMs)
  setTimeMs(timeMs)
}

export const pause = async () => {
  await player.pause()
  setIsPaused(true)
}

export const resume = async () => {
  await player.resume()
  setIsPaused(false)
}

export const getCurrentState = async () => {
  return player.getCurrentState()
}

const isTrackLiked = async (track: Track) => {
  const res = await fetch(`https://api.spotify.com/v1/me/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await res.json()
  const items = data.items as { track: Track }[]
  return items.map((i) => i.track).some((t) => t.id === track.id)
}

export const getRandomTrackFromPlaylist = async (playlistId: string, setLoading: boolean) => {
  if (setLoading) {
    setIsLoading(true)
  }
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

export const likeTrack = async (track: Track) => {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${track.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error liking track: ${errorData.error.message}`)
  } else {
    console.log('Track liked successfully!')
    setIsCurrentTrackLiked(true)
  }
}

export const unlikeTrack = async (track: Track) => {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${track.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error unliking track: ${errorData.error.message}`)
  } else {
    console.log('Track unliked successfully!')
    setIsCurrentTrackLiked(false)
  }
}

let pollingInterval: NodeJS.Timeout | null = null

const pollPlaybackState = () => {
  if (pollingInterval !== null) return

  pollingInterval = setInterval(async () => {
    const state = await getCurrentState()
    if (state) {
      setTimeMs(state.position)
      setIsPaused(state.paused)
    }
  }, 250)
}
