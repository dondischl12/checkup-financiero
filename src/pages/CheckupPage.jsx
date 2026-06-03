import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { calculateFinancialScore } from '../utils/scoring'
import { getDemoUser, getProfile, readStorage, saveHelpRequest, STORAGE_KEYS, writeStorage } from '../utils/storage'

const steps = [
  'Ingresos y gastos',
  'Ahorro',
  'Deuda',
  'Fondo de emergencia',
  'Protección familiar',
  'Bienestar financiero',
  'Contacto con Katalyst',
]

const initial = {
  monthlyIncome: 65000,
  monthlyExpenses: 52000,
  monthlySavings: 7000,
  tracksExpenses: 'sometimes',
  debtComfort: 'manageable',
  paysCardInFull: 'yes',
  emergencyFundMonths: '2',
  hasMedicalInsurance: 'yes',
  hasLifeInsuranceIfDependents: 'not_sure',
  financialStress: 3,
  feelsInControl: 3,
  wantsKatalystContact: 'no',
  contactTopic: 'Fondo de emergencia',
  contactMessage: '',
}

export default function CheckupPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initial)
  const navigate = useNavigate()
  const profile = getProfile()
  const user = getDemoUser()
  const progress = Math.round(((step + 1) / steps.length) * 100)
  const preview = useMemo(() => calculateFinancialScore(form, profile), [form, profile])

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function submit() {
    const now = new Date()
    const entry = {
      ...form,
      monthlyIncome: Number(form.monthlyIncome) || 0,
      monthlyExpenses: Number(form.monthlyExpenses) || 0,
      monthlySavings: Number(form.monthlySavings) || 0,
      financialStress: Number(form.financialStress) || 3,
      feelsInControl: Number(form.feelsInControl) || 3,
      userId: user?.id || 'demo-user',
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      createdAt: now.toISOString(),
      scoreResult: calculateFinancialScore(form, profile),
    }
    const entries = readStorage(STORAGE_KEYS.checkups, [])
    const withoutCurrentMonth = entries.filter((item) => !(item.month === entry.month && item.year === entry.year))
    writeStorage(STORAGE_KEYS.checkups, [entry, ...withoutCurrentMonth])

    if (form.wantsKatalystContact === 'yes') {
      saveHelpRequest({
        topic: form.contactTopic,
        message: form.contactMessage,
        user,
        profile,
      })
    }
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 rounded-lg bg-gradient-to-r from-slate-950 to-emerald-950 p-6 text-white">
        <p className="text-sm font-semibold text-emerald-200">Checkup mensual</p>
        <h1 className="mt-2 text-3xl font-bold">Tu salud financiera de este mes</h1>
        <div className="mt-5 h-2 rounded-full bg-white/20">
          <div className="h-2 rounded-full bg-emerald-300 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-200">
          Paso {step + 1} de {steps.length}: {steps[step]}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100">
          <StepFields step={step} form={form} update={update} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-700 disabled:opacity-40"
            >
              <ArrowLeft size={18} /> Anterior
            </button>
            {step === steps.length - 1 ? (
              <button
                onClick={submit}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white"
              >
                Guardar checkup <Send size={18} />
              </button>
            ) : (
              <button
                onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white"
              >
                Síguiente <ArrowRight size={18} />
              </button>
            )}
          </div>
        </section>
        <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">Vista previa privada</p>
          <p className="mt-3 text-5xl font-bold text-slate-950">{preview.score}</p>
          <p className="font-semibold text-slate-700">{preview.label}</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Este resultado solo aparece en tu panel personal. El panel del consejo usa métricas agregadas y anónimas.
          </p>
        </aside>
      </div>
    </div>
  )
}

function StepFields({ step, form, update }) {
  const inputClass =
    'w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'
  if (step === 0) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <Money label="Ingresos mensuales" value={form.monthlyIncome} onChange={(v) => update('monthlyIncome', v)} />
        <Money label="Gastos mensuales" value={form.monthlyExpenses} onChange={(v) => update('monthlyExpenses', v)} />
        <Choice label="Llevas registro de tus gastos" value={form.tracksExpenses} onChange={(v) => update('tracksExpenses', v)} options={[['yes', 'Sí'], ['sometimes', 'A veces'], ['no', 'No']]} />
      </div>
    )
  }
  if (step === 1) return <Money label="Ahorro mensual" value={form.monthlySavings} onChange={(v) => update('monthlySavings', v)} />
  if (step === 2) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <Choice label="Cómo se siente tu deuda" value={form.debtComfort} onChange={(v) => update('debtComfort', v)} options={[['comfortable', 'Cómoda'], ['manageable', 'Manejable'], ['stressed', 'Estresante'], ['critical', 'Crítica']]} />
        <Choice label="Pagas tu tarjeta completa" value={form.paysCardInFull} onChange={(v) => update('paysCardInFull', v)} options={[['yes', 'Sí'], ['no', 'No'], ['not_applicable', 'No aplica']]} />
      </div>
    )
  }
  if (step === 3) return <Choice label="Meses de fondo de emergencia" value={form.emergencyFundMonths} onChange={(v) => update('emergencyFundMonths', v)} options={[['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['6+', '6+']]} />
  if (step === 4) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <Choice label="Seguro de gastos médicos" value={form.hasMedicalInsurance} onChange={(v) => update('hasMedicalInsurance', v)} options={[['yes', 'Sí'], ['no', 'No'], ['not_sure', 'No estoy seguro']]} />
        <Choice label="Seguro de vida si hay dependientes" value={form.hasLifeInsuranceIfDependents} onChange={(v) => update('hasLifeInsuranceIfDependents', v)} options={[['yes', 'Sí'], ['no', 'No'], ['not_applicable', 'No aplica'], ['not_sure', 'No estoy seguro']]} />
      </div>
    )
  }
  if (step === 5) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <Range label="Estrés financiero" value={form.financialStress} onChange={(v) => update('financialStress', v)} />
        <Range label="Me siento en control" value={form.feelsInControl} onChange={(v) => update('feelsInControl', v)} />
      </div>
    )
  }
  return (
    <div className="space-y-5">
      <Choice label="Quieres que Katalyst te contacte" value={form.wantsKatalystContact} onChange={(v) => update('wantsKatalystContact', v)} options={[['no', 'No por ahora'], ['yes', 'Sí, solicitar contacto']]} />
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Tema</span>
        <select value={form.contactTopic} onChange={(event) => update('contactTopic', event.target.value)} className={inputClass}>
          {['Fondo de emergencia', 'Deuda y credito', 'Presupuesto', 'Protección familiar', 'Otro'].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700">Mensaje opcional</span>
        <textarea value={form.contactMessage} onChange={(event) => update('contactMessage', event.target.value)} rows="4" className={inputClass} />
      </label>
    </div>
  )
}

function Money({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input type="number" min="0" value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
    </label>
  )
}

function Choice({ label, value, onChange, options }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-700">{label}</p>
      <div className="grid gap-2">
        {options.map(([id, text]) => (
          <button key={id} type="button" onClick={() => onChange(id)} className={`rounded-lg border px-4 py-3 text-left font-semibold transition ${value === id ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

function Range({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}: {value}</span>
      <input type="range" min="1" max="5" value={value} onChange={(event) => onChange(event.target.value)} className="w-full accent-emerald-600" />
    </label>
  )
}
