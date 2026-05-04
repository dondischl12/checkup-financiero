import { BookOpen, CheckCircle, RotateCcw } from 'lucide-react'
import PDFLink from '../shared/PDFLink'

export default function ResultsEducativo({ recursos, onRestart }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle className="text-green-500" size={28} />
        <h1 className="text-2xl font-bold text-gray-800">¡Terminaste el quiz!</h1>
      </div>
      <p className="text-gray-500 mb-8 text-sm">
        Aquí tienes los recursos que pueden ayudarte a seguir aprendiendo.
      </p>

      {recursos.length === 0 ? (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
          <p className="text-green-700 font-medium text-lg mb-1">¡Excelente conocimiento financiero!</p>
          <p className="text-green-600 text-sm">No hay recursos adicionales por ahora. Sigue así.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-blue-500" />
            <h2 className="font-semibold text-gray-700">Recursos recomendados para ti</h2>
          </div>
          <div className="space-y-3 mb-8">
            {recursos.map((r) => (
              <PDFLink key={r.tema} titulo={r.titulo} descripcion={r.descripcion} url={r.url} />
            ))}
          </div>
        </>
      )}

      <button
        onClick={onRestart}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mt-6"
      >
        <RotateCcw size={14} />
        Volver a intentar
      </button>
    </div>
  )
}
