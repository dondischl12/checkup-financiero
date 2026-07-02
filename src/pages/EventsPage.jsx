import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, LockKeyhole, MapPinned, UsersRound } from 'lucide-react'

const resourceTracks = [
  ['Talleres comunitarios', 'Sesiones educativas sobre presupuesto, ahorro y deuda.'],
  ['Recursos descargables', 'Guías simples para acompañar el snapshot financiero.'],
  ['Calendario Katalyst', 'Eventos y espacios de apoyo cuando el programa esté activo.'],
]

export default function EventsPage() {
  return (
    <div className="k-page">
      <section className="k-scenic-hero grid gap-6 p-6 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p className="k-eyebrow flex items-center gap-2"><CalendarDays size={18} /> Próximamente</p>
          <h1 className="k-display mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">Recursos y calendario Katalyst</h1>
          <p className="k-copy mt-4 max-w-3xl text-lg">
            Esta sección mostrará talleres, recursos y espacios de apoyo conectados a las necesidades más comunes detectadas por el checkup.
          </p>
        </div>
        <div className="k-soft-card p-5">
          <LockKeyhole className="mb-4 text-emerald-700" />
          <h2 className="font-bold text-slate-950">Sin registros activos en esta beta</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            No estamos capturando inscripciones ni preferencias de eventos todavía. El beta real es el snapshot financiero de una sola sesión.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {resourceTracks.map(([title, copy], index) => (
          <article key={title} className="k-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="k-icon-tile">{index === 0 ? <UsersRound size={20} /> : index === 1 ? <MapPinned size={20} /> : <CalendarDays size={20} />}</span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Próximamente</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
          </article>
        ))}
      </section>

      <section className="k-shell grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="k-display text-2xl text-slate-950 sm:text-3xl">Primero, claridad financiera.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete el checkup para generar un reporte privado. Los recursos comunitarios se conectarán a este resultado en una siguiente fase.
          </p>
        </div>
        <Link to="/checkup" className="k-primary px-5 py-3">
          Hacer mi checkup <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
