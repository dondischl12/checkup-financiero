import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, ShieldCheck } from 'lucide-react'
import { getProfile, STORAGE_KEYS, writeStorage } from '../utils/storage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function enterDemo(event) {
    event.preventDefault()
    const user = {
      id: 'demo-user',
      name: 'Liam Demo',
      email: email || 'demo@katalyst.mx',
      role: 'member',
    }
    writeStorage(STORAGE_KEYS.demoUser, user)
    navigate(getProfile() ? '/dashboard' : '/onboarding')
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-lg bg-slate-950 p-8 text-white">
        <ShieldCheck size={34} className="mb-6 text-emerald-300" />
        <h1 className="mb-4 text-3xl font-bold">Acceso demo Katalyst</h1>
        <p className="leading-7 text-slate-300">
          Entra como miembro para completar tu perfil inicial, checkup mensual y ver un panel privado con
          recomendaciones educativas.
        </p>
      </section>
      <form onSubmit={enterDemo} className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-950">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-slate-500">
            Demo seguro: en producción se implementará autenticación protegida, 2FA y políticas estrictas de acceso.
          </p>
        </div>
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
        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Contraseña</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="demo"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white">
            <LogIn size={18} /> Entrar
          </button>
          <button
            type="button"
            onClick={enterDemo}
            className="flex-1 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50"
          >
            Entrar como demo
          </button>
        </div>
      </form>
    </div>
  )
}
