import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Trash2 } from 'lucide-react'
import { betaReviewCopy } from '../lib/betaCopy'
import { clearLocalData } from '../utils/storage'

const bullets = [
  'Tus respuestas se procesan sólo para generar este snapshot.',
  'En esta beta sin cuenta, no se guardan en una base de datos.',
  'Si actualizas la página o abres otra pestaña, el snapshot invitado se borra.',
  'La plataforma no conecta cuentas bancarias.',
  'El PDF se genera desde el snapshot de esta sesión.',
  'Las recomendaciones son educativas y no sustituyen asesoría financiera profesional.',
  'Cuentas, historial, recursos y admin agregado son funciones próximas y requieren revisión de privacidad.',
]

export default function PrivacyPage() {
  const navigate = useNavigate()

  function clear() {
    clearLocalData()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
      <ShieldCheck className="mb-5 text-emerald-700" size={34} />
      <h1 className="text-3xl font-bold text-slate-950">Privacidad de la beta</h1>
      <p className="mt-3 leading-7 text-slate-600">
        La versión para la llamada está diseñada como snapshot de una sola sesión. El objetivo es dar claridad sin poner en riesgo respuestas financieras sensibles.
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{betaReviewCopy}</p>
      <div className="mt-6 grid gap-3">
        {bullets.map((item) => (
          <p key={item} className="rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">{item}</p>
        ))}
      </div>
      <button type="button" onClick={clear} className="k-primary mt-8">
        <Trash2 size={18} /> Borrar cualquier dato local anterior
      </button>
    </div>
  )
}
