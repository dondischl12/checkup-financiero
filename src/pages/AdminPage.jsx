import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ShieldAlert } from 'lucide-react'
import { events } from '../data/events'
import { learningModules } from '../data/learningModules'
import { getCheckups, getSnapshotHistory, readStorage, STORAGE_KEYS } from '../utils/storage'

export default function AdminPage() {
  const checkups = getCheckups()
  const snapshots = getSnapshotHistory()
  const requests = readStorage(STORAGE_KEYS.helpRequests, [])
  const learning = readStorage(STORAGE_KEYS.learning, {})
  const interests = readStorage(STORAGE_KEYS.eventInterest, [])
  const scores = snapshots.length ? snapshots.map((entry) => entry.score) : checkups.map((entry) => entry.scoreResult?.score).filter(Boolean)
  const averageScore = scores.length ? Math.round(scores.reduce((sum, item) => sum + item, 0) / scores.length) : 'N/D'
  const completedModules = Object.values(learning).filter((item) => item.completed).length
  const thisMonth = new Date().getMonth() + 1
  const currentMonthCheckups = checkups.filter((entry) => entry.month === thisMonth).length
  const scoreDistribution = buildDistribution(scores)
  const needAreas = buildNeedAreas(snapshots)
  const educationProgress = learningModules.slice(0, 6).map((module) => ({
    module: module.title.split(' ')[0],
    completados: learning[module.id]?.completed ? 1 : 0,
  }))
  const eventInterest = events.map((event) => ({
    name: event.category,
    value: interests.includes(event.id) ? 1 : 0,
  }))

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="shrink-0 text-amber-700" />
          <div>
            <h1 className="text-xl font-bold text-slate-950">Panel de insights · Solo datos agregados</h1>
            <p className="mt-1 leading-7 text-slate-700">
              Este panel muestra únicamente métricas agregadas reales del dispositivo local. No se muestran datos financieros individuales ni series simuladas.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Card label="Snapshots locales" value={snapshots.length} />
        <Card label="Checkups este mes" value={currentMonthCheckups} />
        <Card label="Score promedio" value={averageScore} />
        <Card label="Módulos completados" value={completedModules} />
        <Card label="Solicitudes de contacto" value={requests.length} />
        <Card label="Interés en eventos" value={interests.length} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Chart title="Distribución de scores">
          {scores.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="personas" fill="#0f172a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </Chart>
        <Chart title="Áreas de mayor necesidad">
          {needAreas.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={needAreas} dataKey="value" nameKey="name" outerRadius={92} label>
                  {needAreas.map((_, index) => <Cell key={index} fill={['#059669', '#0f172a', '#f59e0b', '#14b8a6', '#94a3b8'][index % 5]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <EmptyChart />}
        </Chart>
        <Chart title="Progreso educativo por módulo">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={educationProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" />
              <YAxis allowDecimals={false} />
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
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {buildInsights({ snapshots, requests, interests, completedModules }).map((insight) => (
          <article key={insight} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-bold leading-7 text-slate-900">{insight}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-950">Solicitudes de contacto voluntarias</h2>
        {requests.length ? (
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
                {requests.map((request) => (
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
        ) : (
          <p className="rounded-lg bg-slate-50 p-5 text-sm leading-6 text-slate-600">Todavía no hay solicitudes voluntarias de contacto.</p>
        )}
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

function EmptyChart() {
  return (
    <div className="flex h-[260px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm leading-6 text-slate-600">
      Aún no hay datos agregados suficientes. Complete checkups reales para activar esta visualización.
    </div>
  )
}

function buildDistribution(scores) {
  const buckets = { '0-39': 0, '40-59': 0, '60-74': 0, '75-89': 0, '90-100': 0 }
  scores.forEach((score) => {
    if (score < 40) buckets['0-39'] += 1
    else if (score < 60) buckets['40-59'] += 1
    else if (score < 75) buckets['60-74'] += 1
    else if (score < 90) buckets['75-89'] += 1
    else buckets['90-100'] += 1
  })
  return Object.entries(buckets).map(([range, personas]) => ({ range, personas }))
}

function buildNeedAreas(snapshots) {
  const counts = {}
  snapshots.forEach((snapshot) => {
    ;(snapshot.attentionAreas || []).forEach((area) => {
      const key = area.split(';')[0].split('.')[0]
      counts[key] = (counts[key] || 0) + 1
    })
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 5)
}

function buildInsights({ snapshots, requests, interests, completedModules }) {
  const needAreas = buildNeedAreas(snapshots)
  return [
    needAreas[0] ? `Mayor necesidad detectada: ${needAreas[0].name}` : 'Mayor necesidad detectada: sin datos suficientes',
    `Módulos completados localmente: ${completedModules}`,
    `Solicitudes voluntarias de contacto: ${requests.length}`,
    `Eventos marcados con interés: ${interests.length}`,
  ]
}
