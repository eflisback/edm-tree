export const getRandomTrackFromPlaylist = async (playlistId: string, token: string) => {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  const tracks = data.items
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]
  return randomTrack.track.uri
}
