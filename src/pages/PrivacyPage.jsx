import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Trash2 } from 'lucide-react'
import { betaReviewCopy } from '../lib/betaCopy'
import { clearLocalData } from '../utils/storage'

const bullets = [
  'Sus respuestas se procesan sólo para generar este reporte.',
  'No existen cuentas de usuario: no hay registro, login ni historial personal.',
  'Sus respuestas no se guardan en ninguna base de datos.',
  'Si actualiza la página o abre otra pestaña, el reporte se borra.',
  'La plataforma no conecta cuentas bancarias.',
  'El PDF se genera en su dispositivo, desde el reporte de esta sesión.',
  'Las recomendaciones son educativas y no sustituyen asesoría financiera profesional.',
  'Recursos y panel agregado de Katalyst son funciones próximas y requieren revisión de privacidad.',
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
        Esta versión está diseñada como un reporte de una sola sesión, sin cuentas de usuario. El objetivo es dar claridad sin exponer respuestas financieras sensibles.
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
