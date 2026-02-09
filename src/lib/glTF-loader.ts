/**
 * GLTF Loader Configuration for Next.js
 * This file configures the Three.js GLTFLoader to work properly with Next.js static assets
 * and handles texture loading issues in different environments.
 */

import * as THREE from 'three'

/**
 * Fix material issues in loaded 3D models
 * This ensures proper color space and handles missing textures
 */
export function fixModelMaterials(model: THREE.Group) {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial

      // Set correct color space for textures
      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace
      }
      if (material.roughnessMap) {
        material.roughnessMap.colorSpace = THREE.SRGBColorSpace
      }
      if (material.metalnessMap) {
        material.metalnessMap.colorSpace = THREE.SRGBColorSpace
      }
      if (material.normalMap) {
        material.normalMap.colorSpace = THREE.LinearSRGBColorSpace
      }
      if (material.emissiveMap) {
        material.emissiveMap.colorSpace = THREE.SRGBColorSpace
      }

      // Ensure materials handle missing textures gracefully
      if (!material.map && material.color) {
        // If no texture but has color, use the color
        material.color.setHex(material.color.getHex())
      } else if (!material.map && !material.color) {
        // If no texture and no color, set a default color
        material.color = new THREE.Color(0x8b5cf6)
      }

      // Set reasonable defaults for material properties
      if (typeof material.roughness === 'undefined' || material.roughness === null) {
        material.roughness = 0.5
      }
      if (typeof material.metalness === 'undefined' || material.metalness === null) {
        material.metalness = 0.3
      }

      // Enable shadows
      material.castShadow = true
      material.receiveShadow = true

      // Ensure materials are updated
      material.needsUpdate = true
    }
  })
}

/**
 * Get the correct asset path for 3D models in Next.js
 */
export function getModelPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // In production, this will use the correct base path
  // In development, it will work with the public folder
  return `/${cleanPath}`
}

/**
 * Clean up blob URLs to prevent memory leaks
 */
export function cleanupBlobURLs(model: THREE.Group) {
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material as THREE.Material
      if ('map' in material && material.map) {
        const texture = material.map as THREE.Texture
        if (texture.source?.data instanceof Blob) {
          URL.revokeObjectURL(texture.source.data)
        }
      }
    }
  })
}

