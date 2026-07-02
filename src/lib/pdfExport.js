import jsPDF from 'jspdf'
import { format } from 'date-fns'
import { checkupQuestionBank } from '../data/checkupQuestionBank'
import { learningModules } from '../data/learningModules'
import { BENCHMARKS } from './financialCalculations'

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
const pct = new Intl.NumberFormat('es-MX', { style: 'percent', maximumFractionDigits: 0 })
const betaPrivacyCopy = 'Tus respuestas se procesan sólo para generar este snapshot. En esta beta sin cuenta, no se guardan en una base de datos y se borran al actualizar la página.'
const legalReviewCopy = '*Mensaje pendiente de revisión legal.'

const colors = {
  navy: [10, 28, 58],
  emerald: [47, 133, 90],
  emeraldSoft: [232, 245, 236],
  sage: [226, 238, 224],
  sageDeep: [153, 180, 150],
  cream: [251, 250, 246],
  paper: [255, 255, 255],
  stone: [229, 226, 220],
  stoneLight: [244, 241, 235],
  amber: [217, 139, 56],
  text: [55, 65, 81],
  muted: [102, 112, 133],
}

export function exportSnapshotPdf(snapshot, history = []) {
  if (!snapshot) return

  const { pdf, filename } = createSnapshotPdf(snapshot, history)
  pdf.save(filename)
}

export function createSnapshotPdf(snapshot, history = []) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const filename = `katalyst-snapshot-financiero-${format(new Date(snapshot.createdAt || new Date()), 'yyyy-MM-dd')}.pdf`
  const ctx = { pdf, y: 0, page: 1 }

  drawPageBackground(ctx)
  drawHeader(ctx, 'Su snapshot financiero')
  drawHero(ctx, snapshot)
  drawMetricGrid(ctx, snapshot)
  drawThreeColumnLists(ctx, snapshot)
  drawFooter(ctx)

  addPage(ctx, 'Análisis financiero detallado')
  drawRatioTable(ctx, snapshot)
  drawCategoryDistribution(ctx, snapshot)
  drawRecurringBreakdown(ctx, snapshot)
  drawHistory(ctx, history)
  drawFooter(ctx)

  addPage(ctx, 'Plan de acción y educación próxima')
  drawActionPlan(ctx, snapshot)
  drawRecommendedModules(ctx, snapshot)
  drawDisclaimer(ctx)
  drawFooter(ctx)

  addPage(ctx, 'Anexo de respuestas capturadas')
  drawAnswerAppendix(ctx, snapshot)
  drawFooter(ctx)

  return { pdf, filename }
}

function drawPageBackground({ pdf }) {
  pdf.setFillColor(...colors.cream)
  pdf.rect(0, 0, 210, 297, 'F')
  drawPdfLandscape(pdf)
}

function drawPdfLandscape(pdf) {
  pdf.setFillColor(242, 247, 239)
  pdf.circle(174, 44, 46, 'F')
  pdf.setFillColor(250, 252, 248)
  drawCloud(pdf, 158, 31, 1)
  drawCloud(pdf, 186, 39, 0.72)

  drawSkyline(pdf)

  pdf.setFillColor(230, 239, 225)
  pdf.triangle(112, 92, 160, 43, 218, 92, 'F')
  pdf.setFillColor(217, 231, 211)
  pdf.triangle(128, 105, 184, 52, 226, 105, 'F')
  pdf.setFillColor(196, 218, 194)
  pdf.triangle(112, 122, 170, 68, 226, 122, 'F')
  pdf.setFillColor(224, 235, 219)
  pdf.triangle(98, 134, 146, 94, 212, 134, 'F')
  pdf.setFillColor(184, 209, 187)
  pdf.triangle(134, 140, 196, 84, 232, 140, 'F')

  ;[
    [155, 75, 6.6],
    [164, 82, 8.2],
    [174, 76, 7.2],
    [184, 89, 9.5],
    [194, 84, 7.8],
    [145, 98, 6.2],
    [168, 104, 6.7],
    [203, 101, 6.4],
  ].forEach(([x, y, size]) => drawPine(pdf, x, y, size))

  pdf.setFillColor(246, 249, 243)
  pdf.rect(0, 132, 210, 165, 'F')
  pdf.setFillColor(236, 243, 232)
  pdf.triangle(0, 158, 62, 130, 132, 158, 'F')
  pdf.setFillColor(218, 233, 214)
  pdf.triangle(64, 170, 142, 126, 228, 170, 'F')
  pdf.setFillColor(200, 222, 201)
  pdf.triangle(0, 186, 95, 140, 210, 186, 'F')
  pdf.setFillColor(...colors.cream)
  pdf.rect(0, 196, 210, 101, 'F')
}

