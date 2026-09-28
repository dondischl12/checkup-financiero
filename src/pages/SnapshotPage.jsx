import { Link } from 'react-router-dom'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ArrowRight, Download, LockKeyhole } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { liveModuleIds } from '../data/learningContent'
import { betaPrivacyCopy, betaPrivacyFootnote } from '../lib/betaCopy'
import { BENCHMARKS } from '../lib/financialCalculations'
import { getLastSnapshot } from '../utils/storage'
import ScoreBreakdown from '../components/shared/ScoreBreakdown'
import ScoreGauge from '../components/shared/ScoreGauge'
import StatementHeader from '../components/shared/StatementHeader'
import StatementSection from '../components/shared/StatementSection'
import StatementSummaryGrid from '../components/shared/StatementSummaryGrid'
import StatementTable from '../components/shared/StatementTable'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
const pctFmt = (ratio) => `${Math.round((ratio || 0) * 100)}%`

export default function SnapshotPage() {
  const snapshot = getLastSnapshot()

  if (!snapshot) return <EmptyState />

  const metrics = snapshot.derivedMetrics
  const profile = snapshot.answers || {}
  const hasData = metrics.hasData
  const hasIncome = metrics.monthlyIncome > 0
  const ofIncome = (ratio) => (hasIncome ? `${pctFmt(ratio)} del ingreso` : 'Sin ingreso capturado')
  const modules = learningModules.filter((module) => snapshot.recommendations.includes(module.id)).slice(0, 3)
  const distribution = metrics.categoryDistribution || []

  return (
    <div id="snapshot-report" className="mx-auto max-w-6xl space-y-9">
      <StatementHeader
        eyebrow="Reporte educativo privado"
        title="Su reporte financiero"
        meta={[
          ['Fecha', new Date(snapshot.createdAt).toLocaleDateString('es-MX')],
          ['Folio', snapshotRef(snapshot.createdAt)],
          ['Moneda', snapshot.currency || 'MXN'],
          ['Hogar', `${profile.household_size || '—'} personas · ${profile.dependents_count || 0} dependientes`],
        ]}
      />

      <p className="flex items-start gap-2 text-xs leading-6 text-slate-500">
        <LockKeyhole size={15} className="mt-0.5 shrink-0 text-emerald-700" />
        {betaPrivacyCopy}
      </p>

      {/* 01 — Resultado */}
      <StatementSection
        index={1}
        title="Resultado general"
        subtitle="Su score combina ocho áreas. Cada una se muestra con su peso para que el número sea explicable, no un veredicto."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
          <article className="k-statement flex flex-col items-center p-6 text-center">
            <ScoreGauge score={snapshot.score} hasData={hasData} className="w-60" />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {hasData
                ? snapshot.level.summary
                : 'Complete sus números en el checkup para generar su resultado y sus recomendaciones.'}
            </p>
            {hasData && (
              <div className="mt-5 w-full border-t border-stone-200 pt-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Siguiente paso</p>
                <p className="mt-1 font-bold text-slate-950">{snapshot.actionPlan[0]?.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{snapshot.actionPlan[0]?.description}</p>
              </div>
            )}
          </article>
          <ScoreBreakdown subscores={snapshot.scoreBreakdown.subscores} weights={snapshot.scoreBreakdown.weights} />
        </div>
      </StatementSection>

      {/* 02 — Resumen del mes */}
      <StatementSection index={2} title="Resumen del mes" aside={hasIncome ? `Flujo neto ${money.format(metrics.netFlow)}` : null}>
        <div className="space-y-3">
          <StatementSummaryGrid
            items={[
              { label: 'Ingresos mensuales', value: money.format(metrics.monthlyIncome), note: 'Recurrente + anual mensualizado' },
              { label: 'Gastos mensuales', value: money.format(metrics.monthlyExpenses), note: ofIncome(metrics.expenseRatio) },
              { label: 'Ahorro mensual', value: money.format(metrics.monthlySavings), note: ofIncome(metrics.savingsRate) },
              { label: 'Deuda total', value: money.format(metrics.debtTotal), note: `Pagos: ${money.format(metrics.debtPayments)} / mes` },
              { label: 'Fondo de emergencia', value: money.format(metrics.emergencyFund), note: `${metrics.emergencyMonths.toFixed(1)} meses de gastos esenciales` },
            ]}
          />
          <StatementSummaryGrid
            items={[
              { label: 'Flujo mensual neto', value: money.format(metrics.netFlow), note: 'Ingresos − gastos' },
              { label: 'Gastos esenciales', value: money.format(metrics.essentialExpenses), note: 'Base del fondo de emergencia' },
              { label: 'Gasto en vivienda', value: money.format(metrics.housing), note: ofIncome(metrics.housingRatio) },
              { label: 'Pagos de deuda', value: money.format(metrics.debtPayments), note: ofIncome(metrics.debtToIncome) },
              { label: 'Personas en el hogar', value: profile.household_size || '—', note: `${profile.dependents_count || 0} dependientes` },
            ]}
          />
        </div>
      </StatementSection>

      {/* 03 — Comparación con guías */}
      <StatementSection
        index={3}
        title="Comparación con guías recomendadas"
        subtitle="Referencias de planeación ampliamente usadas (50/30/20, 28/36, 20/10 y 3–6 meses de reserva)."
      >
        <StatementTable
          columns={['Métrica', 'Actual', 'Guía', 'Estado']}
          rows={[
            ['Tasa de ahorro', pctFmt(metrics.savingsRate), BENCHMARKS.savingsRate.label, BENCHMARKS.savingsRate.pass(metrics.savingsRate)],
            ['Fondo de emergencia', `${metrics.emergencyMonths.toFixed(1)} meses`, BENCHMARKS.emergencyMonths.label, BENCHMARKS.emergencyMonths.pass(metrics.emergencyMonths)],
            ['Gasto en vivienda / ingreso', pctFmt(metrics.housingRatio), BENCHMARKS.housingRatio.label, BENCHMARKS.housingRatio.pass(metrics.housingRatio)],
            ['Deuda no hipotecaria / ingreso', pctFmt(metrics.debtToIncome), BENCHMARKS.debtToIncome.label, BENCHMARKS.debtToIncome.pass(metrics.debtToIncome)],
            ['Flujo mensual neto', money.format(metrics.netFlow), 'Positivo', metrics.netFlow >= 0],
          ].map(([label, current, target, pass]) => [
            label,
            current,
            target,
            <StatusPill key="s" pass={pass} />,
          ])}
        />
      </StatementSection>

      {/* 04 — Distribución del gasto */}
      {distribution.length > 0 && (
        <StatementSection index={4} title="Distribución del gasto" aside={`Total ${money.format(metrics.monthlyExpenses)} / mes`}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center">
            <article className="k-statement p-4">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={distribution} dataKey="value" innerRadius={64} outerRadius={98} paddingAngle={1}>
                    {distribution.map((item) => <Cell key={item.name} fill={item.color} stroke="none" />)}
                  </Pie>
                  <Tooltip formatter={(value) => money.format(value)} />
                </PieChart>
              </ResponsiveContainer>
            </article>
            <StatementTable
              columns={['Categoría', 'Monto', '% del gasto', '% del ingreso']}
              rows={distribution.map((item) => [
                <span key="n" className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: item.color }} />
                  {item.name}
                </span>,
                money.format(item.value),
                pctFmt(item.percent),
                hasIncome ? pctFmt(item.value / metrics.monthlyIncome) : '—',
              ])}
            />
          </div>
        </StatementSection>
      )}

      {/* 05 — Normalización */}
      <StatementSection
        index={5}
        title="Recurrente vs. anual mensualizado"
        subtitle="Vacaciones, colegiaturas anuales, eventos e ingresos extraordinarios se convierten a equivalente mensual para comparar sobre la misma base."
      >
        <StatementSummaryGrid
          columns={4}
          items={[
            { label: 'Ingresos recurrentes', value: money.format(metrics.recurringMonthlyIncome) },
            { label: 'Ingresos anualizados', value: money.format(metrics.annualizedIncomeMonthly) },
            { label: 'Gastos recurrentes', value: money.format(metrics.recurringMonthlyExpenses) },
            { label: 'Gastos anualizados', value: money.format(metrics.annualizedExpenseMonthly) },
          ]}
        />
      </StatementSection>

      {/* 06 — Lectura */}
      <StatementSection index={6} title="Lectura de su situación">
        <div className="grid gap-4 md:grid-cols-2">
          <ListCard title="Fortalezas" items={snapshot.strengths} tone="emerald" />
          <ListCard title="Áreas de enfoque" items={snapshot.attentionAreas} tone="amber" />
        </div>
      </StatementSection>

      {/* 07 — Plan */}
      <StatementSection
        index={7}
        title="Plan sugerido de 30 días"
        aside={<Link to="/action-plan" className="inline-flex items-center gap-1 font-bold text-emerald-800">Ver plan completo <ArrowRight size={14} /></Link>}
      >
        <div className="k-statement grid divide-x divide-y divide-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {snapshot.actionPlan.map((item) => (
            <article key={item.week} className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Semana {item.week}</p>
              <h3 className="mt-2 font-bold leading-snug text-slate-950">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </StatementSection>

      {/* 08 — Educación */}
      {modules.length > 0 && (
        <StatementSection
          index={8}
          title="Educación recomendada"
          aside={<Link to="/learn" className="inline-flex items-center gap-1 font-bold text-emerald-800">Ver módulos <ArrowRight size={14} /></Link>}
        >
          <div className="k-statement grid divide-x divide-y divide-stone-200 md:grid-cols-3">
            {modules.map((module) => {
              const live = liveModuleIds.includes(module.id)
              return (
                <article key={module.id} className="flex flex-col p-4">
                  <p className={`text-xs font-bold uppercase tracking-wide ${live ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {live ? 'Disponible' : 'Próximamente'} · {module.badge}
                  </p>
                  <h3 className="mt-2 font-bold text-slate-950">{module.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-600">{module.description}</p>
                  {live && (
                    <Link to={`/learn/${module.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-800">
                      Abrir módulo <ArrowRight size={14} />
                    </Link>
                  )}
                </article>
              )
            })}
          </div>
        </StatementSection>
      )}

      <div className="flex flex-col gap-4 border-t-2 border-slate-950/85 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={() => downloadPdf(snapshot)} className="k-primary px-6 py-3">
          <Download size={18} /> Descargar reporte en PDF
        </button>
        <p className="max-w-xl text-xs leading-6 text-slate-500">
          Este reporte es educativo y orientativo. No constituye asesoría financiera personalizada. {betaPrivacyFootnote}
        </p>
      </div>
    </div>
  )
}

