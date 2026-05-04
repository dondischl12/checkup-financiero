function Bar({ label, pct, meta, nota, isAhorro }) {
  const metaPct = Math.round(meta * 100)
  const valPct = Math.min(Math.round(pct * 100), 100)
  const ok = isAhorro ? pct >= meta : pct <= meta

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={ok ? 'text-green-600' : 'text-amber-500'}>
          {valPct}% <span className="text-gray-400">/ meta {metaPct}%</span>
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-500 ${ok ? 'bg-green-400' : 'bg-amber-400'}`}
          style={{ width: `${valPct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gray-400 opacity-50"
          style={{ left: `${metaPct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{nota}</p>
    </div>
  )
}

export default function BenchmarkBars({ latest }) {
  if (!latest || !latest.ingreso) return null
  const ingreso = latest.ingreso

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-4">Metas de distribución</p>
      <Bar
        label="Ahorro"
        pct={latest.ahorro / ingreso}
        meta={0.1}
        nota="Meta recomendada: mínimo 10% del ingreso"
        isAhorro={true}
      />
      <Bar
        label="Gastos totales"
        pct={latest.gastos / ingreso}
        meta={0.9}
        nota="Meta recomendada: máximo 90% del ingreso"
        isAhorro={false}
      />
    </div>
  )
}
