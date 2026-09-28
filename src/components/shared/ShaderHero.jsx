import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Ambient color wash behind the Landing hero.
//
// The raw shader renders a finite plane, so at normal scale you can see its edges and
// it reads as a floating slab/cube. We deliberately oversize it, blur it heavily and
// fade it out with a radial mask, so what's left is soft atmospheric color with no
// recognizable geometry — the effect belongs to the page, not to an object on it.
//
// Lazy-loaded by the caller (React.lazy + Suspense) and skipped entirely under
// prefers-reduced-motion, so the three.js payload only ever loads on Landing.
const softenStyle = {
  filter: 'blur(64px) saturate(1.2)',
  maskImage: 'radial-gradient(ellipse 72% 68% at 50% 42%, #000 30%, transparent 76%)',
  WebkitMaskImage: 'radial-gradient(ellipse 72% 68% at 50% 42%, #000 30%, transparent 76%)',
  transform: 'scale(1.35)',
}

export default function ShaderHero({ className = '' }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <div className="h-full w-full" style={softenStyle}>
        <ShaderGradientCanvas pointerEvents="none" style={{ width: '100%', height: '100%' }}>
          <ShaderGradient
            control="props"
            type="waterPlane"
            animate="on"
            uSpeed={0.06}
            uStrength={1.6}
            uDensity={1.2}
            uFrequency={5.5}
            uAmplitude={0}
            positionX={0}
            positionY={0}
            positionZ={0}
            rotationX={45}
            rotationY={0}
            rotationZ={-60}
            color1="#2f855a"
            color2="#d9a441"
            color3="#f4f7ef"
            reflection={0.1}
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.4}
            cameraZoom={9.1}
            lightType="3d"
            brightness={1.2}
            grain="off"
            toggleAxis={false}
            zoomOut={false}
          />
        </ShaderGradientCanvas>
      </div>
    </div>
  )
}
