// Meta Pixel events from the browser. The base code (app/[site]/layout.tsx) only loads on a
// store with Pixels: on the marketplace, or without Pixels, every call does nothing.
// fbq('track') reaches every Pixel of the store. Ids are the product document ids, as in the
// Conversions API events (lib/analytics/meta-capi.ts).

type Line = { path: string; quantity: number; price: number }

const fbq = (...args: unknown[]) =>
  (typeof window === 'undefined'
    ? undefined
    : (window as { fbq?: (...a: unknown[]) => void }).fbq)?.(...args)

const idOf = (path: string) => path.split('/').pop()!

/** Standard events with their product details; `custom` for events Meta has no standard for. */
export const trackPixel = (
  event:
    | 'PageView'
    | 'ViewContent'
    | 'AddToCart'
    | 'RemoveFromCart'
    | 'InitiateCheckout'
    | 'Purchase',
  lines: Line[] = [],
  eventId?: string,
) => {
  const params = lines.length
    ? {
        content_type: 'product',
        content_ids: lines.map(l => idOf(l.path)),
        contents: lines.map(l => ({ id: idOf(l.path), quantity: l.quantity, item_price: l.price })),
        num_items: lines.reduce((n, l) => n + l.quantity, 0),
        value: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
        currency: 'XAF',
      }
    : undefined
  // Meta has no standard "remove from cart": it goes as a custom event.
  const method = event === 'RemoveFromCart' ? 'trackCustom' : 'track'
  fbq(method, event, params, eventId ? { eventID: eventId } : undefined)
}
