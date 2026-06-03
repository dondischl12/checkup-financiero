import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDemoUser, STORAGE_KEYS, writeStorage } from '../utils/storage'

const options = {
  ageRange: ['18-25', '26-35', '36-45', '46-60', '60+'],
  employment: ['Estudiante', 'Empleado', 'Emprendedor', 'Independiente', 'Buscando trabajo', 'Retirado'],
  goal: [
    'Organizar mis gastos',
    'Ahorrar más',
    'Pagar deuda',
    'Crear fondo de emergencia',
    'Aprender a invertir',
    'Planear para mi familia',
  ],
  confidence: ['Baja', 'Media', 'Alta'],
  learningPreference: ['Videos cortos', 'Lecturas rápidas', 'Quizzes', 'Talleres/eventos'],
}

export default function OnboardingPage() {
  const user = getDemoUser()
  const [form, setForm] = useState({
    fullName: user?.name || '',
    ageRange: '26-35',
    dependents: 0,
    employment: 'Empleado',
    goal: 'Crear fondo de emergencia',
    confidence: 'Media',
    learningPreference: 'Quizzes',
  })
  const navigate = useNavigate()

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function submit(event) {
    event.preventDefault()
    writeStorage(STORAGE_KEYS.profile, { ...form, updatedAt: new Date().toISOString() })
    navigate('/checkup')
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 md:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-emerald-700">Perfil inicial</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Personaliza tu experiencia</h1>
        <p className="mt-2 text-slate-600">Estos datos ayudan a adaptar recomendaciones educativas.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Nombre completo</span>
          <input
            value={form.fullName}
            onChange={(event) => update('fullName', event.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <Select label="Rango de edad" value={form.ageRange} options={options.ageRange} onChange={(v) => update('ageRange', v)} />
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-700">Número de dependientes económicos</span>
          <input
            value={form.dependents}
            onChange={(event) => update('dependents', event.target.value)}
            min="0"
            type="number"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <Select label="Situación laboral" value={form.employment} options={options.employment} onChange={(v) => update('employment', v)} />
        <Select label="Objetivo financiero principal" value={form.goal} options={options.goal} onChange={(v) => update('goal', v)} />
        <Select label="Nivel de confianza financiera" value={form.confidence} options={options.confidence} onChange={(v) => update('confidence', v)} />
        <Select label="Preferencia de aprendizaje" value={form.learningPreference} options={options.learningPreference} onChange={(v) => update('learningPreference', v)} />
      </div>
      <button className="mt-8 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white">Continuar al checkup</button>
    </form>
  )
}

function Select({ label, value, options: items, onChange }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
      >
        {items.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  )
}
