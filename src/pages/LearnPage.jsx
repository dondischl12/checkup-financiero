import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, GraduationCap, LockKeyhole, PlayCircle, Sparkles, Star } from 'lucide-react'
import { learningContent, liveModuleIds } from '../data/learningContent'
import { learningModules } from '../data/learningModules'
import { getLastSnapshot } from '../utils/storage'

export default function LearnPage() {
  const snapshot = getLastSnapshot()
  const recommended = new Set(snapshot?.recommendations || [])
  const liveModules = liveModuleIds.map((id) => learningContent[id])
  const upcoming = learningModules.filter((module) => !liveModuleIds.includes(module.id))

  return (
    <div className="k-page">
      <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p className="k-eyebrow flex items-center gap-2"><GraduationCap size={18} /> Aprender</p>
          <h1 className="k-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Educación financiera, a su ritmo
          </h1>
          <p className="k-copy mt-4 max-w-3xl text-lg">
            Lecciones cortas e interactivas para adultos: conceptos claros, ejemplos reales en pesos y preguntas que
            enseñan. Cada módulo toma unos 30 minutos y está dividido en partes que puede tomar cuando quiera.
          </p>
        </div>
        <div className="k-soft-card p-5">
          <BookOpen className="mb-4 text-emerald-700" />
          <h2 className="font-bold text-slate-950">3 módulos disponibles hoy</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Presupuesto, fondo de emergencia y deuda. En modo invitado su avance vive solo durante la sesión;
            guardar progreso llegará con las cuentas.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {liveModules.map((module) => (
          <LiveModuleCard key={module.id} module={module} recommended={recommended.has(module.id)} />
        ))}
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-600" />
          <h2 className="k-display text-2xl text-slate-950 sm:text-3xl">Más módulos, próximamente</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((module) => (
            <article key={module.id} className="k-card p-5 opacity-95">
              <div className="mb-4 flex items-center justify-between">
                <span className="k-icon-tile"><BookOpen size={20} /></span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Próximamente</span>
              </div>
              <h3 className="text-lg font-bold text-slate-950">{module.title}</h3>
              <p className="mt-2 min-h-[64px] text-sm leading-6 text-slate-600">{module.description}</p>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-stone-50 px-4 py-3 text-sm font-bold text-slate-500">
                <Clock size={16} /> En preparación
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="k-shell grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="k-display text-2xl text-slate-950 sm:text-3xl">¿Aún no tiene su snapshot?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete el checkup para que le recomendemos por dónde empezar según su situación.
          </p>
        </div>
        <Link to="/checkup" className="k-primary px-5 py-3">
          Hacer mi checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}

function LiveModuleCard({ module, recommended }) {
  const parts = module.units.length
  const lessons = module.units.reduce((sum, unit) => sum + unit.steps.length, 0)
  return (
    <article className="k-card k-hover-lift flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="k-icon-tile"><BookOpen size={20} /></span>
        {recommended ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            <Star size={12} /> Recomendado para usted
          </span>
        ) : (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">Interactivo</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-950">{module.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{module.description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
        <span className="inline-flex items-center gap-1"><Clock size={14} /> ~{module.minutes} min</span>
        <span className="inline-flex items-center gap-1"><GraduationCap size={14} /> {parts} partes</span>
        <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {lessons} pasos</span>
      </div>
      <Link to={`/learn/${module.id}`} className="k-primary mt-5 justify-center">
        <PlayCircle size={18} /> Empezar módulo
      </Link>
    </article>
  )
}
