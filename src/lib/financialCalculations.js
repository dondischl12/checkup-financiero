const annualKeywords = ['_annual', 'annual_or_one_time']

const expenseGroups = {
  housing: [
    'expense_condo_monthly',
    'expense_rent_monthly',
    'expense_mortgage_monthly',
    'expense_home_maintenance_monthly',
    'expense_utilities_monthly',
  ],
  food: ['expense_groceries_monthly', 'expense_restaurants_monthly'],
  education: [
    'expense_school_monthly',
    'expense_extra_classes_monthly',
    'expense_school_supplies_annual',
    'expense_school_transport_monthly',
    'expense_allowances_monthly',
    'expense_children_health_monthly',
    'expense_children_events_annual',
    'expense_education_insurance_monthly',
  ],
  protection: [
    'expense_health_insurance_monthly',
    'expense_home_insurance_monthly',
    'expense_life_insurance_monthly',
    'expense_other_insurance_monthly',
    'expense_auto_insurance_monthly',
  ],
  transport: [
    'expense_fuel_monthly',
    'expense_auto_maintenance_monthly',
    'expense_auto_purchase_monthly',
  ],
  lifestyle: [
    'expense_streaming_subscriptions_monthly',
    'expense_gym_monthly',
    'expense_entertainment_monthly',
    'expense_clothing_monthly',
    'expense_vacations_annual',
    'expense_special_events_annual',
    'expense_donations_monthly',
    'expense_other_personal_monthly',
    'expense_pets_monthly',
    'expense_home_misc_monthly',
    'expense_household_help_monthly',
  ],
  debt: ['debt_credit_card_payment_monthly', 'debt_bank_loans_payment_monthly', 'expense_bank_fees_monthly'],
}

const incomeFields = [
  'income_salary_net_monthly',
  'income_rent_monthly',
  'income_interest_monthly',
  'income_pension_monthly',
  'income_business_monthly',
  'income_gifts_monthly_equiv',
  'income_asset_sales_annual',
  'income_loan_recovery_annual',
]

const debtBalanceFields = ['debt_credit_card_balance', 'debt_bank_loans_balance', 'debt_mortgage_balance', 'debt_auto_balance']
const annualizedFields = [
  'income_asset_sales_annual',
  'income_loan_recovery_annual',
  'expense_school_supplies_annual',
  'expense_children_events_annual',
  'expense_vacations_annual',
  'expense_special_events_annual',
]

function toNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (!value) return 0
  return Number(String(value).replace(/[^\d.-]/g, '')) || 0
}

function clamp(value, min = 0, max = 100) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function monthlyValue(key, value) {
  const amount = toNumber(value)
  return annualKeywords.some((keyword) => key.includes(keyword)) ? amount / 12 : amount
}

function sumFields(answers, fields) {
  return fields.reduce((sum, key) => sum + monthlyValue(key, answers[key]), 0)
}

export function normalizeAnnualToMonthly(value) {
  return toNumber(value) / 12
}

export function sumMonthlyIncome(answers = {}) {
  return sumFields(answers, incomeFields)
}

export function calculateDebtPayments(answers = {}) {
  return sumFields(answers, expenseGroups.debt)
}

export function calculateEssentialExpenses(answers = {}) {
  return sumFields(answers, [
    ...expenseGroups.housing,
    'expense_groceries_monthly',
    ...expenseGroups.education,
    ...expenseGroups.protection,
    'expense_fuel_monthly',
    'debt_credit_card_payment_monthly',
    'debt_bank_loans_payment_monthly',
  ])
}

export function sumMonthlyExpenses(answers = {}) {
  const expenseKeys = Object.values(expenseGroups).flat()
  return sumFields(answers, [...new Set(expenseKeys)])
}

