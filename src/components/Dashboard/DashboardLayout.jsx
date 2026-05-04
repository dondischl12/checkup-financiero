import { useNavigate } from 'react-router-dom'
import { ClipboardCheck } from 'lucide-react'
import { useCheckup } from '../../hooks/useCheckup'
import MetricCards from './MetricCards'
import DonutChart from './DonutChart'
import BenchmarkBars from './BenchmarkBars'
import TrendChart from './TrendChart'
import Recommendations from './Recommendations'

export default function DashboardLayout() {
  const { latest, previous, entries } = useCheckup()
  const navigate = useNavigate()

  if (!latest) {
    return (
      <div className="text-center py-16">
        <ClipboardCheck size={48} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Aún no tienes datos</h2>
        <p className="text-gray-400 text-sm mb-6">
          Completa tu primer check-up mensual para ver tu panel.
        </p>
        <button
          onClick={() => navigate('/checkup')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Hacer mi primer check-up
        </button>
      </div>
    )
  }

  const mesLabel = new Date(latest.year, latest.month - 1).toLocaleDateString('es-MX', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mi panel</h1>
          <p className="text-gray-400 text-sm capitalize">{mesLabel}</p>
        </div>
        <button
          onClick={() => navigate('/checkup')}
          className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
        >
          Actualizar
        </button>
      </div>
      <MetricCards latest={latest} previous={previous} />
      <DonutChart latest={latest} />
      <BenchmarkBars latest={latest} />
      <TrendChart entries={entries} />
      <Recommendations latest={latest} />
    </div>
  )
}
