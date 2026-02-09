'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, Grid } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { fixModelMaterials, cleanupBlobURLs } from '@/lib/glTF-loader'

interface ModelProps {
  url: string
  scale?: number
  onLoaded?: () => void
  onError?: (error: Error) => void
}

function Model({ url, scale = 1, onLoaded, onError }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null)
  const [loadError, setLoadError] = useState<Error | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load the GLTF model with error handling
  const gltf = useGLTF(url, undefined, (error) => {
    console.error('GLTF loading error:', error)
    setLoadError(error as Error)
    onError?.(error as Error)
  })

  // Fix texture and material issues after model loads
  useEffect(() => {
    if (gltf && gltf.scene && !isLoaded) {
      try {
        // Fix all materials in the model
        fixModelMaterials(gltf.scene)

        setIsLoaded(true)
        onLoaded?.()
      } catch (error) {
        console.error('Error processing model:', error)
        setTimeout(() => {
          setLoadError(error as Error)
          onError?.(error as Error)
        }, 0)
      }
    }

    // Cleanup blob URLs on unmount
    return () => {
      if (modelRef.current) {
        cleanupBlobURLs(modelRef.current)
      }
    }
  }, [gltf, isLoaded, onLoaded, onError])

  if (loadError) {
    // Show fallback geometry when loading fails
    return (
      <group scale={scale}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.5}
            metalness={0.3}
            wireframe
          />
        </mesh>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </group>
    )
  }

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={scale}
      position={[0, 0, 0]}
    />
  )
}

interface Model3DViewerProps {
  modelUrl: string
  scale?: number
  className?: string
}

export default function Model3DViewer({ modelUrl, scale = 1, className = '' }: Model3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoaded = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={`relative w-full h-full min-h-[500px] ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <hemisphereLight args={['#ffffff', '#444444', 0.3]} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Ground/Grid */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#8b5cf6"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#06b6d4"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />

        {/* 3D Model with error handling */}
        <Suspense fallback={null}>
          <Model
            url={modelUrl}
            scale={scale}
            onLoaded={handleLoaded}
            onError={handleError}
          />
        </Suspense>

        {/* Orbit Controls for interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-300 text-sm">Loading 3D Model...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
          <div className="text-center max-w-md p-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-2">Texture Loading Issue</h3>
            <p className="text-gray-400 text-sm mb-4">
              Some textures failed to load. The model is shown with default materials.
              This is a known issue with blob URL handling in certain environments.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Instructions overlay */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 sm:bottom-6 left-2 sm:left-4 right-2 sm:right-4 bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-300 z-20 shadow-xl">
          <p className="text-center text-xs sm:text-sm leading-tight sm:leading-normal">
            <span className="text-cyan-400 font-semibold">🖱️</span>
            <span className="ml-1 sm:ml-2">Drag to rotate • Scroll to zoom • Right-click to pan</span>
          </p>
        </div>
      )}
    </div>
  )
}
