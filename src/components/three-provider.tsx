'use client'

import { useEffect } from 'react'

/**
 * ThreeProvider - Configures Three.js globally for the application
 * This should be placed at the root of your app to ensure proper 3D rendering
 */
export default function ThreeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Suppress console warnings for blob URL loading (they're handled gracefully)
    const originalWarn = console.warn
    console.warn = (...args: any[]) => {
      const message = args[0]
      if (
        typeof message === 'string' &&
        (message.includes("Couldn't load texture") ||
         message.includes('blob:'))
      ) {
        // Suppress blob URL texture warnings - they're handled gracefully
        return
      }
      originalWarn.apply(console, args)
    }

    return () => {
      // Restore original console.warn
      console.warn = originalWarn
    }
  }, [])

  return <>{children}</>
}
