import { Genre } from './types'

export const calculateBranchWidth = (genre: Genre): number => {
  if (genre.subgenres.length === 0) {
    return 15
  }
  const spacing = 15
  const childrenWidths = genre.subgenres.map(calculateBranchWidth)
  return childrenWidths.reduce((acc, w) => acc + w, 0) + spacing * (genre.subgenres.length - 1)
}
