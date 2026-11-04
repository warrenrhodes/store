// Where an ad page's order form goes when the seller places it inside the content: the page
// builder's Order form block, or {{orderForm}} in pasted HTML. Pure. Self-check:
// order-form-slot.check.ts

export const ORDER_FORM_ATTR = 'data-order-form'

const TAG = /\{\{\s*orderForm\s*\}\}/g
/** A real element only: the builder's saved JSON escapes `<`, so it never matches. */
const SLOT = new RegExp(`<[a-z][^>]*\\s${ORDER_FORM_ATTR}[\\s=>/]`, 'i')

/** Whether the content says where the form goes. */
export const hasOrderFormSlot = (html: string) => SLOT.test(html) || html.search(TAG) !== -1

/** `{{orderForm}}` as its element, the first one only: a page has one form. */
export const placeOrderFormSlot = (html: string) => {
  let placed = SLOT.test(html)
  return html.replace(TAG, () => {
    if (placed) return ''
    placed = true
    return `<div ${ORDER_FORM_ATTR}=""></div>`
  })
}