export function calculateDerivedMetrics(answers = {}) {
  const monthlyIncome = sumMonthlyIncome(answers)
  const monthlyExpenses = sumMonthlyExpenses(answers)
  const annualizedMonthlyImpact = annualizedFields.reduce((sum, key) => sum + monthlyValue(key, answers[key]), 0)
  const annualizedIncomeMonthly = ['income_asset_sales_annual', 'income_loan_recovery_annual'].reduce((sum, key) => sum + monthlyValue(key, answers[key]), 0)
  const annualizedExpenseMonthly = annualizedFields
    .filter((key) => key.startsWith('expense_'))
    .reduce((sum, key) => sum + monthlyValue(key, answers[key]), 0)
  const essentialExpenses = calculateEssentialExpenses(answers)
  const debtPayments = calculateDebtPayments(answers)
  const monthlySavings = toNumber(answers.monthly_savings_contribution)
  const emergencyFund = toNumber(answers.emergency_fund_amount || answers.cash_savings_total)
  const debtTotal = debtBalanceFields.reduce((sum, key) => sum + toNumber(answers[key]), 0)
  const housing = sumFields(answers, expenseGroups.housing)
  const netFlow = monthlyIncome - monthlyExpenses
  const savingsRate = monthlyIncome > 0 ? monthlySavings / monthlyIncome : 0
  const expenseRatio = monthlyIncome > 0 ? monthlyExpenses / monthlyIncome : 1
  const housingRatio = monthlyIncome > 0 ? housing / monthlyIncome : 0
  const debtToIncome = monthlyIncome > 0 ? debtPayments / monthlyIncome : 0
  const emergencyMonths = essentialExpenses > 0 ? emergencyFund / essentialExpenses : 0
  const categoryDistribution = [
    ['Vivienda', expenseGroups.housing, '#2f855a'],
    ['Alimentación', expenseGroups.food, '#8fbc9a'],
    ['Educación / Hijos', expenseGroups.education, '#9bb7d8'],
    ['Seguros', expenseGroups.protection, '#b7c6b1'],
    ['Transporte', expenseGroups.transport, '#f0c66b'],
    ['Deuda', expenseGroups.debt, '#d98b56'],
    ['Estilo de vida', expenseGroups.lifestyle, '#8b949e'],
  ].map(([name, fields, color]) => {
    const value = sumFields(answers, fields)
    return { name, value, color, percent: monthlyExpenses > 0 ? value / monthlyExpenses : 0 }
  }).filter((item) => item.value > 0)

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    essentialExpenses,
    debtPayments,
    debtTotal,
    housing,
    emergencyFund,
    netFlow,
    savingsRate,
    expenseRatio,
    housingRatio,
    debtToIncome,
    emergencyMonths,
    categoryDistribution,
    annualizedMonthlyImpact,
    annualizedIncomeMonthly,
    annualizedExpenseMonthly,
    recurringMonthlyIncome: monthlyIncome - annualizedIncomeMonthly,
    recurringMonthlyExpenses: monthlyExpenses - annualizedExpenseMonthly,
    dependents: toNumber(answers.dependents_count),
    householdSize: toNumber(answers.household_size),
    age: toNumber(answers.age),
  }
}

function optionScore(value, map, fallback = 55) {
  return map[value] ?? fallback
}

/**
 * Piecewise-linear score curve grounded in published benchmarks.
 *
 * `points` is an ascending list of [inputValue, score0to100] anchors. The score
 * is linearly interpolated between anchors and clamped at the ends. This keeps
 * every subscore transparent and auditable (each anchor maps to a documented
 * guideline) instead of relying on opaque linear slopes.
 */
function scoreCurve(value, points) {
  if (!Number.isFinite(value)) return points[0][1]
  if (value <= points[0][0]) return points[0][1]
  const last = points[points.length - 1]
  if (value >= last[0]) return last[1]
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    if (value <= x1) {
      const t = x1 === x0 ? 0 : (value - x0) / (x1 - x0)
      return y0 + t * (y1 - y0)
    }
  }
  return last[1]
}

