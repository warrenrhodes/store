// Self-check of countdown.ts: tsx packages/core/src/countdown.check.ts
import assert from 'node:assert/strict'
import { countdownLeft, splitDuration } from './countdown'

const now = Date.parse('2026-11-03T10:00:00Z')
const at = (iso: string) => ({ endsAt: iso })

// Before the end: both modes count down to endsAt.
assert.equal(countdownLeft({ mode: 'limited', ...at('2026-11-03T12:00:00Z') }, now), 2 * 3600_000)
assert.equal(countdownLeft({ mode: 'loop', ...at('2026-11-03T12:00:00Z') }, now), 2 * 3600_000)
// After: limited stays at 0, loop restarts every cycle.
assert.equal(countdownLeft({ mode: 'limited', ...at('2026-11-03T09:00:00Z') }, now), 0)
assert.equal(
  countdownLeft({ mode: 'loop', cycleHours: 24, ...at('2026-11-03T09:00:00Z') }, now),
  23 * 3600_000,
)
assert.equal(
  countdownLeft({ mode: 'loop', cycleHours: 6, ...at('2026-11-01T10:00:00Z') }, now),
  6 * 3600_000,
)
assert.equal(countdownLeft({ mode: 'loop', ...at('2026-11-02T22:00:00Z') }, now), 12 * 3600_000)
// A bad date never shows a running timer.
assert.equal(countdownLeft({ mode: 'limited', ...at('nope') }, now), 0)

assert.deepEqual(splitDuration(((26 * 60 + 3) * 60 + 4) * 1000 + 999), {
  days: 1,
  hours: 2,
  minutes: 3,
  seconds: 4,
})
console.log('countdown: all checks passed')
