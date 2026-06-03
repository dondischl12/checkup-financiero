import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Award, CheckCircle2 } from 'lucide-react'
import { learningModules } from '../data/learningModules'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'

export default function LearnModulePage() {
  const { moduleId } = useParams()
  const module = learningModules.find((item) => item.id === moduleId) || learningModules[0]
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const progress = readStorage(STORAGE_KEYS.learning, {})
  const questions = module.quizQuestions.length ? module.quizQuestions : fallbackQuestions(module)

  const score = useMemo(() => {
    const correct = questions.filter((question, index) => Number(answers[index]) === question.answer).length
    return Math.round((correct / questions.length) * 100)
  }, [answers, questions])

  function submit(event) {
    event.preventDefault()
    const passed = score >= 70
    const current = readStorage(STORAGE_KEYS.learning, {})
    writeStorage(STORAGE_KEYS.learning, {
      ...current,
      [module.id]: {
        started: true,
        completed: passed,
        score,
        xp: passed ? module.xpReward : current[module.id]?.xp || 0,
        completedAt: passed ? new Date().toISOString() : current[module.id]?.completedAt,
      },
    })
    setResult({ passed, score })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-emerald-200">{module.level} · {module.estimatedMinutes} min</p>
        <h1 className="mt-2 text-3xl font-bold">{module.title}</h1>
        <p className="mt-3 leading-7 text-slate-300">{module.description}</p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-950">Lección corta</h2>
        <div className="grid gap-3">
          {module.lessons.map((lesson, index) => (
            <p key={lesson} className="rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">
              <span className="mr-2 font-bold text-emerald-700">{index + 1}.</span>{lesson}
            </p>
          ))}
        </div>
      </section>

      <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-950">Quiz</h2>
        <div className="space-y-5">
          {questions.map((question, index) => (
            <fieldset key={question.question} className="rounded-lg border border-slate-100 p-4">
              <legend className="px-2 font-semibold text-slate-800">{question.question}</legend>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => (
                  <label key={option} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${Number(answers[index]) === optionIndex ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 text-slate-700'}`}>
                    <input className="sr-only" type="radio" name={`q-${index}`} value={optionIndex} onChange={(event) => setAnswers((current) => ({ ...current, [index]: event.target.value }))} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <button className="mt-6 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white">Enviar quiz</button>
        {result && (
          <div className="mt-6 rounded-lg bg-emerald-50 p-5">
            {result.passed ? <Award className="mb-2 text-emerald-700" /> : <CheckCircle2 className="mb-2 text-amber-600" />}
            <p className="font-bold text-slate-950">
              {result.passed ? `Badge ganado: ${module.badge}` : 'Buen intento. Puedes repasar y reenviar.'}
            </p>
            <p className="text-sm text-slate-600">Resultado: {result.score}% · {result.passed ? `${module.xpReward} XP otorgados` : 'XP pendiente'}</p>
            <Link to="/learn" className="mt-4 inline-flex font-bold text-emerald-700">Volver a academia</Link>
          </div>
        )}
      </form>
    </div>
  )
}

function fallbackQuestions(module) {
  return [
    {
      question: `Qué busca este módulo de ${module.title.toLowerCase()}?`,
      options: ['Dar claridad educativa', 'Sustituir asesoría profesional', 'Conectar cuentas bancarias'],
      answer: 0,
    },
    {
      question: 'Cómo conviene avanzar?',
      options: ['Con pasos graduales', 'Con prisa y sin registro', 'Sin revisar objetivos'],
      answer: 0,
    },
    {
      question: 'Las recomendaciones de Katalyst son...',
      options: ['Educativas', 'Promesas de rendimiento', 'Instrucciones regulatorias'],
      answer: 0,
    },
  ]
}
