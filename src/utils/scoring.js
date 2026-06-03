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

function clamp(value, min = 0, max = 100) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function debtScore(value) {
  return {
    comfortable: 100,
    manageable: 75,
    stressed: 38,
    critical: 12,
  }[value] ?? 55
}

export function calculateFinancialScore(checkup = {}, profile = {}) {
  const income = Number(checkup.monthlyIncome) || 0
  const expenses = Number(checkup.monthlyExpenses) || 0
  const savings = Number(checkup.monthlySavings) || 0
  const savingsRate = income > 0 ? savings / income : 0
  const expenseRatio = income > 0 ? expenses / income : 1
  const dependents = Number(profile?.dependents || 0)

  const savingsPoints = clamp((savingsRate / 0.2) * 100)
  const expensePoints = clamp(100 - Math.max(0, expenseRatio - 0.65) * 220)
  const emergencyMonths = String(checkup.emergencyFundMonths || '0')
  const emergencyPoints = {
    0: 8,
    1: 35,
    2: 55,
    3: 80,
    '6+': 100,
    6: 100,
  }[emergencyMonths] ?? 40
  const protectionBase =
    checkup.hasMedicalInsurance === 'yes' ? 55 : checkup.hasMedicalInsurance === 'not_sure' ? 28 : 10
  const lifeProtection =
    dependents > 0
      ? checkup.hasLifeInsuranceIfDependents === 'yes'
        ? 45
        : checkup.hasLifeInsuranceIfDependents === 'not_sure'
          ? 20
          : 5
      : 45
  const protectionPoints = clamp(protectionBase + lifeProtection)
  const stress = Number(checkup.financialStress) || 3
  const control = Number(checkup.feelsInControl) || 3
  const wellbeingPoints = clamp(((6 - stress) / 5) * 50 + (control / 5) * 50)

  const breakdown = {
    ahorro: Math.round((savingsPoints * 25) / 100),
    gastos: Math.round((expensePoints * 20) / 100),
    deuda: Math.round((debtScore(checkup.debtComfort) * 20) / 100),
    emergencia: Math.round((emergencyPoints * 15) / 100),
    proteccion: Math.round((protectionPoints * 10) / 100),
    bienestar: Math.round((wellbeingPoints * 10) / 100),
  }

  const rawScore = Object.values(breakdown).reduce((sum, value) => sum + value, 0)
  const score = Math.round(clamp(rawScore))
  const label =
    score >= 85 ? 'Muy saludable' : score >= 70 ? 'Estable' : score >= 50 ? 'Necesita atención' : 'Riesgo alto'

  const riskAreas = []
  const strengths = []
  if (savingsRate < 0.1) riskAreas.push('Ahorro mensual limitado')
  else strengths.push('Buen ritmo de ahorro')
  if (expenseRatio >= 1) riskAreas.push('Gastos por encima de ingresos')
  else if (expenseRatio < 0.75) strengths.push('Gastos contenidos')
  if (['stressed', 'critical'].includes(checkup.debtComfort)) riskAreas.push('Presión por deuda')
  else strengths.push('Deuda manejable')
  if (emergencyPoints < 60) riskAreas.push('Fondo de emergencia insuficiente')
  else strengths.push('Reserva de emergencia en avance')
  if (protectionPoints < 60) riskAreas.push('Protección familiar por revisar')
  else strengths.push('Protección básica identificada')

  const summary =
    dependents > 0
      ? `Tu resultado es ${label.toLowerCase()}. El siguiente paso es fortalecer liquidez y protección familiar con acciones educativas y graduales.`
      : `Tu resultado es ${label.toLowerCase()}. Hay una base para avanzar con mejores hábitos, prioridades claras y seguimiento mensual.`

  return {
    score,
    label,
    summary,
    breakdown,
    riskAreas,
    strengths,
  }
}
