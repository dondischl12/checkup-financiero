// Generates synthetic household profiles for offline training of the score
// combination weights (see train-score-weights.mjs). There is no real outcome
// data yet, so each household also gets a "latent wellness" target computed
// from a hand-written formula over its TRUE financial ratios (via
// calculateDerivedMetrics) — independent of the pillar-scoring curves the app
// uses, plus noise. That target stands in for a real-world outcome and is what
// the regression tries to predict from the 8 pillar scores.
//
// Distributions are calibrated to an upper-middle-class urban Mexican
// professional community (higher income skew, high private-school and
// insurance incidence, frequent charitable giving) rather than the general
// population — matching the non-profit's actual member base.

import { pathToFileURL } from 'node:url'
import { calculateDerivedMetrics } from '../src/lib/financialCalculations.js'

function mulberry32(seed) {
  let a = seed
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function uniform(rng, min, max) {
  return min + rng() * (max - min)
}

function pick(rng, weightedOptions) {
  const total = weightedOptions.reduce((sum, [, weight]) => sum + weight, 0)
  let roll = rng() * total
  for (const [value, weight] of weightedOptions) {
    roll -= weight
    if (roll <= 0) return value
  }
  return weightedOptions[weightedOptions.length - 1][0]
}

function lognormal(rng, mu, sigma) {
  // Box-Muller for a standard normal, then exponentiate.
  const u1 = Math.max(rng(), 1e-9)
  const u2 = rng()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return Math.exp(mu + sigma * z)
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

const round = (n) => Math.round(n)

function buildHousehold(rng) {
  const dependentsCount = pick(rng, [[0, 0.4], [1, 0.28], [2, 0.2], [3, 0.09], [4, 0.03]])
  const childrenCount = dependentsCount > 0 ? Math.round(uniform(rng, 0, dependentsCount)) : 0
  const householdSize = dependentsCount + pick(rng, [[1, 0.55], [2, 0.4], [3, 0.05]])
  const age = round(uniform(rng, 26, 68))
  const employmentStatus = pick(rng, [
    ['Empleado asalariado', 0.45],
    ['Independiente / honorarios', 0.22],
    ['Dueño de negocio', 0.2],
    ['Retirado / pensionado', 0.08],
    ['Desempleado temporalmente', 0.05],
  ])
  const hasVehicle = rng() < 0.85 ? 'Sí' : 'No'
  const housingStatus = pick(rng, [
    ['Rento', 0.28],
    ['Casa propia con hipoteca', 0.32],
    ['Vivo en casa propia sin hipoteca', 0.28],
    ['Vivo con familia / no pago vivienda', 0.12],
  ])

  // Latent "financial discipline" trait — drives savings/debt behavior somewhat
  // independently of income, so the synthetic data has real variance to learn from.
  const discipline = Math.pow(rng(), 0.75)

  const incomeBase = clamp(lognormal(rng, Math.log(68000), 0.52), 14000, 550000)
  const income = {
    income_salary_net_monthly: 0,
    income_business_monthly: 0,
    income_pension_monthly: 0,
    income_rent_monthly: rng() < 0.14 ? round(incomeBase * uniform(rng, 0.03, 0.09)) : 0,
    income_interest_monthly: rng() < 0.25 ? round(incomeBase * uniform(rng, 0.005, 0.02)) : 0,
    income_gifts_monthly_equiv: rng() < 0.08 ? round(incomeBase * uniform(rng, 0.01, 0.03)) : 0,
    income_asset_sales_annual: rng() < 0.06 ? round(incomeBase * uniform(rng, 1, 4)) : 0,
    income_loan_recovery_annual: 0,
  }
  if (employmentStatus === 'Dueño de negocio') income.income_business_monthly = round(incomeBase)
  else if (employmentStatus === 'Retirado / pensionado') income.income_pension_monthly = round(incomeBase)
  else if (employmentStatus === 'Desempleado temporalmente') income.income_salary_net_monthly = round(incomeBase * uniform(rng, 0, 0.3))
  else income.income_salary_net_monthly = round(incomeBase)

  const hasChildren = childrenCount > 0
  const hasInsuranceHealth = rng() < 0.78
  const hasInsuranceLife = dependentsCount > 0 ? rng() < 0.62 : rng() < 0.3
  const ownsHome = housingStatus.includes('propia')

  const expenses = {
    expense_condo_monthly: housingStatus === 'Vivo en casa propia sin hipoteca' && rng() < 0.3 ? round(incomeBase * uniform(rng, 0.01, 0.03)) : 0,
    expense_rent_monthly: housingStatus === 'Rento' ? round(incomeBase * uniform(rng, 0.15, 0.32)) : 0,
    expense_mortgage_monthly: housingStatus === 'Casa propia con hipoteca' ? round(incomeBase * uniform(rng, 0.15, 0.3)) : 0,
    expense_home_maintenance_monthly: round(incomeBase * uniform(rng, 0.005, 0.02)),
    expense_utilities_monthly: round(incomeBase * uniform(rng, 0.01, 0.03)),
    expense_groceries_monthly: round(incomeBase * uniform(rng, 0.04, 0.09)),
    expense_restaurants_monthly: round(incomeBase * uniform(rng, 0.01, 0.05)),
    expense_school_monthly: hasChildren ? round(incomeBase * uniform(rng, 0.05, 0.16)) : 0,
    expense_extra_classes_monthly: hasChildren ? round(incomeBase * uniform(rng, 0.005, 0.02)) : 0,
    expense_school_supplies_annual: hasChildren ? round(incomeBase * uniform(rng, 0.3, 1)) : 0,
    expense_school_transport_monthly: hasChildren ? round(incomeBase * uniform(rng, 0.002, 0.01)) : 0,
    expense_allowances_monthly: hasChildren ? round(incomeBase * uniform(rng, 0.002, 0.01)) : 0,
    expense_children_health_monthly: hasChildren ? round(incomeBase * uniform(rng, 0.002, 0.008)) : 0,
    expense_children_events_annual: hasChildren ? round(incomeBase * uniform(rng, 0.2, 0.8)) : 0,
    expense_education_insurance_monthly: hasChildren && rng() < 0.3 ? round(incomeBase * uniform(rng, 0.003, 0.01)) : 0,
    expense_health_insurance_monthly: hasInsuranceHealth ? round(incomeBase * uniform(rng, 0.01, 0.03)) : 0,
    expense_home_insurance_monthly: ownsHome && rng() < 0.5 ? round(incomeBase * uniform(rng, 0.002, 0.01)) : 0,
    expense_life_insurance_monthly: hasInsuranceLife ? round(incomeBase * uniform(rng, 0.005, 0.02)) : 0,
    expense_other_insurance_monthly: rng() < 0.15 ? round(incomeBase * uniform(rng, 0.002, 0.008)) : 0,
    expense_auto_insurance_monthly: hasVehicle === 'Sí' && rng() < 0.7 ? round(incomeBase * uniform(rng, 0.005, 0.02)) : 0,
    expense_fuel_monthly: hasVehicle === 'Sí' ? round(incomeBase * uniform(rng, 0.01, 0.04)) : round(incomeBase * uniform(rng, 0.005, 0.02)),
    expense_auto_maintenance_monthly: hasVehicle === 'Sí' ? round(incomeBase * uniform(rng, 0.002, 0.01)) : 0,
    expense_auto_purchase_monthly: hasVehicle === 'Sí' && rng() < 0.2 ? round(incomeBase * uniform(rng, 0.02, 0.06)) : 0,
    expense_streaming_subscriptions_monthly: round(incomeBase * uniform(rng, 0.001, 0.005)),
    expense_gym_monthly: rng() < 0.4 ? round(incomeBase * uniform(rng, 0.002, 0.008)) : 0,
    expense_entertainment_monthly: round(incomeBase * uniform(rng, 0.01, 0.03)),
    expense_clothing_monthly: round(incomeBase * uniform(rng, 0.01, 0.03)),
    expense_vacations_annual: rng() < 0.6 ? round(incomeBase * uniform(rng, 0.5, 3)) : 0,
    expense_special_events_annual: rng() < 0.35 ? round(incomeBase * uniform(rng, 0.3, 1.5)) : 0,
    expense_donations_monthly: rng() < 0.55 ? round(incomeBase * uniform(rng, 0.01, 0.04)) : 0,
    expense_other_personal_monthly: round(incomeBase * uniform(rng, 0.005, 0.02)),
    expense_pets_monthly: rng() < 0.35 ? round(incomeBase * uniform(rng, 0.002, 0.01)) : 0,
    expense_home_misc_monthly: round(incomeBase * uniform(rng, 0.002, 0.01)),
    expense_household_help_monthly: rng() < 0.45 ? round(incomeBase * uniform(rng, 0.01, 0.04)) : 0,
    expense_bank_fees_monthly: round(incomeBase * uniform(rng, 0.0005, 0.003)),
  }

  const debtProbability = clamp(0.55 - discipline * 0.35, 0.05, 0.6)
  const hasCreditCardDebt = rng() < debtProbability
  const hasBankLoan = rng() < debtProbability * 0.5
  const debt = {
    debt_credit_card_balance: hasCreditCardDebt ? round(incomeBase * uniform(rng, 0.2, 1.6)) : 0,
    debt_credit_card_payment_monthly: hasCreditCardDebt ? round(incomeBase * uniform(rng, 0.02, 0.09)) : 0,
    debt_bank_loans_balance: hasBankLoan ? round(incomeBase * uniform(rng, 0.3, 2)) : 0,
    debt_bank_loans_payment_monthly: hasBankLoan ? round(incomeBase * uniform(rng, 0.01, 0.06)) : 0,
    debt_mortgage_balance: housingStatus === 'Casa propia con hipoteca' ? round(incomeBase * uniform(rng, 20, 70)) : 0,
    debt_auto_balance: hasVehicle === 'Sí' && rng() < 0.3 ? round(incomeBase * uniform(rng, 1, 6)) : 0,
  }

  const savingsRateTarget = discipline * uniform(rng, 0.03, 0.32)
  const emergencyMonthsTarget = discipline * uniform(rng, 0, 9)

  const savings = {
    monthly_savings_contribution: round(incomeBase * savingsRateTarget),
    emergency_fund_amount: round((incomeBase * 0.55) * emergencyMonthsTarget),
    retirement_savings_total: rng() < 0.3 + discipline * 0.4 ? round(incomeBase * uniform(rng, 4, 36)) : 0,
    investment_total: rng() < 0.2 + discipline * 0.3 ? round(incomeBase * uniform(rng, 2, 22)) : 0,
  }

  const incomeStability = employmentStatus === 'Desempleado temporalmente'
    ? pick(rng, [['No tengo ingreso propio actualmente', 0.6], ['Muy variable', 0.4]])
    : pick(rng, [
        ['Muy estable', 0.3 + discipline * 0.35],
        ['Algo variable', 0.4],
        ['Muy variable', 0.25 - discipline * 0.2],
        ['No tengo ingreso propio actualmente', 0.02],
      ])

  const debtStress = !hasCreditCardDebt && !hasBankLoan
    ? 'Sin problema'
    : pick(rng, [
        ['Sin problema', 0.15 + discipline * 0.35],
        ['Con algo de presión', 0.4],
        ['Me cuesta trabajo', 0.3 - discipline * 0.2],
        ['No puedo cubrirlos todos', 0.1 - discipline * 0.08],
      ])

  const coverageConfidence = pick(rng, [
    ['Sí, suficiente', 0.15 + (hasInsuranceHealth ? 0.3 : 0) * discipline],
    ['Parcialmente', 0.35],
    ['No estoy seguro', 0.3],
    ['No / no cuento con seguros', hasInsuranceHealth ? 0.05 : 0.25],
  ])

  const trackingFrequency = pick(rng, [
    ['Semanalmente', discipline * 0.4],
    ['Mensualmente', 0.4],
    ['De vez en cuando', 0.35 - discipline * 0.1],
    ['Casi nunca', 0.2 - discipline * 0.15],
  ])

  const statementReconcile = pick(rng, [
    ['Sí, cada mes', 0.25 + discipline * 0.4],
    ['A veces', 0.4],
    ['No todavía', 0.35 - discipline * 0.25],
  ])

  const financialStress = pick(rng, [
    ['Tranquilo y con control', 0.15 + discipline * 0.45],
    ['Neutral / manejable', 0.4],
    ['Preocupado', 0.3 - discipline * 0.15],
    ['Muy presionado', 0.15 - discipline * 0.1],
  ])

  const savingsAutomation = pick(rng, [
    ['Sí', discipline * 0.55],
    ['No, pero lo hago manualmente', 0.35],
    ['No', 0.4 - discipline * 0.3],
  ])

  const unexpectedExpense = pick(rng, [
    ['No', 0.3],
    ['Sí, lo cubrí sin problema', discipline * 0.4],
    ['Sí, me desbalanceó', 0.25],
    ['Sí, tuve que endeudarme', 0.15 - discipline * 0.1],
  ])

  const answers = {
    age,
    household_size: householdSize,
    dependents_count: dependentsCount,
    children_count: childrenCount,
    employment_status: employmentStatus,
    income_stability: incomeStability,
    housing_status: housingStatus,
    has_vehicle: hasVehicle,
    ...income,
    ...expenses,
    ...debt,
    ...savings,
    debt_stress: debtStress,
    coverage_confidence: coverageConfidence,
    budget_tracking_frequency: trackingFrequency,
    statement_reconcile: statementReconcile,
    financial_stress: financialStress,
    savings_automation: savingsAutomation,
    unexpected_expense_last_90_days: unexpectedExpense,
  }

  return { answers, discipline }
}

const INCOME_STABILITY_BONUS = {
  'Muy estable': 8,
  'Algo variable': -3,
  'Muy variable': -10,
  'No tengo ingreso propio actualmente': -16,
}

const DEBT_STRESS_PENALTY = {
  'Sin problema': 0,
  'Con algo de presión': 8,
  'Me cuesta trabajo': 20,
  'No puedo cubrirlos todos': 32,
}

// The "ground truth" this dataset is training toward. Deliberately built from the
// household's TRUE ratios (not the app's pillar-scoring curves) plus an interaction
// term (debt stress hurts more without a buffer) and noise, so it's a genuinely
// independent signal for the regression to approximate — not a tautology.
function syntheticLatentTarget(rng, answers, metrics) {
  const hasLongTermAssets = Number(answers.retirement_savings_total) > 0 || Number(answers.investment_total) > 0
  const hasInsurance = Number(answers.expense_health_insurance_monthly) > 0
  const debtPenalty = DEBT_STRESS_PENALTY[answers.debt_stress] ?? 10
  const bufferMultiplier = metrics.emergencyMonths < 1 ? 1.6 : metrics.emergencyMonths < 3 ? 1.2 : 1
  const noise = (rng() - 0.5) * 18

  const raw =
    38 +
    metrics.savingsRate * 120 +
    Math.min(metrics.emergencyMonths, 6) * 6 -
    metrics.debtToIncome * 85 -
    Math.max(0, metrics.housingRatio - 0.3) * 70 +
    (hasInsurance ? 5 : -2) +
    (hasLongTermAssets ? 6 : 0) +
    (INCOME_STABILITY_BONUS[answers.income_stability] ?? 0) -
    debtPenalty * bufferMultiplier +
    noise

  return clamp(raw, 0, 100)
}

export function generateSyntheticHouseholds({ count = 3000, seed = 20240601 } = {}) {
  const rng = mulberry32(seed)
  const households = []
  for (let i = 0; i < count; i += 1) {
    const { answers } = buildHousehold(rng)
    const metrics = calculateDerivedMetrics(answers)
    const latentTarget = syntheticLatentTarget(rng, answers, metrics)
    households.push({ answers, metrics, latentTarget })
  }
  return households
}

// Standalone run: print a quick sanity summary instead of writing any file —
// train-score-weights.mjs imports generateSyntheticHouseholds() directly.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const households = generateSyntheticHouseholds({ count: 3000 })
  const incomes = households.map((h) => h.metrics.monthlyIncome).sort((a, b) => a - b)
  const targets = households.map((h) => h.latentTarget)
  const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
  console.log(`Households: ${households.length}`)
  console.log(`Monthly income — median: ${Math.round(incomes[Math.floor(incomes.length / 2)]).toLocaleString('es-MX')}, mean: ${Math.round(mean(incomes)).toLocaleString('es-MX')}`)
  console.log(`Latent target — mean: ${mean(targets).toFixed(1)}, min: ${Math.min(...targets).toFixed(1)}, max: ${Math.max(...targets).toFixed(1)}`)
}
