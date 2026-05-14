import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Text3D, Center } from '@react-three/drei'
import { useRef, Suspense } from 'react'

function Floating404() {
  const mesh = useRef()
  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.3
    mesh.current.rotation.x += delta * 0.1
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          transparent
          opacity={0.5}
          distort={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-950 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#a78bfa" />
            <Floating404 />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="text-[10rem] font-extrabold gradient-text leading-none mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          404
        </motion.div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          Page not found
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
