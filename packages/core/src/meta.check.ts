// Self-check of meta.ts: npx tsx packages/core/src/meta.check.ts
import assert from 'node:assert/strict'
import { toMetaValue } from './meta'

assert.equal(toMetaValue(655957), 1000)
assert.equal(toMetaValue(10000), 15.24)
assert.equal(toMetaValue(0), 0)
console.log('meta: all checks passed')
