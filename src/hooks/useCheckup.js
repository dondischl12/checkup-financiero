import { useLocalStorage } from './useLocalStorage'
import { checkupQuestions } from '../data/checkupQuestions'

const STORAGE_KEY = 'checkup_entries'

export function useCheckup() {
  const [entries, setEntries] = useLocalStorage(STORAGE_KEY, [])

  function saveEntry(respuestas) {
    const now = new Date()
    const entry = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      ingreso: Number(respuestas.ingreso) || 0,
      gastos: Number(respuestas.gastos) || 0,
      ahorro: Number(respuestas.ahorro) || 0,
      situacion: Object.fromEntries(
        checkupQuestions
          .filter((q) => q.tipo === 'opcion')
          .map((q) => [q.id, respuestas[q.id]])
      ),
      createdAt: now.toISOString(),
    }
    const idx = entries.findIndex((e) => e.year === entry.year && e.month === entry.month)
    if (idx >= 0) {
      const updated = [...entries]
      updated[idx] = entry
      setEntries(updated)
    } else {
      setEntries([...entries, entry])
    }
  }

  const latest = entries.length > 0 ? entries[entries.length - 1] : null
  const previous = entries.length > 1 ? entries[entries.length - 2] : null

  return { entries, saveEntry, latest, previous }
}