function StatusPill({ pass }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${pass ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
      {pass ? 'En la guía' : 'Oportunidad'}
    </span>
  )
}

const listTones = {
  emerald: { dot: 'bg-emerald-600', title: 'text-emerald-900' },
  amber: { dot: 'bg-amber-500', title: 'text-amber-900' },
}

function ListCard({ title, items, tone }) {
  const t = listTones[tone] || listTones.emerald
  return (
    <article className="k-statement p-5">
      <h3 className={`mb-3 text-sm font-bold uppercase tracking-wide ${t.title}`}>{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-700">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-white p-10 text-center shadow-xl shadow-stone-200">
      <h1 className="k-display text-3xl text-slate-950 sm:text-4xl">Aún no tiene reporte</h1>
      <p className="mt-3 text-slate-600">Complete el checkup privado para generar su score, su reporte y su plan de acción.</p>
      <Link to="/checkup" className="k-primary mt-6 px-6 py-3">Hacer mi checkup</Link>
    </div>
  )
}

async function downloadPdf(snapshot) {
  const { exportSnapshotPdf } = await import('../lib/pdfExport')
  exportSnapshotPdf(snapshot)
}

// Short, non-identifying reference for the statement header — derived from the
// snapshot timestamp only, never from anything a person could be recognized by.
function snapshotRef(createdAt) {
  return new Date(createdAt).getTime().toString(36).toUpperCase().slice(-6)
}
