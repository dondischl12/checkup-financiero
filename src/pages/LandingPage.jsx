import { lazy, Suspense } from 'react'
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
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Lazy: pulls in three.js/@react-three-fiber, so only the Landing route ever loads it,
// and only when the visitor hasn't asked for reduced motion.
const ShaderHero = lazy(() => import('../components/shared/ShaderHero'))

const screenshot = (name) => `${import.meta.env.BASE_URL}docs/screenshots/${name}.png`

const productFlow = [
  {
    title: 'Checkup privado',
    copy: 'El usuario completa preguntas financieras sin crear cuenta ni registrarse.',
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
    copy: 'El PDF resume métricas, fortalezas, áreas de enfoque y próximos pasos.',
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
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="relative -mx-4 grid min-h-[calc(100dvh-9rem)] min-w-0 gap-10 px-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <ShaderHero className="absolute inset-x-0 -top-24 bottom-0 -z-10 opacity-55" />
          </Suspense>
        )}
        <div className="min-w-0 py-4">
          <p className="k-eyebrow">Bienestar financiero, sin fricción</p>
          <h1 className="k-display mt-5 max-w-xl text-[2.75rem] leading-[0.98] tracking-[-0.02em] sm:text-6xl md:text-7xl xl:text-[5.2rem]">
            <span className="block">Checkup</span>
            <span className="block text-emerald-800">financiero</span>
          </h1>
          <p className="k-copy mt-6 max-w-[38ch] text-lg">
            Convierta el presupuesto de su hogar en un score explicable, un reporte completo y un
            siguiente paso concreto. Sin cuenta, sin registro, en una sola sesión privada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/checkup" className="k-primary px-6 py-4 text-base">
              Hacer mi checkup <ArrowRight size={18} />
            </Link>
            <Link to="/privacy" className="k-secondary px-6 py-4 text-base">
              Cómo cuidamos sus datos
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-stone-300/70 pt-5">
            {[
              ['8', 'áreas evaluadas'],
              ['~6', 'minutos'],
              ['0', 'datos guardados'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold tabular-nums text-slate-950">{value}</dt>
                <dd className="mt-0.5 text-xs font-semibold leading-tight text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
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
            <ArchitectureLine title="Sesión privada" copy="Complete el checkup y descargue su PDF sin crear cuenta." />
            <ArchitectureLine title="Plan de 30 días" copy="El reporte cierra con cuatro pasos concretos, no con un veredicto." />
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
              <span className="k-icon-tile h-10 w-10"><LockKeyhole size={18} /></span>
              <div>
                <p className="font-bold text-slate-950">Sin cuenta</p>
                <p className="text-sm text-slate-600">Nada se guarda ni se rastrea.</p>
              </div>
            </div>
          </article>
          <article className="k-panel p-5">
            <p className="text-sm font-bold text-slate-500">Lo que obtiene</p>
            <p className="mt-1 text-lg font-bold text-slate-950">Score, reporte completo y PDF.</p>
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
          No hay cuentas ni registro. El checkup vive como una sola sesión privada en su navegador y desaparece al cerrarla.
        </p>
      </article>
      <article className="k-card k-hover-lift p-6">
        <LockKeyhole className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">Sin base de datos</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Sus respuestas financieras nunca se envían ni se almacenan.</p>
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
        <BarChart3 className="text-emerald-700" size={24} />
        <h3 className="mt-5 font-bold text-slate-950">Score explicable</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Ocho áreas con su peso a la vista; nunca un puntaje aislado sin contexto.</p>
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
