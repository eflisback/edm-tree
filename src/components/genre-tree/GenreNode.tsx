import { Text } from '@react-three/drei'
import { Genre, Position2D } from './types'
import { CatmullRomCurve3, Vector3 } from 'three'
import { computeChildrenPositions } from './computeChildrenPositions'
import { Fragment } from 'react'
import { cameraTargetStore } from '../../pages/home/scene/cameraTargetStore'
import { getRandomTrackFromPlaylist, playTrack } from '../spotify-player/spotify'

interface GenreNodeProps {
  genre: Genre
  position: Position2D
  depth: number
}

const GenreNode = ({ genre, position, depth }: GenreNodeProps) => {
  const horizontalOffset = 200
  const childrenPositions: Position2D[] = computeChildrenPositions(
    genre,
    position,
    horizontalOffset,
  )

  const onPointerDown = async () => {
    console.log(genre.title)
    cameraTargetStore.value = { x: position.x, y: position.y }
    const track = await getRandomTrackFromPlaylist(genre.playlistId)
    await playTrack(track)
  }

  return (
    <>
      <mesh position={[position.x, position.y, 0]} onPointerDown={onPointerDown}>
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
          <Fragment key={index}>
            <mesh>
              <tubeGeometry args={[curve, 20, 0.5, 5, false]} />
              <meshBasicMaterial color='white' />
            </mesh>
            <GenreNode genre={subgenre} position={childPosition} depth={depth + 1} />
          </Fragment>
        )
      })}
    </>
  )
}

export default GenreNode
