import * as z from 'zod'
import { toDate } from '../utils/utils'

/**
 * Dates are always persisted as ISO strings. A raw Date would be stored as a Firestore
 * Timestamp, which the forms and the storefront can't parse after a JSON round-trip.
 */
export const isoDate = () =>
  z.preprocess(value => toDate(value)?.toISOString(), z.string({ required_error: 'Pick a date' }))
