import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, LockKeyhole, ShieldCheck } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="k-scenic-hero p-8">
        <div className="k-icon-tile mb-5"><BarChart3 size={24} /></div>
        <p className="k-eyebrow">Próximamente / uso interno</p>
        <h1 className="k-display mt-3 text-3xl text-slate-950 sm:text-4xl md:text-5xl">Panel agregado de impacto</h1>
        <p className="k-copy mt-4 max-w-3xl">
          En una fase futura, Katalyst podrá consultar métricas agregadas para entender necesidades de la comunidad sin ver respuestas financieras individuales.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoCard icon={<ShieldCheck size={20} />} title="Sólo datos agregados" copy="El diseño futuro debe evitar exponer respuestas personales o financieras." />
          <InfoCard icon={<LockKeyhole size={20} />} title="Requiere revisión de privacidad" copy="Antes de activarse, este panel necesita reglas de acceso, consentimiento y revisión legal." />
        </div>
        <Link to="/checkup" className="k-primary mt-6 inline-flex px-5 py-3">
          Volver al checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}

function InfoCard({ icon, title, copy }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white/82 p-5">
      <div className="mb-3 text-emerald-700">{icon}</div>
      <h2 className="font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
    </article>
  )
}
