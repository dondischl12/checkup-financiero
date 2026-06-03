export function generateRecommendations(checkup, scoreResult, profile) {
  if (!checkup || !scoreResult) return []

  const income = Number(checkup.monthlyIncome) || 0
  const expenses = Number(checkup.monthlyExpenses) || 0
  const savings = Number(checkup.monthlySavings) || 0
  const savingsRate = income > 0 ? savings / income : 0
  const hasDependents = Number(profile?.dependents || 0) > 0
  const recommendations = []

  if (savingsRate < 0.1 || Number(checkup.emergencyFundMonths) < 3) {
    recommendations.push({
      id: 'emergency-fund',
      priority: 'alta',
      title: 'Construye tu fondo de emergencia',
      description: 'Una reserva reduce la presión cuando aparece un gasto inesperado.',
      action: 'Empieza con una meta inicial pequena y automatiza una cantidad mensual.',
      linkedModuleId: 'fondo-emergencia',
    })
  }

  if (income === 0 || expenses / Math.max(income, 1) >= 0.85) {
    recommendations.push({
      id: 'monthly-budget',
      priority: 'alta',
      title: 'Separa gastos fijos y variables',
      description: 'Tener visibilidad por categoria ayuda a tomar decisiones sin improvisar.',
      action: 'Revisa tus gastos principales y detecta 2 areas ajustables esta semana.',
      linkedModuleId: 'presupuesto-mensual',
    })
  }

  if (['stressed', 'critical'].includes(checkup.debtComfort)) {
    recommendations.push({
      id: 'debt-plan',
      priority: 'alta',
      title: 'Ordena tus deudas',
      description: 'Un plan claro permite priorizar pagos y disminuir estres.',
      action: 'Aprende a priorizar pagos y evita acumular nuevos saldos.',
      linkedModuleId: 'deuda-credito',
    })
  }

  if (
    checkup.hasMedicalInsurance !== 'yes' ||
    (hasDependents && checkup.hasLifeInsuranceIfDependents !== 'yes')
  ) {
    recommendations.push({
      id: 'family-protection',
      priority: hasDependents ? 'alta' : 'media',
      title: 'Revisa tu proteccion familiar',
      description: 'La proteccion basica sostiene el plan financiero cuando hay dependientes.',
      action: 'Si alguien depende de ti, revisa qué protección básica necesitarías.',
      linkedModuleId: 'proteccion-familiar',
    })
  }

  if (Number(checkup.financialStress) >= 4 || Number(checkup.feelsInControl) <= 2) {
    recommendations.push({
      id: 'weekly-routine',
      priority: 'media',
      title: 'Crea una rutina semanal de revision',
      description: 'Una rutina corta convierte el dinero en un tema manejable.',
      action: 'Dedica 15 minutos a revisar gastos, pagos proximos y prioridades.',
      linkedModuleId: 'fundamentos-financieros',
    })
  }

  if (recommendations.length < 3) {
    recommendations.push({
      id: 'investment-basics',
      priority: 'baja',
      title: 'Fortalece tus fundamentos',
      description: 'Antes de invertir, conviene dominar presupuesto, ahorro y objetivos.',
      action: 'Completa el módulo de fundamentos para identificar tu siguiente paso.',
      linkedModuleId: 'fundamentos-financieros',
    })
  }

  return recommendations.slice(0, 5)
}
