import { Genre } from './types'

export const branchContainsGenre = (root: Genre, target: Genre): boolean => {
  if (root.playlistId === target.playlistId) return true
  return root.subgenres.some((sub) => branchContainsGenre(sub, target))
}
