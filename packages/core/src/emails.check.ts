// Self-check of emails.ts: npx tsx packages/core/src/emails.check.ts
import assert from 'node:assert/strict'
import { contactEmail, escapeHtml, newOrderEmail, newOrderSms, storeInviteEmail } from './emails'

const logoUrl = 'https://ngift.cm/logo-wordmark.png'

assert.equal(escapeHtml(`<a href="x">'&'</a>`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;')
assert.equal(escapeHtml(null), '')

// Values typed by stores and customers never become markup.
const invite = storeInviteEmail({
  logoUrl,
  storeName: '<script>alert(1)</script>',
  invitedBy: 'owner@test.cm',
  link: 'https://admin.ngift.cm/sign-up?a=1&b="2"',
})
assert.ok(!invite.html.includes('<script>'))
assert.ok(invite.html.includes('&lt;script&gt;'))
assert.ok(invite.html.includes('href="https://admin.ngift.cm/sign-up?a=1&amp;b=&quot;2&quot;"'))
assert.equal(invite.subject, 'owner@test.cm vous invite à rejoindre <script>alert(1)</script>')

const order = {
  id: 'o1',
  customer: 'Awa <b>',
  phone: '677000001',
  items: [
    { title: 'Café', quantity: 2, price: 6000 },
    { title: 'Miel', quantity: 1, price: 4500 },
  ],
  total: 16500,
  address: 'Rue 1',
  location: 'Akwa',
  city: null,
  delivery: null,
}
const mail = newOrderEmail({ logoUrl, storeName: 'Chez A', order, orderUrl: 'https://admin/orders/o1' })
assert.ok(mail.html.includes('Café × 2') && mail.html.includes('12 000 FCFA'))
assert.ok(mail.html.includes('16 500 FCFA') && mail.html.includes('Rue 1, Akwa'))
assert.ok(mail.html.includes('Awa &lt;b&gt;') && !mail.html.includes('Date souhaitée'))
assert.equal(
  newOrderSms({ storeName: 'Chez A', order, orderUrl: 'https://admin/orders/o1' }),
  'Chez A : nouvelle commande de Awa <b>, 16 500 FCFA. https://admin/orders/o1',
)

const contact = contactEmail({
  logoUrl,
  siteName: 'Chez A',
  name: 'Paul',
  email: 'paul@test.cm',
  subject: 'Livraison',
  message: 'Bonjour\n<i>ici</i>',
})
assert.equal(contact.subject, '[Chez A] Livraison')
assert.ok(contact.html.includes('Bonjour\n&lt;i&gt;ici&lt;/i&gt;'))

console.log('emails: all checks passed')
