import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CircleDollarSign, Info, LockKeyhole, ShieldCheck } from 'lucide-react'
import { checkupQuestionBank } from '../data/checkupQuestionBank'
import { betaPrivacyCopy, betaReviewCopy } from '../lib/betaCopy'
import { buildSnapshot } from '../lib/financialCalculations'
import { readCheckupDraft, saveCheckupEntry, saveHelpRequest, saveSnapshot, writeCheckupDraft } from '../utils/storage'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

const sectionIcons = {
  profile_household: ShieldCheck,
  income: CircleDollarSign,
  housing_home_expenses: CircleDollarSign,
  children_education: CircleDollarSign,
  insurance_protection: ShieldCheck,
  transport_auto: CircleDollarSign,
  recreation_lifestyle: CircleDollarSign,
  debt_credit: CircleDollarSign,
  savings_assets: ShieldCheck,
  habits_wellbeing: Check,
}

export default function CheckupPage() {
  const [answers, setAnswers] = useState(() => readCheckupDraft())
  const [sectionIndex, setSectionIndex] = useState(0)
  const navigate = useNavigate()
  const sections = useMemo(() => visibleSections(checkupQuestionBank.sections, answers), [answers])
  const current = sections[sectionIndex] || sections[0]
  const snapshot = useMemo(() => buildSnapshot(answers), [answers])
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100)

  function update(id, value) {
    const next = { ...answers, [id]: value }
    setAnswers(next)
    writeCheckupDraft(next)
  }

  function goNext() {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const finalSnapshot = buildSnapshot(answers)
    saveSnapshot(finalSnapshot)
    saveCheckupEntry({
      id: `snapshot-${Date.now()}`,
      createdAt: finalSnapshot.createdAt,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      monthlyIncome: finalSnapshot.derivedMetrics.monthlyIncome,
      monthlyExpenses: finalSnapshot.derivedMetrics.monthlyExpenses,
      monthlySavings: finalSnapshot.derivedMetrics.monthlySavings,
      emergencyFundMonths: finalSnapshot.derivedMetrics.emergencyMonths,
      scoreResult: { score: finalSnapshot.score, label: finalSnapshot.level.label },
    })
    if (answers.wants_katalyst_contact === 'Quiero que me contacten') {
      saveHelpRequest({
        topic: answers.top_financial_goal || 'Snapshot financiero',
        message: 'Solicitud voluntaria enviada desde el checkup financiero.',
      })
    }
    navigate('/snapshot')
  }

  return (
    <div className="k-scenic-page mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <main className="space-y-7">
          <Stepper sections={sections} active={sectionIndex} />

          <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="k-eyebrow">Checkup privado local</p>
              <h1 className="k-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Cuéntenos sobre su situación actual
              </h1>
            </div>
            <p className="k-copy text-lg">
              {betaPrivacyCopy}
            </p>
          </section>

          <section className="k-shell p-5">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <p className="k-eyebrow">Paso {sectionIndex + 1} de {sections.length}</p>
                <h2 className="k-display mt-1 text-2xl sm:text-3xl">{current.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{current.purpose}</p>
              </div>
              <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 sm:inline-flex">
                {progress}% completo
              </span>
            </div>

            <div className="grid gap-4">
              {current.questions.map((question) => (
                <QuestionField key={question.id} question={question} value={answers[question.id] ?? ''} onChange={update} />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <Info size={17} />
              <span>Puede omitir una pregunta; su resultado será menos preciso.</span>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
                disabled={sectionIndex === 0}
                className="k-secondary disabled:opacity-40"
              >
                <ArrowLeft size={18} /> Atrás
              </button>
              <button
                type="button"
                onClick={goNext}
                className="k-primary px-6"
              >
                {sectionIndex === sections.length - 1 ? 'Ver mi snapshot' : 'Continuar'} <ArrowRight size={18} />
              </button>
            </div>
          </section>

          <section className="grid gap-4 border-t border-stone-200 pt-5 text-sm md:grid-cols-3">
            <PrivacyPoint icon={<ShieldCheck size={18} />} title="Una sola sesión" copy="El snapshot invitado vive sólo mientras no actualice la página." />
            <PrivacyPoint icon={<LockKeyhole size={18} />} title="Sin base de datos" copy="En esta beta no enviamos ni guardamos sus respuestas financieras." />
            <PrivacyPoint icon={<Check size={18} />} title="Versión beta" copy={betaReviewCopy} />
          </section>
        </main>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <PreviewCard snapshot={snapshot} />
          <section className="k-soft-card p-5">
            <div className="k-icon-tile mb-4">
              <LockKeyhole size={22} />
            </div>
            <h2 className="font-bold text-slate-950">Su privacidad es nuestra prioridad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {betaPrivacyCopy}
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">{betaReviewCopy}</p>
          </section>
        </aside>
      </div>
    </div>
  )
}

function PrivacyPoint({ icon, title, copy }) {
  return (
    <div className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">{icon}</span>
      <span>
        <span className="block font-bold text-slate-950">{title}</span>
        <span className="mt-1 block leading-5 text-slate-500">{copy}</span>
      </span>
    </div>
  )
}

function visibleSections(sections, answers) {
  return sections.filter((section) => {
    if (section.id !== 'children_education') return true
    return Number(answers.children_count || 0) > 0 || Number(answers.dependents_count || 0) > 0
  })
}

function Stepper({ sections, active }) {
  const pct = Math.round(((active + 1) / sections.length) * 100)
  return (
    <div>
      {/* Mobile: compact progress bar instead of a 760px horizontal scroll */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold">
          <span className="text-emerald-800">Paso {active + 1} de {sections.length}</span>
          <span className="truncate text-slate-500">{shortTitle(sections[active]?.title || '')}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-emerald-700 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Desktop: full step rail */}
      <div className="hidden overflow-x-auto pb-2 md:block">
        <div className="flex min-w-[760px] items-center">
          {sections.map((section, index) => {
            const complete = index < active
            const activeStep = index === active
            return (
              <div key={section.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-bold ${complete ? 'border-emerald-700 bg-emerald-700 text-white' : activeStep ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-stone-300 bg-white text-slate-500'}`}>
                    {complete ? <Check size={16} /> : index + 1}
                  </span>
                  <span className={`max-w-24 truncate text-xs font-bold ${activeStep ? 'text-emerald-800' : 'text-slate-500'}`}>{shortTitle(section.title)}</span>
                </div>
                {index < sections.length - 1 && <span className={`mx-3 h-px flex-1 ${index < active ? 'bg-emerald-700' : 'bg-stone-200'}`} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function shortTitle(title) {
  return title
    .replace('Ingresos netos mensuales y extraordinarios', 'Ingresos')
    .replace('Gastos de casa y vida diaria', 'Gastos')
    .replace('Hijos, educación y dependientes', 'Dependientes')
    .replace('Seguros y protección familiar', 'Seguros')
    .replace('Automóvil y transporte', 'Transporte')
    .replace('Recreación, vacaciones y gastos personales', 'Estilo de vida')
    .replace('Deudas, crédito y costos financieros', 'Deuda')
    .replace('Ahorro, fondo de emergencia e inversión', 'Ahorro')
    .replace('Hábitos y bienestar financiero', 'Hábitos')
    .replace('Perfil del hogar', 'Perfil')
}

function QuestionField({ question, value, onChange }) {
  const Icon = sectionIcons[question.section] || CircleDollarSign
  if (question.type === 'single_select') {
    return (
      <article className="k-card p-4">
        <p className="mb-3 font-bold text-slate-950">{question.label}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(question.id, option)}
              aria-pressed={value === option}
              className={`k-focus rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${value === option ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' : 'border-stone-200 bg-stone-50 text-slate-700 hover:bg-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </article>
    )
  }

  return (
    <label className="k-card grid gap-4 p-4 sm:grid-cols-[72px_1fr_240px] sm:items-center">
      <span className="k-icon-tile hidden h-16 w-16 sm:grid">
        <Icon size={26} />
      </span>
      <span>
        <span className="block font-bold text-slate-950">{question.label}</span>
        <span className="mt-1 block text-sm text-slate-500">
          {question.frequency === 'annual' || question.frequency === 'annual_or_one_time'
            ? 'Capture el monto anual; lo convertimos a equivalente mensual.'
            : question.type === 'currency'
              ? 'Monto mensual aproximado en MXN.'
              : 'Respuesta numérica.'}
        </span>
      </span>
      <span className="flex items-center overflow-hidden rounded-lg border border-stone-300 bg-white focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-100">
        {question.type === 'currency' && <span className="border-r border-stone-200 px-3 text-sm font-bold text-slate-500">MXN</span>}
        <input
          id={question.id}
          name={question.id}
          type="number"
          min={question.min ?? 0}
          max={question.max}
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          className="w-full bg-transparent px-4 py-3 text-right font-bold text-slate-950 outline-none"
          placeholder={question.type === 'currency' ? '$0' : '0'}
        />
      </span>
    </label>
  )
}

function PreviewCard({ snapshot }) {
  const metrics = snapshot.derivedMetrics
  const degrees = `${Math.round((Math.max(0, Math.min(100, snapshot.score)) / 100) * 360)}deg`
  const rows = [
    ['Ingresos', metrics.monthlyIncome, metrics.monthlyIncome > 0 ? 'Bien' : 'Pendiente'],
    ['Gastos', metrics.monthlyExpenses, metrics.expenseRatio <= 0.85 ? 'Bien' : 'Revisar'],
    ['Deuda', metrics.debtPayments, metrics.debtToIncome <= 0.3 ? 'Bien' : 'Atención'],
    ['Ahorro', metrics.monthlySavings, metrics.savingsRate >= 0.15 ? 'Bien' : 'Regular'],
    ['Fondo', metrics.emergencyFund, metrics.emergencyMonths >= 3 ? 'Bien' : 'Regular'],
  ]
  return (
    <section className="k-shell p-6">
      <p className="text-sm font-bold text-slate-600">Vista previa de su snapshot</p>
      <div className="my-6 text-center">
        <div className="k-score-ring mx-auto h-40 w-40" style={{ '--score-deg': degrees }}>
          <div>
            <p className="text-4xl font-bold text-slate-950 sm:text-5xl">{snapshot.score}</p>
            <p className="text-sm font-bold text-slate-500">/100</p>
          </div>
        </div>
        <p className="mt-3 font-bold text-emerald-800">{snapshot.level.label}</p>
      </div>
      <div className="divide-y divide-stone-100">
        {rows.map(([label, value, status]) => (
          <div key={label} className="flex items-center justify-between py-3 text-sm">
            <span className="font-bold text-slate-700">{label}</span>
            <span className="text-right">
              <span className="block font-bold text-slate-950">{money.format(value)}</span>
              <span className="text-xs font-bold text-emerald-700">{status}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
