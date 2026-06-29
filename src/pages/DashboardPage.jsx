import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BookOpen, CalendarDays, Mail, RefreshCw } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { generateRecommendations } from '../utils/recommendations'
import { calculateFinancialScore } from '../utils/scoring'
import { getCheckups, getDemoUser, getProfile, readStorage, saveHelpRequest, STORAGE_KEYS } from '../utils/storage'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

export default function DashboardPage() {
  const user = getDemoUser()
  const profile = getProfile()
  const entries = getCheckups()
  const latest = entries[0]
  const [topic, setTopic] = useState('Orientacion general')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const scoreResult = latest?.scoreResult || calculateFinancialScore(latest, profile)
  const recommendations = generateRecommendations(latest, scoreResult, profile)
  const learning = readStorage(STORAGE_KEYS.learning, {})
  const chartEntries = useMemo(() => buildChartEntries(entries, latest, profile), [entries, latest, profile])
  const completedModules = Object.values(learning).filter((item) => item.completed).length
  const totalXp = Object.values(learning).reduce((sum, item) => sum + (item.xp || 0), 0)

  if (!latest) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-100">
        <h1 className="text-3xl font-bold text-slate-950">Aún no tienes checkup</h1>
        <p className="mt-3 text-slate-600">Completa tu primer checkup mensual para activar tu panel privado.</p>
        <Link to="/checkup" className="mt-6 inline-flex rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white">
          Hacer mi checkup
        </Link>
      </div>
    )
  }

  function sendContact(event) {
    event.preventDefault()
    saveHelpRequest({ topic, message, user, profile })
    setSent(true)
    setMessage('')
  }

  const savingsRate = latest.monthlyIncome > 0 ? Math.round((latest.monthlySavings / latest.monthlyIncome) * 100) : 0

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg bg-gradient-to-r from-slate-950 to-emerald-950 p-6 text-white md:flex-row md:items-center">
        <div>
        <p className="text-sm font-semibold text-emerald-200">Panel privado</p>
          <h1 className="mt-2 text-3xl font-bold">Hola, {profile?.fullName || user?.name || 'Liam Demo'}</h1>
          <p className="mt-2 text-slate-300">Objetivo principal: {profile?.goal || 'Crear fondo de emergencia'}</p>
        </div>
        <Link to="/checkup" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
          <RefreshCw size={18} /> Actualizar checkup
        </Link>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Score personal</p>
              <p className="mt-2 text-6xl font-bold text-slate-950">{scoreResult.score}</p>
              <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                {scoreResult.label}
              </span>
            </div>
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={[{ value: scoreResult.score }, { value: 100 - scoreResult.score }]} dataKey="value" innerRadius={40} outerRadius={58} startAngle={90} endAngle={-270}>
                  <Cell fill="#059669" />
                  <Cell fill="#e2e8f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-5 leading-7 text-slate-600">{scoreResult.summary}</p>
        </article>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Metric title="Ingresos mensuales" value={money.format(latest.monthlyIncome)} />
          <Metric title="Gastos mensuales" value={money.format(latest.monthlyExpenses)} />
          <Metric title="Ahorro mensual" value={money.format(latest.monthlySavings)} />
          <Metric title="Tasa de ahorro" value={`${savingsRate}%`} />
          <Metric title="Fondo de emergencia" value={`${latest.emergencyFundMonths} meses`} />
          <Metric title="Estrés financiero" value={`${latest.financialStress}/5`} />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Score en el tiempo" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartEntries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="monthLabel" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area dataKey="score" stroke="#059669" fill="#d1fae5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Ingresos vs gastos" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartEntries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="monthLabel" />
              <YAxis />
              <Tooltip formatter={(value) => money.format(value)} />
              <Bar dataKey="income" fill="#0f172a" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Progreso educativo">
          <div className="flex h-[240px] flex-col justify-center gap-4">
            <p className="text-5xl font-bold text-slate-950">{totalXp} XP</p>
            <p className="text-slate-600">{completedModules} de {learningModules.length} módulos completados</p>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-amber-500" style={{ width: `${(completedModules / learningModules.length) * 100}%` }} />
            </div>
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <BookOpen className="text-emerald-700" size={22} />
            <h2 className="text-xl font-bold text-slate-950">Recomendaciones educativas</h2>
          </div>
          <div className="grid gap-3">
            {recommendations.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600">{item.priority}</span>
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{item.action}</p>
                {item.linkedModuleId && (
                  <Link to={`/learn/${item.linkedModuleId}`} className="mt-3 inline-flex text-sm font-bold text-emerald-700">
                    Ir al módulo
                  </Link>
                )}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-emerald-100 bg-emerald-50 p-6">
          <Mail className="mb-4 text-emerald-700" size={24} />
          <h2 className="text-xl font-bold text-slate-950">Quieres hablar con alguien de Katalyst?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Puedes solicitar orientación confidencial. Tu solicitud se manda con tu nombre y correo para que el equipo pueda contactarte.
          </p>
          <form onSubmit={sendContact} className="mt-5 space-y-3">
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="w-full rounded-lg border border-emerald-100 bg-white px-4 py-3 outline-none">
              {['Orientacion general', 'Fondo de emergencia', 'Deuda y credito', 'Presupuesto', 'Protección familiar'].map((item) => <option key={item}>{item}</option>)}
            </select>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="4" placeholder="Mensaje opcional" className="w-full rounded-lg border border-emerald-100 bg-white px-4 py-3 outline-none" />
            <button className="w-full rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white">Solicitar contacto</button>
            {sent && <p className="text-sm font-semibold text-emerald-800">Solicitud enviada para demo.</p>}
          </form>
        </article>
      </section>
    </div>
  )
}

function Metric({ title, value }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </article>
  )
}

function ChartCard({ title, className = '', children }) {
  return (
    <article className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="mb-4 font-bold text-slate-950">{title}</h2>
      {children}
    </article>
  )
}

function buildChartEntries(entries, latest, profile) {
  if (!latest) return []
  if (entries.length > 1) {
    return entries
      .slice()
      .reverse()
      .map((entry) => ({
        monthLabel: new Date(entry.year, entry.month - 1).toLocaleDateString('es-MX', { month: 'short' }),
        score: entry.scoreResult?.score || calculateFinancialScore(entry, profile).score,
        income: entry.monthlyIncome,
        expenses: entry.monthlyExpenses,
          }))
  }
  return [{
    monthLabel: new Date(latest.createdAt || Date.now()).toLocaleDateString('es-MX', { month: 'short' }),
    score: latest.scoreResult?.score || calculateFinancialScore(latest, profile).score,
    income: latest.monthlyIncome,
    expenses: latest.monthlyExpenses,
  }]
}
