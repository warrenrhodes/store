// Self-check of thank-you.ts: tsx packages/core/src/thank-you.check.ts
import assert from 'node:assert/strict'
import { fillTags, THANK_YOU_TAGS, ThankYouValues } from './thank-you'
import { THANK_YOU_TEMPLATES } from './thank-you-templates'

const values = Object.fromEntries(THANK_YOU_TAGS.map(t => [t.tag, ''])) as ThankYouValues
values.customerFirstName = 'Awa <img src=x onerror=alert(1)>'
values.whatsappUrl = 'https://wa.me/237600000000?text=Bonjour%20&a="b"'

assert.equal(
  fillTags('<h1>Merci {{customerFirstName}} !</h1>', values),
  '<h1>Merci Awa &lt;img src=x onerror=alert(1)&gt; !</h1>',
)
assert.equal(
  fillTags('<a href="{{ whatsappUrl }}">', values),
  '<a href="https://wa.me/237600000000?text=Bonjour%20&amp;a=&quot;b&quot;">',
)
assert.equal(fillTags('{{unknown}} {{constructor}}', values), '{{unknown}} {{constructor}}')
console.log('thank-you: all checks passed')

// Ready-made templates: only known tags, nothing the storefront's cleaning would remove.
const known = new Set<string>(THANK_YOU_TAGS.map(t => t.tag))
for (const template of THANK_YOU_TEMPLATES) {
  for (const [, tag] of template.html.matchAll(/\{\{\s*(\w+)\s*\}\}/g)) {
    assert.ok(known.has(tag), `${template.id}: unknown tag ${tag}`)
  }
  assert.ok(!/<(script|form|input|button|iframe)|\son\w+=|javascript:/i.test(template.html), template.id)
  assert.ok(template.html.includes('<h1>') && template.html.includes('<style>'), template.id)
}
console.log('thank-you templates: all checks passed')
