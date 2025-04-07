import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { cameraTargetStore } from './cameraTargetStore'
import { Vector3 } from 'three'

const LERP_SPEED = 0.15

const CameraControls = () => {
  const { camera } = useThree()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)

  useFrame(() => {
    const target = cameraTargetStore.value
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
      cameraTargetStore.value = null
    }
  })

  return <OrbitControls ref={controlsRef} enableRotate={false} autoRotate={false} />
}

export default CameraControls
