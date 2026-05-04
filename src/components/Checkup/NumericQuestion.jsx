import { useState } from 'react'

export default function NumericQuestion({ question, data, onNext }) {
  const [value, setValue] = useState('')

  const numVal = Number(value)
  const contextText = value && numVal > 0 && question.contexto
    ? question.contexto(numVal, data)
    : ''

  function handleSubmit(e) {
    e.preventDefault()
    if (!value || numVal <= 0) return
    onNext(question.id, numVal)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <p className="text-lg font-medium text-gray-800 mb-1">{question.texto}</p>
      {question.hint && <p className="text-sm text-gray-400 mb-4">{question.hint}</p>}
      <div className="relative mb-2">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={question.placeholder || '0'}
          className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
      </div>
      {contextText && (
        <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg mb-4">{contextText}</p>
      )}
      <button
        type="submit"
        disabled={!value || numVal <= 0}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
      >
        Continuar
      </button>
    </form>
  )
}
