import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, BookOpen, Building2, ClipboardCheck, Home, UserRound } from 'lucide-react'

const navItems = [
  ['/', 'Inicio', Home],
  ['/checkup', 'Checkup', ClipboardCheck],
  ['/learn', 'Aprender', BookOpen],
  ['/events', 'Recursos', BarChart3],
  ['/admin', 'Admin', Building2],
]

export default function Layout() {
  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
      isActive ? 'bg-[#071832] text-white shadow-sm' : 'text-slate-600 hover:bg-stone-100 hover:text-slate-950'
    }`

  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#fbfaf6]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <NavLink to="/" className="flex items-center gap-3 text-2xl font-black tracking-[0.22em] text-[#071832]">
            KATALYST
          </NavLink>
          <nav className="flex gap-1 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map(([to, label, Icon]) => (
              <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/login" className="hidden items-center gap-2 rounded-lg bg-[#071832] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-stone-300 md:inline-flex">
            <UserRound size={16} /> Iniciar sesión
          </NavLink>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:py-10">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-stone-200 bg-[#fbfaf6]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="text-xl font-black tracking-[0.22em] text-slate-950">KATALYST</p>
          <p>Tecnología y educación financiera al servicio de comunidades fuertes.</p>
          <p>Privacidad · Términos · Ayuda</p>
        </div>
      </footer>
    </div>
  )
}
