import { useEffect, useRef } from 'react'

const RUNTIME_SRC = 'https://cdn.unicorn.studio/v1.4.25/unicornStudio.umd.js'

let runtimeLoadPromise = null
function loadUnicornStudioRuntime() {
  if (runtimeLoadPromise) return runtimeLoadPromise
  runtimeLoadPromise = new Promise((resolve, reject) => {
    if (window.UnicornStudio) {
      resolve(window.UnicornStudio)
      return
    }
    const script = document.createElement('script')
    script.src = RUNTIME_SRC
    script.async = true
    script.onload = () => resolve(window.UnicornStudio)
    script.onerror = reject
    document.head.appendChild(script)
  })
  return runtimeLoadPromise
}

/**
 * Embeds a scene exported from unicorn.studio's visual editor. NOT used anywhere
 * yet — there's no exported scene/projectId for this product. Once one exists
 * (design the scene at unicorn.studio, publish it, copy the project id), drop this
 * component in with that id and it lazy-loads the runtime and mounts the scene.
 */
export default function UnicornStudioEmbed({ projectId, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!projectId || !containerRef.current) return
    let cancelled = false
    loadUnicornStudioRuntime().then((UnicornStudio) => {
      if (cancelled || !UnicornStudio) return
      UnicornStudio.addScene({ elementId: containerRef.current.id, projectId })
    })
    return () => {
      cancelled = true
    }
  }, [projectId])

  if (!projectId) return null

  return <div ref={containerRef} id={`unicorn-studio-${projectId}`} className={className} />
}
