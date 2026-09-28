import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Slow, soft animated gradient for the Landing hero only. Lazy-loaded by the caller
// (React.lazy + Suspense, fallback = the page's existing CSS background), so nobody
// pays the three.js/WebGL cost outside the Landing page, and reduced-motion users
// never load this chunk at all.
export default function ShaderHero({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <ShaderGradientCanvas pointerEvents="none" style={{ width: '100%', height: '100%' }}>
        <ShaderGradient
          control="props"
          type="waterPlane"
          animate="on"
          uSpeed={0.08}
          uStrength={1.1}
          uDensity={1.3}
          uFrequency={5.5}
          uAmplitude={0}
          positionY={-0.4}
          positionZ={0}
          rotationX={0}
          rotationY={0}
          rotationZ={40}
          color1="#2f855a"
          color2="#d9a441"
          color3="#e7f0e4"
          reflection={0.1}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={4.2}
          cameraZoom={1}
          lightType="3d"
          brightness={1.1}
          grain="off"
          toggleAxis={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
    </div>
  )
}
