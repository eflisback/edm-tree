import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MOUSE, Vector3 } from 'three'
import { useGenreTreeStore } from '../../../store/genreTreeStore'
import { useNodePositions } from '../../../components/genre-tree/useNodePositions'

const MAX_ZOOM = 3
const MIN_ZOOM = 1
const LERP_SPEED = 0.15
const ZOOM_LERP_SPEED = 0.1

const CameraControls = () => {
  const { camera } = useThree()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)

  const { selectedGenre } = useGenreTreeStore()
  const nodePositions = useNodePositions()

  const reachedTargetPosition = useRef(false)
  const reachedTargetZoom = useRef(false)

  useEffect(() => {
    reachedTargetPosition.current = false
    reachedTargetZoom.current = false
  }, [selectedGenre])

  useFrame(() => {
    if (!selectedGenre || !nodePositions.has(selectedGenre.id) || reachedTargetPosition.current)
      return

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
      reachedTargetPosition.current = true
    }
  })

  useFrame(() => {
    if (!selectedGenre || reachedTargetZoom.current) return

    const currentZoom = camera.zoom
    const targetZoom = MAX_ZOOM
    const newZoom = currentZoom + (targetZoom - currentZoom) * ZOOM_LERP_SPEED

    camera.zoom = newZoom
    camera.updateProjectionMatrix()

    if (Math.abs(newZoom - targetZoom) < 0.01) {
      camera.zoom = targetZoom
      camera.updateProjectionMatrix()
      reachedTargetZoom.current = true
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      maxZoom={MAX_ZOOM}
      minZoom={MIN_ZOOM}
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
