import { resources } from '../../data/resources'
import PDFLink from '../shared/PDFLink'
import { Lightbulb } from 'lucide-react'

export default function Recommendations({ latest }) {
  if (!latest) return null

  const suggested = []
  const sit = latest.situacion || {}

  if (sit.situacion_deudas === 'dificil' || sit.nivel_deuda === 'mas3') {
    suggested.push(resources.deudas)
  }
  if (sit.fondo_emergencia !== 'si_suficiente') {
    suggested.push(resources.ahorro)
  }
  if (sit.seguros === 'ninguno') {
    suggested.push(resources.seguros)
  }
  if (latest.ingreso > 0 && latest.ahorro / latest.ingreso < 0.1) {
    if (!suggested.find((r) => r.tema === 'presupuesto')) {
      suggested.push(resources.presupuesto)
    }
  }

  const unique = [...new Map(suggested.map((r) => [r.tema, r])).values()]
  if (unique.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={18} className="text-amber-500" />
        <p className="text-sm font-semibold text-gray-700">Recursos que pueden interesarte</p>
      </div>
      <div className="space-y-3">
        {unique.map((r) => (
          <PDFLink key={r.tema} titulo={r.titulo} descripcion={r.descripcion} url={r.url} />
        ))}
      </div>
    </div>
  )
}
