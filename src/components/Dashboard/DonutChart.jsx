import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

export default function DonutChart({ latest }) {
  if (!latest) return null

  const ingreso = latest.ingreso || 1
  const gastos = latest.gastos || 0
  const ahorro = latest.ahorro || 0
  const otros = Math.max(0, ingreso - gastos - ahorro)

  const data = [
    { name: 'Gastos', value: gastos },
    { name: 'Ahorro', value: ahorro },
    { name: 'Disponible', value: otros },
  ].filter((d) => d.value > 0)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <p className="text-sm font-semibold text-gray-700 mb-4">Distribución del ingreso</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `$${v.toLocaleString('es-MX')}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
