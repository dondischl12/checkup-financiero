import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, Flame, Target, Trophy } from 'lucide-react'
import { liveModuleIds } from '../data/learningContent'
import { learningModules } from '../data/learningModules'
import { getLastSnapshot } from '../utils/storage'

export default function ActionPlanPage() {
  const snapshot = getLastSnapshot()
  if (!snapshot) return <div className="rounded-lg bg-white p-8 text-center">Complete su checkup para activar su plan de acción.</div>
  const modules = learningModules.filter((module) => snapshot.recommendations.includes(module.id)).slice(0, 3)

  return (
    <div className="k-scenic-page space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-emerald-100 bg-emerald-50/80 p-5 md:flex-row md:items-center">
        <p className="font-bold text-emerald-900">Basado en su snapshot y perfil del hogar</p>
        <Link to="/snapshot" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-bold text-emerald-800">Ver mi snapshot <ArrowRight size={16} /></Link>
      </section>

      <section className="k-scenic-hero p-6">
        <h1 className="k-display text-3xl text-slate-950 sm:text-4xl md:text-5xl">Su plan de acción</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">Un plan personalizado de 30 días para avanzar hacia sus metas con pasos pequeños y sostenibles.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="k-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="k-display text-2xl text-slate-950">Roadmap de 30 días</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800">Guía sugerida</span>
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
        <article className="k-card p-6">
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
        <Stat icon={<CalendarDays />} label="Horizonte sugerido" value="30 días" />
        <Stat icon={<Flame />} label="Modo beta" value="Una sesión" />
        <Stat icon={<Trophy />} label="Seguimiento" value="Próximamente" />
        <Stat icon={<Target />} label="Objetivo" value="Claridad" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <article className="k-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-950">Módulos recomendados</h2>
            <Link to="/learn" className="text-sm font-bold text-emerald-800">Ver módulos</Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {modules.map((module) => (
              <article key={module.id} className="rounded-lg border border-stone-200 p-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${liveModuleIds.includes(module.id) ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-700'}`}>
                  {liveModuleIds.includes(module.id) ? 'Disponible' : 'Próximamente'}
                </span>
                <h3 className="font-bold text-slate-950">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
                {liveModuleIds.includes(module.id) && (
                  <Link to={`/learn/${module.id}`} className="mt-3 inline-flex text-sm font-bold text-emerald-800">
                    Abrir módulo <ArrowRight size={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </article>
        <article className="k-card p-6">
          <h2 className="mb-4 font-bold text-slate-950">Recursos Katalyst</h2>
          <p className="text-sm leading-6 text-slate-600">
            Los talleres, guías y eventos se conectarán al snapshot en una siguiente fase. En esta beta no se registran inscripciones ni preferencias de eventos.
          </p>
          <Link to="/events" className="k-secondary mt-5 inline-flex">Ver recursos próximos <ArrowRight size={16} /></Link>
        </article>
      </section>
    </div>
  )
}

function Stat({ icon, label, value }) {
  return (
    <article className="k-card p-5">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-lg bg-emerald-50 text-emerald-700">{icon}</div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </article>
  )
}
