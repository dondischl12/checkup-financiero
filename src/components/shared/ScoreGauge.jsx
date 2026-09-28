import { motion } from 'framer-motion'
import { getLevel } from '../../lib/financialCalculations'

const CX = 120
const CY = 120
const R = 100
const STROKE = 16

function polarToCartesian(angleDeg, radius = R) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY - radius * Math.sin(rad) }
}

// Semicircular gauge track from 180deg (left) to 0deg (right), sweeping over the top —
// same shape language as a speedometer, but the fill is a single brand gradient
// (never red/amber/green) so the number never reads as pass/fail.
function arcPath(startAngle, endAngle) {
  const start = polarToCartesian(startAngle)
  const end = polarToCartesian(endAngle)
  const largeArc = startAngle - endAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

const TRACK_PATH = arcPath(180, 0)

const TICKS = [0, 25, 50, 75, 100].map((pct) => {
  const angle = 180 - (pct / 100) * 180
  return {
    pct,
    outer: polarToCartesian(angle, R + STROKE / 2 + 3),
    inner: polarToCartesian(angle, R - 11),
  }
})

export default function ScoreGauge({ score = 0, hasData = true, className = 'w-56' }) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0))
  const fraction = hasData ? clamped / 100 : 0
  const level = getLevel(hasData ? clamped : 0)

  return (
    <div className={className}>
      <svg viewBox="0 0 240 132" className="w-full" role="img" aria-label={hasData ? `Score ${Math.round(clamped)} de 100, ${level.label}` : 'Aún sin datos suficientes'}>
        <defs>
          <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--katalyst-sage-strong)" />
            <stop offset="100%" stopColor="var(--katalyst-gold)" />
          </linearGradient>
        </defs>
        <path d={TRACK_PATH} stroke="#edf1e8" strokeWidth={STROKE} strokeLinecap="round" fill="none" />
        {TICKS.map((tick) => (
          <line key={tick.pct} x1={tick.inner.x} y1={tick.inner.y} x2={tick.outer.x} y2={tick.outer.y} stroke="#c7cec2" strokeWidth={2} strokeLinecap="round" />
        ))}
        <motion.path
          d={TRACK_PATH}
          stroke="url(#scoreGaugeGradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: fraction }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="-mt-2 text-center">
        <p className="text-4xl font-bold text-slate-950 sm:text-5xl">
          {hasData ? Math.round(clamped) : '—'}
          <span className="ml-1 text-base font-bold text-slate-500">/100</span>
        </p>
        <p className="mt-1 font-bold text-emerald-800">{hasData ? level.label : 'Aún sin datos'}</p>
      </div>
    </div>
  )
}
