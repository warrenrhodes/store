// Self-check for PromotionCalculator. Run: npx tsx src/lib/utils/promotion-calculator.check.ts
import assert from 'node:assert/strict'
import { CartItem } from '@/hooks/useCart'
import { Promotion } from '../firebase/models'
import { getFreeShippingAreas, PromotionCalculator } from './promotion-calculator'

const item = (path: string, price: number, quantity: number) =>
  ({ product: { path }, price, quantity }) as unknown as CartItem

const promo = (
  conditions: Array<{ type: string; value: string }>,
  actions: Array<{ type: string; value: string; maxDiscount?: number }>,
) =>
  ({
    path: `promotions/${Math.random()}`,
    code: 'TEST',
    status: 'ACTIVE',
    startDate: new Date(Date.now() - 1e6).toISOString(),
    endDate: new Date(Date.now() + 1e6).toISOString(),
    conditions,
    actions,
  }) as unknown as Promotion

const run = (cart: CartItem[], delivery: object, promotions: Promotion[]) =>
  new PromotionCalculator(cart, delivery, promotions).calculate()

const coffee = item('products/coffee', 12000, 1)
const medong = { deliveryMethod: 'DELIVERY', location: 'Medong', cost: 2000 }
const etoudi = { deliveryMethod: 'DELIVERY', location: 'Etoudi', cost: 2000 }

// Free shipping for one product
const freeShipCoffee = promo(
  [{ type: 'SPECIFIC_PRODUCTS', value: '["products/coffee"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], medong, [freeShipCoffee]).total, 12000)
assert.equal(run([item('products/tea', 5000, 1)], medong, [freeShipCoffee]).total, 7000)

// Free shipping for some neighbourhoods
const freeShipMedong = promo(
  [{ type: 'LOCATION', value: '["Medong"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], medong, [freeShipMedong]).total, 12000)
assert.equal(run([coffee], etoudi, [freeShipMedong]).total, 14000)
assert.equal(run([coffee], {}, [freeShipMedong]).total, 12000) // unknown location: no cost, no promo

// Two free-shipping promotions never waive shipping twice
const both = run([coffee], medong, [freeShipCoffee, freeShipMedong])
assert.equal(both.discount, 2000)
assert.equal(both.total, 12000)

// Percentage restricted to the promotion's product, not the whole cart
const tenOffCoffee = promo(
  [{ type: 'SPECIFIC_PRODUCTS', value: 'products/coffee' }], // legacy plain-string value
  [{ type: 'PERCENTAGE_DISCOUNT', value: '10' }],
)
assert.equal(run([coffee, item('products/tea', 5000, 1)], {}, [tenOffCoffee]).discount, 1200)

// Buy 2 get 1: 2 units -> nothing free, 3 -> 1 free, 6 -> 2 free
const b2g1 = promo(
  [{ type: 'MINIMUM_QUANTITY', value: '1' }],
  [{ type: 'BUY_X_GET_Y', value: '2,1' }],
)
assert.equal(run([item('products/coffee', 1000, 2)], {}, [b2g1]).discount, 0)
assert.equal(run([item('products/coffee', 1000, 3)], {}, [b2g1]).discount, 1000)
assert.equal(run([item('products/coffee', 1000, 6)], {}, [b2g1]).discount, 2000)

// Product discounts never exceed the subtotal
const huge = promo(
  [{ type: 'MINIMUM_QUANTITY', value: '1' }],
  [{ type: 'FIXED_DISCOUNT', value: '99999' }],
)
assert.equal(run([coffee], medong, [huge]).total, 2000)

// Product-page free-shipping badge
assert.deepEqual(getFreeShippingAreas([freeShipCoffee], 'products/coffee'), [])
assert.equal(getFreeShippingAreas([freeShipCoffee], 'products/tea'), null)
assert.deepEqual(getFreeShippingAreas([freeShipMedong], 'products/tea'), ['Medong'])
assert.deepEqual(getFreeShippingAreas([freeShipMedong, freeShipCoffee], 'products/coffee'), [])
assert.equal(getFreeShippingAreas([b2g1, tenOffCoffee], 'products/coffee'), null)

console.log('promotion-calculator: all checks passed')