function drawCloud(pdf, x, y, scale) {
  ;[
    [0, 0, 8],
    [7, -3, 6],
    [14, 0, 8],
    [7, 3, 10],
  ].forEach(([dx, dy, radius]) => pdf.circle(x + dx * scale, y + dy * scale, radius * scale, 'F'))
}

function drawSkyline(pdf) {
  pdf.setFillColor(212, 224, 211)
  ;[
    [144, 60, 4, 24],
    [151, 54, 5, 30],
    [160, 66, 4, 18],
    [170, 50, 6, 34],
    [181, 62, 4, 22],
    [190, 57, 5, 27],
    [201, 68, 4, 16],
  ].forEach(([x, y, width, height]) => pdf.rect(x, y, width, height, 'F'))
  pdf.setFillColor(191, 207, 190)
  pdf.triangle(173, 45, 176, 32, 179, 45, 'F')
}

function drawPine(pdf, x, y, size) {
  pdf.setFillColor(86, 126, 91)
  pdf.triangle(x, y - size, x - size * 0.55, y, x + size * 0.55, y, 'F')
  pdf.triangle(x, y - size * 1.42, x - size * 0.44, y - size * 0.38, x + size * 0.44, y - size * 0.38, 'F')
  pdf.setFillColor(112, 84, 58)
  pdf.rect(x - 0.45, y, 0.9, size * 0.55, 'F')
}

function addPage(ctx, title) {
  ctx.pdf.addPage()
  ctx.page += 1
  drawPageBackground(ctx)
  drawHeader(ctx, title)
}

function drawHeader(ctx, title) {
  const { pdf } = ctx
  pdf.setTextColor(...colors.navy)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.text('KATALYST', 18, 20)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(...colors.muted)
  pdf.text('Reporte educativo privado / Moneda MXN', 18, 27)
  pdf.setFillColor(...colors.emeraldSoft)
  pdf.roundedRect(145, 15, 47, 17, 4, 4, 'F')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(8)
  pdf.setTextColor(...colors.emerald)
  pdf.text('Datos privados', 153, 22)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(6.7)
  pdf.setTextColor(...colors.text)
  pdf.text('Beta sin base de datos', 153, 27)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(24)
  pdf.setTextColor(...colors.navy)
  pdf.text(title, 18, 44)
  ctx.y = 54
}

function drawHero(ctx, snapshot) {
  const { pdf } = ctx
  const metrics = snapshot.derivedMetrics
  card(pdf, 18, ctx.y, 174, 62)
  pdf.setFillColor(...colors.sage)
  pdf.circle(50, ctx.y + 31, 25, 'F')
  pdf.setFillColor(255, 255, 255)
  pdf.circle(50, ctx.y + 31, 19, 'F')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(36)
  pdf.setTextColor(...colors.navy)
  pdf.text(String(snapshot.score), 38, ctx.y + 37)
  pdf.setFontSize(12)
  pdf.text('/100', 64, ctx.y + 37)
  pdf.setFontSize(12)
  pdf.setTextColor(...colors.emerald)
  pdf.text(snapshot.level.label, 36, ctx.y + 47)

  pdf.setTextColor(...colors.navy)
  pdf.setFontSize(13)
  pdf.text('Interpretación', 92, ctx.y + 16)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(...colors.text)
  pdf.text(wrap(pdf, snapshot.level.summary, 82), 92, ctx.y + 25)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(...colors.emerald)
  pdf.text(`Flujo mensual neto: ${money.format(metrics.netFlow)}`, 92, ctx.y + 50)
  ctx.y += 72
}

