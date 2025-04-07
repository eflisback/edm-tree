/* eslint-disable @typescript-eslint/no-explicit-any */
// SpotifyPlayer.tsx
import { useEffect } from 'react'
import useAuthStore from '../../store/authStore'
import { useSpotifyPlayerStore } from '../../store/spotifyPlayerStore'

const SpotifyPlayer = () => {
  const { accessToken } = useAuthStore()
  const { setPlayer, setDeviceId } = useSpotifyPlayerStore()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Player',
        getOAuthToken: (cb: any) => cb(accessToken!),
        volume: 0.5,
      })

      // Add event listeners
      player.addListener('ready', ({ device_id }: any) => {
        console.log('✅ Ready with Device ID', device_id)
        setDeviceId(device_id)
        setPlayer(player)
      })

      player.addListener('player_state_changed', (state: any) => {
        console.log('🎧 Player state:', state)
      })

      // Error listeners (optional)
      player.addListener('initialization_error', ({ message }: any) =>
        console.error('Initialization Error:', message),
      )
      player.addListener('authentication_error', ({ message }: any) =>
        console.error('Auth Error:', message),
      )
      player.addListener('account_error', ({ message }: any) =>
        console.error('Account Error:', message),
      )
      player.addListener('playback_error', ({ message }: any) =>
        console.error('Playback Error:', message),
      )

      player.connect()
    }
  }, [accessToken, setDeviceId, setPlayer])

  return null
}

export default SpotifyPlayer
