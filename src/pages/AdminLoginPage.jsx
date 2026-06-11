import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Building2, LockKeyhole, ShieldCheck } from 'lucide-react'
import { writeStorage } from '../utils/storage'

const ADMIN_SESSION_KEY = 'katalyst_admin_session'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [scope, setScope] = useState('Consejo Katalyst')
  const navigate = useNavigate()

  function enterAdmin(event) {
    event.preventDefault()
    writeStorage(ADMIN_SESSION_KEY, {
      email: email.trim() || 'consejo@katalyst.mx',
      scope,
      accessCodeEntered: Boolean(accessCode.trim()),
      createdAt: new Date().toISOString(),
    })
    navigate('/admin')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg bg-slate-950 p-8 text-white">
        <Building2 size={34} className="mb-6 text-amber-300" />
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-200">Admin staged access</p>
        <h1 className="mb-4 text-3xl font-bold">Entrada al análisis corporativo</h1>
        <p className="leading-7 text-slate-300">
          Este mock login simula un acceso restringido para consejo, dirección o aliados. Entra al panel con métricas
          agregadas, necesidades prioritarias y señales de participación comunitaria.
        </p>
        <div className="mt-8 grid gap-3">
          {[
            [BarChart3, 'Insights agregados'],
            [ShieldCheck, 'Sin datos individuales'],
            [LockKeyhole, 'Acceso simulado para demo'],
          ].map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
              <Icon size={18} className="text-amber-300" /> {label}
            </div>
          ))}
        </div>
      </section>

      <form onSubmit={enterAdmin} className="rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-950">Admin sign in</h2>
          <p className="mt-2 text-sm text-slate-500">
            Puedes dejar los campos vacíos; el objetivo es mostrar la puerta de acceso antes del panel.
          </p>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Email institucional</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="consejo@katalyst.mx"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />
        </label>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Área de análisis</span>
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          >
            <option>Consejo Katalyst</option>
            <option>Dirección de programas</option>
            <option>Aliado institucional</option>
            <option>Equipo de impacto</option>
          </select>
        </label>
        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Código de acceso demo</span>
          <input
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            type="password"
            placeholder="Opcional"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />
          <span className="mt-2 block text-xs font-medium text-slate-500">No se valida en esta demo.</span>
        </label>
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white">
          <BarChart3 size={18} /> Abrir corporate analysis
        </button>
      </form>
    </div>
  )
}
