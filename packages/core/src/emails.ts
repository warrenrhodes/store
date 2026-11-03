// The platform's emails and SMS, written here rather than as templates in NotificationAPI's
// dashboard: both apps send the finished content (send({ email: { subject, html } })). Every
// value typed by a store or a customer is escaped. Pure, no dependencies.
// Self-check: emails.check.ts

export type EmailContent = { subject: string; html: string; previewText?: string }

export const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

const money = (amount: number) => `${Math.round(amount).toLocaleString('fr-FR')} FCFA`

/** The nature preset's primary color: the platform's brand. */
const BRAND = '#04775a'

/** One centered card: logo, title, paragraphs (HTML, values already escaped), a button. */
function layout(props: {
  logoUrl: string
  title: string
  paragraphs: string[]
  button?: { label: string; url: string }
  footer: string
}) {
  const p = (html: string) => `<p style="margin:0 0 12px;font-size:15px;line-height:1.6">${html}</p>`
  const button = props.button
    ? `<p style="margin:28px 0 8px;text-align:center"><a href="${escapeHtml(props.button.url)}" style="display:inline-block;padding:12px 24px;border-radius:6px;background:${BRAND};color:#ffffff;font-weight:bold;text-decoration:none">${escapeHtml(props.button.label)}</a></p>`
    : ''
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px"><tr><td style="padding:32px 28px"><img src="${escapeHtml(props.logoUrl)}" alt="N.Gift" height="40" style="display:block;margin:0 auto 24px;height:40px"><h1 style="margin:0 0 20px;font-size:22px;text-align:center">${escapeHtml(props.title)}</h1>${props.paragraphs.map(p).join('')}${button}</td></tr></table><p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.5;color:#71717a">${escapeHtml(props.footer)}</p></td></tr></table></body></html>`
}

const strong = (value: unknown) => `<strong>${escapeHtml(value)}</strong>`

/** To a person invited to a store's team (admin, Team page). `link`: sign-up or sign-in. */
export const storeInviteEmail = (props: {
  logoUrl: string
  storeName: string
  invitedBy: string
  link: string
}): EmailContent => ({
  subject: `${props.invitedBy} vous invite à rejoindre ${props.storeName}`,
  previewText: `Rejoignez l'équipe de ${props.storeName} sur N.Gift.`,
  html: layout({
    logoUrl: props.logoUrl,
    title: 'Vous êtes invité(e) sur N.Gift',
    paragraphs: [
      `${strong(props.invitedBy)} vous invite à gérer la boutique ${strong(props.storeName)}.`,
      'Créez votre compte (ou connectez-vous) avec cette adresse email : vous aurez accès à la boutique dès votre connexion.',
    ],
    button: { label: 'Rejoindre la boutique', url: props.link },
    footer:
      "Vous recevez cet email parce qu'une boutique N.Gift vous a invité(e). Si vous ne la connaissez pas, ignorez ce message.",
  }),
})

/** To a store's owner when its first payment opens the storefront (platform console). */
export const storeActivatedEmail = (props: {
  logoUrl: string
  storeName: string
  storeUrl: string
  paidUntil: string
}): EmailContent => ({
  subject: `Votre boutique ${props.storeName} est en ligne`,
  previewText: `Abonnement réglé jusqu'au ${props.paidUntil}.`,
  html: layout({
    logoUrl: props.logoUrl,
    title: 'Votre boutique est ouverte',
    paragraphs: [
      `Votre paiement a été reçu : ${strong(props.storeName)} est en ligne, abonnement réglé jusqu'au ${strong(props.paidUntil)}.`,
      'Partagez son lien avec vos clients :',
      `<a href="${escapeHtml(props.storeUrl)}" style="color:${BRAND}">${escapeHtml(props.storeUrl)}</a>`,
    ],
    button: { label: 'Voir ma boutique', url: props.storeUrl },
    footer: 'Vous recevez cet email parce que vous avez ouvert une boutique sur N.Gift.',
  }),
})

export type OrderSummary = {
  id: string
  customer: string
  phone?: string | null
  items: { title: string; quantity: number; price: number }[]
  total: number
  address?: string | null
  location?: string | null
  city?: string | null
  /** Already formatted ("12 novembre 2026 10:00"). */
  delivery?: string | null
}

/** To a store's alert emails when an order is placed (storefront order API). */
export const newOrderEmail = (props: {
  logoUrl: string
  storeName: string
  order: OrderSummary
  /** The order in the admin. */
  orderUrl: string
}): EmailContent => {
  const { order } = props
  const rows = order.items
    .map(
      i =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid #e4e4e7">${escapeHtml(i.title)} × ${i.quantity}</td><td style="padding:6px 0;border-bottom:1px solid #e4e4e7;text-align:right;white-space:nowrap">${money(i.price * i.quantity)}</td></tr>`,
    )
    .join('')
  const place = [order.address, order.location, order.city].filter(Boolean).join(', ')
  return {
    subject: `Nouvelle commande ${props.storeName} : ${order.customer} (${money(order.total)})`,
    previewText: `${order.items.length} produit(s), ${money(order.total)}.`,
    html: layout({
      logoUrl: props.logoUrl,
      title: 'Nouvelle commande',
      paragraphs: [
        `${strong(props.storeName)} a reçu une commande de ${strong(order.customer)}${order.phone ? ` (${escapeHtml(order.phone)})` : ''}.`,
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">${rows}<tr><td style="padding:8px 0;font-weight:bold">Total</td><td style="padding:8px 0;text-align:right;font-weight:bold;white-space:nowrap">${money(order.total)}</td></tr></table>`,
        ...(place ? [`Livraison : ${escapeHtml(place)}`] : []),
        ...(order.delivery ? [`Date souhaitée : ${escapeHtml(order.delivery)}`] : []),
      ],
      button: { label: 'Voir la commande', url: props.orderUrl },
      footer: `Commande ${order.id}. Vous recevez cet email parce que votre adresse est dans les alertes de ${props.storeName}.`,
    }),
  }
}

/** The SMS version, to a store's alert phones. */
export const newOrderSms = (props: { storeName: string; order: OrderSummary; orderUrl: string }) =>
  `${props.storeName} : nouvelle commande de ${props.order.customer}, ${money(props.order.total)}. ${props.orderUrl}`

/** A visitor's message from a site's contact form, to the store (or the platform). */
export const contactEmail = (props: {
  logoUrl: string
  siteName: string
  name: string
  email: string
  subject: string
  message: string
}): EmailContent => ({
  subject: `[${props.siteName}] ${props.subject}`,
  previewText: `Message de ${props.name}`,
  html: layout({
    logoUrl: props.logoUrl,
    title: 'Nouveau message',
    paragraphs: [
      `De ${strong(props.name)} (<a href="mailto:${escapeHtml(props.email)}" style="color:${BRAND}">${escapeHtml(props.email)}</a>), via le formulaire de contact de ${strong(props.siteName)}.`,
      `Sujet : ${strong(props.subject)}`,
      `<span style="white-space:pre-line">${escapeHtml(props.message)}</span>`,
      'Répondez directement à cet email pour lui écrire.',
    ],
    footer: `Message envoyé depuis ${props.siteName} sur N.Gift.`,
  }),
})
