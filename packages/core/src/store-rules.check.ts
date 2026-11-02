// Self-check for store-rules. Run: npx tsx packages/core/src/store-rules.check.ts
import assert from 'node:assert/strict'
import { isValidStoreSlug } from './models'
import {
  extendPaidUntil,
  parseEmails,
  parseGtmIds,
  parseMetaPixels,
  parsePhones,
  parseWhatsapp,
  paymentState,
} from './store-rules'

const now = new Date('2026-11-02T10:00:00.000Z')

// Paid-until: from now when nothing or expired, from the end date when still ahead
assert.equal(extendPaidUntil(null, 1, now), '2026-12-02T10:00:00.000Z')
assert.equal(extendPaidUntil('2026-10-01T00:00:00.000Z', 1, now), '2026-12-02T10:00:00.000Z')
assert.equal(extendPaidUntil('2026-11-20T00:00:00.000Z', 3, now), '2027-02-20T00:00:00.000Z')
assert.equal(extendPaidUntil('2027-01-31T00:00:00.000Z', 1, now), '2027-02-28T00:00:00.000Z')
assert.equal(extendPaidUntil('2027-12-15T00:00:00.000Z', 12, now), '2028-12-15T00:00:00.000Z')

assert.equal(paymentState(undefined, now), 'none')
assert.equal(paymentState('2026-11-01T00:00:00.000Z', now), 'expired')
assert.equal(paymentState('2026-11-05T00:00:00.000Z', now), 'soon')
assert.equal(paymentState('2026-12-30T00:00:00.000Z', now), 'ok')

// Settings lists: several GTM containers and Meta Pixels, deduplicated, bad lines reported
assert.deepEqual(parseGtmIds('gtm-abc1234\nGTM-XYZ9876, GTM-ABC1234\nnope'), {
  values: ['GTM-ABC1234', 'GTM-XYZ9876'],
  invalid: ['nope'],
})
assert.deepEqual(parseMetaPixels('123456789 EAAtoken\n987654321\n12ab\n111111 a b'), {
  values: [
    { id: '123456789', token: 'EAAtoken' },
    { id: '987654321', token: undefined },
  ],
  invalid: ['12ab', '111111 a b'],
})
assert.deepEqual(parseEmails('A@Shop.cm\nbad@\na@shop.cm'), {
  values: ['a@shop.cm'],
  invalid: ['bad@'],
})
assert.deepEqual(parsePhones('+237 696 68 90 73\n12'), {
  values: ['+237696689073'],
  invalid: ['12'],
})
assert.equal(parseWhatsapp('+237 696-689-073'), '237696689073')
assert.equal(parseWhatsapp(''), null)
assert.equal(parseWhatsapp('abc'), undefined)

// Slugs
assert.ok(isValidStoreSlug('nature-gift'))
assert.ok(!isValidStoreSlug('Nature'))
assert.ok(!isValidStoreSlug('a--b'))
assert.ok(!isValidStoreSlug('ab'))

console.log('store-rules: all checks passed')
