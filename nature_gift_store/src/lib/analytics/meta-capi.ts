import { createHash } from 'node:crypto'

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')

/** Cameroon numbers are stored without country code (6XXXXXXXX); Meta wants it, digits only. */
const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 9 ? `237${digits}` : digits
}

/**
 * Server-side Purchase event (Meta Conversions API), deduplicated with the browser pixel event
 * through `eventId` (the order id, also pushed as `event_id` to GTM). Ad blockers and iOS don't
 * hide it, so Facebook optimises ads on real orders. No-op without META_PIXEL_ID and
 * META_CAPI_ACCESS_TOKEN. Never throws.
 */
export async function sendMetaPurchase(event: {
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
}) {
  const pixelId = process.env.META_PIXEL_ID
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !token) return

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

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
        }),
      },
    )
    if (!res.ok) console.error('Meta CAPI error:', res.status, await res.text())
  } catch (error) {
    console.error('Meta CAPI request failed:', error)
  }
}
