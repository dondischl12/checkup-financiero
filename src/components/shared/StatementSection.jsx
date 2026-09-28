// Section wrapper for the report: a ruled heading bar with an optional index number,
// so a long single-page statement stays scannable and clearly ordered.
export default function StatementSection({ index, title, subtitle, aside, children }) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-slate-950/85 pb-2">
        <div className="flex min-w-0 items-baseline gap-3">
          {index != null && (
            <span className="text-xs font-bold tabular-nums text-emerald-700">{String(index).padStart(2, '0')}</span>
          )}
          <div className="min-w-0">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-950">{title}</h2>
            {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {aside && <div className="text-xs font-semibold text-slate-500">{aside}</div>}
      </div>
      {children}
    </section>
  )
}
