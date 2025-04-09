import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MOUSE, Vector3 } from 'three'
import { useGenreTreeStore } from '../../../store/genreTreeStore'
import { useNodePositions } from '../../../components/genre-tree/useNodePositions'

const LERP_SPEED = 0.15

const CameraControls = () => {
  const { camera } = useThree()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)

  const { selectedGenre } = useGenreTreeStore()
  const nodePositions = useNodePositions()

  const reachedTarget = useRef(false)

  useEffect(() => {
    reachedTarget.current = false
  }, [selectedGenre])

  useFrame(() => {
    if (!selectedGenre || !nodePositions.has(selectedGenre.id) || reachedTarget.current) return

    const target = nodePositions.get(selectedGenre.id)
    if (!target || !controlsRef.current) return

    const camPos = camera.position
    const targetVec = new Vector3(target.x, target.y, camPos.z)

    camPos.lerp(targetVec, LERP_SPEED)

    controlsRef.current.target.lerp(targetVec, LERP_SPEED)
    controlsRef.current.update()

    if (camPos.distanceTo(targetVec) < 0.15) {
      camera.position.copy(targetVec)
      controlsRef.current.target.copy(targetVec)
      controlsRef.current.update()
      reachedTarget.current = true
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      maxZoom={5}
      minZoom={1}
      enableRotate={false}
      autoRotate={false}
      mouseButtons={{
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.PAN,
      }}
    />
  )
}

export default CameraControls
