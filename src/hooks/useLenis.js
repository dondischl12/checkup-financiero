import { useEffect } from 'react'
import Lenis from 'lenis'

// Global smooth scroll. Skipped entirely under prefers-reduced-motion, so nothing
// about page behavior changes for anyone who has asked their OS for less motion.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frameId
    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])
}
