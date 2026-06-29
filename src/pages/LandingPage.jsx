import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Download, LineChart, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const metrics = [
  ['Ingresos', '$45,000'],
  ['Gastos', '$28,500'],
  ['Ahorro', '$8,500'],
  ['Deuda', '$14,000'],
]

const modules = [
  ['Presupuesto', 'Planifique su dinero y tome el control de sus gastos.', '75%'],
  ['Ahorro', 'Construya un fondo sólido y alcance sus metas.', '60%'],
  ['Deuda', 'Entienda su deuda y diseñe un plan para reducirla.', '40%'],
  ['Eventos', 'Prepárese financieramente para momentos especiales.', '30%'],
]

export default function LandingPage() {
  return (
    <div className="k-page">
      <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7 py-8">
          <p className="k-eyebrow">Su bienestar financiero comienza con claridad.</p>
          <div>
            <h1 className="k-display text-6xl md:text-7xl">
              Su checkup financiero, claro y privado.
            </h1>
            <p className="k-copy mt-5 max-w-2xl text-lg">
              En 5 minutos obtenga una fotografía privada de su situación financiera. Descargue su reporte, aprenda a su ritmo y, si lo desea, conecte con recursos de Katalyst.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/checkup" className="k-primary px-6 py-4">
              Hacer mi checkup <ArrowRight size={18} />
            </Link>
            <Link to="/learn" className="k-secondary px-6 py-4">
              Explorar recursos
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [ShieldCheck, 'Sin cuenta'],
              [LineChart, '5 minutos'],
              [LockKeyhole, 'Datos locales'],
            ].map(([Icon, label]) => (
              <div key={label} className="k-soft-card flex items-center gap-3 px-4 py-3 font-bold text-emerald-900">
                <Icon size={20} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div className="k-shell relative min-h-[560px] overflow-hidden bg-gradient-to-br from-emerald-50 via-[#fbfaf6] to-stone-200 p-6">
          <div className="k-landscape" />
          <div className="absolute left-10 top-10 z-10 h-28 w-28 rounded-full border border-emerald-700/20" />
          <div className="absolute left-4 top-4 z-10 h-44 w-44 rounded-full border border-emerald-700/10" />
          <div className="relative z-10 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <article className="k-soft-card p-6 md:translate-y-10">
              <p className="text-sm font-bold text-slate-600">Su puntaje financiero</p>
              <div className="k-score-ring mx-auto mt-5 h-44 w-44" style={{ '--score-deg': '259deg' }}>
                <div className="text-center">
                  <p className="text-6xl font-bold text-slate-950">72</p>
                  <p className="font-bold text-slate-500">/100</p>
                </div>
              </div>
              <p className="mt-4 text-center font-bold text-emerald-800">Bien encaminado</p>
              <p className="mt-3 text-center text-sm leading-6 text-slate-600">Siga así. Hay oportunidades para fortalecer ahorro y reducir deuda.</p>
            </article>
            <article className="k-soft-card p-6 md:translate-y-20">
              <p className="font-bold text-slate-950">Resumen financiero <span className="text-xs font-normal text-slate-500">(mensual)</span></p>
              <div className="mt-4 divide-y divide-stone-100">
                {metrics.map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3 text-sm">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-bold text-slate-950">{value}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="k-soft-card p-5 md:col-span-1 md:col-start-1 md:translate-y-10">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-700 text-white"><Sparkles /></span>
                <div>
                  <p className="font-bold text-slate-950">Mejora principal</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Reducir gastos hormiga puede liberar flujo mensual y acelerar su fondo de emergencia.</p>
                </div>
              </div>
            </article>
            <article className="k-soft-card p-5 md:col-start-2 md:translate-y-12">
              <p className="font-bold text-slate-950">Evolución con cuenta</p>
              <div className="mt-4 flex h-24 items-end gap-2">
                {[28, 38, 46, 62, 55, 68, 72].map((height, index) => (
                  <span key={index} className="flex-1 rounded-t bg-emerald-700/70" style={{ height: `${height}%` }} />
                ))}
              </div>
              <p className="mt-3 text-xs font-bold text-emerald-800">Guarde snapshots para comparar progreso.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Feature icon={<LockKeyhole />} title="Checkup privado" copy="Sus respuestas son confidenciales y se procesan localmente en su dispositivo." />
        <Feature icon={<Download />} title="Reporte descargable" copy="Reciba un snapshot claro con score, métricas, recomendaciones y próximos pasos." />
        <Feature icon={<BookOpen />} title="Aprenda y avance" copy="Módulos prácticos conectados a su resultado financiero." />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="k-display text-3xl">Aprenda a su ritmo con módulos diseñados para usted</h2>
          <Link to="/learn" className="inline-flex items-center gap-2 font-bold text-emerald-800">Ver todos <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {modules.map(([title, copy, progress]) => (
            <article key={title} className="k-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative mb-4 h-28 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-50 to-stone-100">
                <div className="k-landscape opacity-70" />
              </div>
              <h3 className="font-bold text-slate-950">{title}</h3>
              <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">{copy}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-stone-100"><div className="h-2 rounded-full bg-emerald-700" style={{ width: progress }} /></div>
                <span className="text-xs font-bold text-slate-500">{progress}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function Feature({ icon, title, copy }) {
  return (
    <article className="k-card flex gap-5 p-6">
      <span className="k-icon-tile h-14 w-14">{icon}</span>
      <div>
        <h2 className="font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
      </div>
    </article>
  )
}
