import { Link } from 'react-router-dom'
import { ArrowRight, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { betaReviewCopy } from '../lib/betaCopy'

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.9fr_1.1fr]">
      <section className="k-shell relative overflow-hidden bg-[#071832] p-8 text-white">
        <div className="k-landscape opacity-20" />
        <div className="relative z-10">
          <UserRound size={34} className="mb-6 text-emerald-200" />
          <p className="mb-3 text-sm font-bold uppercase text-emerald-200">Próximamente</p>
          <h1 className="k-display mb-4 text-3xl leading-tight text-white sm:text-4xl">Guardar progreso con consentimiento</h1>
          <p className="leading-7 text-slate-300">
            Las cuentas permitirán comparar snapshots en el tiempo cuando el usuario decida guardar su historial. No forman parte de la beta actual.
          </p>
        </div>
      </section>

      <section className="k-card p-8">
        <div className="mb-6">
          <h2 className="k-display text-2xl sm:text-3xl">Cuenta opcional en una siguiente fase</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Por ahora, el checkup funciona como snapshot de una sola sesión. Sin cuenta, las respuestas no se guardan en una base de datos y se borran al actualizar la página.
          </p>
          <p className="mt-3 text-xs font-semibold text-slate-500">{betaReviewCopy}</p>
        </div>
        <div className="grid gap-3">
          {[
            [ShieldCheck, 'La beta funciona sin crear cuenta'],
            [LockKeyhole, 'El historial requerirá consentimiento explícito'],
            [UserRound, 'Las cuentas reales se conectarán después con una revisión de privacidad'],
          ].map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 rounded-lg bg-stone-50 px-4 py-3 text-sm font-bold text-slate-700">
              <Icon size={18} className="text-emerald-700" /> {label}
            </div>
          ))}
        </div>
        <Link to="/checkup" className="k-primary mt-6 inline-flex px-5 py-3">
          Hacer mi checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
