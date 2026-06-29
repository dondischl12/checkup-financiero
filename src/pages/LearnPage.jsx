import { Link } from 'react-router-dom'
import { Award, Lock, Zap } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { readStorage, STORAGE_KEYS } from '../utils/storage'

export default function LearnPage() {
  const progress = readStorage(STORAGE_KEYS.learning, {})
  const totalXp = Object.values(progress).reduce((sum, item) => sum + (item.xp || 0), 0)
  const completed = Object.values(progress).filter((item) => item.completed).length
  const level = totalXp >= 400 ? 'Explorador avanzado' : totalXp >= 180 ? 'Constructor de habitos' : 'Inicio consciente'

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 p-6 text-white">
        <p className="text-sm font-semibold text-emerald-200">Academia financiera</p>
        <h1 className="mt-2 text-3xl font-bold">Aprende en pasos cortos y medibles</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="XP total" value={`${totalXp} XP`} icon={<Zap size={20} />} />
          <Stat label="Nivel actual" value={level} icon={<Award size={20} />} />
          <Stat label="Módulos completados" value={`${completed}`} icon={<Zap size={20} />} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {learningModules.map((module, index) => {
          const item = progress[module.id]
          const isSoftLocked = index > completed + 2
          return (
            <article key={module.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{module.badge}</span>
                {isSoftLocked ? <Lock size={18} className="text-slate-300" /> : <Award size={18} className="text-emerald-600" />}
              </div>
              <h2 className="text-xl font-bold text-slate-950">{module.title}</h2>
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{module.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.level}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.estimatedMinutes} min</span>
                <span className="rounded-full bg-slate-100 px-2 py-1">{module.xpReward} XP</span>
              </div>
              <div className="mt-5 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: item?.completed ? '100%' : item?.started ? '45%' : '0%' }} />
              </div>
              <Link to={`/learn/${module.id}`} className="mt-5 inline-flex w-full justify-center rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white">
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
