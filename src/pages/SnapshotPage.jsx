import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, Bookmark, Download, LockKeyhole, MessageCircle, ShieldCheck, TrendingUp, UserRound } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { liveModuleIds } from '../data/learningContent'
import { betaPrivacyCopy, betaPrivacyFootnote, betaReviewCopy } from '../lib/betaCopy'
import { getLastSnapshot, getSnapshotHistory } from '../utils/storage'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

export default function SnapshotPage() {
  const snapshot = getLastSnapshot()
  const history = getSnapshotHistory()

  if (!snapshot) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-white p-10 text-center shadow-xl shadow-stone-200">
        <h1 className="k-display text-3xl text-slate-950 sm:text-4xl">Aún no tiene snapshot</h1>
        <p className="mt-3 text-slate-600">Complete el checkup privado para generar su score, reporte y plan de acción.</p>
        <Link to="/checkup" className="mt-6 inline-flex rounded-lg bg-slate-950 px-6 py-3 font-bold text-white">
          Hacer mi checkup
        </Link>
      </div>
    )
  }

  const metrics = snapshot.derivedMetrics
  const hasData = metrics.hasData
  const hasIncome = metrics.monthlyIncome > 0
  const pctOfIncome = (ratio) => (hasIncome ? `${Math.round(ratio * 100)}% del ingreso` : 'Sin ingreso capturado')
  const modules = learningModules.filter((module) => snapshot.recommendations.includes(module.id)).slice(0, 3)
  const liveRecommendations = modules.filter((module) => liveModuleIds.includes(module.id))

  return (
    <div id="snapshot-report" className="k-page k-scenic-page">
      <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <p className="k-eyebrow flex items-center gap-2">
            <ShieldCheck size={18} /> Snapshot completado / {new Date(snapshot.createdAt).toLocaleDateString('es-MX')}
          </p>
          <h1 className="k-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">Su snapshot financiero</h1>
          <p className="k-copy mt-3 max-w-2xl text-lg">
            Un resumen privado y accionable de su situación financiera. Úselo para tomar mejores decisiones y avanzar con claridad.
          </p>
        </div>
        <div className="k-soft-card p-5">
          <div className="flex gap-3">
            <LockKeyhole className="shrink-0 text-emerald-700" />
            <div>
              <h2 className="font-bold text-slate-950">Su información es privada</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{betaPrivacyCopy}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">{betaReviewCopy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.22fr_0.78fr]">
        <article className="k-shell relative grid min-h-[340px] gap-6 overflow-hidden p-7 md:grid-cols-[0.9fr_0.75fr]">
          <div className="k-landscape opacity-30" />
          <div className="flex flex-col items-center justify-center text-center">
            <ScoreRing score={snapshot.score} hasData={hasData} />
            <p className="mt-4 text-lg font-bold text-emerald-800">{hasData ? snapshot.level.label : 'Aún sin datos'}</p>
            <p className="mt-4 max-w-md leading-7 text-slate-600">
              {hasData ? snapshot.level.summary : 'Complete sus números en el checkup para generar su resultado y sus recomendaciones.'}
            </p>
          </div>
          <div className="relative z-10 grid content-center gap-5 border-stone-100 md:border-l md:pl-7">
            <div className="rounded-lg bg-white/72 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase text-emerald-800">Interpretación</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tiene una fotografía clara de flujo, ahorro, deuda, protección y hábitos. Use este resultado para elegir un siguiente paso concreto.
              </p>
            </div>
            <Insight icon={<TrendingUp />} title="Nivel actual" value={snapshot.level.label} copy="Pequeños ajustes sostenidos pueden producir avances visibles." />
            <Insight icon={<ArrowRight />} title="Siguiente paso" value={snapshot.actionPlan[0]?.title} copy={snapshot.actionPlan[0]?.description} />
          </div>
        </article>
        <ChartCard title={history.length > 1 ? 'Evolución de su puntaje' : 'Progreso próximamente'}>
          {history.length > 1 ? (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={buildTrend(history)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area dataKey="score" stroke="#2f855a" fill="#dbead9" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <AccountHistoryCTA score={snapshot.score} hasData={hasData} />
          )}
        </ChartCard>
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="mb-4 font-bold text-emerald-900">Resumen del mes</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Metric title="Ingresos mensuales" value={money.format(metrics.monthlyIncome)} label="por mes" />
          <Metric title="Gastos mensuales" value={money.format(metrics.monthlyExpenses)} label={pctOfIncome(metrics.expenseRatio)} />
          <Metric title="Ahorro mensual" value={money.format(metrics.monthlySavings)} label={hasIncome ? `${Math.round(metrics.savingsRate * 100)}% del ingreso` : 'por mes'} />
          <Metric title="Deuda total" value={money.format(metrics.debtTotal)} label={hasIncome ? `${Math.round(metrics.debtToIncome * 100)}% del ingreso en pagos` : 'por mes'} />
          <Metric title="Fondo de emergencia" value={money.format(metrics.emergencyFund)} label={`${metrics.emergencyMonths.toFixed(1)} meses de gastos`} />
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="k-card p-5">
          <h2 className="font-bold text-slate-950">Recurrente vs. anual / one-time</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Los gastos e ingresos anuales se convierten a equivalente mensual para que el score use una base comparable.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MiniMetric label="Ingresos recurrentes" value={money.format(metrics.recurringMonthlyIncome)} />
            <MiniMetric label="Ingresos anualizados" value={money.format(metrics.annualizedIncomeMonthly)} />
            <MiniMetric label="Gastos recurrentes" value={money.format(metrics.recurringMonthlyExpenses)} />
            <MiniMetric label="Gastos anualizados" value={money.format(metrics.annualizedExpenseMonthly)} />
          </div>
        </article>
        <article className="k-card p-5">
          <h2 className="font-bold text-slate-950">Ratios clave</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MiniMetric label="Flujo neto" value={money.format(metrics.netFlow)} />
            <MiniMetric label="Vivienda / ingreso" value={`${Math.round(metrics.housingRatio * 100)}%`} />
            <MiniMetric label="Deuda / ingreso" value={`${Math.round(metrics.debtToIncome * 100)}%`} />
            <MiniMetric label="Gastos esenciales" value={money.format(metrics.essentialExpenses)} />
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ListCard title="Fortalezas" items={snapshot.strengths} tone="emerald" />
        <ListCard title="Áreas de atención" items={snapshot.attentionAreas} tone="amber" />
        <ListCard title="Próximos pasos recomendados" items={snapshot.actionPlan.map((item) => item.title)} tone="sky" />
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="k-display text-2xl text-emerald-900">Educación recomendada</h2>
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">Ver módulos <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <article key={module.id} className="k-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <p className={`text-sm font-bold ${liveModuleIds.includes(module.id) ? 'text-emerald-700' : 'text-amber-700'}`}>
                {liveModuleIds.includes(module.id) ? `Disponible / ${module.badge}` : `Próximamente / ${module.badge}`}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">{module.title}</h3>
              <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{module.description}</p>
              {liveModuleIds.includes(module.id) ? (
                <Link to={`/learn/${module.id}`} className="k-secondary mt-4 inline-flex w-full justify-center text-sm">
                  Abrir módulo <ArrowRight size={16} />
                </Link>
              ) : (
                <p className="mt-4 rounded-lg bg-stone-50 px-3 py-2 text-xs font-bold text-slate-500">Se activará cuando Katalyst abra la fase educativa.</p>
              )}
            </article>
          ))}
        </div>
        {!liveRecommendations.length && (
          <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            Algunos módulos recomendados todavía están en preparación; los módulos de presupuesto, fondo de emergencia y deuda ya están disponibles.
          </p>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <button type="button" onClick={() => downloadPdf(snapshot, history)} className="k-card group flex items-center justify-between border-emerald-100 bg-emerald-50 p-5 text-left transition hover:shadow-lg">
          <span className="flex items-center gap-4"><IconTile tone="emerald"><Download size={22} /></IconTile><span><span className="block font-bold text-slate-950">Descargar PDF</span><span className="text-sm text-slate-500">Guarde su reporte completo.</span></span></span>
          <ArrowRight className="transition group-hover:translate-x-1" size={18} />
        </button>
        <Link to="/snapshot/analysis" className="k-card group flex items-center justify-between border-sky-100 bg-sky-50 p-5 transition hover:shadow-lg">
          <span className="flex items-center gap-4"><IconTile tone="sky"><Bookmark size={22} /></IconTile><span><span className="block font-bold text-slate-950">Ver análisis</span><span className="text-sm text-slate-500">Compare ratios y benchmarks.</span></span></span>
          <ArrowRight className="transition group-hover:translate-x-1" size={18} />
        </Link>
        <Link to="/action-plan" className="k-card group flex items-center justify-between border-amber-100 bg-amber-50 p-5 transition hover:shadow-lg">
          <span className="flex items-center gap-4"><IconTile tone="amber"><MessageCircle size={22} /></IconTile><span><span className="block font-bold text-slate-950">Plan de acción</span><span className="text-sm text-slate-500">30 días de próximos pasos.</span></span></span>
          <ArrowRight className="transition group-hover:translate-x-1" size={18} />
        </Link>
      </section>

      <p className="border-t border-stone-200 pt-4 text-xs leading-6 text-slate-500">
        Este reporte es educativo y orientativo. No constituye asesoría financiera personalizada. {betaPrivacyFootnote}
      </p>
    </div>
  )
}