function drawMetricGrid(ctx, snapshot) {
  const { pdf } = ctx
  const m = snapshot.derivedMetrics
  const metrics = [
    ['Ingresos mensuales', money.format(m.monthlyIncome), 'Incluye recurrentes + equivalentes mensuales'],
    ['Gastos mensuales', money.format(m.monthlyExpenses), `${pct.format(m.expenseRatio || 0)} del ingreso`],
    ['Ahorro mensual', money.format(m.monthlySavings), `${pct.format(m.savingsRate || 0)} del ingreso`],
    ['Deuda total', money.format(m.debtTotal), `${pct.format(m.debtToIncome || 0)} DTI mensual`],
    ['Fondo emergencia', money.format(m.emergencyFund), `${m.emergencyMonths.toFixed(1)} meses esenciales`],
    ['Gasto vivienda', money.format(m.housing), `${pct.format(m.housingRatio || 0)} del ingreso`],
  ]
  metrics.forEach(([title, value, note], index) => {
    const x = 18 + (index % 3) * 58
    const y = ctx.y + Math.floor(index / 3) * 32
    card(pdf, x, y, 52, 25)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.setTextColor(...colors.text)
    pdf.text(title, x + 5, y + 7)
    pdf.setFontSize(13)
    pdf.setTextColor(...colors.navy)
    pdf.text(value, x + 5, y + 15)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(7)
    pdf.setTextColor(...colors.emerald)
    pdf.text(wrap(pdf, note, 42), x + 5, y + 21)
  })
  ctx.y += 72
}

function drawThreeColumnLists(ctx, snapshot) {
  const { pdf } = ctx
  const columns = [
    ['Fortalezas', snapshot.strengths, colors.emerald],
    ['Áreas de atención', snapshot.attentionAreas, colors.amber],
    ['Próximos pasos', snapshot.actionPlan.map((item) => item.title), colors.emerald],
  ]
  columns.forEach(([title, items, color], index) => {
    const x = 18 + index * 58
    card(pdf, x, ctx.y, 52, 60)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(...colors.navy)
    pdf.text(title, x + 5, ctx.y + 8)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(7.5)
    pdf.setTextColor(...colors.text)
    let y = ctx.y + 17
    items.slice(0, 5).forEach((item) => {
      pdf.setFillColor(...color)
      pdf.circle(x + 6, y - 1.5, 1.1, 'F')
      pdf.text(wrap(pdf, item, 40), x + 10, y)
      y += 9
    })
  })
  ctx.y += 70
}

function drawRatioTable(ctx, snapshot) {
  const { pdf } = ctx
  const m = snapshot.derivedMetrics
  const rows = [
    ['Flujo mensual neto', money.format(m.netFlow), 'Positivo', m.netFlow >= 0],
    ['Tasa de ahorro', pct.format(m.savingsRate || 0), BENCHMARKS.savingsRate.label, BENCHMARKS.savingsRate.pass(m.savingsRate)],
    ['Fondo de emergencia', `${m.emergencyMonths.toFixed(1)} meses`, BENCHMARKS.emergencyMonths.label, BENCHMARKS.emergencyMonths.pass(m.emergencyMonths)],
    ['Deuda no hipotecaria/ingresos', pct.format(m.debtToIncome || 0), BENCHMARKS.debtToIncome.label, BENCHMARKS.debtToIncome.pass(m.debtToIncome)],
    ['Vivienda/ingreso', pct.format(m.housingRatio || 0), BENCHMARKS.housingRatio.label, BENCHMARKS.housingRatio.pass(m.housingRatio)],
  ]
  drawTable(ctx, ['Métrica', 'Actual', 'Guía', 'Estado'], rows.map(([a, b, c, pass]) => [a, b, c, pass ? 'Bien' : 'Atención']), [58, 42, 42, 32])
}

