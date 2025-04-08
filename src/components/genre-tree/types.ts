export interface Genre {
  id: string
  title: string
  playlistId: string
  subgenres: Genre[]
}

export interface Position2D {
  x: number
  y: number
}
