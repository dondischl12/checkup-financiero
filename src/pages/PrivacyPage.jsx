import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Trash2 } from 'lucide-react'
import { clearLocalData } from '../utils/storage'

const bullets = [
  'La información financiera individual es privada.',
  'En producción habrá autenticación segura, 2FA y políticas de acceso.',
  'El consejo solo ve métricas agregadas/anónimas.',
  'Las solicitudes de contacto se envían con nombre y correo para que Katalyst pueda responder.',
  'La plataforma no conecta cuentas bancarias.',
  'Las recomendaciones son educativas y no sustituyen asesoría financiera profesional.',
  'En esta versión local-first, los datos se guardan en el navegador.',
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
      <h1 className="text-3xl font-bold text-slate-950">Privacidad y seguridad</h1>
      <div className="mt-6 grid gap-3">
        {bullets.map((item) => (
          <p key={item} className="rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">{item}</p>
        ))}
      </div>
      <button type="button" onClick={clear} className="k-primary mt-8">
        <Trash2 size={18} /> Borrar datos locales
      </button>
    </div>
  )
}
