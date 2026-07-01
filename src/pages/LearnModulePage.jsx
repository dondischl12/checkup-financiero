import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, LockKeyhole } from 'lucide-react'

export default function LearnModulePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="k-scenic-hero p-8">
        <div className="k-icon-tile mb-5"><BookOpen size={24} /></div>
        <p className="k-eyebrow">Próximamente</p>
        <h1 className="k-display mt-3 text-5xl text-slate-950">Módulos educativos en preparación</h1>
        <p className="k-copy mt-4 max-w-2xl">
          En esta beta no hay lecciones, quizzes ni progreso activo. Los módulos se conectarán al snapshot cuando la fase educativa esté lista.
        </p>
        <div className="mt-6 rounded-lg bg-white/80 p-5 text-sm leading-6 text-slate-600">
          <LockKeyhole className="mb-3 text-emerald-700" />
          No se guarda progreso educativo en esta versión.
        </div>
        <Link to="/checkup" className="k-primary mt-6 inline-flex px-5 py-3">
          Hacer mi checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
