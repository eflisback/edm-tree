import { calculateBranchWidth } from './calculateBranchWidth'
import { Genre, Position2D } from './types'

export const computeChildrenPositions = (
  genre: Genre,
  basePosition: Position2D,
  horizontalOffset: number,
): Position2D[] => {
  const globalSpacing = 10
  const childrenWidths = genre.subgenres.map(calculateBranchWidth)
  const totalWidth =
    childrenWidths.reduce((sum, w) => sum + w, 0) + globalSpacing * (genre.subgenres.length - 1)

  let currentY = basePosition.y - totalWidth / 2

  return genre.subgenres.map((_, index) => {
    const childWidth = childrenWidths[index]
    const childY = currentY + childWidth / 2
    currentY += childWidth + globalSpacing
    return { x: basePosition.x + horizontalOffset, y: childY }
  })
}