/**
 * Pillar subscores (0-100) for the Katalyst FinHealth model.
 *
 * Weights and pillars follow the Financial Health Network's FinHealth Score
 * framework (Spend / Save / Borrow / Plan & Protect), grounded in widely used
 * planning benchmarks:
 *   - 50/30/20 budget: keep >=20% of income for savings/debt paydown.
 *   - Savings rate 15-20% is the healthy planning target.
 *   - Emergency fund: 3-6 months of essential expenses.
 *   - 28/36 rule: housing <=28% (target 25% here) and total debt service <=36%.
 *   - 20/10 rule: non-mortgage consumer debt payments <=10-20% of income.
 * Subjective/behavioral indicators (stress, tracking, resilience) reflect the
 * FHN "Plan" pillar and CFPB Financial Well-Being work.
 */
export function calculateScoreBreakdown(answers = {}) {
  const metrics = calculateDerivedMetrics(answers)
  const hasIncome = metrics.monthlyIncome > 0

  // --- Pillar 1: Cash flow & savings (Spend less than income + Save) ---
  // Savings rate anchored to the 20% target of the 50/30/20 rule.
  const savingsRateScore = scoreCurve(metrics.savingsRate, [
    [0, 20],
    [0.05, 45],
    [0.1, 65],
    [0.15, 82],
    [0.2, 95],
    [0.3, 100],
  ])
  // Net cash-flow margin (income - all expenses) / income. Negative = deficit.
  const netFlowMargin = hasIncome ? metrics.netFlow / metrics.monthlyIncome : -1
  const netFlowScore = scoreCurve(netFlowMargin, [
    [-0.25, 0],
    [-0.1, 25],
    [0, 55],
    [0.1, 80],
    [0.2, 95],
    [0.3, 100],
  ])
  const stability = optionScore(answers.income_stability, {
    'Muy estable': 100,
    'Algo variable': 72,
    'Muy variable': 45,
    'No tengo ingreso propio actualmente': 18,
  })
  const cashFlow = hasIncome
    ? (netFlowScore * 0.55 + savingsRateScore * 0.45) * 0.8 + stability * 0.2
    : 15

  // --- Pillar 2: Expense structure (28/36 + 50/30/20) ---
  const housingScore = scoreCurve(metrics.housingRatio, [
    [0, 100],
    [0.25, 100],
    [0.28, 90],
    [0.35, 65],
    [0.45, 35],
    [0.6, 0],
  ])
  const expenseScore = scoreCurve(metrics.expenseRatio, [
    [0.6, 100],
    [0.8, 100],
    [0.85, 90],
    [0.95, 65],
    [1, 45],
    [1.15, 15],
    [1.3, 0],
  ])
  const structure = hasIncome ? housingScore * 0.45 + expenseScore * 0.55 : 25

  // --- Pillar 3: Emergency fund (3-6 months of essential expenses) ---
  const emergency = scoreCurve(metrics.emergencyMonths, [
    [0, 5],
    [1, 35],
    [2, 55],
    [3, 80],
    [4, 90],
    [6, 100],
  ])

  // --- Pillar 4: Debt burden (28/36 back-end + 20/10 rule + subjective) ---
  const hasDebt = metrics.debtPayments > 0 || metrics.debtTotal > 0
  const debtRatioScore = scoreCurve(metrics.debtToIncome, [
    [0, 100],
    [0.1, 92],
    [0.2, 72],
    [0.3, 50],
    [0.43, 22],
    [0.55, 0],
  ])
  const debtStress = optionScore(answers.debt_stress, {
    'Sin problema': 100,
    'Con algo de presión': 72,
    'Me cuesta trabajo': 42,
    'No puedo cubrirlos todos': 12,
  }, hasDebt ? 55 : 100)
  const debt = hasDebt ? debtRatioScore * 0.6 + debtStress * 0.4 : 100

  // --- Pillar 5: Protection & planning (insurance + long-term assets) ---
  const noDependents = metrics.dependents === 0
  const protection = clamp([
    toNumber(answers.expense_health_insurance_monthly) > 0 ? 25 : 0,
    // Life insurance only matters when someone depends on this income.
    toNumber(answers.expense_life_insurance_monthly) > 0 || noDependents ? 20 : 0,
    toNumber(answers.retirement_savings_total) > 0 ? 20 : 0,
    toNumber(answers.investment_total) > 0 ? 15 : 0,
    optionScore(answers.coverage_confidence, {
      'Sí, suficiente': 20,
      Parcialmente: 12,
      'No estoy seguro': 7,
      'No / no cuento con seguros': 2,
    }, 8),
  ].reduce((sum, item) => sum + item, 0))

  // --- Pillar 6: Habits & wellbeing (bill/plan discipline + resilience) ---
  const habits = [
    optionScore(answers.budget_tracking_frequency, { Semanalmente: 100, Mensualmente: 85, 'De vez en cuando': 55, 'Casi nunca': 20 }, 55),
    optionScore(answers.statement_reconcile, { 'Sí, cada mes': 100, 'A veces': 65, 'No todavía': 25 }, 55),
    optionScore(answers.financial_stress, {
      'Tranquilo y con control': 100,
      'Neutral / manejable': 72,
      Preocupado: 35,
      'Muy presionado': 12,
    }, 55),
    optionScore(answers.savings_automation, { Sí: 100, 'No, pero lo hago manualmente': 65, No: 25 }, 55),
    // Resilience to a real shock in the last 90 days (FHN "spend/plan").
    optionScore(answers.unexpected_expense_last_90_days, {
      No: 80,
      'Sí, lo cubrí sin problema': 100,
      'Sí, me desbalanceó': 45,
      'Sí, tuve que endeudarme': 20,
    }, 65),
  ].reduce((sum, item) => sum + item, 0) / 5

  const subscores = {
    cashFlow: clamp(cashFlow),
    expenseStructure: clamp(structure),
    emergencyFund: clamp(emergency),
    debtBurden: clamp(debt),
    protectionPlanning: clamp(protection),
    habitsWellbeing: clamp(habits),
  }

  // FinHealth pillar weights (sum = 100). Round only once, on the total.
  const weights = {
    cashFlow: 25,
    expenseStructure: 20,
    emergencyFund: 20,
    debtBurden: 15,
    protectionPlanning: 10,
    habitsWellbeing: 10,
  }
  const total = clamp(
    Object.entries(weights).reduce((sum, [key, weight]) => sum + (subscores[key] * weight) / 100, 0),
  )

  return { score: Math.round(total), subscores, weights }
}

