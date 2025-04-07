import { Genre } from './types'

export const calculateBranchWidth = (genre: Genre): number => {
  if (genre.subgenres.length === 0) {
    return 10
  }
  const spacing = 10
  const childrenWidths = genre.subgenres.map(calculateBranchWidth)
  return childrenWidths.reduce((acc, w) => acc + w, 0) + spacing * (genre.subgenres.length - 1)
}
