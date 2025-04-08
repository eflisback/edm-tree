import { Text } from '@react-three/drei'
import { Genre, Position2D } from './types'
import { CatmullRomCurve3, Vector3 } from 'three'
import { computeChildrenPositions } from './computeChildrenPositions'
import { Fragment } from 'react'
import { cameraTargetStore } from '../../pages/home/scene/cameraTargetStore'
import { useGenreTreeStore } from '../../store/genreTreeStore'
import { branchContainsGenre } from './branchContainsGenre'

interface GenreNodeProps {
  genre: Genre
  position: Position2D
  depth: number
}

const GenreNode = ({ genre, position, depth }: GenreNodeProps) => {
  const { selectedGenre, setSelectedGenre } = useGenreTreeStore()

  const horizontalOffset = 200
  const childrenPositions: Position2D[] = computeChildrenPositions(
    genre,
    position,
    horizontalOffset,
  )

  const onPointerDown = async () => {
    cameraTargetStore.value = { x: position.x, y: position.y }
    setSelectedGenre(genre)
  }

  const isRoot = depth === 0

  return (
    <>
      <mesh position={[position.x, position.y, 1]} onPointerDown={onPointerDown}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={genre === selectedGenre ? 'hotpink' : 'white'} />
      </mesh>

      <Text
        fontSize={5}
        color='white'
        anchorX={isRoot ? 'right' : 'center'}
        anchorY={isRoot ? 'middle' : 'bottom'}
        position={[
          isRoot ? position.x - 5 : position.x,
          isRoot ? position.y + 1 : position.y + 4,
          1,
        ]}
      >
        {genre.title}
      </Text>

      {genre.subgenres.map((subgenre, index) => {
        const childPosition = childrenPositions[index]

        const curve = new CatmullRomCurve3([
          new Vector3(position.x, position.y, 0),
          new Vector3((position.x + childPosition.x) / 2, childPosition.y, 0),
          new Vector3(childPosition.x, childPosition.y, 0),
        ])

        const highlighted = selectedGenre && branchContainsGenre(subgenre, selectedGenre)

        return (
          <Fragment key={index}>
            <mesh>
              <tubeGeometry args={[curve, 50, 0.5, 5, false]} />
              <meshBasicMaterial color={highlighted ? 'hotpink' : 'white'} />
            </mesh>
            <GenreNode genre={subgenre} position={childPosition} depth={depth + 1} />
          </Fragment>
        )
      })}
    </>
  )
}

export default GenreNode