export function calculateScore(answers = {}) {
  return calculateScoreBreakdown(answers).score
}

export function getLevel(score) {
  if (score >= 90) return { label: 'Excelente estabilidad', tone: 'Excelente', summary: 'Su panorama muestra bases muy sólidas y hábitos consistentes.' }
  if (score >= 75) return { label: 'Finanzas fuertes', tone: 'Fuerte', summary: 'Tiene una base financiera clara y oportunidades puntuales para seguir fortaleciendo su patrimonio.' }
  if (score >= 60) return { label: 'Buen camino', tone: 'Bien encaminado', summary: 'Sus finanzas están en buena dirección. Pequeños ajustes pueden generar avances relevantes.' }
  if (score >= 40) return { label: 'Base en construcción', tone: 'En construcción', summary: 'Hay una base para avanzar con prioridades claras y seguimiento gradual.' }
  return { label: 'Atención prioritaria', tone: 'Prioridad', summary: 'Conviene enfocarse en claridad, flujo mensual y apoyo educativo paso a paso.' }
}

export function getStrengths(metrics = {}) {
  const strengths = []
  if (metrics.netFlow > 0) strengths.push('Mantiene un flujo mensual positivo entre ingresos y gastos.')
  if (metrics.savingsRate >= 0.15) strengths.push('Su tasa de ahorro está alineada con una guía saludable.')
  if (metrics.emergencyMonths >= 1) strengths.push('Ya cuenta con un fondo de emergencia iniciado.')
  if (metrics.debtToIncome <= 0.25) strengths.push('Sus pagos de deuda se mantienen en un rango manejable.')
  if (metrics.housingRatio <= 0.25 && metrics.housing > 0) strengths.push('Su gasto en vivienda está cerca de la guía recomendada.')
  return strengths.length ? strengths : ['Completó un snapshot que le da claridad para tomar mejores decisiones.']
}