function drawCategoryDistribution(ctx, snapshot) {
  const { pdf } = ctx
  ctx.y += 8
  sectionTitle(ctx, 'Distribución de gastos mensual')
  const rows = snapshot.derivedMetrics.categoryDistribution.map((item) => [
    item.name,
    money.format(item.value),
    pct.format(item.percent || 0),
  ])
  drawTable(ctx, ['Categoría', 'Monto', '% de gasto'], rows, [82, 46, 42])
}

function drawRecurringBreakdown(ctx, snapshot) {
  const { pdf } = ctx
  const m = snapshot.derivedMetrics
  ctx.y += 8
  sectionTitle(ctx, 'Recurrente vs. anual / one-time normalizado')
  card(pdf, 18, ctx.y, 174, 36)
  const rows = [
    ['Ingresos recurrentes mensuales', money.format(m.recurringMonthlyIncome)],
    ['Ingresos anuales/one-time convertidos a mensual', money.format(m.annualizedIncomeMonthly)],
    ['Gastos recurrentes mensuales', money.format(m.recurringMonthlyExpenses)],
    ['Gastos anuales convertidos a mensual', money.format(m.annualizedExpenseMonthly)],
  ]
  rows.forEach(([label, value], index) => {
    const x = 24 + (index % 2) * 84
    const y = ctx.y + 10 + Math.floor(index / 2) * 14
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(...colors.text)
    pdf.text(label, x, y)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(11)
    pdf.setTextColor(...colors.navy)
    pdf.text(value, x, y + 6)
  })
  ctx.y += 46
}

function drawHistory(ctx, history) {
  sectionTitle(ctx, 'Historial real')
  if (history.length <= 1) {
    note(ctx, 'Para comparar progreso en el tiempo, cree una cuenta opcional y guarde snapshots posteriores con consentimiento. No se generan datos históricos simulados.')
    return
  }
  drawTable(ctx, ['Fecha', 'Score', 'Ingresos', 'Gastos', 'Ahorro'], history.map((item) => [
    new Date(item.createdAt).toLocaleDateString('es-MX'),
    String(item.score),
    money.format(item.derivedMetrics?.monthlyIncome || 0),
    money.format(item.derivedMetrics?.monthlyExpenses || 0),
    money.format(item.derivedMetrics?.monthlySavings || 0),
  ]), [34, 26, 38, 38, 34])
}

function drawActionPlan(ctx, snapshot) {
  sectionTitle(ctx, 'Roadmap de 30 días')
  snapshot.actionPlan.forEach((item) => {
    card(ctx.pdf, 18, ctx.y, 174, 22)
    ctx.pdf.setFont('helvetica', 'bold')
    ctx.pdf.setFontSize(9)
    ctx.pdf.setTextColor(...colors.emerald)
    ctx.pdf.text(`Semana ${item.week}`, 24, ctx.y + 8)
    ctx.pdf.setTextColor(...colors.navy)
    ctx.pdf.text(item.title, 52, ctx.y + 8)
    ctx.pdf.setFont('helvetica', 'normal')
    ctx.pdf.setFontSize(8)
    ctx.pdf.setTextColor(...colors.text)
    ctx.pdf.text(wrap(ctx.pdf, item.description, 130), 52, ctx.y + 15)
    ctx.y += 27
  })
}

function drawRecommendedModules(ctx, snapshot) {
  ctx.y += 4
  sectionTitle(ctx, 'Módulos recomendados próximamente')
  const modules = learningModules.filter((module) => snapshot.recommendations.includes(module.id))
  drawTable(ctx, ['Módulo', 'Estado', 'Fase', 'Por qué'], modules.map((module) => [
    module.title,
    'Próximamente',
    'Educación',
    module.description,
  ]), [48, 28, 18, 76])
}

function drawDisclaimer(ctx) {
  ctx.y += 8
  sectionTitle(ctx, 'Nota educativa')
  note(ctx, `Este reporte es educativo y orientativo. No constituye asesoría financiera personalizada, recomendación de inversión, diagnóstico legal, fiscal o crediticio. ${betaPrivacyCopy} ${legalReviewCopy}`)
}

