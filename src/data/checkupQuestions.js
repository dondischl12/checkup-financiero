export const checkupQuestions = [
  // SECCIÓN A: Números del mes
  {
    id: 'ingreso',
    tipo: 'numero',
    seccion: 'numeros',
    texto: '¿Cuánto fue tu ingreso total este mes?',
    hint: 'Sueldos, honorarios, rentas — neto, después de impuestos.',
    placeholder: '0',
    dashboardKey: 'ingreso',
    contexto: (val) =>
      `$${Math.round(val / 30).toLocaleString('es-MX')} por día en promedio.`,
  },
  {
    id: 'gastos',
    tipo: 'numero',
    seccion: 'numeros',
    texto: '¿Cuánto gastaste en total este mes?',
    hint: 'Incluye renta, comida, transporte, entretenimiento y todos los demás gastos.',
    placeholder: '0',
    dashboardKey: 'gastos',
    contexto: (val, data) => {
      if (!data?.ingreso || data.ingreso === 0) return ''
      const pct = Math.round((val / data.ingreso) * 100)
      return `Eso representa el ${pct}% de tu ingreso mensual.`
    },
  },
  {
    id: 'ahorro',
    tipo: 'numero',
    seccion: 'numeros',
    texto: '¿Cuánto lograste ahorrar este mes?',
    hint: 'Lo que quedó después de todos tus gastos, o lo que apartaste intencionalmente.',
    placeholder: '0',
    dashboardKey: 'ahorro',
    contexto: (val, data) => {
      if (!data?.ingreso || data.ingreso === 0) return ''
      const pct = Math.round((val / data.ingreso) * 100)
      if (pct >= 10) return '¡Estás por encima de la meta del 10%!'
      return `La meta recomendada es el 10% ($${Math.round(data.ingreso * 0.1).toLocaleString('es-MX')}).`
    },
  },
  // SECCIÓN B: Situación general
  {
    id: 'situacion_deudas',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Cómo está tu situación con deudas este mes?',
    opciones: [
      { id: 'sin_deudas', texto: 'Sin deudas activas', dashboardVal: 0 },
      { id: 'manejables', texto: 'Tengo deudas y las pago sin problema', dashboardVal: 1 },
      { id: 'dificil', texto: 'Me cuesta trabajo cubrir los pagos mínimos', dashboardVal: 2 },
    ],
  },
  {
    id: 'gasto_inesperado',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Tuviste algún gasto inesperado importante este mes?',
    opciones: [
      { id: 'no', texto: 'No, el mes transcurrió sin sorpresas', dashboardVal: 0 },
      { id: 'si_cubierto', texto: 'Sí, pero pude cubrirlo sin problema', dashboardVal: 1 },
      { id: 'si_dificil', texto: 'Sí, y afectó mi presupuesto considerablemente', dashboardVal: 2 },
    ],
  },
  {
    id: 'bienestar',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Cómo te sientes con tu situación financiera este mes?',
    opciones: [
      { id: 'tranquilo', texto: 'Tranquilo/a y con control', dashboardVal: 0 },
      { id: 'neutro', texto: 'Ni bien ni mal, día a día', dashboardVal: 1 },
      { id: 'estresado', texto: 'Con estrés o preocupación', dashboardVal: 2 },
    ],
  },
  {
    id: 'fondo_emergencia',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Cuentas con un fondo de emergencia?',
    opciones: [
      { id: 'si_suficiente', texto: 'Sí, cubre al menos 3 meses de mis gastos', dashboardVal: 0 },
      { id: 'si_pequeño', texto: 'Tengo algo ahorrado pero no llega a 3 meses', dashboardVal: 1 },
      { id: 'no', texto: 'Aún no tengo fondo de emergencia', dashboardVal: 2 },
    ],
  },
  {
    id: 'nivel_deuda',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Cuánto debes en total (tarjetas, créditos, préstamos)?',
    opciones: [
      { id: 'cero', texto: 'Nada — estoy libre de deudas', dashboardVal: 0 },
      { id: 'menos3', texto: 'Menos de 3 meses de mi ingreso', dashboardVal: 1 },
      { id: 'mas3', texto: 'Más de 3 meses de mi ingreso', dashboardVal: 2 },
    ],
  },
  {
    id: 'seguros',
    tipo: 'opcion',
    seccion: 'situacion',
    texto: '¿Cuentas con algún seguro activo?',
    opciones: [
      { id: 'varios', texto: 'Sí, tengo seguro de gastos médicos y/o vida', dashboardVal: 0 },
      { id: 'basico', texto: 'Solo el seguro del IMSS / ISSSTE', dashboardVal: 1 },
      { id: 'ninguno', texto: 'No cuento con ningún seguro', dashboardVal: 2 },
    ],
  },
]
