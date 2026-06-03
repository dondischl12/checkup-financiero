import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, LayoutDashboard, LockKeyhole } from 'lucide-react'

const features = [
  ['Checkup financiero mensual', 'Medicion guiada para entender avances y areas de atencion.'],
  ['Panel personal', 'Indicadores privados, recomendaciones y progreso mes a mes.'],
  ['Academia financiera', 'Módulos cortos con XP, badges y quizzes motivadores.'],
  ['Eventos y recursos Katalyst', 'Talleres, webinars y sesiones comunitarias.'],
  ['Privacidad primero', 'El consejo ve tendencias agregadas, no datos financieros individuales.'],
]

export default function LandingPage() {
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6 py-8">
          <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Katalyst Bienestar Financiero
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              Bienestar financiero para nuestra comunidad
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Una plataforma privada para medir, aprender y mejorar tu salud financiera mes a mes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            >
              Entrar al demo <ArrowRight size={18} />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              Ver academia <BookOpen size={18} />
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-white/70 bg-white/80 p-5 shadow-2xl shadow-slate-200 backdrop-blur">
          <div className="rounded-lg bg-gradient-to-br from-emerald-100 via-white to-amber-100 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Score demo</p>
                <p className="text-5xl font-bold text-slate-950">78</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
                Estable
              </span>
            </div>
            <div className="space-y-3">
              {['Fondo de emergencia', 'Presupuesto mensual', 'Protección familiar'].map((item, index) => (
                <div key={item} className="rounded-lg bg-white/85 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>{item}</span>
                    <span>{[62, 78, 54][index]}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${[62, 78, 54][index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {features.map(([title, copy], index) => {
          const Icon = [CheckCircle2, LayoutDashboard, BookOpen, CalendarDays, LockKeyhole][index]
          return (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="mb-4 text-emerald-700" size={24} />
              <h2 className="mb-2 text-base font-bold text-slate-900">{title}</h2>
              <p className="text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          )
        })}
      </section>

      <section className="rounded-lg bg-slate-950 p-8 text-white shadow-xl shadow-slate-200">
        <p className="max-w-4xl text-xl leading-9">
          Katalyst puede entender necesidades generales de la comunidad a través de métricas agregadas y anónimas,
          sin acceder al detalle financiero individual de cada persona.
        </p>
      </section>
    </div>
  )
}
