// Self-check of order-form-slot.ts: tsx packages/core/src/order-form-slot.check.ts
import assert from 'node:assert/strict'
import { hasOrderFormSlot, placeOrderFormSlot } from './order-form-slot'

assert.equal(hasOrderFormSlot('<p>Bonjour</p>'), false)
assert.equal(hasOrderFormSlot('<div data-order-form=""></div>'), true)
assert.equal(hasOrderFormSlot('<p>{{orderForm}}</p>'), true)
// The attribute named in a text, or in the builder's escaped JSON, isn't a slot.
assert.equal(hasOrderFormSlot('<p>data-order-form</p>'), false)
assert.equal(hasOrderFormSlot('<script>{"html":"\\u003cdiv data-order-form=\\"\\">"}</script>'), false)

assert.equal(placeOrderFormSlot('a{{orderForm}}b'), 'a<div data-order-form=""></div>b')
assert.equal(placeOrderFormSlot('{{ orderForm }}x{{orderForm}}'), '<div data-order-form=""></div>x')
// The block comes first: a tag after it adds nothing.
assert.equal(placeOrderFormSlot('<div data-order-form=""></div>{{orderForm}}'), '<div data-order-form=""></div>')
assert.equal(placeOrderFormSlot('<p>rien</p>'), '<p>rien</p>')
console.log('order-form-slot: all checks passed')
