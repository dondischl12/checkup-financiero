export default function OptionQuestion({ question, onNext }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-lg font-medium text-gray-800 mb-5">{question.texto}</p>
      <div className="space-y-3">
        {question.opciones.map((op) => (
          <button
            key={op.id}
            onClick={() => onNext(question.id, op.id)}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm font-medium text-gray-700 transition-all"
          >
            {op.texto}
          </button>
        ))}
      </div>
    </div>
  )
}
