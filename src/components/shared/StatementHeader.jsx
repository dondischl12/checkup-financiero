export default function StatementHeader({ eyebrow = 'Reporte educativo privado', title, meta = [] }) {
  return (
    <header className="k-statement flex flex-col gap-4 border-b-2 border-slate-950/90 p-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">{eyebrow}</p>
        <h1 className="k-display mt-1 text-2xl sm:text-3xl">{title}</h1>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-1">
        {meta.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3 text-xs sm:justify-end">
            <dt className="font-bold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="font-bold tabular-nums text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
