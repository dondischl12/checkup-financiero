import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, Flame, Target, Trophy } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { events } from '../data/events'
import { getLastSnapshot } from '../utils/storage'

export default function ActionPlanPage() {
  const snapshot = getLastSnapshot()
  if (!snapshot) return <div className="rounded-lg bg-white p-8 text-center">Complete su checkup para activar su plan de acción.</div>
  const modules = learningModules.filter((module) => snapshot.recommendations.includes(module.id)).slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-emerald-100 bg-emerald-50/80 p-5 md:flex-row md:items-center">
        <p className="font-bold text-emerald-900">Basado en su snapshot y perfil del hogar</p>
        <Link to="/snapshot" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-bold text-emerald-800">Ver mi snapshot <ArrowRight size={16} /></Link>
      </section>

      <section>
        <h1 className="font-serif text-5xl font-bold text-slate-950">Su plan de acción</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">Un plan personalizado de 30 días para avanzar hacia sus metas con pasos pequeños y sostenibles.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-slate-950">Roadmap de 30 días</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800">25% progreso</span>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {snapshot.actionPlan.map((item) => (
              <article key={item.week} className="rounded-lg border border-stone-200 p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-700 text-sm font-bold text-white">{item.week}</span>
                <p className="mt-4 text-sm font-bold text-slate-500">Semana {item.week}</p>
                <h3 className="mt-2 font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <span className="mt-4 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-slate-600">{item.status}</span>
              </article>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-slate-950">Objetivos prioritarios</h2>
          {snapshot.actionPlan.slice(0, 3).map((item, index) => (
            <div key={item.week} className="mb-4 flex gap-3">
              <CheckCircle2 className={index === 0 ? 'text-emerald-700' : 'text-stone-300'} />
              <div>
                <p className="font-bold text-slate-950">{item.title}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Stat icon={<CalendarDays />} label="Días completados" value="7 / 30" />
        <Stat icon={<Flame />} label="Racha actual" value="3 días" />
        <Stat icon={<Trophy />} label="Acciones completadas" value="5 / 12" />
        <Stat icon={<Target />} label="Impacto estimado" value="+18%" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-950">Recursos y módulos recomendados</h2>
            <Link to="/learn" className="text-sm font-bold text-emerald-800">Ver todos</Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {modules.map((module) => (
              <Link key={module.id} to={`/learn/${module.id}`} className="rounded-lg border border-stone-200 p-4">
                <h3 className="font-bold text-slate-950">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              </Link>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-slate-950">Eventos Katalyst sugeridos</h2>
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="border-t border-stone-100 py-3 first:border-t-0">
              <p className="font-bold text-slate-950">{event.title}</p>
              <p className="text-sm text-slate-600">{event.format} · {new Date(event.date).toLocaleDateString('es-MX')}</p>
            </div>
          ))}
        </article>
      </section>
    </div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-lg bg-emerald-50 text-emerald-700">{icon}</div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </article>
  )
}
