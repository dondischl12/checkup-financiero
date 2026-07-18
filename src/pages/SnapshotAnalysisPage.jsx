import { Link } from 'react-router-dom'
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowLeft, Home, PiggyBank, Scale, ShieldCheck, TrendingUp, UserRound } from 'lucide-react'
import { getLastSnapshot, getSnapshotHistory } from '../utils/storage'
import { BENCHMARKS } from '../lib/financialCalculations'
import { betaPrivacyCopy, betaReviewCopy } from '../lib/betaCopy'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
export default function SnapshotAnalysisPage() {
  const snapshot = getLastSnapshot()
  if (!snapshot) return <EmptyState />
  const history = getSnapshotHistory()
  const metrics = snapshot.derivedMetrics
  const profile = snapshot.answers
  const series = buildSeries(history)

  return (
    <div className="k-page k-scenic-page">
      <Link to="/snapshot" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800"><ArrowLeft size={16} /> Volver al snapshot</Link>
      <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <h1 className="k-display text-3xl sm:text-4xl md:text-5xl">Análisis detallado de su snapshot</h1>
          <p className="k-copy mt-3 max-w-3xl text-lg">Profundizamos en sus datos para comparar ratios con guías recomendadas y convertirlos en acciones concretas.</p>
        </div>
        <div className="k-soft-card p-5 text-sm font-bold text-emerald-900">
          Solo usted ve este análisis individual. {betaPrivacyCopy} {betaReviewCopy}
        </div>
      </section>

      <section className="k-card px-5 py-3 text-sm text-slate-600">
        <b className="text-slate-950">Perfil del hogar:</b> {profile.age || 'N/D'} años / {profile.dependents_count || 0} dependientes / hogar de {profile.household_size || 'N/D'} / {profile.employment_status || 'situación laboral no capturada'} / MXN
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="k-card p-6">
          <h2 className="mb-4 font-bold text-slate-950">Distribución de gastos</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={metrics.categoryDistribution} dataKey="value" innerRadius={72} outerRadius={108}>
                {metrics.categoryDistribution.map((item) => <Cell key={item.name} fill={item.color} />)}
              </Pie>
              <Tooltip formatter={(value) => money.format(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid gap-2">
            {metrics.categoryDistribution.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="font-bold text-slate-700">{item.name}</span>
                <span>{Math.round(item.percent * 100)}% / {money.format(item.value)}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="k-card p-6">
          <h2 className="mb-4 font-bold text-slate-950">Ingresos vs gastos mensuales</h2>
          {series.length > 1 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={series}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => money.format(value)} />
                <Line type="monotone" dataKey="Ingresos" stroke="#2f855a" strokeWidth={3} />
                <Line type="monotone" dataKey="Gastos" stroke="#0f172a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="relative flex h-[320px] flex-col justify-between overflow-hidden rounded-lg bg-[#f4f7ef] p-6">
              <div className="k-landscape opacity-35" />
              <div className="relative z-10">
                <span className="k-icon-tile"><UserRound size={22} /></span>
                <p className="mt-4 text-2xl font-bold text-slate-950">Active su historial financiero</p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                  Al crear una cuenta opcional, podrá comparar ingresos, gastos y score en el tiempo. En modo invitado, este análisis se mantiene como snapshot privado de una sola ocasión.
                </p>
              </div>
              <div className="relative z-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white/90 p-4"><p className="text-sm text-slate-500">Ingresos actuales</p><p className="text-xl font-bold">{money.format(metrics.monthlyIncome)}</p></div>
                <div className="rounded-lg bg-white/90 p-4"><p className="text-sm text-slate-500">Gastos actuales</p><p className="text-xl font-bold">{money.format(metrics.monthlyExpenses)}</p></div>
              </div>
            </div>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Ratio icon={<Scale />} title="Deuda no hipotecaria / ingresos" value={`${Math.round(metrics.debtToIncome * 100)}%`} target={`Objetivo: ${BENCHMARKS.debtToIncome.label}`} pass={BENCHMARKS.debtToIncome.pass(metrics.debtToIncome)} />
        <Ratio icon={<PiggyBank />} title="Tasa de ahorro" value={`${Math.round(metrics.savingsRate * 100)}%`} target={`Objetivo: ${BENCHMARKS.savingsRate.label}`} pass={BENCHMARKS.savingsRate.pass(metrics.savingsRate)} />
        <Ratio icon={<ShieldCheck />} title="Fondo de emergencia" value={`${metrics.emergencyMonths.toFixed(1)} meses`} target={`Rango ideal: ${BENCHMARKS.emergencyMonths.label}`} pass={BENCHMARKS.emergencyMonths.pass(metrics.emergencyMonths)} />
        <Ratio icon={<Home />} title="Gasto en vivienda" value={`${Math.round(metrics.housingRatio * 100)}%`} target={`Objetivo: ${BENCHMARKS.housingRatio.label}`} pass={BENCHMARKS.housingRatio.pass(metrics.housingRatio)} />
        <Ratio icon={<TrendingUp />} title="Flujo mensual neto" value={money.format(metrics.netFlow)} target="Ingresos − gastos" pass={metrics.netFlow >= 0} />
      </section>

      <section className="k-card p-6">
        <h2 className="mb-4 font-bold text-slate-950">Normalización de datos anuales y one-time</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <AnnualCard label="Ingresos recurrentes mensuales" value={money.format(metrics.recurringMonthlyIncome)} />
          <AnnualCard label="Ingresos anuales / one-time mensualizados" value={money.format(metrics.annualizedIncomeMonthly)} />
          <AnnualCard label="Gastos recurrentes mensuales" value={money.format(metrics.recurringMonthlyExpenses)} />
          <AnnualCard label="Gastos anuales mensualizados" value={money.format(metrics.annualizedExpenseMonthly)} />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Esta normalización conecta vacaciones, eventos especiales, útiles escolares e ingresos extraordinarios al snapshot mensual sin inventar recurrencia.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Benchmarks metrics={metrics} />
        <List title="Fortalezas" items={snapshot.strengths} />
        <List title="Áreas de atención" items={snapshot.attentionAreas} attention />
      </section>
    </div>
  )
}

function Ratio({ icon, title, value, target, pass }) {
  return (
    <article className="k-card p-5">
      <div className="k-icon-tile mb-3 h-11 w-11">{icon}</div>
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{target}</p>
      <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${pass ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{pass ? 'En la guía' : 'Oportunidad'}</span>
    </article>
  )
}

function AnnualCard({ label, value }) {
  return (
    <article className="rounded-lg bg-stone-50/90 p-4">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
    </article>
  )
}

function Benchmarks({ metrics }) {
  const rows = [
    ['Gasto en vivienda', `${Math.round(metrics.housingRatio * 100)}%`, BENCHMARKS.housingRatio.label, BENCHMARKS.housingRatio.pass(metrics.housingRatio)],
    ['Tasa de ahorro', `${Math.round(metrics.savingsRate * 100)}%`, BENCHMARKS.savingsRate.label, BENCHMARKS.savingsRate.pass(metrics.savingsRate)],
    ['Fondo de emergencia', `${metrics.emergencyMonths.toFixed(1)} meses`, BENCHMARKS.emergencyMonths.label, BENCHMARKS.emergencyMonths.pass(metrics.emergencyMonths)],
    ['Deuda no hipotecaria / ingresos', `${Math.round(metrics.debtToIncome * 100)}%`, BENCHMARKS.debtToIncome.label, BENCHMARKS.debtToIncome.pass(metrics.debtToIncome)],
  ]
  return (
    <article className="k-card p-5">
      <h2 className="mb-4 font-bold text-slate-950">Comparación con guías recomendadas</h2>
      <table className="w-full text-left text-sm">
        <tbody>{rows.map(([metric, current, target, pass]) => (
          <tr key={metric} className="border-t border-stone-100">
            <td className="py-3 font-bold text-slate-700">{metric}</td>
            <td>{current}</td>
            <td>{target}</td>
            <td className={pass ? 'text-emerald-700' : 'text-amber-700'}>{pass ? 'En la guía' : 'Oportunidad'}</td>
          </tr>
        ))}</tbody>
      </table>
    </article>
  )
}

function List({ title, items, attention = false }) {
  return (
    <article className="k-card p-5">
      <h2 className="mb-3 font-bold text-slate-950">{title}</h2>
      <ul className="space-y-2">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600"><span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${attention ? 'bg-amber-500' : 'bg-emerald-700'}`} />{item}</li>)}</ul>
    </article>
  )
}

function EmptyState() {
  return <div className="rounded-lg bg-white p-8 text-center">Complete su checkup para ver este análisis.</div>
}

function buildSeries(history) {
  return history.map((item) => ({
    month: new Date(item.createdAt).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
    Ingresos: item.derivedMetrics?.monthlyIncome || 0,
    Gastos: item.derivedMetrics?.monthlyExpenses || 0,
  }))
}
