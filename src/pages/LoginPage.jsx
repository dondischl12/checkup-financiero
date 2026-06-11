import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BarChart3, LockKeyhole, LogIn, ShieldCheck, UserRound } from 'lucide-react'
import { calculateFinancialScore } from '../utils/scoring'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Miembro de la comunidad')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function createDemoSession() {
    const displayName = name.trim() || 'Liam Demo'
    const user = {
      id: 'demo-user',
      name: displayName,
      email: email.trim() || 'demo@katalyst.mx',
      role: 'member',
    }
    const profile = {
      fullName: displayName,
      ageRange: '26-35',
      dependents: 0,
      employment: role,
      goal: 'Crear fondo de emergencia',
      confidence: 'Media',
      learningPreference: 'Quizzes',
      updatedAt: new Date().toISOString(),
    }
    writeStorage(STORAGE_KEYS.demoUser, user)
    writeStorage(STORAGE_KEYS.profile, profile)
    return { user, profile }
  }

  function ensureDemoCheckup(profile, user) {
    const entries = readStorage(STORAGE_KEYS.checkups, [])
    if (entries.length) return

    const now = new Date()
    const demoCheckup = {
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
      userId: user.id,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      createdAt: now.toISOString(),
    }

    writeStorage(STORAGE_KEYS.checkups, [
      {
        ...demoCheckup,
        scoreResult: calculateFinancialScore(demoCheckup, profile),
      },
    ])
  }

  function enterDemo(event) {
    event.preventDefault()
    createDemoSession()
    navigate('/checkup')
  }

  function enterDashboard() {
    const { user, profile } = createDemoSession()
    ensureDemoCheckup(profile, user)
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg bg-slate-950 p-8 text-white">
        <ShieldCheck size={34} className="mb-6 text-emerald-300" />
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-200">Mock sign in</p>
        <h1 className="mb-4 text-3xl font-bold">Entra con tus datos y pasa directo</h1>
        <p className="leading-7 text-slate-300">
          Este acceso crea una sesión local para el demo. No valida contraseña, no manda datos a un servidor y te lleva
          al checkup para activar el panel.
        </p>
        <div className="mt-8 grid gap-3">
          {[
            [UserRound, 'Perfil básico listo'],
            [LockKeyhole, 'Sin autenticación real en demo'],
            [BadgeCheck, 'Datos guardados solo en este navegador'],
          ].map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
              <Icon size={18} className="text-emerald-300" /> {label}
            </div>
          ))}
        </div>
      </section>
      <form onSubmit={enterDemo} className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-950">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-slate-500">
            Llena lo mínimo para personalizar el recorrido. El botón siempre deja entrar.
          </p>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Nombre</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="demo@katalyst.mx"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Rol o contexto</span>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            <option>Miembro de la comunidad</option>
            <option>Voluntario</option>
            <option>Aliado</option>
            <option>Consejo</option>
          </select>
        </label>
        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Contraseña demo</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Opcional"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
          <span className="mt-2 block text-xs font-medium text-slate-500">Puedes dejarla vacía; es solo para simular el formulario.</span>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white">
            <LogIn size={18} /> Entrar
          </button>
          <button
            type="button"
            onClick={enterDashboard}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Mi dashboard <BarChart3 size={18} />
          </button>
          <button
            type="button"
            onClick={enterDemo}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
          >
            Usar datos demo <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
