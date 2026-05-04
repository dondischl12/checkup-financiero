import { useQuiz } from '../../hooks/useQuiz'
import ProgressBar from '../shared/ProgressBar'
import QuestionCard from './QuestionCard'
import ResultsEducativo from './ResultsEducativo'

export default function QuizEducativo() {
  const { currentQuestion, currentIndex, total, answer, finished, recursosSugeridos, restart } = useQuiz()

  if (finished) {
    return <ResultsEducativo recursos={recursosSugeridos} onRestart={restart} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Quiz de educación financiera</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Descubre qué recursos pueden ayudarte más según tus respuestas.
      </p>
      <ProgressBar current={currentIndex + 1} total={total} />
      <QuestionCard
        question={currentQuestion}
        onAnswer={(optionId) => answer(currentQuestion.id, optionId)}
      />
    </div>
  )
}
