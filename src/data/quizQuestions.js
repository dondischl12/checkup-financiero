export const quizQuestions = [
  // DEUDAS
  {
    id: 'q_deudas_1',
    tema: 'deudas',
    texto: '¿Qué significa el CAT de un crédito?',
    opciones: [
      { id: 'a', texto: 'El capital que pediste prestado', correcto: false },
      { id: 'b', texto: 'El costo total del crédito incluyendo intereses y comisiones', correcto: true },
      { id: 'c', texto: 'La cuota mensual mínima', correcto: false },
    ],
  },
  {
    id: 'q_deudas_2',
    tema: 'deudas',
    texto: '¿Cuál es la estrategia que elimina primero la deuda con mayor tasa de interés?',
    opciones: [
      { id: 'a', texto: 'Método bola de nieve', correcto: false },
      { id: 'b', texto: 'Método avalancha', correcto: true },
      { id: 'c', texto: 'Método proporcional', correcto: false },
    ],
  },
  {
    id: 'q_deudas_3',
    tema: 'deudas',
    texto: '¿Qué porcentaje del ingreso mensual se recomienda destinar al pago de deudas?',
    opciones: [
      { id: 'a', texto: 'Hasta el 15%', correcto: false },
      { id: 'b', texto: 'Hasta el 30%', correcto: true },
      { id: 'c', texto: 'Hasta el 50%', correcto: false },
    ],
  },
  // AHORRO
  {
    id: 'q_ahorro_1',
    tema: 'ahorro',
    texto: '¿Cuántos meses de gastos se recomienda tener en un fondo de emergencia?',
    opciones: [
      { id: 'a', texto: '1 mes', correcto: false },
      { id: 'b', texto: '3 a 6 meses', correcto: true },
      { id: 'c', texto: '12 meses', correcto: false },
    ],
  },
  {
    id: 'q_ahorro_2',
    tema: 'ahorro',
    texto: '¿Qué significa la regla 50/30/20 en finanzas personales?',
    opciones: [
      { id: 'a', texto: '50% gastos fijos, 30% gastos variables, 20% ahorro', correcto: true },
      { id: 'b', texto: '50% ahorro, 30% inversión, 20% gastos', correcto: false },
      { id: 'c', texto: '50% ingreso, 30% deuda, 20% diversión', correcto: false },
    ],
  },
  {
    id: 'q_ahorro_3',
    tema: 'ahorro',
    texto: '¿Cuál es la principal ventaja de automatizar tus ahorros?',
    opciones: [
      { id: 'a', texto: 'Genera mayores rendimientos automáticamente', correcto: false },
      { id: 'b', texto: 'Elimina la tentación de gastar ese dinero primero', correcto: true },
      { id: 'c', texto: 'Reduce los impuestos que pagas', correcto: false },
    ],
  },
  // SEGUROS
  {
    id: 'q_seguros_1',
    tema: 'seguros',
    texto: '¿Qué protege principalmente un seguro de gastos médicos mayores?',
    opciones: [
      { id: 'a', texto: 'Consultas médicas de rutina', correcto: false },
      { id: 'b', texto: 'Hospitalizaciones, cirugías y enfermedades graves', correcto: true },
      { id: 'c', texto: 'Medicamentos de uso diario', correcto: false },
    ],
  },
  {
    id: 'q_seguros_2',
    tema: 'seguros',
    texto: '¿Qué es el deducible en un seguro?',
    opciones: [
      { id: 'a', texto: 'El monto que paga la aseguradora por cada siniestro', correcto: false },
      { id: 'b', texto: 'La prima mensual del seguro', correcto: false },
      { id: 'c', texto: 'La cantidad que tú pagas antes de que el seguro cubra el resto', correcto: true },
    ],
  },
  {
    id: 'q_seguros_3',
    tema: 'seguros',
    texto: '¿Para qué sirve un seguro de vida?',
    opciones: [
      { id: 'a', texto: 'Para proteger económicamente a tus dependientes si falleces', correcto: true },
      { id: 'b', texto: 'Para cubrir tus gastos médicos en vida', correcto: false },
      { id: 'c', texto: 'Para generar ahorro a largo plazo exclusivamente', correcto: false },
    ],
  },
  // INVERSIÓN
  {
    id: 'q_inversion_1',
    tema: 'inversion',
    texto: '¿Qué significa diversificar una inversión?',
    opciones: [
      { id: 'a', texto: 'Invertir todo en el activo con mayor rendimiento', correcto: false },
      { id: 'b', texto: 'Distribuir el dinero en distintos tipos de activos para reducir el riesgo', correcto: true },
      { id: 'c', texto: 'Cambiar de inversión cada mes según el mercado', correcto: false },
    ],
  },
  {
    id: 'q_inversion_2',
    tema: 'inversion',
    texto: '¿Qué es el interés compuesto?',
    opciones: [
      { id: 'a', texto: 'El interés que paga un crédito hipotecario', correcto: false },
      { id: 'b', texto: 'Los intereses que se reinvierten y generan más intereses sobre el total', correcto: true },
      { id: 'c', texto: 'Una tasa fija garantizada por el banco', correcto: false },
    ],
  },
  {
    id: 'q_inversion_3',
    tema: 'inversion',
    texto: 'En general, ¿cuál es la relación entre rendimiento y riesgo en inversiones?',
    opciones: [
      { id: 'a', texto: 'A mayor rendimiento esperado, mayor riesgo', correcto: true },
      { id: 'b', texto: 'A mayor rendimiento esperado, menor riesgo', correcto: false },
      { id: 'c', texto: 'El riesgo no tiene relación con el rendimiento', correcto: false },
    ],
  },
  // PRESUPUESTO
  {
    id: 'q_presupuesto_1',
    tema: 'presupuesto',
    texto: '¿Cuál es el primer paso para hacer un presupuesto personal?',
    opciones: [
      { id: 'a', texto: 'Reducir gastos inmediatamente', correcto: false },
      { id: 'b', texto: 'Registrar todos tus ingresos y gastos actuales', correcto: true },
      { id: 'c', texto: 'Abrir una cuenta de ahorro', correcto: false },
    ],
  },
  {
    id: 'q_presupuesto_2',
    tema: 'presupuesto',
    texto: '¿Qué son los gastos hormiga?',
    opciones: [
      { id: 'a', texto: 'Gastos grandes e inevitables del hogar', correcto: false },
      { id: 'b', texto: 'Pequeños gastos cotidianos que sumados representan una cantidad significativa', correcto: true },
      { id: 'c', texto: 'Gastos de comida exclusivamente', correcto: false },
    ],
  },
  {
    id: 'q_presupuesto_3',
    tema: 'presupuesto',
    texto: '¿Qué porcentaje del ingreso se recomienda destinar a vivienda?',
    opciones: [
      { id: 'a', texto: 'Hasta el 50%', correcto: false },
      { id: 'b', texto: 'Hasta el 30%', correcto: true },
      { id: 'c', texto: 'Hasta el 10%', correcto: false },
    ],
  },
  // RETIRO
  {
    id: 'q_retiro_1',
    tema: 'retiro',
    texto: '¿Qué es una AFORE en México?',
    opciones: [
      { id: 'a', texto: 'Una cuenta bancaria de ahorro personal', correcto: false },
      { id: 'b', texto: 'Una administradora que gestiona el fondo de retiro de los trabajadores formales', correcto: true },
      { id: 'c', texto: 'Un seguro de vida gubernamental', correcto: false },
    ],
  },
  {
    id: 'q_retiro_2',
    tema: 'retiro',
    texto: '¿Por qué es importante empezar a ahorrar para el retiro desde joven?',
    opciones: [
      { id: 'a', texto: 'Porque el gobierno exige hacerlo por ley', correcto: false },
      { id: 'b', texto: 'Para aprovechar el interés compuesto durante más años', correcto: true },
      { id: 'c', texto: 'Porque los rendimientos son más altos para personas jóvenes', correcto: false },
    ],
  },
  {
    id: 'q_retiro_3',
    tema: 'retiro',
    texto: '¿Qué son las aportaciones voluntarias a la AFORE?',
    opciones: [
      { id: 'a', texto: 'Pagos obligatorios del empleador', correcto: false },
      { id: 'b', texto: 'Dinero extra que tú decides depositar para incrementar tu fondo de retiro', correcto: true },
      { id: 'c', texto: 'Descuentos fiscales automáticos', correcto: false },
    ],
  },
]
