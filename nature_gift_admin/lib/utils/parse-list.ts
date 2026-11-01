/**
 * Promotion condition/action values are strings: a plain value ("products/abc") or a JSON
 * array ('["Medong","Etoudi"]'). Same rule as parseList in the store's promotion-calculator.
 */
export const parseList = (value: unknown): string[] => {
  let parsed = value
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value)
    } catch {
      parsed = value
    }
  }
  return (Array.isArray(parsed) ? parsed : [parsed])
    .filter(v => v !== '' && v !== null && v !== undefined)
    .map(String)
}
