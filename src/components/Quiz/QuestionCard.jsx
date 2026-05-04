import { useState } from 'react'

const TEMA_LABELS = {
  deudas: 'Deudas',
  ahorro: 'Ahorro',
  seguros: 'Seguros',
  inversion: 'Inversión',
  presupuesto: 'Presupuesto',
  retiro: 'Retiro',
}

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(optionId) {
    if (selected) return
    setSelected(optionId)
    setTimeout(() => {
      setSelected(null)
      onAnswer(optionId)
    }, 500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-3">
        {TEMA_LABELS[question.tema] || question.tema}
      </span>
      <p className="text-lg font-medium text-gray-800 mb-5">{question.texto}</p>
      <div className="space-y-3">
        {question.opciones.map((op) => {
          const isSelected = selected === op.id
          return (
            <button
              key={op.id}
              onClick={() => handleSelect(op.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-bold mr-2 text-gray-400">{op.id.toUpperCase()}.</span>
              {op.texto}
            </button>
          )
        })}
      </div>
    </div>
  )
}
