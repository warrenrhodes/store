// Self-check for PromotionCalculator. Run: npx tsx packages/core/src/promotion-calculator.check.ts
import assert from 'node:assert/strict'

import { CartItem, DeliveryLocation, Promotion, Shipment } from './models'
import { filterZonesByCity, findArea, toShippingZones } from './shipping-zones'
import {
  getFreeShippingAreas,
  isWithinUsageLimit,
  PromotionCalculator,
} from './promotion-calculator'

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
const medong = {
  deliveryMethod: 'DELIVERY',
  locationId: 'loc_medong',
  location: 'Medong',
  cost: 2000,
}
const etoudi = {
  deliveryMethod: 'DELIVERY',
  locationId: 'loc_etoudi',
  location: 'Etoudi',
  cost: 2000,
}
const location = (id: string, name: string, isActive = true) =>
  ({ path: `locations/${id}`, name, city: 'Yaoundé', isActive }) as DeliveryLocation
const locations = [location('loc_medong', 'Medong'), location('loc_etoudi', 'Etoudi')]
const zone1 = {
  method: 'DELIVERY',
  cost: 2000,
  isActive: true,
  locationIds: ['loc_medong', 'loc_etoudi'],
} as Shipment
const shipments = toShippingZones([zone1], locations)

// Free shipping for one product
const freeShipCoffee = promo(
  [{ type: 'SPECIFIC_PRODUCTS', value: '["products/coffee"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], medong, [freeShipCoffee]).total, 12000)
assert.equal(run([item('products/tea', 5000, 1)], medong, [freeShipCoffee]).total, 7000)

// Free shipping for some neighbourhoods
const freeShipMedong = promo(
  [{ type: 'LOCATION', value: '["loc_medong"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], medong, [freeShipMedong]).total, 12000)
assert.equal(run([coffee], etoudi, [freeShipMedong]).total, 14000)
assert.equal(run([coffee], {}, [freeShipMedong]).total, 12000) // unknown location: no cost, no promo
// Matched by id: renaming the area does not break the promotion
assert.equal(
  run([coffee], { ...medong, location: 'Yaoundé – Medong' }, [freeShipMedong]).total,
  12000,
)

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
assert.deepEqual(getFreeShippingAreas([freeShipCoffee], 'products/coffee', shipments), [])
assert.equal(getFreeShippingAreas([freeShipCoffee], 'products/tea', shipments), null)
assert.deepEqual(getFreeShippingAreas([freeShipMedong], 'products/tea', shipments), ['Medong'])
assert.deepEqual(
  getFreeShippingAreas([freeShipMedong, freeShipCoffee], 'products/coffee', shipments),
  [],
)
assert.equal(getFreeShippingAreas([b2g1, tenOffCoffee], 'products/coffee', shipments), null)

// Zones: locations resolved by id, inactive locations and shipments skipped
assert.deepEqual(shipments[0].areas, [
  { id: 'loc_medong', name: 'Medong', city: 'Yaoundé' },
  { id: 'loc_etoudi', name: 'Etoudi', city: 'Yaoundé' },
])
assert.deepEqual(toShippingZones([zone1], [location('loc_medong', 'Medong', false)]), [])
assert.deepEqual(toShippingZones([{ ...zone1, isActive: false }], locations), [])
assert.equal(findArea(shipments, 'DELIVERY', 'loc_etoudi')?.zone.cost, 2000)
assert.equal(findArea(shipments, 'EXPEDITION', 'loc_etoudi'), undefined)

// Per-store locations: a zone keeps only its own store's locations (or not yet migrated ones)
const zoneA = { ...zone1, storeId: 'a' } as Shipment
const ofStore = (storeId: string | undefined) =>
  locations.map(l => ({ ...l, storeId }) as DeliveryLocation)
assert.equal(toShippingZones([zoneA], ofStore('a'))[0].areas.length, 2)
assert.equal(toShippingZones([zoneA], ofStore('a'))[0].storeId, 'a')
assert.equal(toShippingZones([zoneA], ofStore(undefined))[0].areas.length, 2)
assert.deepEqual(toShippingZones([zoneA], ofStore('b')), [])

// Renaming a location: the badge shows the new name, the promotion still matches
const renamed = toShippingZones([zone1], [location('loc_medong', 'Yaoundé – Medong')])
assert.deepEqual(getFreeShippingAreas([freeShipMedong], 'products/tea', renamed), [
  'Yaoundé – Medong',
])
assert.equal(getFreeShippingAreas([freeShipMedong], 'products/tea', []), null)

// Legacy shipment (names on the shipment) still matches a legacy promotion until migrated
const legacy = toShippingZones(
  [
    {
      method: 'DELIVERY',
      cost: 2000,
      isActive: true,
      locations: ['Medong'],
    } as unknown as Shipment,
  ],
  [],
)
assert.deepEqual(legacy[0].areas, [{ id: 'Medong', name: 'Medong', city: '' }])
const legacyPromo = promo(
  [{ type: 'LOCATION', value: '["Medong"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.deepEqual(getFreeShippingAreas([legacyPromo], 'products/tea', legacy), ['Medong'])

// Ads for one city: ?ville=yaounde keeps Yaoundé only; an unknown city keeps everything
const douala = toShippingZones(
  [{ ...zone1, cost: 3000, locationIds: ['loc_akwa'] }],
  [{ ...location('loc_akwa', 'Akwa'), city: 'Douala' }],
)
const twoCities = [...shipments, ...douala]
assert.deepEqual(filterZonesByCity(twoCities, 'yaounde'), shipments)
assert.deepEqual(filterZonesByCity(twoCities, 'Douala'), douala)
assert.deepEqual(filterZonesByCity(twoCities, 'Bafoussam'), twoCities)
assert.deepEqual(filterZonesByCity(twoCities, undefined), twoCities)

// Code promotions: only with the code (any case), and the code status is reported
const codePromo = {
  ...promo([], [{ type: 'PERCENTAGE_DISCOUNT', value: '10' }]),
  code: 'PUB-CAFE',
  requiresCode: true,
} as Promotion
assert.equal(run([coffee], medong, [codePromo]).total, 14000)
const withCode = new PromotionCalculator([coffee], medong, [codePromo], [' pub-cafe '])
const coded = withCode.calculate()
assert.equal(coded.total, 12800)
assert.deepEqual(withCode.codeStatuses(coded), { 'PUB-CAFE': 'applied' })
const unknown = new PromotionCalculator([coffee], medong, [codePromo], ['NOPE'])
assert.deepEqual(unknown.codeStatuses(unknown.calculate()), { NOPE: 'invalid' })
const minCode = {
  ...codePromo,
  conditions: [{ type: 'MINIMUM_AMOUNT', value: '50000' }],
} as unknown as Promotion
const notYet = new PromotionCalculator([coffee], medong, [minCode], ['PUB-CAFE'])
assert.deepEqual(notYet.codeStatuses(notYet.calculate()), { 'PUB-CAFE': 'not_applicable' })

// Minimum amount, city and category conditions
const over20k = promo(
  [{ type: 'MINIMUM_AMOUNT', value: '20000' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], medong, [over20k]).total, 14000)
assert.equal(run([item('products/coffee', 12000, 2)], medong, [over20k]).total, 24000)
const yaounde = promo(
  [{ type: 'CITY', value: '["Yaoundé"]' }],
  [{ type: 'FREE_SHIPPING', value: '' }],
)
assert.equal(run([coffee], { ...medong, city: 'yaounde' }, [yaounde]).total, 12000)
assert.equal(run([coffee], { ...medong, city: 'Douala' }, [yaounde]).total, 14000)
assert.equal(run([coffee], { ...medong, city: undefined }, [yaounde]).total, 14000)
const teaCategory = promo(
  [{ type: 'SPECIFIC_CATEGORIES', value: '["Thé"]' }],
  [{ type: 'FIXED_DISCOUNT', value: '1000' }],
)
const categorized = (categories: string[]) =>
  ({ product: { path: 'products/x', categories }, price: 5000, quantity: 1 }) as unknown as CartItem
assert.equal(run([categorized(['Thé'])], medong, [teaCategory]).total, 6000)
assert.equal(run([categorized(['Café'])], medong, [teaCategory]).total, 7000)

// Usage limits
assert.equal(isWithinUsageLimit({ usageLimit: { total: 2 }, usageCount: 1 } as Promotion), true)
assert.equal(isWithinUsageLimit({ usageLimit: { total: 2 }, usageCount: 2 } as Promotion), false)
assert.equal(isWithinUsageLimit({ usageLimit: { perCustomer: 1 } } as Promotion, 1), false)
assert.equal(isWithinUsageLimit({ usageLimit: { perCustomer: 1 } } as Promotion, 0), true)
assert.equal(isWithinUsageLimit({ usageLimit: { perCustomer: 1 } } as Promotion), true)

// Badge: city offers show the city; code offers only with the code; minimum amount never
assert.deepEqual(getFreeShippingAreas([yaounde], 'products/coffee', shipments), ['Yaoundé'])
const freeShipCode = { ...yaounde, code: 'PUB', requiresCode: true } as Promotion
assert.equal(getFreeShippingAreas([freeShipCode], 'products/coffee', shipments), null)
assert.deepEqual(getFreeShippingAreas([freeShipCode], 'products/coffee', shipments, ['pub']), [
  'Yaoundé',
])
assert.equal(getFreeShippingAreas([over20k], 'products/coffee', shipments), null)

console.log('promotion-calculator: all checks passed')
