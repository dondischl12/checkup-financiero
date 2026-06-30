import { useState } from 'react'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import { events } from '../data/events'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

const filters = ['Todos', 'Presupuesto', 'Deuda', 'Ahorro', 'Jóvenes', 'Familia']

export default function EventsPage() {
  const [filter, setFilter] = useState('Todos')
  const [interest, setInterest] = useState(readStorage(STORAGE_KEYS.eventInterest, []))
  const visible = filter === 'Todos' ? events : events.filter((event) => event.category === filter)

  function markInterest(eventId) {
    const next = interest.includes(eventId) ? interest : [...interest, eventId]
    setInterest(next)
    writeStorage(STORAGE_KEYS.eventInterest, next)
  }

  return (
    <div className="k-page">
      <section className="k-shell relative overflow-hidden bg-[#071832] p-6 text-white">
        <div className="k-landscape opacity-20" />
        <div className="relative z-10">
          <CalendarDays className="mb-4 text-emerald-200" />
          <h1 className="k-display text-4xl text-white">Eventos y recursos Katalyst</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Talleres y conversaciones para aprender en comunidad, conectados a los temas que aparecen en su snapshot.</p>
        </div>
      </section>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`k-focus rounded-full px-4 py-2 text-sm font-bold ${filter === item ? 'bg-slate-950 text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>
            {item}
          </button>
        ))}
      </div>
      <section className="grid gap-4 md:grid-cols-2">
        {visible.map((event) => {
          const selected = interest.includes(event.id)
          return (
            <article key={event.id} className="k-card p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{event.category}</span>
                <span className="text-sm font-semibold text-slate-500">{event.format}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-950">{event.title}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {new Date(event.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="mt-3 min-h-[72px] leading-7 text-slate-600">{event.description}</p>
              <button type="button" onClick={() => markInterest(event.id)} className={`k-focus mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold ${selected ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-950 text-white'}`}>
                {selected && <CheckCircle2 size={18} />} {selected ? 'Interés registrado' : 'Me interesa'}
              </button>
            </article>
          )
        })}
      </section>
    </div>
  )
}
