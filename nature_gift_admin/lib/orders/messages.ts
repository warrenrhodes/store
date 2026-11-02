// Ready-to-send WhatsApp messages (French, the customers' language) for each delivery step.
import { priceFormatted } from '../utils/utils'

/** Cameroon numbers are stored without country code (6XXXXXXXX). */
export const whatsappUrl = (phone: string, text?: string) => {
  const digits = phone.replace(/\D/g, '')
  const number = digits.length === 9 ? `237${digits}` : digits
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const trackingUrl = (orderId: string, token?: string | null) =>
  token ? `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL ?? ''}/order/${orderId}?t=${token}` : ''

type MessageOrder = {
  id: string
  firstName: string
  items: string
  total: number
  zone?: string | null
  date?: string | null
  tracking: string
}

export const orderMessages = (o: MessageOrder) => {
  const ref = `#${o.id.slice(0, 8).toUpperCase()}`
  const follow = o.tracking ? `\nSuivi : ${o.tracking}` : ''
  return [
    {
      label: 'Confirm order',
      text:
        `Bonjour ${o.firstName}, merci pour votre commande ${ref} chez N.Gift (${o.items}).` +
        ` Montant à payer à la livraison : ${priceFormatted(o.total)}.` +
        `${o.zone ? ` Livraison : ${o.zone}` : ''}${o.date ? `, le ${o.date}` : ''}.` +
        ` Pouvez-vous nous confirmer ?${follow}`,
    },
    {
      label: 'Out for delivery',
      text:
        `Bonjour ${o.firstName}, votre commande ${ref} est en route ! Le livreur vous appellera` +
        ` à son arrivée. Montant à payer : ${priceFormatted(o.total)}.${follow}`,
    },
    {
      label: 'Missed delivery',
      text:
        `Bonjour ${o.firstName}, notre livreur n'a pas pu vous joindre pour la commande ${ref}.` +
        ` Quand pouvons-nous repasser ?`,
    },
    {
      label: 'Thanks + review',
      text:
        `Merci ${o.firstName} pour votre confiance ! Votre avis nous aide beaucoup :` +
        ` vous pouvez noter vos produits ici${o.tracking ? ` : ${o.tracking}` : '.'}`,
    },
  ]
}
