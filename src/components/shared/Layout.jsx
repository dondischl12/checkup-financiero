import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, ClipboardCheck, BarChart2 } from 'lucide-react'

export default function Layout() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-blue-700 text-lg tracking-tight">CheckUp Financiero</span>
          <nav className="flex gap-1">
            <NavLink to="/quiz" className={linkClass}>
              <BookOpen size={16} />
              Quiz
            </NavLink>
            <NavLink to="/checkup" className={linkClass}>
              <ClipboardCheck size={16} />
              Check-up
            </NavLink>
            <NavLink to="/dashboard" className={linkClass}>
              <BarChart2 size={16} />
              Mi Panel
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
