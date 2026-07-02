import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, LockKeyhole, Sparkles } from 'lucide-react'

const upcomingModules = [
  ['Presupuesto mensual', 'Organizar ingresos, gastos fijos y decisiones de ahorro.'],
  ['Fondo de emergencia', 'Construir una reserva gradual para imprevistos.'],
  ['Deuda y crédito', 'Priorizar pagos y reducir presión financiera.'],
]

export default function LearnPage() {
  return (
    <div className="k-page">
      <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p className="k-eyebrow flex items-center gap-2"><Sparkles size={18} /> Próximamente</p>
          <h1 className="k-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">Educación financiera conectada a su snapshot</h1>
          <p className="k-copy mt-4 max-w-3xl text-lg">
            En la siguiente fase, Katalyst podrá recomendar módulos educativos según las áreas de atención detectadas en el checkup.
          </p>
        </div>
        <div className="k-soft-card p-5">
          <LockKeyhole className="mb-4 text-emerald-700" />
          <h2 className="font-bold text-slate-950">No hay progreso guardado todavía</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Esta sección es una vista de producto futuro. En la beta del lunes, el flujo real es checkup, snapshot y PDF.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {upcomingModules.map(([title, copy]) => (
          <article key={title} className="k-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="k-icon-tile"><BookOpen size={20} /></span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Próximamente</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950">{title}</h2>
            <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{copy}</p>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-stone-50 px-4 py-3 text-sm font-bold text-slate-500">
              <Clock size={16} /> Disponible en una siguiente fase
            </div>
          </article>
        ))}
      </section>

      <section className="k-shell grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="k-display text-2xl text-slate-950 sm:text-3xl">La beta actual se enfoca en claridad inmediata.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete el checkup para obtener su snapshot privado y descargar su reporte educativo de una sola sesión.
          </p>
        </div>
        <Link to="/checkup" className="k-primary px-5 py-3">
          Hacer mi checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
