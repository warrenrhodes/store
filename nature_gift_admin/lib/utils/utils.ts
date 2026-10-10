export const priceFormatted = (price: number) => {
  return price.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  })
}

/**
 * Normalizes any stored date shape to a valid Date (or undefined): ISO string, Date, epoch ms,
 * or a Firestore Timestamp (live, or serialized as {_seconds} / {seconds} by JSON round-trips).
 */
export const toDate = (value: unknown): Date | undefined => {
  if (!value) return undefined
  const v = value as { toDate?: () => Date; _seconds?: number; seconds?: number }
  const date =
    typeof v.toDate === 'function'
      ? v.toDate()
      : typeof v._seconds === 'number' || typeof v.seconds === 'number'
        ? new Date((v._seconds ?? v.seconds!) * 1000)
        : new Date(value as string | number | Date)
  return isNaN(date.getTime()) ? undefined : date
}
