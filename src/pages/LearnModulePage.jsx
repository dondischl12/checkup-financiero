import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'
import { getModuleContent, getModuleSteps } from '../data/learningContent'

export default function LearnModulePage() {
  const { moduleId } = useParams()
  const module = getModuleContent(moduleId)
  if (!module) return <UpcomingModule />
  return <LessonPlayer key={moduleId} module={module} />
}

function LessonPlayer({ module }) {
  const steps = useMemo(() => getModuleSteps(module.id), [module.id])
  const totalQuizzes = useMemo(() => steps.filter((s) => s.type === 'quiz').length, [steps])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // stepIndex -> chosen option index

  const finished = index >= steps.length
  const step = steps[index]
  const answered = answers[index] !== undefined
  const progress = Math.round((Math.min(index, steps.length) / steps.length) * 100)

  function choose(optionIndex) {
    if (answered) return
    setAnswers((prev) => ({ ...prev, [index]: optionIndex }))
  }
  function next() {
    setIndex((i) => i + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function restart() {
    setAnswers({})
    setIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (finished) {
    const correct = steps.reduce((sum, s, i) => (s.type === 'quiz' && answers[i] === s.answer ? sum + 1 : sum), 0)
    return <ModuleComplete module={module} correct={correct} total={totalQuizzes} onRestart={restart} />
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header + progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/learn" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
            <ArrowLeft size={16} /> Aprender
          </Link>
          <span className="text-sm font-bold text-slate-500">{progress}%</span>
        </div>
        <h1 className="k-display mt-3 text-2xl text-slate-950 sm:text-3xl">{module.title}</h1>
        <div className="mt-3 flex items-center justify-between gap-3 text-sm font-bold">
          <span className="text-emerald-800">Parte {step.part} de {step.totalParts}</span>
          <span className="truncate text-slate-500">{step.unitTitle}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-emerald-700 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step.type === 'read' ? (
        <ReadStep step={step} onNext={next} />
      ) : (
        <QuizStep step={step} chosen={answers[index]} answered={answered} onChoose={choose} onNext={next} last={index === steps.length - 1} />
      )}
    </div>
  )
}

function ReadStep({ step, onNext }) {
  return (
    <article className="k-card p-6 sm:p-7">
      <span className="k-eyebrow flex items-center gap-2"><BookOpen size={16} /> Lectura</span>
      <h2 className="k-display mt-2 text-2xl text-slate-950">{step.title}</h2>
      <div className="mt-4 space-y-3">
        {step.paragraphs.map((p, i) => (
          <p key={i} className="leading-7 text-slate-700">{p}</p>
        ))}
      </div>
      {step.bullets && (
        <ul className="mt-4 space-y-2">
          {step.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 leading-7 text-slate-700">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {step.clave && (
        <div className="mt-5 flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
          <Lightbulb className="mt-0.5 shrink-0 text-emerald-700" size={20} />
          <p className="font-bold leading-6 text-emerald-900">{step.clave}</p>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button type="button" onClick={onNext} className="k-primary px-6">
          Continuar <ArrowRight size={18} />
        </button>
      </div>
    </article>
  )
}

function QuizStep({ step, chosen, answered, onChoose, onNext, last }) {
  const correct = step.answer
  return (
    <article className="k-card p-6 sm:p-7">
      <span className="k-eyebrow flex items-center gap-2"><Sparkles size={16} /> Ponga a prueba</span>
      <h2 className="mt-2 text-xl font-bold leading-7 text-slate-950">{step.prompt}</h2>
      <div className="mt-4 grid gap-3">
        {step.options.map((option, i) => {
          const isCorrect = i === correct
          const isChosen = i === chosen
          let tone = 'border-stone-200 bg-stone-50 text-slate-700 hover:bg-white'
          if (answered && isCorrect) tone = 'border-emerald-600 bg-emerald-50 text-emerald-900'
          else if (answered && isChosen && !isCorrect) tone = 'border-amber-500 bg-amber-50 text-amber-900'
          else if (answered) tone = 'border-stone-200 bg-white text-slate-400'
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChoose(i)}
              disabled={answered}
              aria-pressed={isChosen}
              className={`k-focus flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${tone} ${answered ? 'cursor-default' : ''}`}
            >
              <span>{option}</span>
              {answered && isCorrect && <Check size={18} className="shrink-0 text-emerald-700" />}
              {answered && isChosen && !isCorrect && <X size={18} className="shrink-0 text-amber-600" />}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`mt-4 rounded-lg border p-4 ${chosen === correct ? 'border-emerald-100 bg-emerald-50/70' : 'border-amber-100 bg-amber-50/70'}`}>
          <p className={`mb-1 flex items-center gap-2 text-sm font-bold ${chosen === correct ? 'text-emerald-800' : 'text-amber-800'}`}>
            {chosen === correct ? <><Check size={16} /> Correcto</> : <><Lightbulb size={16} /> Buena intención — vea esto</>}
          </p>
          <p className="text-sm leading-6 text-slate-700">{step.explain}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={onNext} disabled={!answered} className="k-primary px-6 disabled:opacity-40">
          {last ? 'Terminar' : 'Continuar'} <ArrowRight size={18} />
        </button>
      </div>
    </article>
  )
}

function ModuleComplete({ module, correct, total, onRestart }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 100
  const message =
    pct >= 80 ? 'Dominó los conceptos clave de este módulo.' : pct >= 50 ? 'Buen avance — repasar afianza lo aprendido.' : 'Un repaso le ayudará a fijar las ideas principales.'
  return (
    <div className="mx-auto max-w-2xl">
      <section className="k-scenic-hero p-7 text-center sm:p-9">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Trophy size={30} />
        </div>
        <p className="k-eyebrow mt-5">Módulo completado</p>
        <h1 className="k-display mt-2 text-2xl text-slate-950 sm:text-3xl">{module.title}</h1>
        {total > 0 && (
          <p className="mt-4 text-lg font-bold text-slate-950">
            Acertó <span className="text-emerald-700">{correct} de {total}</span> preguntas
          </p>
        )}
        <p className="mt-2 leading-7 text-slate-600">{message}</p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onRestart} className="k-secondary">
            <RotateCcw size={16} /> Repasar módulo
          </button>
          <Link to="/learn" className="k-secondary">
            Más módulos <ArrowRight size={16} />
          </Link>
          <Link to="/snapshot" className="k-primary px-5">
            Ver mi snapshot <ArrowRight size={16} />
          </Link>
        </div>
        <p className="mt-6 text-xs font-semibold text-slate-500">
          En modo invitado este avance no se guarda. Guardar progreso llegará con las cuentas.
        </p>
      </section>
    </div>
  )
}

function UpcomingModule() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="k-scenic-hero p-8">
        <div className="k-icon-tile mb-5"><BookOpen size={24} /></div>
        <p className="k-eyebrow">Próximamente</p>
        <h1 className="k-display mt-3 text-3xl text-slate-950 sm:text-4xl md:text-5xl">Este módulo está en preparación</h1>
        <p className="k-copy mt-4 max-w-2xl">
          Ya hay tres módulos interactivos disponibles: Presupuesto, Fondo de emergencia y Deuda inteligente.
          Los demás se activarán en una siguiente fase.
        </p>
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-white/80 p-5 text-sm leading-6 text-slate-600">
          <LockKeyhole className="shrink-0 text-emerald-700" />
          En esta beta no se guarda progreso educativo; llegará con las cuentas.
        </div>
        <Link to="/learn" className="k-primary mt-6 inline-flex px-5 py-3">
          Ver módulos disponibles <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
