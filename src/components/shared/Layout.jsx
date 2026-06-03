import { NavLink, Outlet } from 'react-router-dom'
import { BarChart2, BookOpen, CalendarDays, ClipboardCheck, Home, LockKeyhole, ShieldCheck } from 'lucide-react'

const navItems = [
  ['/', 'Inicio', Home],
  ['/checkup', 'Checkup', ClipboardCheck],
  ['/dashboard', 'Mi panel', BarChart2],
  ['/learn', 'Aprender', BookOpen],
  ['/events', 'Eventos', CalendarDays],
  ['/admin', 'Consejo', ShieldCheck],
  ['/privacy', 'Privacidad', LockKeyhole],
]

export default function Layout() {
  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 font-bold text-white">K</span>
            <span>
              <span className="block text-base font-bold tracking-tight text-slate-950">Katalyst</span>
              <span className="block text-xs font-semibold text-emerald-700">Bienestar Financiero</span>
            </span>
          </NavLink>
          <nav className="flex gap-1 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map(([to, label, Icon]) => (
              <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
