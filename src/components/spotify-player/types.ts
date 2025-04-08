/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: any
  }
}

export interface WebPlaybackState {
  paused: false
  position: number
}

export interface Album {
  images: {
    width: number
    height: number
    url: string
  }[]
}

export interface Artist {
  name: string
}

export interface Track {
  name: string
  album: Album
  artists: Artist[]
  duration_ms: number
  uri: string
  id: string
}
