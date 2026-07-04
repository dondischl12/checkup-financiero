import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Download,
  FileText,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

const screenshot = (name) => `${import.meta.env.BASE_URL}docs/screenshots/${name}.png`

const productFlow = [
  {
    title: 'Checkup privado',
    copy: 'El usuario completa preguntas financieras sin crear cuenta.',
    image: screenshot('checkup'),
    icon: ClipboardCheck,
  },
  {
    title: 'Snapshot financiero',
    copy: 'El score convierte ingresos, gastos, ahorro y deuda en una lectura accionable.',
    image: screenshot('snapshot'),
    icon: BarChart3,
  },
  {
    title: 'Reporte descargable',
    copy: 'El PDF resume métricas, fortalezas, riesgos, próximos pasos y privacidad beta.',
    image: screenshot('pdf'),
    icon: FileText,
  },
]

const capabilityRows = [
  ['Entrada', 'Respuestas del hogar, ingresos, gastos, deuda, ahorro y hábitos'],
  ['Cálculo', 'Motor determinístico con ratios explicables y recomendaciones'],
  ['Salida', 'Score, snapshot, PDF, plan de 30 días y módulos educativos iniciales'],
]

export default function LandingPage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="grid min-h-[calc(100dvh-8rem)] min-w-0 gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div className="min-w-0 py-4">
          <p className="k-eyebrow">Bienestar financiero, sin fricción</p>
          <h1 className="k-display mt-5 max-w-xl text-4xl leading-[1.04] sm:text-5xl md:text-6xl xl:text-[4.65rem]">
            <span className="block">Checkup</span>
            <span className="block">financiero</span>
          </h1>
          <p className="k-copy mt-5 max-w-[34ch] text-lg">
            Un producto privado para convertir presupuesto familiar en score, reporte y próximos pasos.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/checkup" className="k-primary px-6 py-4">
              Hacer mi checkup <ArrowRight size={18} />
            </Link>
            <Link to="/privacy" className="k-secondary px-6 py-4">
              Privacidad beta
            </Link>
          </div>
        </div>

        <HeroMockup />
      </section>

      <TrustBento />

      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="k-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Del checkup al plan.</h2>
          <p className="k-copy mt-4 text-lg">
            La experiencia completa está pensada como un recorrido educativo, no como una app bancaria intimidante.
          </p>
        </div>
        <div className="grid-flow-dense grid gap-5 lg:grid-cols-6">
          {productFlow.map((item, index) => (
            <ProductStep key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <BrowserFrame title="Learning path" image={screenshot('learning')} />
        <div className="space-y-5">
          <h2 className="k-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Educación inicial conectada al score.</h2>
          <p className="k-copy text-lg">
            La beta incluye módulos interactivos de presupuesto, fondo de emergencia y deuda. Recursos, calendario e historial quedan marcados como próximamente.
          </p>
          <div className="grid gap-3">
            <LearningRow title="Presupuesto" copy="Organizar flujo mensual y gastos variables." />
            <LearningRow title="Ahorro" copy="Construir fondo de emergencia y metas." />
            <LearningRow title="Deuda" copy="Priorizar pagos y reducir presión financiera." />
          </div>
          <Link to="/learn" className="k-secondary inline-flex">
            Ver módulos <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch">
        <article className="k-card p-6 md:p-8">
          <div className="k-icon-tile">
            <BookOpen size={22} />
          </div>
          <h2 className="k-display mt-5 text-2xl sm:text-3xl md:text-4xl">Motor explicable.</h2>
          <p className="k-copy mt-4">
            La metodología evalúa flujo mensual, ahorro, deuda, vivienda, fondo de emergencia, dependientes y hábitos.
          </p>
          <div className="mt-6 grid gap-4">
            {capabilityRows.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-t border-stone-100 pt-4 sm:grid-cols-[120px_1fr]">
                <p className="font-bold text-emerald-800">{label}</p>
                <p className="text-sm leading-6 text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </article>
        <BrowserFrame title="Detailed analysis" image={screenshot('analysis')} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <BrowserFrame title="Action plan" image={screenshot('action')} />
        <div className="space-y-5">
          <h2 className="k-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Acompañamiento después del reporte.</h2>
          <p className="k-copy text-lg">
            Después del snapshot, la beta ayuda a convertir claridad financiera en pasos pequeños. Recursos, eventos y seguimiento quedan listos como visión de producto.
          </p>
          <div className="grid gap-3">
            <ArchitectureLine title="Modo invitado" copy="Complete el checkup y descargue su PDF sin crear cuenta." />
            <ArchitectureLine title="Progreso opcional" copy="Próximamente: guardar snapshots sólo con consentimiento." />
            <ArchitectureLine title="Recursos Katalyst" copy="Próximamente: eventos y recursos conectados al resultado." />
          </div>
        </div>
      </section>

      <section className="k-shell grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="k-display text-2xl sm:text-3xl md:text-4xl">Una primera conversación financiera, sin juicio.</h2>
          <p className="k-copy mt-3 max-w-2xl">
            Hecho para educación comunitaria, privacidad práctica y una ruta clara hacia apoyo humano cuando se necesita.
          </p>
        </div>
        <Link to="/checkup" className="k-primary px-6 py-4">
          Empezar <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="relative min-w-0">
      <div className="absolute inset-6 rounded-lg bg-emerald-100/60 blur-3xl" />
      <div className="relative grid gap-4">
        <div className="group overflow-hidden rounded-lg">
          <BrowserFrame title="Financial snapshot" image={screenshot('snapshot')} priority hero />
        </div>
        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <article className="k-panel p-5">
            <div className="flex items-center gap-3">
              <span className="k-icon-tile h-10 w-10"><UserRound size={18} /></span>
              <div>
                <p className="font-bold text-slate-950">Cuenta opcional</p>
                <p className="text-sm text-slate-600">Próximamente con consentimiento.</p>
              </div>
            </div>
          </article>
          <article className="k-panel p-5">
            <p className="text-sm font-bold text-slate-500">Capacidad demostrada</p>
            <p className="mt-1 text-lg font-bold text-slate-950">Score, PDF y próximos pasos.</p>
            <p className="mt-1 text-xs font-bold text-amber-700">Módulos y recursos: próximamente.</p>
          </article>
        </div>
      </div>
    </div>
  )
}

function TrustBento() {
  return (
    <section className="grid-flow-dense grid gap-4 lg:grid-cols-4">
      <article className="k-card k-hover-lift p-6 lg:col-span-2">
        <ShieldCheck className="text-emerald-700" size={26} />
        <h2 className="k-display mt-5 max-w-lg text-2xl sm:text-3xl md:text-4xl">Diseñado para confianza antes que captura.</h2>
        <p className="k-copy mt-4 max-w-xl">
          El checkup funciona en modo invitado como snapshot de una sola sesión. Guardar progreso será una fase posterior con consentimiento.
        </p>
      </article>
      <article className="k-card k-hover-lift p-6">
        <LockKeyhole className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">Local-first</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">En esta beta no se guardan respuestas financieras sin cuenta.</p>
      </article>
      <article className="k-card k-hover-lift p-6">
        <Download className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">PDF claro</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Métricas, explicación y acciones concretas.</p>
      </article>
      <article className="k-card k-hover-lift p-6 lg:col-span-2">
        <BookOpen className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">Recursos conectados</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">El resultado sugiere temas; los módulos activos llegan próximamente.</p>
      </article>
      <article className="k-card k-hover-lift p-6 lg:col-span-2">
        <UserRound className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">Cuenta opcional</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">El historial queda como fase posterior y requerirá consentimiento explícito.</p>
      </article>
    </section>
  )
}

function BrowserFrame({ title, image, priority = false, hero = false }) {
  return (
    <figure className="k-browser-frame">
      <img
        src={image}
        alt={`${title} screen`}
        loading={priority ? 'eager' : 'lazy'}
        className={hero ? 'aspect-[4/3] w-full object-cover object-left-top md:aspect-auto md:object-contain' : 'w-full'}
      />
    </figure>
  )
}

function ProductStep({ item, index }) {
  const Icon = item.icon
  return (
    <article className={`k-card k-hover-lift group overflow-hidden ${index === 0 ? 'lg:col-span-2' : index === 1 ? 'lg:col-span-2 lg:-mt-6' : 'lg:col-span-2'}`}>
      <div className="border-b border-stone-100 p-5">
        <div className="mb-4 flex items-start gap-3">
          <span className="k-icon-tile h-11 w-11"><Icon size={20} /></span>
          <div>
            <h3 className="font-bold text-slate-950">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.copy}</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <img src={item.image} alt={`${item.title} screen`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
    </article>
  )
}

function LearningRow({ title, copy }) {
  return (
    <div className="grid gap-1 rounded-lg border border-stone-200 bg-white px-4 py-3 sm:grid-cols-[120px_1fr]">
      <p className="font-bold text-slate-950">{title}</p>
      <p className="text-sm leading-6 text-slate-600">{copy}</p>
    </div>
  )
}

function ArchitectureLine({ title, copy }) {
  return (
    <div className="flex gap-4 border-l-2 border-emerald-700/40 pl-4">
      <div>
        <p className="font-bold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
      </div>
    </div>
  )
}
