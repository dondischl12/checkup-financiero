export const checkupQuestionBank = {
  "meta": {
    "product": "Katalyst Checkup Financiero",
    "currency": "MXN",
    "source_basis": [
      "Uploaded Excel: FORMATO Presupuesto de gastos e ingresos familiares con diseño de FA.xlsm",
      "Excel sheets: Gastos, Ingresos, Conciliación, Parametros",
      "Additional product profile fields: age, dependents, household size, employment/income stability, housing status"
    ],
    "privacy_mode": "Guest answers remain local-only unless the user intentionally creates an account and chooses to save a snapshot."
  },
  "sections": [
    {
      "id": "profile_household",
      "title": "Perfil del hogar",
      "purpose": "Con estos datos personalizamos las guías y recomendaciones a su etapa de vida y a su hogar.",
      "questions": [
        {
          "id": "age",
          "type": "number",
          "label": "¿Cuántos años tiene?",
          "min": 13,
          "max": 100,
          "required": true
        },
        {
          "id": "household_size",
          "type": "number",
          "label": "¿Cuántas personas viven en su hogar, incluyéndolo a usted?",
          "min": 1,
          "max": 20,
          "required": true
        },
        {
          "id": "dependents_count",
          "type": "number",
          "label": "¿Cuántas personas dependen económicamente de usted? Incluya hijos, menores y cualquier familiar a su cargo.",
          "min": 0,
          "max": 20,
          "required": true
        },
        {
          "id": "children_count",
          "type": "number",
          "label": "De esas personas que dependen de usted, ¿cuántas son hijos o menores de edad?",
          "min": 0,
          "max": 15,
          "required": false
        },
        {
          "id": "employment_status",
          "type": "single_select",
          "label": "¿Cuál describe mejor su situación laboral actual?",
          "options": [
            "Empleado asalariado",
            "Independiente / honorarios",
            "Dueño de negocio",
            "Desempleado temporalmente",
            "Estudiante",
            "Retirado / pensionado",
            "Otro"
          ],
          "required": true
        },
        {
          "id": "income_stability",
          "type": "single_select",
          "label": "¿Qué tan estable es su ingreso mensual?",
          "options": [
            "Muy estable",
            "Algo variable",
            "Muy variable",
            "No tengo ingreso propio actualmente"
          ],
          "required": true
        },
        {
          "id": "housing_status",
          "type": "single_select",
          "label": "¿Cuál describe mejor su vivienda actual?",
          "options": [
            "Rento",
            "Vivo en casa propia sin hipoteca",
            "Casa propia con hipoteca",
            "Vivo con familia / no pago vivienda",
            "Otro"
          ],
          "required": true
        },
        {
          "id": "has_vehicle",
          "type": "single_select",
          "label": "¿Cuenta con un automóvil propio?",
          "options": [
            "Sí",
            "No"
          ],
          "required": true
        }
      ]
    },
    {
      "id": "income",
      "title": "Ingresos netos mensuales y extraordinarios",
      "purpose": "Sume el ingreso neto mensual de todas las personas que aportan al hogar (después de impuestos).",
      "questions": [
        {
          "id": "income_salary_net_monthly",
          "type": "currency",
          "label": "Salarios u honorarios netos mensuales (sume los de todas las personas que aportan al hogar)",
          "source_excel": "Ingresos!Salarios y Honorarios (neto)",
          "frequency": "monthly"
        },
        {
          "id": "income_rent_monthly",
          "type": "currency",
          "label": "Ingresos por rentas mensuales",
          "source_excel": "Ingresos!Rentas",
          "frequency": "monthly"
        },
        {
          "id": "income_interest_monthly",
          "type": "currency",
          "label": "Intereses o rendimientos mensuales",
          "source_excel": "Ingresos!Intereses",
          "frequency": "monthly"
        },
        {
          "id": "income_pension_monthly",
          "type": "currency",
          "label": "Pensión mensual",
          "source_excel": "Ingresos!Pensión",
          "frequency": "monthly"
        },
        {
          "id": "income_business_monthly",
          "type": "currency",
          "label": "Ingresos por negocio o participación mensual",
          "source_excel": "Ingresos!Venta de acciones o participación en negocios / Otros ingresos",
          "frequency": "monthly"
        },
        {
          "id": "income_gifts_monthly_equiv",
          "type": "currency",
          "label": "Regalos o apoyo económico recurrente mensual",
          "source_excel": "Ingresos!Regalos Recibidos",
          "frequency": "monthly_equivalent"
        },
        {
          "id": "income_asset_sales_annual",
          "type": "currency",
          "label": "Ingresos extraordinarios por venta de coche, inmueble u otro activo en el año",
          "source_excel": "Ingresos!Venta de coche/inmueble/otro activo",
          "frequency": "annual_or_one_time"
        },
        {
          "id": "income_loan_recovery_annual",
          "type": "currency",
          "label": "Recuperación de préstamos u otros ingresos extraordinarios en el año",
          "source_excel": "Ingresos!Recuperación de préstamo / Otros ingresos",
          "frequency": "annual_or_one_time"
        }
      ]
    },
    {
      "id": "housing_home_expenses",
      "title": "Gastos de casa y vida diaria",
      "purpose": "Registre lo que gasta al mes en su vivienda y en el día a día del hogar.",
      "questions": [
        {
          "id": "expense_condo_monthly",
          "type": "currency",
          "label": "Cuota de condominio mensual",
          "source_excel": "Gastos!Cuota condominio"
        },
        {
          "id": "expense_rent_monthly",
          "type": "currency",
          "label": "Renta mensual",
          "source_excel": "Gastos!Renta"
        },
        {
          "id": "expense_mortgage_monthly",
          "type": "currency",
          "label": "Pago de hipoteca mensual",
          "source_excel": "Gastos!Cuota hipoteca"
        },
        {
          "id": "expense_home_maintenance_monthly",
          "type": "currency",
          "label": "Mantenimiento y reparaciones del hogar mensual",
          "source_excel": "Gastos!Mantenimiento / Reparación/reposición electrodomésticos"
        },
        {
          "id": "expense_utilities_monthly",
          "type": "currency",
          "label": "Servicios del hogar: gas, agua, luz, internet y teléfono",
          "source_excel": "Gastos!Gas/Agua/Luz/Internet/Teléfono"
        },
        {
          "id": "expense_streaming_subscriptions_monthly",
          "type": "currency",
          "label": "Streaming, cable, música, nube y suscripciones digitales",
          "source_excel": "Gastos!Cable TV, Netflix, HBO / Spotify, Dropbox"
        },
        {
          "id": "expense_groceries_monthly",
          "type": "currency",
          "label": "Súper, mercado y alimentos del hogar",
          "source_excel": "Gastos!Súper, mercado, etc"
        },
        {
          "id": "expense_household_help_monthly",
          "type": "currency",
          "label": "Personal de servicio, jardinería y apoyos recurrentes del hogar",
          "source_excel": "Gastos!Personal de servicio / Jardinería"
        },
        {
          "id": "expense_pets_monthly",
          "type": "currency",
          "label": "Mascotas",
          "source_excel": "Gastos!Mascotas"
        },
        {
          "id": "expense_home_misc_monthly",
          "type": "currency",
          "label": "Otros gastos de casa o varios",
          "source_excel": "Gastos!Gastos eventuales / Varios"
        }
      ]
    },
    {
      "id": "children_education",
      "title": "Hijos, educación y dependientes",
      "purpose": "Gastos relacionados con hijos, educación y las personas que dependen de usted.",
      "questions": [
        {
          "id": "expense_school_monthly",
          "type": "currency",
          "label": "Escuelas, colegiaturas o guardería",
          "source_excel": "Gastos!Escuela 1-4"
        },
        {
          "id": "expense_extra_classes_monthly",
          "type": "currency",
          "label": "Clases extra, actividades y terapias",
          "source_excel": "Gastos!Clases extras / Terapias"
        },
        {
          "id": "expense_school_supplies_annual",
          "type": "currency",
          "label": "Útiles, uniformes y gastos escolares anuales",
          "source_excel": "Gastos!Útiles escolares / Uniformes",
          "frequency": "annual"
        },
        {
          "id": "expense_school_transport_monthly",
          "type": "currency",
          "label": "Transporte escolar o movilidad de hijos",
          "source_excel": "Gastos!Transporte escolar"
        },
        {
          "id": "expense_allowances_monthly",
          "type": "currency",
          "label": "Mesadas o apoyos mensuales a hijos/dependientes",
          "source_excel": "Gastos!Mesadas"
        },
        {
          "id": "expense_children_health_monthly",
          "type": "currency",
          "label": "Doctores, terapias o salud de hijos/dependientes",
          "source_excel": "Gastos!Doctores / Terapias"
        },
        {
          "id": "expense_children_events_annual",
          "type": "currency",
          "label": "Cumpleaños, eventos y gastos especiales de hijos/dependientes",
          "source_excel": "Gastos!Cumpleaños / Varios",
          "frequency": "annual"
        }
      ]
    },
    {
      "id": "insurance_protection",
      "title": "Seguros y protección familiar",
      "purpose": "Lo que destina a proteger a su familia ante imprevistos importantes.",
      "questions": [
        {
          "id": "expense_health_insurance_monthly",
          "type": "currency",
          "label": "Seguro de gastos médicos",
          "source_excel": "Gastos!Seguros Médicos"
        },
        {
          "id": "expense_home_insurance_monthly",
          "type": "currency",
          "label": "Seguro de casa",
          "source_excel": "Gastos!Seguro Casa"
        },
        {
          "id": "expense_life_insurance_monthly",
          "type": "currency",
          "label": "Seguro de vida",
          "source_excel": "Gastos!Seguro de vida 1/2"
        },
        {
          "id": "expense_education_insurance_monthly",
          "type": "currency",
          "label": "Seguro o ahorro educativo para hijos",
          "source_excel": "Gastos!Seguro de estudios hijos"
        },
        {
          "id": "expense_other_insurance_monthly",
          "type": "currency",
          "label": "Otros seguros",
          "source_excel": "Gastos!Otros seguros"
        },
        {
          "id": "coverage_confidence",
          "type": "single_select",
          "label": "¿Siente que sus seguros actuales protegen a su familia ante una emergencia importante?",
          "options": [
            "Sí, suficiente",
            "Parcialmente",
            "No / no cuento con seguros",
            "No estoy seguro"
          ]
        }
      ]
    },
    {
      "id": "transport_auto",
      "title": "Automóvil y transporte",
      "purpose": "Sus gastos de transporte y, si aplica, los relacionados con su automóvil.",
      "questions": [
        {
          "id": "expense_fuel_monthly",
          "type": "currency",
          "label": "Gasolina / transporte mensual",
          "source_excel": "Gastos!Gasolina"
        },
        {
          "id": "expense_auto_maintenance_monthly",
          "type": "currency",
          "label": "Servicios, mantenimiento e imprevistos del automóvil",
          "source_excel": "Gastos!Servicios mantenimiento / Imprevistos"
        },
        {
          "id": "expense_auto_insurance_monthly",
          "type": "currency",
          "label": "Seguro del automóvil",
          "source_excel": "Gastos!Seguro del automóvil"
        },
        {
          "id": "expense_auto_purchase_monthly",
          "type": "currency",
          "label": "Pago o ahorro mensual para adquisición/cambio de coche",
          "source_excel": "Gastos!Adquisición de coche / Ahorro cambio de coche"
        }
      ]
    },
    {
      "id": "recreation_lifestyle",
      "title": "Recreación, vacaciones y gastos personales",
      "purpose": "Gastos de estilo de vida, esparcimiento y aportaciones personales.",
      "questions": [
        {
          "id": "expense_restaurants_monthly",
          "type": "currency",
          "label": "Restaurantes y salidas",
          "source_excel": "Gastos!Restaurantes"
        },
        {
          "id": "expense_gym_monthly",
          "type": "currency",
          "label": "Gimnasio, deportes o bienestar",
          "source_excel": "Gastos!Gimnasio"
        },
        {
          "id": "expense_entertainment_monthly",
          "type": "currency",
          "label": "Cine, paseos, entretenimiento y propinas",
          "source_excel": "Gastos!Cine / Paseos / Propinas"
        },
        {
          "id": "expense_clothing_monthly",
          "type": "currency",
          "label": "Ropa y gastos personales",
          "source_excel": "Gastos!Ropa"
        },
        {
          "id": "expense_vacations_annual",
          "type": "currency",
          "label": "Vacaciones anuales",
          "source_excel": "Gastos!Vacaciones",
          "frequency": "annual"
        },
        {
          "id": "expense_special_events_annual",
          "type": "currency",
          "label": "Eventos especiales: boda, Bar/Bat Mitzvah u otros",
          "source_excel": "Gastos!Especiales",
          "frequency": "annual"
        },
        {
          "id": "expense_donations_monthly",
          "type": "currency",
          "label": "Donativos y aportaciones comunitarias",
          "source_excel": "Gastos!Donativos / Membresía comunitaria"
        },
        {
          "id": "expense_other_personal_monthly",
          "type": "currency",
          "label": "Otros gastos personales o varios",
          "source_excel": "Gastos!Varios"
        }
      ]
    },
    {
      "id": "debt_credit",
      "title": "Deudas, crédito y costos financieros",
      "purpose": "Un panorama de sus deudas y del costo financiero que cubre cada mes.",
      "questions": [
        {
          "id": "debt_credit_card_balance",
          "type": "currency",
          "label": "Saldo total actual en tarjetas de crédito",
          "analytics": "balance"
        },
        {
          "id": "debt_credit_card_payment_monthly",
          "type": "currency",
          "label": "Pago mensual total de tarjetas de crédito",
          "source_excel": "Gastos!Intereses tarjeta de crédito / Anualidades"
        },
        {
          "id": "debt_bank_loans_balance",
          "type": "currency",
          "label": "Saldo total de préstamos personales o bancarios",
          "analytics": "balance"
        },
        {
          "id": "debt_bank_loans_payment_monthly",
          "type": "currency",
          "label": "Pago mensual de préstamos personales o bancarios",
          "source_excel": "Gastos!Intereses préstamos bancarios"
        },
        {
          "id": "debt_mortgage_balance",
          "type": "currency",
          "label": "Saldo de hipoteca si aplica",
          "analytics": "balance"
        },
        {
          "id": "debt_auto_balance",
          "type": "currency",
          "label": "Saldo de crédito automotriz si aplica",
          "analytics": "balance"
        },
        {
          "id": "expense_bank_fees_monthly",
          "type": "currency",
          "label": "Comisiones bancarias y anualidades de tarjetas",
          "source_excel": "Gastos!Comisiones bancarias / Anualidad tarjeta"
        },
        {
          "id": "debt_stress",
          "type": "single_select",
          "label": "¿Qué tan cómodamente cubre sus pagos mínimos de deuda?",
          "options": [
            "Sin problema",
            "Con algo de presión",
            "Me cuesta trabajo",
            "No puedo cubrirlos todos"
          ]
        }
      ]
    },
    {
      "id": "savings_assets",
      "title": "Ahorro, fondo de emergencia e inversión",
      "purpose": "Su ahorro, fondo de emergencia e inversiones actuales.",
      "questions": [
        {
          "id": "cash_savings_total",
          "type": "currency",
          "label": "¿Cuánto tiene ahorrado en efectivo/cuentas líquidas?",
          "analytics": "emergency_fund"
        },
        {
          "id": "emergency_fund_amount",
          "type": "currency",
          "label": "De ese ahorro, ¿cuánto considera fondo de emergencia?",
          "analytics": "emergency_fund"
        },
        {
          "id": "monthly_savings_contribution",
          "type": "currency",
          "label": "¿Cuánto ahorra o invierte en promedio al mes?",
          "analytics": "savings_rate"
        },
        {
          "id": "investment_total",
          "type": "currency",
          "label": "¿Cuánto tiene invertido actualmente?",
          "analytics": "investment_balance"
        },
        {
          "id": "retirement_savings_total",
          "type": "currency",
          "label": "Ahorro para retiro/AFORE/aportaciones voluntarias aproximado",
          "analytics": "retirement"
        },
        {
          "id": "savings_automation",
          "type": "single_select",
          "label": "¿Tiene automatizado algún ahorro o inversión mensual?",
          "options": [
            "Sí",
            "No, pero lo hago manualmente",
            "No"
          ]
        },
        {
          "id": "top_financial_goal",
          "type": "multi_select",
          "label": "¿Cuáles son sus metas financieras hoy? Puede elegir varias.",
          "options": [
            "Ordenar mi presupuesto",
            "Crear fondo de emergencia",
            "Reducir deudas",
            "Comprar casa",
            "Invertir",
            "Pagar educación",
            "Preparar retiro",
            "Solo entender mi situación"
          ]
        }
      ]
    },
    {
      "id": "habits_wellbeing",
      "title": "Hábitos y bienestar financiero",
      "purpose": "Sus hábitos financieros y cómo se siente con su situación actual.",
      "questions": [
        {
          "id": "budget_tracking_frequency",
          "type": "single_select",
          "label": "¿Cada cuánto revisa sus ingresos y gastos?",
          "options": [
            "Semanalmente",
            "Mensualmente",
            "De vez en cuando",
            "Casi nunca"
          ]
        },
        {
          "id": "unexpected_expense_last_90_days",
          "type": "single_select",
          "label": "En los últimos 90 días, ¿tuvo un gasto inesperado importante?",
          "options": [
            "No",
            "Sí, lo cubrí sin problema",
            "Sí, me desbalanceó",
            "Sí, tuve que endeudarme"
          ]
        },
        {
          "id": "financial_stress",
          "type": "single_select",
          "label": "¿Cómo se siente con su situación financiera actual?",
          "options": [
            "Tranquilo y con control",
            "Neutral / manejable",
            "Preocupado",
            "Muy presionado"
          ]
        },
        {
          "id": "statement_reconcile",
          "type": "single_select",
          "label": "¿Compara su presupuesto con lo que realmente pasó en banco/tarjetas?",
          "options": [
            "Sí, cada mes",
            "A veces",
            "No todavía"
          ]
        },
        {
          "id": "wants_katalyst_contact",
          "type": "multi_select",
          "label": "¿Le gustaría que Katalyst le comparta recursos o apoyo opcional? Puede elegir varias.",
          "options": [
            "Quiero recursos educativos",
            "Quiero que me contacten",
            "Tal vez después",
            "No por ahora"
          ]
        }
      ]
    }
  ],
  "derived_metrics": [
    {
      "id": "monthly_income_total",
      "formula": "sum monthly income + annual items / 12"
    },
    {
      "id": "monthly_expenses_total",
      "formula": "sum monthly expense equivalents"
    },
    {
      "id": "net_cash_flow",
      "formula": "monthly_income_total - monthly_expenses_total"
    },
    {
      "id": "savings_rate",
      "formula": "monthly_savings_contribution / monthly_income_total"
    },
    {
      "id": "housing_ratio",
      "formula": "(rent + mortgage + condo + home maintenance + utilities) / monthly_income_total"
    },
    {
      "id": "debt_payment_ratio",
      "formula": "monthly_debt_payments / monthly_income_total"
    },
    {
      "id": "emergency_months",
      "formula": "emergency_fund_amount / essential_monthly_expenses"
    },
    {
      "id": "dependents_load",
      "formula": "dependents_count / max(1, household_earners_count)"
    }
  ],
  "score_model_v1": {
    "total": 100,
    "weights": {
      "cash_flow": 25,
      "expense_structure": 20,
      "emergency_fund": 20,
      "debt_burden": 15,
      "protection_planning": 10,
      "habits_wellbeing": 10
    },
    "levels": [
      {
        "min": 0,
        "max": 39,
        "label": "Atención prioritaria"
      },
      {
        "min": 40,
        "max": 59,
        "label": "Base en construcción"
      },
      {
        "min": 60,
        "max": 74,
        "label": "Buen camino"
      },
      {
        "min": 75,
        "max": 89,
        "label": "Finanzas fuertes"
      },
      {
        "min": 90,
        "max": 100,
        "label": "Excelente estabilidad"
      }
    ],
    "benchmarks": {
      "housing_ratio_target": "<=25% from uploaded Excel Parametros",
      "savings_rate_target": ">=15% from uploaded Excel Parametros",
      "emergency_fund_target": "3-6 months of essential expenses",
      "dti_definition": "Monthly debt payments divided by monthly income; used as personal planning proxy here"
    }
  }
}