export function getAttentionAreas(metrics = {}) {
  const areas = []
  if (metrics.netFlow < 0) areas.push('Sus gastos superan sus ingresos mensuales; revisar prioridades puede liberar flujo.')
  if (metrics.savingsRate < 0.15) areas.push('Puede fortalecer su hábito de ahorro mensual de forma gradual.')
  if (metrics.emergencyMonths < 3) areas.push('Su fondo de emergencia aún puede crecer hacia 3 a 6 meses de gastos esenciales.')
  if (metrics.debtToIncome > 0.3) areas.push('Sus pagos de deuda ocupan una parte relevante del ingreso mensual.')
  if (metrics.housingRatio > 0.25) areas.push('Su gasto en vivienda supera la guía de referencia del 25% del ingreso.')
  return areas.length ? areas : ['Mantenga revisiones mensuales para sostener el progreso y anticipar cambios.']
}

export function getRecommendedModules(metrics = {}, answers = {}) {
  const modules = []
  if (metrics.savingsRate < 0.15 || metrics.emergencyMonths < 3) modules.push('fondo-emergencia')
  if (metrics.debtToIncome > 0.2 || metrics.debtTotal > 0) modules.push('deuda-credito')
  if (metrics.expenseRatio > 0.85 || metrics.netFlow < 0) modules.push('presupuesto-mensual')
  if (metrics.dependents > 0 || answers.coverage_confidence !== 'Sí, suficiente') modules.push('proteccion-familiar')
  if (toNumber(answers.investment_total) === 0 && metrics.netFlow > 0) modules.push('inversion-basica')
  modules.push('finanzas-familiares')
  return [...new Set(modules)].slice(0, 4)
}

export function buildActionPlan(metrics = {}, answers = {}) {
  const firstGoal = metrics.netFlow < 0 ? 'Recuperar flujo mensual positivo' : 'Revisar y optimizar presupuesto'
  return [
    {
      week: 1,
      title: firstGoal,
      description: 'Clasifique gastos esenciales y variables para encontrar ajustes realistas.',
      status: 'En progreso',
    },
    {
      week: 2,
      title: 'Fortalecer fondo de emergencia',
      description: 'Defina una transferencia pequeña y constante hacia su reserva.',
      status: metrics.emergencyMonths >= 3 ? 'Avanzado' : 'Pendiente',
    },
    {
      week: 3,
      title: 'Reducir deuda y costo financiero',
      description: 'Priorice saldos de mayor costo y revise pagos mínimos vs. pagos planeados.',
      status: metrics.debtToIncome > 0 ? 'Pendiente' : 'Opcional',
    },
    {
      week: 4,
      title: 'Invertir en su futuro',
      description: 'Revise retiro, inversión básica y protección familiar para sostener avances.',
      status: toNumber(answers.investment_total) > 0 ? 'Avanzado' : 'Pendiente',
    },
  ]
}

export function buildSnapshot(answers = {}) {
  const derivedMetrics = calculateDerivedMetrics(answers)
  const { score, subscores, weights } = calculateScoreBreakdown(answers)
  const level = getLevel(score)
  const strengths = getStrengths(derivedMetrics)
  const attentionAreas = getAttentionAreas(derivedMetrics)
  const recommendations = getRecommendedModules(derivedMetrics, answers)
  const actionPlan = buildActionPlan(derivedMetrics, answers)

  return {
    createdAt: new Date().toISOString(),
    currency: 'MXN',
    answers,
    derivedMetrics,
    score,
    scoreBreakdown: { subscores, weights },
    level,
    strengths,
    attentionAreas,
    recommendations,
    actionPlan,
  }
}
