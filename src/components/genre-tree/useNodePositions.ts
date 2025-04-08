import { Position2D } from './types'

const nodePositions = new Map<string, Position2D>()

export const useNodePositions = () => nodePositions
