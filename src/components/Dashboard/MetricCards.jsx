import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

function Card({ label, value, previous }) {
  const delta = previous != null ? value - previous : null
  const pct = previous && previous !== 0 ? Math.round((delta / previous) * 100) : null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-gray-800">${value.toLocaleString('es-MX')}</p>
      {delta !== null && pct !== null && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          {delta > 0 ? <TrendingUp size={13} /> : delta < 0 ? <TrendingDown size={13} /> : <Minus size={13} />}
          {delta > 0 ? '+' : ''}{pct}% vs mes anterior
        </div>
      )}
    </div>
  )
}

export default function MetricCards({ latest, previous }) {
  if (!latest) return null
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card label="Ingreso" value={latest.ingreso} previous={previous?.ingreso} />
      <Card label="Gastos" value={latest.gastos} previous={previous?.gastos} />
      <Card label="Ahorro" value={latest.ahorro} previous={previous?.ahorro} />
    </div>
  )
}
