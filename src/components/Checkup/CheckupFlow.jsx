import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckup } from '../../hooks/useCheckup'
import { checkupQuestions } from '../../data/checkupQuestions'
import ProgressBar from '../shared/ProgressBar'
import SectionDivider from './SectionDivider'
import NumericQuestion from './NumericQuestion'
import OptionQuestion from './OptionQuestion'

export default function CheckupFlow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const { saveEntry } = useCheckup()
  const navigate = useNavigate()

  const currentQuestion = checkupQuestions[currentIndex]
  const total = checkupQuestions.length

  const showSectionDivider =
    currentIndex > 0 &&
    checkupQuestions[currentIndex - 1].seccion === 'numeros' &&
    currentQuestion.seccion === 'situacion'

  function handleNext(id, value) {
    const updated = { ...respuestas, [id]: value }
    setRespuestas(updated)
    if (currentIndex + 1 >= total) {
      saveEntry(updated)
      navigate('/dashboard')
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Check-up del mes</h1>
      <p className="text-gray-500 mb-6 text-sm capitalize">
        {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })} — tus números de este mes.
      </p>
      <ProgressBar current={currentIndex + 1} total={total} />
      {showSectionDivider && (
        <SectionDivider
          title="Tu situación general"
          subtitle="Elige la opción que más se acerca a tu realidad"
        />
      )}
      {currentQuestion.tipo === 'numero' ? (
        <NumericQuestion question={currentQuestion} data={respuestas} onNext={handleNext} />
      ) : (
        <OptionQuestion question={currentQuestion} onNext={handleNext} />
      )}
    </div>
  )
}
