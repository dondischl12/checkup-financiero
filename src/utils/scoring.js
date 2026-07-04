export function calcQuizScore(respuestas, preguntas) {
  const porTema = {}
  preguntas.forEach((q) => {
    const resp = respuestas[q.id]
    const correcta = q.opciones.find((o) => o.correcto)?.id
    if (!porTema[q.tema]) porTema[q.tema] = { correctas: 0, total: 0 }
    porTema[q.tema].total++
    if (resp === correcta) porTema[q.tema].correctas++
  })
  return Object.entries(porTema).reduce((acc, [tema, { correctas, total }]) => {
    acc[tema] = correctas / total
    return acc
  }, {})
}

export function getRecursos(scores, resources) {
  return Object.entries(scores)
    .filter(([tema, score]) => score < (resources[tema]?.umbral ?? 0.6))
    .map(([tema]) => resources[tema])
}