function drawAnswerAppendix(ctx, snapshot) {
  const { pdf } = ctx
  const answers = snapshot.answers || {}
  checkupQuestionBank.sections.forEach((section) => {
    const rows = section.questions
      .filter((question) => answers[question.id] !== undefined && answers[question.id] !== '')
      .map((question) => [question.label, formatAnswer(question, answers[question.id])])
    if (!rows.length) return
    if (ctx.y > 235) {
      drawFooter(ctx)
      addPage(ctx, 'Anexo de respuestas capturadas')
    }
    sectionTitle(ctx, section.title)
    rows.forEach(([label, value]) => {
      if (ctx.y > 270) {
        drawFooter(ctx)
        addPage(ctx, 'Anexo de respuestas capturadas')
      }
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(7.5)
      pdf.setTextColor(...colors.navy)
      pdf.text(wrap(pdf, label, 92), 18, ctx.y)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(...colors.text)
      pdf.text(wrap(pdf, value, 70), 116, ctx.y)
      ctx.y += 9
    })
    ctx.y += 4
  })
}

function drawTable(ctx, headers, rows, widths) {
  const { pdf } = ctx
  const x0 = 18
  let x = x0
  pdf.setFillColor(...colors.navy)
  pdf.roundedRect(x0, ctx.y, widths.reduce((a, b) => a + b, 0), 9, 2, 2, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(7.5)
  headers.forEach((header, index) => {
    pdf.text(header, x + 3, ctx.y + 6)
    x += widths[index]
  })
  ctx.y += 13
  rows.forEach((row) => {
    if (ctx.y > 270) {
      drawFooter(ctx)
      addPage(ctx, 'Continuación')
    }
    x = x0
    pdf.setDrawColor(...colors.stone)
    pdf.line(x0, ctx.y + 5, x0 + widths.reduce((a, b) => a + b, 0), ctx.y + 5)
    row.forEach((cell, index) => {
      pdf.setFont('helvetica', index === 0 ? 'bold' : 'normal')
      pdf.setTextColor(...colors.text)
      pdf.setFontSize(7.2)
      pdf.text(wrap(pdf, String(cell), widths[index] - 6), x + 3, ctx.y)
      x += widths[index]
    })
    ctx.y += 8
  })
}

function sectionTitle(ctx, title) {
  ctx.pdf.setFont('helvetica', 'bold')
  ctx.pdf.setFontSize(13)
  ctx.pdf.setTextColor(...colors.navy)
  ctx.pdf.text(title, 18, ctx.y)
  ctx.y += 8
}

function note(ctx, text) {
  const lines = wrap(ctx.pdf, text, 160)
  const height = Math.max(24, 10 + lines.length * 4.2)
  card(ctx.pdf, 18, ctx.y, 174, height)
  ctx.pdf.setFont('helvetica', 'normal')
  ctx.pdf.setFontSize(8.5)
  ctx.pdf.setTextColor(...colors.text)
  ctx.pdf.text(lines, 24, ctx.y + 8)
  ctx.y += height + 8
}

function card(pdf, x, y, w, h) {
  pdf.setFillColor(...colors.paper)
  pdf.setDrawColor(...colors.stone)
  pdf.roundedRect(x, y, w, h, 4, 4, 'FD')
}

function drawFooter(ctx) {
  const { pdf } = ctx
  pdf.setDrawColor(...colors.stone)
  pdf.line(18, 282, 192, 282)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(7)
  pdf.setTextColor(...colors.text)
  pdf.text('Privacidad beta: no se guardan respuestas financieras sin cuenta. *Mensaje pendiente de revisión legal.', 18, 288)
  pdf.text(`KATALYST / ${ctx.page}`, 176, 288)
}

function formatAnswer(question, value) {
  if (question.type === 'currency') return money.format(Number(value) || 0)
  return String(value)
}

function wrap(pdf, text, width) {
  // jsPDF's built-in Helvetica lacks the math glyphs ≥/≤ and the typographic
  // minus/en-dash, which render as garbage. Map them to safe ASCII equivalents.
  const clean = String(text || '')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/[−–]/g, '-')
  return pdf.splitTextToSize(clean, width)
}
