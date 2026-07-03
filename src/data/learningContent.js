// Interactive learning content — "Duolingo for adults", respectful tone (usted),
// real Mexican context and MXN examples. Each module is ~30 min, split into
// "partes" (units). Each unit is a sequence of steps: `read` (concept) then
// `quiz` (scenario / myth-buster with a teaching explanation). Video steps can
// be added later as { type: 'video', ... } without changing the player.

export const learningContent = {
  'presupuesto-mensual': {
    id: 'presupuesto-mensual',
    title: 'Presupuesto que sí funciona',
    tema: 'presupuesto',
    description: 'Convierta su ingreso en decisiones claras: las tres cajas, las fugas invisibles y un plan que sí sostiene.',
    minutes: 30,
    accent: '#2f855a',
    units: [
      {
        id: 'pre-1',
        title: 'Qué es (y qué no es) un presupuesto',
        steps: [
          {
            type: 'read',
            title: 'El presupuesto no es una jaula',
            paragraphs: [
              'Un presupuesto no existe para quitarle cosas. Existe para que usted decida a dónde va su dinero antes de que el dinero decida por usted.',
              'La diferencia entre alguien a quien "no le alcanza" y alguien tranquilo casi nunca es cuánto gana: es cuánto sabe de a dónde se va.',
            ],
            clave: 'Presupuestar es decidir antes de gastar, no arrepentirse después.',
          },
          {
            type: 'read',
            title: 'Los tres números que importan',
            paragraphs: [
              'Todo presupuesto vive de tres números: lo que entra, lo que sale y la diferencia.',
              'Si la diferencia (su flujo) es positiva, tiene margen para ahorrar o pagar deuda. Si es negativa, algo se está financiando con deuda sin que usted lo note.',
            ],
            bullets: [
              'Ingreso neto: lo que realmente llega a su cuenta, después de impuestos.',
              'Gastos: fijos (renta, colegiaturas) y variables (súper, salidas).',
              'Flujo = ingreso − gastos. Es el número que de verdad mueve la aguja.',
            ],
          },
          {
            type: 'quiz',
            prompt: 'Una persona gana $60,000 y otra $30,000. ¿Quién tiene mejores finanzas?',
            options: ['La de $60,000, siempre', 'Depende de su flujo, no de su ingreso', 'La que tenga más tarjetas'],
            answer: 1,
            explain: 'El ingreso no dice nada por sí solo. Quien gana $30,000 y gasta $25,000 está mejor que quien gana $60,000 y gasta $62,000.',
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es el propósito real de un presupuesto?',
            options: ['Prohibirse gustos', 'Decidir a dónde va el dinero antes de gastarlo', 'Impresionar al banco'],
            answer: 1,
            explain: 'Es una herramienta de decisión, no de castigo. El mejor presupuesto es el que usted puede sostener.',
          },
          {
            type: 'quiz',
            prompt: 'Mito o realidad: "Presupuestar es solo para quien tiene poco dinero."',
            options: ['Mito', 'Realidad'],
            answer: 0,
            explain: 'Mito. Entre más dinero se mueve, más fácil es perderle el rastro. Presupuestar es control, no pobreza.',
          },
        ],
      },
      {
        id: 'pre-2',
        title: 'El ingreso neto y las tres cajas (50/30/20)',
        steps: [
          {
            type: 'read',
            title: 'Empiece por el número correcto',
            paragraphs: [
              'Mucha gente presupuesta sobre lo que gana en bruto y se queda corta. Trabaje siempre sobre su ingreso neto: lo que llega a la cuenta.',
              'Si su ingreso es variable (honorarios, negocio), use un promedio conservador de los últimos meses, no su mejor mes.',
            ],
            clave: 'Presupueste sobre lo que llega, no sobre lo que factura.',
          },
          {
            type: 'read',
            title: 'La regla 50/30/20 como punto de partida',
            paragraphs: [
              'Una guía simple y respetada: 50% a necesidades, 30% a gustos, 20% a ahorro y pago de deuda.',
              'No es una ley; es un espejo. Si sus necesidades comen 70%, no está "mal", pero ya sabe dónde está la tensión.',
            ],
            bullets: [
              '50% Necesidades: vivienda, comida, servicios, transporte.',
              '30% Gustos: restaurantes, suscripciones, salidas.',
              '20% Futuro: ahorro, fondo de emergencia, pago extra de deuda.',
            ],
          },
          {
            type: 'quiz',
            prompt: 'Su sueldo bruto es $40,000 pero a su cuenta llegan $32,000. ¿Sobre cuál presupuesta?',
            options: ['$40,000', '$32,000', 'El promedio de los dos'],
            answer: 1,
            explain: 'Sobre los $32,000 netos. Presupuestar sobre el bruto es planear con dinero que nunca verá.',
          },
          {
            type: 'quiz',
            prompt: 'Con la guía 50/30/20 e ingreso neto de $30,000, ¿cuánto debería ir al futuro (ahorro/deuda)?',
            options: ['$3,000', '$6,000', '$15,000'],
            answer: 1,
            explain: '20% de $30,000 = $6,000. Es una meta, no un mínimo obligatorio: si hoy no llega, empiece con menos y suba.',
          },
          {
            type: 'quiz',
            prompt: 'Sus "necesidades" ocupan 68% del ingreso. ¿Qué significa?',
            options: ['Está en quiebra', 'Tiene poco margen; conviene revisar vivienda/transporte', 'Debe cancelar todos sus gustos'],
            answer: 1,
            explain: 'No es un veredicto, es una señal. Las necesidades altas (sobre todo vivienda) aprietan el margen para ahorrar.',
          },
        ],
      },
      {
        id: 'pre-3',
        title: 'Gastos hormiga y fugas invisibles',
        steps: [
          {
            type: 'read',
            title: 'Lo pequeño y repetido pesa',
            paragraphs: [
              '$80 de café, $60 de apps, $150 de comida a domicilio... no duelen en el momento, pero se acumulan.',
              'El objetivo no es dejar de vivir; es que esos gastos sean una decisión, no un automático.',
            ],
            clave: 'El problema no es el café de $80. Es el café de $80 que usted no eligió.',
          },
          {
            type: 'read',
            title: 'Suscripciones: la fuga silenciosa',
            paragraphs: [
              'Streaming, nube, el gimnasio que no pisa, apps olvidadas. Revíselas una vez al año y pregúntese: ¿la usé este mes?',
              'Cancelar dos suscripciones de $200 recupera $4,800 al año sin bajar su calidad de vida.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuánto suman al mes tres gastos de $100, cinco días a la semana?',
            options: ['$1,500', '$3,000', '$6,000'],
            answer: 2,
            explain: '$100 × 3 × 5 × ~4 semanas ≈ $6,000. Los gastos hormiga se ven chiquitos de a uno y enormes al mes.',
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es la mejor forma de manejar los gastos hormiga?',
            options: ['Prohibírselos por completo', 'Hacerlos conscientes y ponerles un límite', 'Ignorarlos, son insignificantes'],
            answer: 1,
            explain: 'Prohibir no dura. Darles un monto mensual sí: usted sigue disfrutando, pero con control.',
          },
          {
            type: 'quiz',
            prompt: 'Mito o realidad: "Recortar gastos pequeños no sirve, lo que importa es ganar más."',
            options: ['Mito', 'Realidad'],
            answer: 0,
            explain: 'Mito. Ganar más ayuda, pero si no controla las fugas, el ingreso extra también se fuga. Ambos importan.',
          },
        ],
      },
      {
        id: 'pre-4',
        title: 'Un presupuesto que sostiene',
        steps: [
          {
            type: 'read',
            title: 'El mejor presupuesto es el que sí sigue',
            paragraphs: [
              'Un presupuesto perfecto que abandona en dos semanas vale menos que uno simple que revisa cada mes.',
              'La constancia le gana a la perfección. Diez minutos al mes comparando lo planeado contra lo real bastan para corregir el rumbo.',
            ],
            clave: 'No busque el presupuesto perfecto. Busque el que pueda repetir.',
          },
          {
            type: 'read',
            title: 'Revisar es la mitad del trabajo',
            paragraphs: [
              'Presupuestar sin revisar es manejar con los ojos cerrados. Compare cada mes su plan con lo que pasó en banco y tarjetas.',
              'No para castigarse: para aprender dónde se desvía y ajustar el siguiente mes.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Qué es más útil?',
            options: ['Un presupuesto detalladísimo que abandona en 2 semanas', 'Uno simple que revisa cada mes', 'No tener presupuesto pero "tenerlo en la cabeza"'],
            answer: 1,
            explain: 'La constancia gana. Un sistema simple y sostenible supera a uno perfecto que no dura.',
          },
          {
            type: 'quiz',
            prompt: 'Terminó el mes con flujo negativo. ¿Cuál es el primer paso?',
            options: ['Endeudarse para cubrirlo y seguir igual', 'Revisar qué categoría se pasó y ajustar el próximo mes', 'Dejar de presupuestar'],
            answer: 1,
            explain: 'Un mes negativo es información, no fracaso. Identifique la categoría que se disparó y ajústela.',
          },
        ],
      },
    ],
  },

  'fondo-emergencia': {
    id: 'fondo-emergencia',
    title: 'Fondo de emergencia',
    tema: 'ahorro',
    description: 'El colchón que evita que un imprevisto se convierta en deuda cara: cuánto, dónde y cómo construirlo sin dolor.',
    minutes: 30,
    accent: '#2f855a',
    units: [
      {
        id: 'fon-1',
        title: 'Qué es y por qué cambia todo',
        steps: [
          {
            type: 'read',
            title: 'El colchón que evita la deuda',
            paragraphs: [
              'Un fondo de emergencia es dinero reservado para lo inesperado: una reparación, una emergencia médica, quedarse sin ingreso.',
              'Su verdadera función no es "ahorrar": es evitar que un imprevisto lo empuje a la tarjeta de crédito. Quien no tiene fondo, financia sus emergencias con deuda cara.',
            ],
            clave: 'El fondo de emergencia no lo hace rico. Evita que un mal mes lo endeude.',
          },
          {
            type: 'read',
            title: 'Qué NO es un fondo de emergencia',
            paragraphs: [
              'No es para vacaciones, ni para la pantalla nueva, ni para un enganche planeado. Eso es ahorro con nombre y apellido.',
              'El fondo es intocable salvo por una emergencia real: algo urgente, necesario e inesperado.',
            ],
            bullets: [
              'Urgente: no puede esperar.',
              'Necesario: no es un gusto.',
              'Inesperado: no estaba en el plan.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuál SÍ es una emergencia válida para el fondo?',
            options: ['Una oferta de fin de temporada', 'Reparación del coche que usa para trabajar', 'El cumpleaños de su hijo'],
            answer: 1,
            explain: 'Urgente, necesario e inesperado. Un cumpleaños es predecible; una oferta es un gusto. La reparación que afecta su ingreso, sí califica.',
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es la función principal del fondo?',
            options: ['Generar rendimientos altos', 'Evitar endeudarse ante imprevistos', 'Presumir que ahorra'],
            answer: 1,
            explain: 'El fondo es defensa, no inversión. Su trabajo es que un imprevisto no se convierta en deuda cara.',
          },
          {
            type: 'quiz',
            prompt: 'Mito o realidad: "Si tengo tarjeta de crédito, no necesito fondo de emergencia."',
            options: ['Mito', 'Realidad'],
            answer: 0,
            explain: 'Mito. La tarjeta convierte la emergencia en deuda con intereses altos. El fondo la resuelve sin costo.',
          },
        ],
      },
      {
        id: 'fon-2',
        title: '¿Cuánto necesito? 3 a 6 meses',
        steps: [
          {
            type: 'read',
            title: 'La medida correcta: sus gastos, no su ingreso',
            paragraphs: [
              'El fondo se mide en meses de gastos esenciales, no de ingreso. Sume lo indispensable de un mes: vivienda, comida, servicios, transporte, medicinas y pagos mínimos.',
              'La referencia común es 3 a 6 meses de esos gastos.',
            ],
            clave: 'Se mide en meses de gastos esenciales, no en meses de sueldo.',
          },
          {
            type: 'read',
            title: '3, 6 o más: depende de su estabilidad',
            paragraphs: [
              '3 meses si su ingreso es estable y hay dos entradas en casa. 6 meses o más si es independiente, comisionista o único sostén.',
              'Empezar con 1 mes ya lo cambia todo: la mayoría de las emergencias caben ahí.',
            ],
          },
          {
            type: 'quiz',
            prompt: 'Sus gastos esenciales son $18,000 al mes. ¿Cuál es un fondo de 3 meses?',
            options: ['$18,000', '$54,000', '$180,000'],
            answer: 1,
            explain: '$18,000 × 3 = $54,000. Se calcula sobre gastos esenciales, no sobre el ingreso.',
          },
          {
            type: 'quiz',
            prompt: '¿Quién necesita un fondo más grande (6+ meses)?',
            options: ['Empleado con sueldo fijo y pareja que también trabaja', 'Freelancer con ingreso variable y único sostén', 'Alguien que vive con sus papás sin gastos'],
            answer: 1,
            explain: 'A mayor variabilidad y dependencia de un solo ingreso, mayor colchón. La estabilidad define el tamaño.',
          },
          {
            type: 'quiz',
            prompt: 'El fondo se calcula sobre...',
            options: ['Gastos esenciales mensuales', 'Ingreso mensual', 'El saldo de la tarjeta'],
            answer: 0,
            explain: 'Sobre lo que necesita para vivir un mes. Así sabe cuánto tiempo aguanta sin ingreso.',
          },
        ],
      },
      {
        id: 'fon-3',
        title: '¿Dónde lo guardo?',
        steps: [
          {
            type: 'read',
            title: 'Líquido, separado y aburrido',
            paragraphs: [
              'El fondo debe cumplir tres cosas: disponible (lo saca el mismo día), separado (no en la cuenta de diario para no gastarlo) y seguro (sin riesgo de perder valor).',
              'No busque rendimiento: busque tranquilidad y acceso.',
            ],
            clave: 'El fondo debe ser aburrido: líquido, separado y sin riesgo.',
          },
          {
            type: 'read',
            title: 'Ni bajo el colchón ni en la bolsa de valores',
            paragraphs: [
              'En efectivo en casa pierde valor y se gasta. En inversiones de riesgo puede caer justo cuando lo necesita.',
              'Una cuenta de ahorro separada o un instrumento líquido de bajo riesgo es el lugar correcto.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es el mejor lugar para el fondo de emergencia?',
            options: ['Invertido en acciones para que crezca', 'En una cuenta separada, líquida y segura', 'En efectivo bajo el colchón'],
            answer: 1,
            explain: 'Necesita poder sacarlo ya y sin pérdidas. El rendimiento es secundario frente a la disponibilidad.',
          },
          {
            type: 'quiz',
            prompt: '¿Por qué NO conviene tenerlo en la misma cuenta de gastos diarios?',
            options: ['Porque da menos intereses', 'Porque es más fácil gastarlo sin darse cuenta', 'No hay problema, da igual'],
            answer: 1,
            explain: 'Si está a la vista, se gasta. Separarlo lo protege de usted mismo en un mal día.',
          },
          {
            type: 'quiz',
            prompt: 'Mito o realidad: "El fondo debería estar invertido para no perder contra la inflación."',
            options: ['Mito', 'Realidad'],
            answer: 0,
            explain: 'Mito para el fondo de emergencia: su prioridad es disponibilidad y seguridad. Hacer crecer el patrimonio es otro objetivo (inversión).',
          },
        ],
      },
      {
        id: 'fon-4',
        title: 'Cómo construirlo sin que duela',
        steps: [
          {
            type: 'read',
            title: 'Automatice y olvídese',
            paragraphs: [
              'La fuerza de voluntad falla; la automatización no. Programe una transferencia el día que le pagan, aunque sea pequeña.',
              'Lo que no pasa por sus manos, no se gasta. $500 quincenales son $12,000 al año casi sin sentirlo.',
            ],
            clave: 'Págese a usted primero: automatice antes de gastar.',
          },
          {
            type: 'read',
            title: 'Metas pequeñas que sí se logran',
            paragraphs: [
              'No apunte a 6 meses de golpe: se desanima. Primer objetivo: $5,000 o un mes de gastos. Luego suba.',
              'Los ingresos extra (aguinaldo, bonos, reembolsos) son gasolina perfecta para el fondo.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es la forma más efectiva de construir el fondo?',
            options: ['Ahorrar lo que sobre a fin de mes', 'Automatizar una transferencia el día de pago', 'Esperar a ganar más'],
            answer: 1,
            explain: '"Lo que sobre" casi nunca sobra. Automatizar al inicio del mes convierte el ahorro en hábito, no en residuo.',
          },
          {
            type: 'quiz',
            prompt: 'Le llega el aguinaldo. ¿Qué haría alguien construyendo su fondo?',
            options: ['Gastarlo completo, se lo ganó', 'Destinar una parte al fondo antes de gastar', 'Guardarlo en efectivo en casa'],
            answer: 1,
            explain: 'Los ingresos extraordinarios aceleran el fondo. No tiene que ser todo, pero una parte antes de gastar hace gran diferencia.',
          },
          {
            type: 'quiz',
            prompt: '¿Cuál es una buena PRIMERA meta si empieza de cero?',
            options: ['6 meses de gastos, o nada', 'Un mes de gastos o $5,000', 'No empezar hasta tener mucho dinero'],
            answer: 1,
            explain: 'Empezar pequeño vence al no empezar. Un mes de colchón ya cubre la mayoría de los sustos.',
          },
        ],
      },
    ],
  },

  'deuda-credito': {
    id: 'deuda-credito',
    title: 'Deuda inteligente',
    tema: 'deudas',
    description: 'Entienda el costo real del crédito (CAT), salga de deudas con estrategia y ponga la tarjeta a trabajar para usted.',
    minutes: 30,
    accent: '#2f855a',
    units: [
      {
        id: 'deu-1',
        title: 'No toda deuda es igual',
        steps: [
          {
            type: 'read',
            title: 'Deuda que construye vs. deuda que drena',
            paragraphs: [
              'Hay deuda que puede acercarlo a algo que gana valor o ingreso (una casa, estudios, una herramienta de trabajo) y deuda que solo financia consumo que pierde valor.',
              'Ninguna es "pecado", pero su costo y su presión mensual cambian todo.',
            ],
            clave: 'La pregunta no es "¿debo?", sino "¿a qué costo y para qué?".',
          },
          {
            type: 'read',
            title: 'Tres cosas que definen una deuda',
            paragraphs: [
              'No mire solo cuánto debe. Mire el costo (tasa/CAT), el plazo y la presión mensual: cuánto de su ingreso se va en pagarla.',
              'Dos deudas del mismo monto pueden ser muy distintas si una cobra 15% y otra 90% anual.',
            ],
            bullets: [
              'Costo: qué tan cara es (CAT).',
              'Plazo: en cuánto tiempo la paga.',
              'Presión: qué parte de su ingreso consume cada mes.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuál deuda conviene revisar primero?',
            options: ['La más antigua siempre', 'La de mayor costo o presión mensual', 'La que menos gente conoce'],
            answer: 1,
            explain: 'El costo y la presión mandan. Atacar primero la más cara libera flujo más rápido que atacar la más vieja.',
          },
          {
            type: 'quiz',
            prompt: '¿Qué hace "cara" a una deuda?',
            options: ['Su monto total', 'Su tasa/CAT y cuánto pesa en su ingreso', 'El banco que la otorgó'],
            answer: 1,
            explain: 'Un monto grande a tasa baja puede pesar menos que un monto chico a tasa altísima. El costo relativo es lo que importa.',
          },
        ],
      },
      {
        id: 'deu-2',
        title: 'El CAT y la trampa del pago mínimo',
        steps: [
          {
            type: 'read',
            title: 'El CAT: el precio real del crédito',
            paragraphs: [
              'El CAT (Costo Anual Total) incluye intereses, comisiones y seguros. Es el número honesto para comparar créditos.',
              'Una tarjeta puede anunciar una tasa "baja" pero tener un CAT de 60% a 100%. Siempre compare por CAT, no por la tasa de aparador.',
            ],
            clave: 'El CAT es el precio verdadero del crédito. Compare siempre por CAT.',
          },
          {
            type: 'read',
            title: 'Por qué el pago mínimo es una trampa',
            paragraphs: [
              'Pagar el mínimo mantiene la tarjeta "al corriente", pero casi todo se va a intereses. El saldo casi no baja.',
              'Una deuda que solo paga al mínimo puede tardar años y costar más del doble. Pagar aunque sea un poco más del mínimo cambia el juego.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Qué mide el CAT?',
            options: ['Solo la tasa de interés', 'El costo total: intereses + comisiones + seguros', 'El límite de la tarjeta'],
            answer: 1,
            explain: 'El CAT junta todo el costo en un número comparable. Por eso es la mejor forma de comparar créditos.',
          },
          {
            type: 'quiz',
            prompt: 'Paga solo el mínimo de su tarjeta cada mes. ¿Qué pasa?',
            options: ['El saldo baja rápido', 'Casi todo se va a intereses y el saldo casi no baja', 'Se cancela la deuda en un año'],
            answer: 1,
            explain: 'El mínimo está diseñado para mantenerlo pagando intereses mucho tiempo. Es la forma más cara de deber.',
          },
          {
            type: 'quiz',
            prompt: 'Mito o realidad: "Si pago el mínimo a tiempo, estoy manejando bien mi tarjeta."',
            options: ['Mito', 'Realidad'],
            answer: 0,
            explain: 'Mito. Estar "al corriente" no es estar sano: puede estar pagando intereses enormes. Lo ideal es pagar el total, o lo más posible.',
          },
        ],
      },
      {
        id: 'deu-3',
        title: 'Estrategias para salir de deudas',
        steps: [
          {
            type: 'read',
            title: 'Avalancha: la matemática',
            paragraphs: [
              'Ordene sus deudas por costo (CAT) y ataque primero la más cara con todo el dinero extra, pagando el mínimo en las demás.',
              'Es la estrategia que menos intereses paga en total. Ideal si le motivan los números.',
            ],
            clave: 'Avalancha = pague primero la más cara. Ahorra más dinero.',
          },
          {
            type: 'read',
            title: 'Bola de nieve: la psicología',
            paragraphs: [
              'Ordene por saldo y liquide primero la más pequeña. Cada deuda que desaparece da un impulso que lo mantiene.',
              'Paga un poco más de intereses que la avalancha, pero muchas personas la sostienen mejor. La mejor estrategia es la que usted no abandona.',
            ],
          },
          {
            type: 'quiz',
            prompt: 'La estrategia "avalancha" consiste en pagar primero...',
            options: ['La deuda más pequeña', 'La deuda con mayor costo (CAT)', 'La del banco preferido'],
            answer: 1,
            explain: 'Avalancha ataca la más cara primero: es la que menos intereses paga en total.',
          },
          {
            type: 'quiz',
            prompt: '¿Cuándo conviene la "bola de nieve" (saldo más pequeño primero)?',
            options: ['Cuando necesita motivación para no abandonar', 'Cuando quiere pagar los menos intereses posibles', 'Nunca sirve'],
            answer: 0,
            explain: 'La bola de nieve da victorias rápidas que sostienen el hábito. La mejor estrategia es la que usted logra terminar.',
          },
          {
            type: 'quiz',
            prompt: 'Tiene una deuda al 90% CAT y otra al 20% CAT. Por matemática pura, ¿cuál ataca primero?',
            options: ['La de 20%', 'La de 90%', 'Las dos igual'],
            answer: 1,
            explain: 'La de 90% le cuesta muchísimo más cada mes. Liquidarla primero libera flujo más rápido (estrategia avalancha).',
          },
        ],
      },
      {
        id: 'deu-4',
        title: 'Usar el crédito a su favor',
        steps: [
          {
            type: 'read',
            title: 'El crédito no es el enemigo',
            paragraphs: [
              'Bien usado, el crédito da flujo, historial y hasta beneficios. Mal usado, se come su ingreso.',
              'La regla es simple: no lo use para algo que no podría pagar de contado pronto. Si el pago ya está contemplado en su presupuesto antes de gastar, el crédito trabaja para usted.',
            ],
            clave: 'Use crédito solo cuando el pago ya cabe en su presupuesto.',
          },
          {
            type: 'read',
            title: 'Historial: su reputación financiera',
            paragraphs: [
              'Pagar a tiempo construye historial, y un buen historial le abre mejores tasas en el futuro (por ejemplo, para una casa).',
              'Usar una parte pequeña de su línea y pagar completo cada mes es de las mejores formas de construirlo.',
            ],
          },
          {
            type: 'quiz',
            prompt: '¿Cuándo es "sano" usar la tarjeta de crédito?',
            options: ['Cuando el pago ya está contemplado en su presupuesto', 'Cuando no tiene efectivo pero quiere el gusto ya', 'Cuando ofrecen meses sin intereses en cualquier cosa'],
            answer: 0,
            explain: 'Si ya sabe cómo y cuándo lo va a pagar, el crédito es una herramienta. Si no, es una trampa de flujo.',
          },
          {
            type: 'quiz',
            prompt: '"Meses sin intereses" es buena idea cuando...',
            options: ['Compra algo que no necesita porque "no cobra intereses"', 'El pago mensual cabe cómodo y ya lo iba a comprar', 'Siempre, no cobra intereses'],
            answer: 1,
            explain: 'Sin intereses no significa gratis: sigue siendo un compromiso mensual. Sirve si ya lo iba a comprar y el pago cabe sin apretar.',
          },
          {
            type: 'quiz',
            prompt: '¿Cómo se construye un buen historial de crédito?',
            options: ['No usando nunca crédito', 'Usando una parte pequeña y pagando completo y a tiempo', 'Pidiendo el máximo posible'],
            answer: 1,
            explain: 'Uso responsable y pagos puntuales construyen historial. Un buen historial le consigue mejores tasas cuando de verdad importa.',
          },
        ],
      },
    ],
  },
}

// Ordered list of the modules that are live (interactive) today.
export const liveModuleIds = ['presupuesto-mensual', 'fondo-emergencia', 'deuda-credito']

export function getModuleContent(moduleId) {
  return learningContent[moduleId] || null
}

// Flatten a module's units into a single step sequence, tagging each step with
// its part number and unit title so the player can show progress by "parte".
export function getModuleSteps(moduleId) {
  const mod = learningContent[moduleId]
  if (!mod) return []
  return mod.units.flatMap((unit, unitIndex) =>
    unit.steps.map((step, stepIndex) => ({
      ...step,
      unitId: unit.id,
      unitTitle: unit.title,
      unitIndex,
      part: unitIndex + 1,
      totalParts: mod.units.length,
      isUnitStart: stepIndex === 0,
      isUnitEnd: stepIndex === unit.steps.length - 1,
    })),
  )
}
