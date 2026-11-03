// Pure rules for stores: subscription dates and settings parsing. Self-check: store-rules.check.ts

/**
 * The new paid-until date after paying `months`: counted from the current end date if it is
 * still ahead, else from now (a late payment doesn't pay for the gap). Month ends are clamped:
 * Jan 31 + 1 month = Feb 28/29.
 */
export const extendPaidUntil = (
  paidUntil: string | null | undefined,
  months: number,
  now = new Date(),
) => {
  const current = paidUntil ? new Date(paidUntil) : undefined
  const base = current && current.getTime() > now.getTime() ? current : now
  const date = new Date(base)
  const day = date.getUTCDate()
  date.setUTCDate(1)
  date.setUTCMonth(date.getUTCMonth() + months)
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
  date.setUTCDate(Math.min(day, lastDay))
  return date.toISOString()
}

/** 'expired', 'soon' (within 7 days) or 'ok'; 'none' when nothing was ever paid. */
export const paymentState = (paidUntil: string | null | undefined, now = new Date()) => {
  if (!paidUntil) return 'none' as const
  const left = new Date(paidUntil).getTime() - now.getTime()
  if (left < 0) return 'expired' as const
  return left <= 7 * 24 * 3600 * 1000 ? ('soon' as const) : ('ok' as const)
}

/** Non-empty trimmed lines (or comma-separated values), without duplicates. */
export const parseLines = (text: string | null | undefined) => [
  ...new Set(
    (text ?? '')
      .split(/[\n,]/)
      .map(line => line.trim())
      .filter(Boolean),
  ),
]

type Parsed<T> = { values: T[]; invalid: string[] }

/** Parses each line; duplicates are dropped after normalization (`key`). */
const split = <T>(
  lines: string[],
  parse: (line: string) => T | undefined,
  key: (value: T) => string = String,
): Parsed<T> => {
  const values = new Map<string, T>()
  const invalid: string[] = []
  for (const line of lines) {
    const value = parse(line)
    if (value === undefined) invalid.push(line)
    else if (!values.has(key(value))) values.set(key(value), value)
  }
  return { values: [...values.values()], invalid }
}

export const parseGtmIds = (text: string | null | undefined) =>
  split(parseLines(text), line => {
    const id = line.toUpperCase()
    return /^GTM-[A-Z0-9]{4,12}$/.test(id) ? id : undefined
  })

/**
 * One Meta Pixel per line: `PIXEL_ID` or `PIXEL_ID TOKEN` (its Conversions API token). The
 * first line of a Pixel listed twice wins.
 */
export const parseMetaPixels = (text: string | null | undefined) =>
  split(
    (text ?? '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean),
    line => {
      const [id, token, ...rest] = line.split(/\s+/)
      if (!/^\d{5,20}$/.test(id) || rest.length) return undefined
      return { id, token: token || undefined }
    },
    pixel => pixel.id,
  )

export const parseEmails = (text: string | null | undefined) =>
  split(parseLines(text), line => {
    const email = line.toLowerCase()
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined
  })

/** Phone numbers with an optional +, 8 to 15 digits, spaces and dashes ignored. */
export const parsePhones = (text: string | null | undefined) =>
  split(parseLines(text), line => {
    const phone = line.replace(/[\s-]/g, '')
    return /^\+?\d{8,15}$/.test(phone) ? phone : undefined
  })

/** WhatsApp number in international format without '+': digits only, 8 to 15. */
export const parseWhatsapp = (text: string | null | undefined) => {
  const digits = (text ?? '').replace(/[\s+\-()]/g, '')
  if (!digits) return null
  return /^\d{8,15}$/.test(digits) ? digits : undefined
}
