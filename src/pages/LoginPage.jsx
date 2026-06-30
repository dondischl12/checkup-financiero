import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { getLastSnapshot, STORAGE_KEYS, writeStorage } from '../utils/storage'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const navigate = useNavigate()
  const snapshot = getLastSnapshot()

  function createAccount(event) {
    event.preventDefault()
    writeStorage(STORAGE_KEYS.localAccount, {
      id: `local-account-${Date.now()}`,
      name: name.trim() || 'Usuario Katalyst',
      email: email.trim(),
      role: 'member',
      createdAt: new Date().toISOString(),
      snapshotSaveConsent: consent,
    })
    navigate(snapshot ? '/snapshot' : '/checkup')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <section className="k-shell relative overflow-hidden bg-[#071832] p-8 text-white">
        <div className="k-landscape opacity-20" />
        <div className="relative z-10">
          <UserRound size={34} className="mb-6 text-emerald-200" />
          <p className="mb-3 text-sm font-bold uppercase text-emerald-200">Cuenta opcional</p>
          <h1 className="k-display mb-4 text-4xl leading-tight text-white">Guarde su progreso cuando usted lo decida</h1>
          <p className="leading-7 text-slate-300">
            Puede completar el checkup sin cuenta. Crear una cuenta local permite preparar el flujo para comparar snapshots en el tiempo, siempre con consentimiento explícito antes de guardar datos financieros.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              [ShieldCheck, 'El checkup funciona sin login'],
              [LockKeyhole, 'Sus respuestas siguen bajo su control'],
              [UserRound, 'La cuenta es para progreso e historial'],
            ].map(([Icon, label]) => (
              <div key={label} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-bold text-slate-100">
                <Icon size={18} className="text-emerald-200" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <form onSubmit={createAccount} className="k-card p-8">
        <div className="mb-6">
          <h2 className="k-display text-3xl">Crear cuenta</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Esta versión guarda la cuenta localmente. Supabase se conectará después para historial real entre dispositivos.
          </p>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Nombre</span>
          <input
            id="account-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            autoComplete="name"
            placeholder="Su nombre"
            className="k-input"
          />
        </label>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Email</span>
          <input
            id="account-email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="email"
            placeholder="usted@correo.com"
            className="k-input"
          />
        </label>
        <label className="mb-6 flex gap-3 rounded-lg bg-stone-50 p-4 text-sm leading-6 text-slate-600">
          <input
            id="snapshot-consent"
            name="snapshotSaveConsent"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            type="checkbox"
            className="mt-1 h-4 w-4 accent-emerald-700"
          />
          <span>
            Deseo guardar mi snapshot en mi cuenta cuando el historial esté activo. Entiendo que el modo invitado mantiene mis respuestas en este dispositivo.
          </span>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="k-primary flex-1">
            Crear cuenta <ArrowRight size={18} />
          </button>
          <Link to={snapshot ? '/snapshot' : '/checkup'} className="k-secondary flex-1">
            Seguir sin cuenta
          </Link>
        </div>
      </form>
    </div>
  )
}
