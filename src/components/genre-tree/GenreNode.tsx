import { Text } from '@react-three/drei'
import { Genre, Position2D } from './types'
import { CatmullRomCurve3, Vector3 } from 'three'

interface GenreNodeProps {
  genre: Genre
  position: Position2D
  depth: number
}

const GenreNode = ({ genre, position, depth }: GenreNodeProps) => {
  const horizontalOffset = 150
  const verticalSpacing = 4 ** (3 - depth)

  const childrenPositions: Position2D[] = genre.subgenres.map((_, index) => ({
    x: position.x + horizontalOffset,
    y: position.y + (index - (genre.subgenres.length - 1) / 2) * verticalSpacing,
  }))

  return (
    <>
      <mesh position={[position.x, position.y, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={'white'} />
      </mesh>

      <Text
        fontSize={5}
        color='white'
        anchorX='center'
        anchorY='bottom'
        position={[position.x, position.y + 3, 0]}
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

        return (
          <>
            {/* Render a rounded tube instead of a line */}
            <mesh>
              <tubeGeometry
                args={[curve, 20, 0.5, 5, false]} // segments, radius, radialSegments, closed
              />
              <meshBasicMaterial color='white' />
            </mesh>
            {/* Recursive call for the child node */}
            <GenreNode genre={subgenre} position={childPosition} depth={depth + 1} />
          </>
        )
      })}
    </>
  )
}

export default GenreNode
