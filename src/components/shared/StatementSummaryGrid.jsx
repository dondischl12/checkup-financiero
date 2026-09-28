export default function StatementSummaryGrid({ items }) {
  return (
    <div className="k-statement grid grid-cols-2 divide-x divide-y divide-stone-200 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
          <p className="mt-2 text-xl font-bold tabular-nums text-slate-950 sm:text-2xl">{item.value}</p>
          {item.note && <p className="mt-1 text-xs font-semibold text-emerald-800">{item.note}</p>}
        </div>
      ))}
    </div>
  )
}
