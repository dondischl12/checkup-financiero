const thousands = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 })

// Digits-only string (what gets stored in answers / fed to toNumber in financialCalculations.js).
export function parseThousands(display) {
  return String(display ?? '').replace(/[^\d]/g, '')
}

// Digits-only string -> "45,000" for display while typing.
export function formatThousands(value) {
  const digits = parseThousands(value)
  if (!digits) return ''
  return thousands.format(Number(digits))
}
