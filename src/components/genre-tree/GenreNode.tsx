import { Text } from '@react-three/drei'
import { Genre, Position2D } from './types'
import { CatmullRomCurve3, MeshBasicMaterial, Vector3 } from 'three'
import { computeChildrenPositions } from './computeChildrenPositions'
import { Fragment, useEffect, useMemo } from 'react'
import { useGenreTreeStore } from '../../store/genreTreeStore'
import { branchContainsGenre } from './branchContainsGenre'
import { useNodePositions } from './useNodePositions'
import {
  DEFAULT_NODE_COLOR,
  DEFAULT_TEXT_COLOR,
  HIGHLIGHT_NODE_COLOR,
  HIGHLIGHT_TEXT_COLOR,
} from './constants'

interface GenreNodeProps {
  genre: Genre
  position: Position2D
  depth: number
}

const GenreNode = ({ genre, position, depth }: GenreNodeProps) => {
  const { selectedGenre, setSelectedGenre } = useGenreTreeStore()
  const nodePositions = useNodePositions()

  useEffect(() => {
    nodePositions.set(genre.id, position)

    return () => {
      nodePositions.delete(genre.id)
    }
  }, [genre.id, nodePositions, position])

  const isRoot = depth === 0
  const isSelected = selectedGenre === genre

  const horizontalOffset = 225
  const childrenPositions: Position2D[] = computeChildrenPositions(
    genre,
    position,
    horizontalOffset,
  )

  const onPointerDown = async () => {
    setSelectedGenre(genre)
  }

  const textColor = isSelected ? HIGHLIGHT_TEXT_COLOR : DEFAULT_TEXT_COLOR
  const textMaterial = useMemo(() => new MeshBasicMaterial({ color: textColor }), [textColor])

  return (
    <>
      <mesh position={[position.x, position.y, 1]} onPointerDown={onPointerDown}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={isSelected ? HIGHLIGHT_NODE_COLOR : DEFAULT_NODE_COLOR} />
      </mesh>

      <Text
        font='/fonts/Mina-Regular.ttf'
        fontSize={5}
        material={textMaterial}
        anchorX={isRoot ? 'right' : 'center'}
        anchorY={isRoot ? 'middle' : 'bottom'}
        position={[isRoot ? position.x - 5 : position.x, isRoot ? position.y : position.y + 3, 1]}
      >
        {genre.title}
      </Text>

      {genre.subgenres.map((subgenre, index) => {
        const childPosition = childrenPositions[index]

        const highlighted = selectedGenre && branchContainsGenre(subgenre, selectedGenre)

        const curve = new CatmullRomCurve3([
          new Vector3(position.x, position.y, highlighted ? 0.5 : 0),
          new Vector3((position.x + childPosition.x) / 2, childPosition.y, highlighted ? 0.5 : 0),
          new Vector3(childPosition.x, childPosition.y, highlighted ? 0.5 : 0),
        ])

        return (
          <Fragment key={index}>
            <mesh>
              <tubeGeometry args={[curve, 50, 0.5, 5, false]} />
              <meshBasicMaterial
                color={highlighted ? HIGHLIGHT_NODE_COLOR : isRoot ? 'gray' : DEFAULT_NODE_COLOR}
              />
            </mesh>
            <GenreNode genre={subgenre} position={childPosition} depth={depth + 1} />
          </Fragment>
        )
      })}
    </>
  )
}

export default GenreNode
