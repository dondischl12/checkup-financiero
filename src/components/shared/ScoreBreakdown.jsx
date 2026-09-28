import { PILLAR_META, pillarTier } from '../../lib/financialCalculations'

// Per-pillar detail behind the headline score. Bars use the same single brand
// gradient as the gauge (never red/amber/green), and every row states its weight
// so the number is always explainable rather than a verdict.
export default function ScoreBreakdown({ subscores = {}, weights = {} }) {
  const keys = Object.keys(weights).sort((a, b) => weights[b] - weights[a])

  return (
    <div className="k-statement divide-y divide-stone-200">
      {keys.map((key) => {
        const value = Math.round(subscores[key] ?? 0)
        const meta = PILLAR_META[key]
        return (
          <div key={key} className="flex items-center gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-sm font-bold text-slate-900">{meta?.label || key}</p>
                <p className="shrink-0 text-xs font-semibold tabular-nums text-slate-400">
                  peso {Math.round(weights[key])}%
                </p>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${value}%`,
                    background: 'linear-gradient(90deg, var(--katalyst-sage-strong), var(--katalyst-gold))',
                  }}
                />
              </div>
              {meta?.copy && <p className="mt-1 hidden text-xs leading-5 text-slate-500 sm:block">{meta.copy}</p>}
            </div>
            <div className="w-24 shrink-0 text-right">
              <p className="text-lg font-bold tabular-nums leading-none text-slate-950">{value}</p>
              <p className="mt-1 text-[11px] font-semibold leading-tight text-slate-500">{pillarTier(value)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
