// Self-check for order-logic. Run: npx tsx packages/core/src/order-logic.check.ts
import assert from 'node:assert/strict'
import {
  aggregateCustomers,
  canTransition,
  recomputeTotals,
  refusalRate,
  releasesStock,
  stockDelta,
  toCsv,
} from './order-logic'

// Workflow
assert.ok(canTransition('PENDING', 'ACCEPTED'))
assert.ok(canTransition('ACCEPTED', 'OUT_FOR_DELIVERY'))
assert.ok(canTransition('OUT_FOR_DELIVERY', 'FAILED_DELIVERY'))
assert.ok(canTransition('FAILED_DELIVERY', 'OUT_FOR_DELIVERY'))
assert.ok(!canTransition('COMPLETED', 'CANCELED'))
assert.ok(!canTransition('PENDING', 'COMPLETED'))

// Stock goes back only when the order is dropped, and only once
assert.ok(releasesStock('CANCELED', true))
assert.ok(releasesStock('REJECTED', true))
assert.ok(!releasesStock('CANCELED', false))
assert.ok(!releasesStock('FAILED_DELIVERY', true))
assert.ok(!releasesStock('COMPLETED', true))

// Edits: quantity changes and removals
const line = (path: string, quantity: number, price = 1000) => ({
  product: { path },
  quantity,
  price,
})
assert.deepEqual(
  [...stockDelta([line('p/a', 2), line('p/b', 1)], [line('p/a', 3)])],
  [
    ['p/a', 1],
    ['p/b', -1],
  ],
)
assert.equal(stockDelta([line('p/a', 2)], [line('p/a', 2)]).size, 0)

// Totals: promos kept but capped, free shipping follows the fee, manual discount last
const totals = recomputeTotals({
  items: [line('p/a', 2, 5000)],
  shipping: 1500,
  promotions: [
    { code: 'TEN', discountAmount: 1000, type: 'PERCENTAGE_DISCOUNT' },
    { code: 'SHIP', discountAmount: 1000, type: 'FREE_SHIPPING' },
  ],
  manualDiscount: 500,
})
assert.deepEqual(totals.orderPrices, {
  subtotal: 10000,
  shipping: 1500,
  discount: 3000,
  total: 8500,
})
assert.equal(totals.promotions[1].discountAmount, 1500)
const capped = recomputeTotals({
  items: [line('p/a', 1, 800)],
  shipping: 0,
  promotions: [{ code: 'BIG', discountAmount: 1000, type: 'FIXED_DISCOUNT' }],
  manualDiscount: 300,
})
assert.deepEqual(capped.orderPrices, { subtotal: 800, shipping: 0, discount: 800, total: 0 })
assert.equal(capped.manualDiscount, 0)

// Customers by phone (with or without +237), refusal rate
const order = (
  phone: string,
  status: string,
  total: number,
  createdAt: string,
  fullName = 'Ana',
) => ({
  status,
  createdAt,
  userData: { phone, fullName },
  orderPrices: { total },
})
const customers = aggregateCustomers([
  order('677000000', 'COMPLETED', 10000, '2026-01-01'),
  order('+237677000000', 'FAILED_DELIVERY', 5000, '2026-02-01', 'Ana B.'),
  order('699000000', 'CANCELED', 3000, '2026-01-15', 'Bob'),
])
const ana = customers.find(c => c.name === 'Ana B.')!
assert.equal(ana.orders, 2)
assert.equal(ana.delivered, 1)
assert.equal(ana.failed, 1)
assert.equal(ana.spent, 10000)
assert.equal(ana.lastOrderAt, '2026-02-01')
assert.equal(customers.length, 2)
assert.equal(refusalRate(1, 1), 0.5)
assert.equal(refusalRate(0, 0), 0)

// CSV escaping
assert.equal(toCsv([{ a: 'x', b: 'he said "hi", ok' }]), 'a,b\nx,"he said ""hi"", ok"')
assert.equal(toCsv([]), '')

console.log('order-logic: all checks passed')
