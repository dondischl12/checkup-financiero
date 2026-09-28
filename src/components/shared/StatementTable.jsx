export default function StatementTable({ columns, rows, title }) {
  return (
    <div className="k-statement overflow-hidden">
      {title && (
        <p className="border-b border-stone-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p>
      )}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-2 border-slate-950/90 bg-stone-50/70">
            {columns.map((col, index) => (
              <th key={col} className={`px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 ${index > 0 ? 'text-right' : ''}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {rows.map((row, rowIndex) => (
            <tr key={row.key ?? rowIndex}>
              {(row.cells ?? row).map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-4 py-3 tabular-nums ${cellIndex === 0 ? 'font-bold text-slate-700' : 'text-right font-bold text-slate-950'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
