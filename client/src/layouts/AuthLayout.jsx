import { Outlet } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, Suspense } from 'react'

function AuthShape({ position, color, size }) {
  const mesh = useRef()
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.z += delta * 0.15
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <torusKnotGeometry args={[size, size * 0.3, 64, 16]} />
        <MeshDistortMaterial color={color} transparent opacity={0.4} distort={0.2} speed={1.5} metalness={0.7} roughness={0.3} />
      </mesh>
    </Float>
  )
}

function AuthScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#c4b5fd" />
        <AuthShape position={[-1, 0.5, -1]} color="#818cf8" size={0.8} />
        <AuthShape position={[1.5, -0.5, -2]} color="#6366f1" size={0.5} />
        <AuthShape position={[0, -1.5, -3]} color="#a78bfa" size={0.4} />
      </Suspense>
    </Canvas>
  )
}

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel with 3D */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <AuthScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 via-primary-700/60 to-primary-900/80" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Manage your team's<br />work, effortlessly.
          </h1>
          <p className="text-lg text-primary-200 max-w-md">
            TaskFlow helps your team organize projects, track tasks, and ship products faster with a beautiful, intuitive interface.
          </p>
          <div className="mt-12 flex gap-8">
            <div><div className="text-3xl font-bold">10k+</div><div className="text-sm text-primary-300">Active Teams</div></div>
            <div><div className="text-3xl font-bold">500k+</div><div className="text-sm text-primary-300">Tasks Completed</div></div>
            <div><div className="text-3xl font-bold">99.9%</div><div className="text-sm text-primary-300">Uptime</div></div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
