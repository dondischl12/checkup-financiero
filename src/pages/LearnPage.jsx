import { Link } from 'react-router-dom'
import { Award, BookOpen, Clock, Lock } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { readStorage, STORAGE_KEYS } from '../utils/storage'

export default function LearnPage() {
  const progress = readStorage(STORAGE_KEYS.learning, {})
  const completed = Object.values(progress).filter((item) => item.completed).length
  const started = Object.values(progress).filter((item) => item.started).length
  const totalMinutes = learningModules.reduce((sum, module) => sum + module.estimatedMinutes, 0)

  return (
    <div className="k-page">
      <section className="k-shell relative overflow-hidden bg-[#071832] p-6 text-white">
        <div className="k-landscape opacity-20" />
        <div className="relative z-10">
          <p className="text-sm font-bold text-emerald-200">Academia financiera</p>
          <h1 className="k-display mt-2 text-4xl text-white">Aprenda a su ritmo</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">Módulos prácticos conectados a su snapshot financiero, diseñados para avanzar con claridad y sin presión.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Módulos iniciados" value={`${started}`} icon={<BookOpen size={20} />} />
            <Stat label="Módulos completados" value={`${completed}`} icon={<Award size={20} />} />
            <Stat label="Tiempo total estimado" value={`${totalMinutes} min`} icon={<Clock size={20} />} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {learningModules.map((module, index) => {
          const item = progress[module.id]
          const isSoftLocked = index > completed + 2
          return (
            <article key={module.id} className="k-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{module.badge}</span>
                {isSoftLocked ? <Lock size={18} className="text-slate-300" /> : <Award size={18} className="text-emerald-600" />}
              </div>
              <h2 className="text-xl font-bold text-slate-950">{module.title}</h2>
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{module.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.level}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.estimatedMinutes} min</span>
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.quizQuestions.length || 2} actividades</span>
              </div>
              <div className="mt-5 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: item?.completed ? '100%' : item?.started ? '45%' : '0%' }} />
              </div>
              <Link to={`/learn/${module.id}`} className="k-primary mt-5 inline-flex w-full">
                {item?.completed ? 'Repasar' : item?.started ? 'Continuar' : 'Empezar'}
              </Link>
            </article>
          )
        })}
      </section>
    </div>
  )
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-lg bg-white/10 p-4">
      <div className="mb-2 text-emerald-200">{icon}</div>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  )
}
