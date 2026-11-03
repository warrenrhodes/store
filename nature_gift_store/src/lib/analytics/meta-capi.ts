// Meta Conversions API (server side): ad blockers and iOS don't hide these events, and the
// customer data they carry (hashed) is what Meta's event match quality is computed from.
import { CollectionsName } from '@/lib/firebase/collection-name'
import { backend } from '@/lib/firebase/firebase-server/firebase'
import { StoreSecrets } from '@/lib/firebase/models'
import { META_CURRENCY, toMetaValue } from '@ngift/core/meta'
import { createHash } from 'node:crypto'
import type { NextRequest } from 'next/server'

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')

/** Meta's normalization: lower case, no accents ('Yaoundé' → 'yaounde'). */
const plain = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()

/** Cameroon numbers are stored without country code (6XXXXXXXX); Meta wants it, digits only. */
export const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 9 ? `237${digits}` : digits
}

/** Graph API base; the e2e checks point it at a local recorder (never Meta). */
const GRAPH_URL = process.env.META_GRAPH_URL || 'https://graph.facebook.com'

export type MetaPixel = { id: string; token: string }

/** The store's Pixels that have a Conversions API token (admin, Settings). */
export async function getStorePixels(store: {
  id: string
  settings?: { metaPixelIds?: string[] } | null
}): Promise<MetaPixel[]> {
  const ids = store.settings?.metaPixelIds ?? []
  if (ids.length === 0) return []
  const secrets = (
    await backend.db.collection(CollectionsName.StoreSecrets).doc(store.id).get()
  ).data() as StoreSecrets | undefined
  return ids.flatMap(id => {
    const token = secrets?.metaCapiTokens?.[id]
    return token ? [{ id, token }] : []
  })
}

/**
 * What the request tells Meta about the browser: IP, user agent, Pixel cookies. Without the
 * _fbc cookie (the Pixel blocked, or not loaded yet), the click id comes from an `fbclid` in
 * the page's address.
 */
export function requestSignals(req: NextRequest) {
  const sourceUrl = req.headers.get('referer')
  let fbc = req.cookies.get('_fbc')?.value
  if (!fbc && sourceUrl) {
    const fbclid = URL.canParse(sourceUrl) ? new URL(sourceUrl).searchParams.get('fbclid') : null
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`
  }
  return {
    sourceUrl,
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    userAgent: req.headers.get('user-agent'),
    fbp: req.cookies.get('_fbp')?.value,
    fbc,
  }
}

export type MetaEvent = ReturnType<typeof requestSignals> & {
  name: 'Purchase' | 'InitiateCheckout'
  /** Shared with the browser Pixel's eventID, so Meta counts the event once. */
  eventId: string
  value: number
  contents: Array<{ id: string; quantity: number; item_price: number }>
  phone?: string | null
  email?: string | null
  fullName?: string | null
  city?: string | null
}

/** Hashed customer data (Meta's user_data): every field we know improves the match quality. */
export const userData = (event: MetaEvent) => {
  const [firstName, ...rest] = plain(event.fullName ?? '').split(/\s+/)
  const phone = event.phone ? normalizePhone(event.phone) : ''
  const email = (event.email ?? '').trim().toLowerCase()
  const city = plain(event.city ?? '').replace(/[^a-z]/g, '')
  return Object.fromEntries(
    Object.entries({
      ph: phone ? [sha256(phone)] : undefined,
      em: email.includes('@') ? [sha256(email)] : undefined,
      fn: firstName ? [sha256(firstName)] : undefined,
      ln: rest.length ? [sha256(rest.join(' '))] : undefined,
      ct: city ? [sha256(city)] : undefined,
      country: [sha256('cm')],
      // The same customer across events and devices: their phone number, hashed.
      external_id: phone ? [sha256(phone)] : undefined,
      client_ip_address: event.ip ?? undefined,
      client_user_agent: event.userAgent ?? undefined,
      fbp: event.fbp ?? undefined,
      fbc: event.fbc ?? undefined,
    }).filter(([, v]) => v !== undefined),
  )
}

/**
 * Sends one event to every Pixel of the store, each with its own token and the same event id.
 * One Pixel failing doesn't stop the others. No-op without Pixels. Never throws.
 */
export async function sendMetaEvent(pixels: MetaPixel[], event: MetaEvent) {
  if (pixels.length === 0) return
  const body = JSON.stringify({
    data: [
      {
        event_name: event.name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.sourceUrl ?? undefined,
        user_data: userData(event),
        custom_data: {
          // Meta refuses XAF: euros, at the fixed rate (@ngift/core/meta).
          currency: META_CURRENCY,
          value: toMetaValue(event.value),
          content_type: 'product',
          contents: event.contents.map(c => ({ ...c, item_price: toMetaValue(c.item_price) })),
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
