import { useState } from 'react'
import { quizQuestions } from '../data/quizQuestions'
import { resources } from '../data/resources'
import { calcQuizScore, getRecursos } from '../utils/scoring'

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [finished, setFinished] = useState(false)

  const currentQuestion = quizQuestions[currentIndex]
  const total = quizQuestions.length

  function answer(questionId, optionId) {
    const updated = { ...respuestas, [questionId]: optionId }
    setRespuestas(updated)
    if (currentIndex + 1 >= total) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function restart() {
    setCurrentIndex(0)
    setRespuestas({})
    setFinished(false)
  }

  const recursosSugeridos = finished
    ? getRecursos(calcQuizScore(respuestas, quizQuestions), resources)
    : []

  return { currentQuestion, currentIndex, total, answer, finished, recursosSugeridos, restart }
}
