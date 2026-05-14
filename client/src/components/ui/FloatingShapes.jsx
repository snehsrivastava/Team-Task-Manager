import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import { useRef, Suspense } from 'react'

function Shape({ position, color, speed = 1, size = 1, type = 'torus' }) {
  const mesh = useRef()

  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * speed * 0.3
    mesh.current.rotation.y += delta * speed * 0.4
  })

  const geometries = {
    torus: <torusGeometry args={[size, size * 0.35, 16, 32]} />,
    icosahedron: <icosahedronGeometry args={[size, 0]} />,
    octahedron: <octahedronGeometry args={[size, 0]} />,
    torusKnot: <torusKnotGeometry args={[size * 0.6, size * 0.2, 64, 16]} />,
    sphere: <sphereGeometry args={[size, 32, 32]} />,
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position}>
        {geometries[type]}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.55}
          distort={0.25}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function GlowSphere({ position, color, size }) {
  const mesh = useRef()

  useFrame((state) => {
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <MeshWobbleMaterial
        color={color}
        transparent
        opacity={0.3}
        factor={0.4}
        speed={1}
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#c4b5fd" />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#818cf8" />

          <Shape position={[-3.5, 1.5, -2]} color="#818cf8" speed={1.2} size={0.7} type="torus" />
          <Shape position={[3.5, -1, -1.5]} color="#6366f1" speed={0.9} size={0.55} type="icosahedron" />
          <Shape position={[0.5, 2.5, -3]} color="#a78bfa" speed={0.7} size={0.45} type="octahedron" />
          <Shape position={[-2, -2, -2.5]} color="#c4b5fd" speed={1} size={0.35} type="torusKnot" />
          <Shape position={[2.5, 1.8, -4]} color="#4f46e5" speed={0.6} size={0.6} type="torus" />

          <GlowSphere position={[-4, 0, -5]} color="#6366f1" size={1.2} />
          <GlowSphere position={[4, -2, -6]} color="#a855f7" size={1.5} />
          <GlowSphere position={[0, 3, -7]} color="#818cf8" size={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}
