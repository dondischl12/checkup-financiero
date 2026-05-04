import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export default function TrendChart({ entries }) {
  if (!entries || entries.length === 0) return null

  const data = entries.map((e) => ({
    mes: `${MONTHS[e.month - 1]} ${String(e.year).slice(2)}`,
    Ahorro: e.ahorro,
    Gastos: e.gastos,
  }))

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-4">Historial mensual</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={(v) => `$${v.toLocaleString('es-MX')}`} />
          <Legend />
          <Bar dataKey="Ahorro" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Gastos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
