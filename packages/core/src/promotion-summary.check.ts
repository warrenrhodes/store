// Self-check of promotion-summary.ts: tsx packages/core/src/promotion-summary.check.ts
import assert from 'node:assert/strict'
import { discountLabel, promotionState } from './promotion-summary'

const now = new Date('2026-11-04T10:00:00Z')
const dates = { startDate: '2026-11-01T00:00:00Z', endDate: '2026-11-10T00:00:00Z' }
assert.equal(promotionState({ status: 'ACTIVE', ...dates }, now), 'ACTIVE')
assert.equal(promotionState({ status: 'ACTIVE', ...dates, endDate: '2026-11-03T00:00:00Z' }, now), 'EXPIRED')
assert.equal(promotionState({ status: 'ACTIVE', ...dates, startDate: '2026-11-05T00:00:00Z' }, now), 'SCHEDULED')
// Only a running status depends on the dates.
assert.equal(promotionState({ status: 'DRAFT', ...dates, endDate: '2026-11-03T00:00:00Z' }, now), 'DRAFT')
assert.equal(promotionState({ status: 'DISABLED', ...dates }, now), 'DISABLED')

const money = (n: number) => `${n} FCFA`
assert.equal(discountLabel([{ type: 'PERCENTAGE_DISCOUNT', value: '10' }], money), '-10%')
assert.equal(discountLabel([{ type: 'FIXED_DISCOUNT', value: '2000' }], money), '-2000 FCFA')
assert.equal(discountLabel([{ type: 'BUY_X_GET_Y', value: '2,1' }], money), 'Buy 2 get 1')
assert.equal(
  discountLabel([{ type: 'FREE_SHIPPING' }, { type: 'FREE_PRODUCT', value: 'products/a' }], money),
  'Free shipping + Free product',
)
assert.equal(discountLabel([], money), '')
console.log('promotion-summary: all checks passed')
