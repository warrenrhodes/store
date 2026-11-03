import { createHash } from 'node:crypto'

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')

/** Cameroon numbers are stored without country code (6XXXXXXXX); Meta wants it, digits only. */
const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 9 ? `237${digits}` : digits
}

/** Graph API base; the e2e checks point it at a local recorder (never Meta). */
const GRAPH_URL = process.env.META_GRAPH_URL || 'https://graph.facebook.com'

/**
 * Server-side Purchase event (Meta Conversions API), sent to every Pixel of the store with
 * its own token and the same `eventId` (the order id, also the browser Pixel's eventID and
 * GTM's `event_id`), so Meta counts each purchase once per Pixel. Ad blockers and iOS don't
 * hide it, so Facebook optimises ads on real orders. One Pixel failing doesn't stop the
 * others. No-op without Pixels. Never throws.
 */
export async function sendMetaPurchase(
  pixels: Array<{ id: string; token: string }>,
  event: {
    eventId: string
    value: number
    contents: Array<{ id: string; quantity: number; item_price: number }>
    phone?: string | null
    fullName?: string | null
    city?: string | null
    sourceUrl?: string | null
    ip?: string | null
    userAgent?: string | null
    fbp?: string | null
    fbc?: string | null
  },
) {
  if (pixels.length === 0) return

  const [firstName, ...rest] = (event.fullName ?? '').trim().toLowerCase().split(/\s+/)
  const userData = Object.fromEntries(
    Object.entries({
      ph: event.phone ? [sha256(normalizePhone(event.phone))] : undefined,
      fn: firstName ? [sha256(firstName)] : undefined,
      ln: rest.length ? [sha256(rest.join(' '))] : undefined,
      ct: event.city ? [sha256(event.city.toLowerCase().replace(/[^a-z]/g, ''))] : undefined,
      country: [sha256('cm')],
      client_ip_address: event.ip ?? undefined,
      client_user_agent: event.userAgent ?? undefined,
      fbp: event.fbp ?? undefined,
      fbc: event.fbc ?? undefined,
    }).filter(([, v]) => v !== undefined),
  )

  const body = JSON.stringify({
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.sourceUrl ?? undefined,
        user_data: userData,
        custom_data: {
          currency: 'XAF',
          value: event.value,
          content_type: 'product',
          contents: event.contents,
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  })

  await Promise.all(
    pixels.map(async ({ id, token }) => {
      try {
        const res = await fetch(
          `${GRAPH_URL}/v21.0/${encodeURIComponent(id)}/events?access_token=${encodeURIComponent(token)}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body },
        )
        if (!res.ok) console.error(`Meta CAPI error (Pixel ${id}):`, res.status, await res.text())
      } catch (error) {
        console.error(`Meta CAPI request failed (Pixel ${id}):`, error)
      }
    }),
  )
}
