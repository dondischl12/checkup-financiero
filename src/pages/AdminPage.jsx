import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ShieldAlert } from 'lucide-react'
import { events } from '../data/events'
import { learningModules } from '../data/learningModules'
import { mockAdminData } from '../data/mockAdminData'
import { getCheckups, readStorage, STORAGE_KEYS } from '../utils/storage'
import { calculateFinancialScore } from '../utils/scoring'

export default function AdminPage() {
  const checkups = getCheckups()
  const requests = readStorage(STORAGE_KEYS.helpRequests, [])
  const learning = readStorage(STORAGE_KEYS.learning, {})
  const interests = readStorage(STORAGE_KEYS.eventInterest, [])
  const scores = checkups.map((entry) => entry.scoreResult?.score || calculateFinancialScore(entry).score)
  const averageScore = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 73
  const completedModules = Object.values(learning).filter((item) => item.completed).length
  const thisMonth = new Date().getMonth() + 1
  const currentMonthCheckups = checkups.filter((entry) => entry.month === thisMonth).length || 89
  const scoreDistribution = scores.length > 2 ? buildDistribution(scores) : mockAdminData.scoreDistribution
  const educationProgress = learningModules.slice(0, 4).map((module, index) => ({
    module: module.title.split(' ')[0],
    completados: learning[module.id]?.completed ? 1 : mockAdminData.educationProgress[index]?.completados || 12,
  }))
  const eventInterest = events.map((event) => ({
    name: event.category,
    value: interests.includes(event.id) ? 1 : Math.max(8, 24 - event.title.length),
  }))

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="shrink-0 text-amber-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-950">Panel para consejo Katalyst</h1>
            <p className="mt-1 leading-7 text-slate-700">
              Este panel muestra métricas agregadas. Los datos financieros individuales permanecen privados.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Card label="Miembros activos" value="128" />
        <Card label="Checkups este mes" value={currentMonthCheckups} />
        <Card label="Score promedio" value={averageScore} />
        <Card label="Módulos completados" value={completedModules || 95} />
        <Card label="Solicitudes de contacto" value={requests.length || 6} />
        <Card label="Interés en eventos" value={interests.length || 44} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Chart title="Distribución de scores">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="personas" fill="#0f172a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Áreas de mayor necesidad">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={mockAdminData.needAreas} dataKey="value" nameKey="name" outerRadius={92} label>
                {mockAdminData.needAreas.map((_, index) => <Cell key={index} fill={['#059669', '#0f172a', '#f59e0b', '#14b8a6'][index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Progreso educativo por módulo">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={educationProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completados" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Interés por eventos">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={eventInterest}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          'Mayor necesidad detectada: Fondo de emergencia',
          'Tema educativo más recomendado: Deuda y credito',
          `${requests.length || 6} personas pidieron contacto con Katalyst`,
          'Mayor interés en eventos: Presupuesto familiar',
        ].map((insight) => (
          <article key={insight} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-bold leading-7 text-slate-900">{insight}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-950">Solicitudes de contacto</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">Nombre</th>
                <th>Email</th>
                <th>Tema</th>
                <th>Mensaje</th>
                <th>Fecha</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(requests.length ? requests : mockRequests).map((request) => (
                <tr key={request.id} className="border-t border-slate-100">
                  <td className="py-3 font-semibold text-slate-900">{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.topic}</td>
                  <td className="max-w-xs truncate">{request.message || 'Sin mensaje'}</td>
                  <td>{new Date(request.createdAt).toLocaleDateString('es-MX')}</td>
                  <td><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{request.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Card({ label, value }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </article>
  )
}

function Chart({ title, children }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-bold text-slate-950">{title}</h2>
      {children}
    </article>
  )
}

function buildDistribution(scores) {
  const buckets = { '0-49': 0, '50-69': 0, '70-84': 0, '85-100': 0 }
  scores.forEach((score) => {
    if (score < 50) buckets['0-49'] += 1
    else if (score < 70) buckets['50-69'] += 1
    else if (score < 85) buckets['70-84'] += 1
    else buckets['85-100'] += 1
  })
  return Object.entries(buckets).map(([range, personas]) => ({ range, personas }))
}

const mockRequests = [
  {
    id: 'mock-1',
    name: 'Daniela Cohen',
    email: 'daniela.demo@katalyst.mx',
    topic: 'Fondo de emergencia',
    message: 'Quiere conocer opciones de acompanamiento.',
    createdAt: '2026-06-01T12:00:00.000Z',
    status: 'nuevo',
  },
  {
    id: 'mock-2',
    name: 'Rafael Levy',
    email: 'rafael.demo@katalyst.mx',
    topic: 'Deuda y credito',
    message: 'Solicita llamada de orientación.',
    createdAt: '2026-06-02T12:00:00.000Z',
    status: 'nuevo',
  },
]
