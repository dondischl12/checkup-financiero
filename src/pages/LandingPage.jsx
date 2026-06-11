import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

const homeUrl = 'https://dondischl12.github.io/checkup-financiero/'
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(homeUrl)}`

const platformStats = [
  ['128', 'miembros activos'],
  ['89', 'checkups este mes'],
  ['95', 'módulos completados'],
  ['6', 'solicitudes abiertas'],
]

const userFeatures = [
  [ClipboardCheck, 'Checkup mensual', 'Diagnóstico guiado de ingresos, gastos, ahorro, deuda, seguros y estrés financiero.'],
  [BookOpen, 'Ruta educativa', 'Módulos cortos, quizzes y recursos recomendados según necesidades detectadas.'],
  [CalendarDays, 'Eventos y apoyo', 'Talleres, webinars y solicitudes de contacto con el equipo de Katalyst.'],
]

const adminFeatures = [
  [BarChart3, 'Análisis agregado', 'Distribución de scores, necesidades prioritarias y progreso educativo por módulo.'],
  [Users, 'Señales comunitarias', 'Interés en eventos, solicitudes de ayuda y participación mensual.'],
  [ShieldCheck, 'Privacidad operativa', 'El consejo ve tendencias; los datos financieros individuales permanecen privados.'],
]

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="grid min-h-[calc(100vh-9rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6 py-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            <Sparkles size={16} /> Katalyst Bienestar Financiero
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl lg:text-6xl">
              Una plataforma para cuidar la salud financiera de la comunidad
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Katalyst conecta a miembros con checkups, educación y apoyo práctico, mientras ofrece al consejo una
              vista agregada para tomar mejores decisiones sin exponer información personal.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/login"
              className="group rounded-lg bg-slate-950 p-5 text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/10">
                  <Users size={22} />
                </span>
                <ArrowRight className="transition group-hover:translate-x-1" size={20} />
              </div>
              <h2 className="text-xl font-bold">Entrar como miembro</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Mock sign in para abrir el checkup, dashboard personal y recursos educativos.
              </p>
            </Link>
            <Link
              to="/admin-login"
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:bg-amber-50"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-amber-100 text-amber-800">
                  <Building2 size={22} />
                </span>
                <ArrowRight className="transition group-hover:translate-x-1" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-950">Entrar como admin</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Acceso staged al panel corporativo con métricas agregadas e insights.
              </p>
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <section className="rounded-lg border border-white/70 bg-white/85 p-5 shadow-2xl shadow-slate-200 backdrop-blur">
            <div className="rounded-lg bg-gradient-to-br from-emerald-100 via-white to-amber-100 p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Community intelligence</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">Del bienestar individual a mejores programas</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
                  Live demo
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {platformStats.map(([value, label]) => (
                  <article key={label} className="rounded-lg bg-white/85 p-4 shadow-sm">
                    <p className="text-3xl font-bold text-slate-950">{value}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-center">
            <a href={homeUrl} target="_blank" rel="noreferrer" className="w-fit rounded-lg border border-slate-200 bg-white p-3">
              <img src={qrUrl} alt="QR para abrir Katalyst Bienestar Financiero" className="h-36 w-36" />
            </a>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                <QrCode size={14} /> QR listo
              </div>
              <h2 className="text-xl font-bold text-slate-950">Escanea para abrir el homepage</h2>
              <p className="mt-2 break-words text-sm leading-6 text-slate-600">{homeUrl}</p>
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ExperienceBlock
          eyebrow="User experience"
          title="Para miembros de la comunidad"
          copy="Un recorrido privado que empieza con un checkup mensual y termina en acciones concretas: aprender, pedir apoyo o actualizar progreso."
          features={userFeatures}
        />
        <ExperienceBlock
          eyebrow="Corporate analysis"
          title="Para consejo y administración"
          copy="Un panel ejecutivo para detectar prioridades, planear talleres y medir impacto sin revisar datos financieros individuales."
          features={adminFeatures}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['1', 'Miembro completa checkup', 'La plataforma captura señales financieras clave con lenguaje simple y no punitivo.'],
          ['2', 'Sistema recomienda recursos', 'El usuario recibe rutas educativas, eventos y opciones de contacto según su contexto.'],
          ['3', 'Consejo ve patrones', 'Katalyst prioriza programas con datos agregados sobre necesidades reales de la comunidad.'],
        ].map(([step, title, copy]) => (
          <article key={step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-slate-950 font-bold text-white">{step}</div>
            <h2 className="text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg bg-slate-950 p-8 text-white shadow-xl shadow-slate-200">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              <LockKeyhole size={16} /> Privacidad primero
            </div>
            <p className="max-w-4xl text-xl leading-9">
              La demo separa claramente la experiencia individual del análisis corporativo: el usuario controla su
              recorrido, y el consejo trabaja con tendencias agregadas para diseñar mejores apoyos.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950">
              User sign in <ArrowRight size={18} />
            </Link>
            <Link to="/admin-login" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">
              Admin sign in <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ExperienceBlock({ eyebrow, title, copy, features }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{copy}</p>
      <div className="mt-6 grid gap-3">
        {features.map(([Icon, featureTitle, featureCopy]) => (
          <div key={featureTitle} className="flex gap-3 rounded-lg bg-slate-50 p-4">
            <Icon className="mt-1 shrink-0 text-emerald-700" size={20} />
            <div>
              <h3 className="font-bold text-slate-950">{featureTitle}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{featureCopy}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