function AccountHistoryCTA({ score, hasData = true }) {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-lg bg-[#f4f7ef] p-6">
      <div className="k-landscape opacity-40" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <span className="k-icon-tile"><UserRound size={22} /></span>
          <h3 className="mt-4 text-xl font-bold text-slate-950">Compare su progreso en el tiempo</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Próximamente podrá crear una cuenta para guardar snapshots con consentimiento y comparar avances. Por ahora este resultado es de una sola sesión.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-800">Snapshot actual</p>
            <p className="text-4xl font-bold text-slate-950">{hasData ? score : '—'}<span className="text-base text-slate-500">/100</span></p>
          </div>
          <Link to="/login" className="k-secondary px-4 py-3 text-sm">
            Próximamente <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

async function downloadPdf(snapshot, history) {
  const { exportSnapshotPdf } = await import('../lib/pdfExport')
  exportSnapshotPdf(snapshot, history)
}

function ScoreRing({ score, hasData = true }) {
  const degrees = `${Math.round((Math.max(0, Math.min(100, score)) / 100) * 360)}deg`
  return (
    <div className="k-score-ring h-52 w-52 sm:h-64 sm:w-64" style={{ '--score-deg': hasData ? degrees : '0deg' }}>
      <div>
        <p className="text-6xl font-bold text-slate-950 sm:text-7xl">{hasData ? score : '—'}</p>
        <p className="text-lg font-bold text-slate-500">/100</p>
      </div>
    </div>
  )
}

function Insight({ icon, title, value, copy }) {
  return (
    <div className="flex gap-4">
      <IconTile>{icon}</IconTile>
      <div>
        <p className="text-sm font-bold text-emerald-800">{title}</p>
        <h3 className="mt-1 font-bold text-slate-950">{value}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
      </div>
    </div>
  )
}

const iconTileTones = {
  emerald: 'bg-emerald-100 text-emerald-700',
  sky: 'bg-sky-100 text-sky-700',
  amber: 'bg-amber-100 text-amber-700',
}

function IconTile({ children, tone }) {
  const toneClass = tone ? iconTileTones[tone] : ''
  return <span className={`k-icon-tile ${toneClass}`}>{children}</span>
}

function Metric({ title, value, label }) {
  return (
    <article className="k-card p-5">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
      <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{label}</span>
    </article>
  )
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-lg bg-stone-50 p-4">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-950">{value}</p>
    </div>
  )
}

const listTones = {
  emerald: { card: 'bg-emerald-50 border-emerald-100', title: 'text-emerald-900', dot: 'bg-emerald-600' },
  amber: { card: 'bg-amber-50 border-amber-100', title: 'text-amber-900', dot: 'bg-amber-500' },
  sky: { card: 'bg-sky-50 border-sky-100', title: 'text-sky-900', dot: 'bg-sky-600' },
}

function ListCard({ title, items, tone = 'emerald' }) {
  const t = listTones[tone] || listTones.emerald
  return (
    <article className={`k-card p-5 ${t.card}`}>
      <h2 className={`mb-3 font-bold ${t.title}`}>{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function ChartCard({ title, children }) {
  return (
    <article className="k-shell p-6">
      <h2 className="mb-4 font-bold text-slate-950">{title}</h2>
      {children}
    </article>
  )
}

function buildTrend(history) {
  return history.map((item) => ({
    month: new Date(item.createdAt).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
    score: item.score,
  }))
}
