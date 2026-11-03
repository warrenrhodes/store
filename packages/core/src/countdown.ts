// The countdown of a blog (ad landing) page, set in the admin. Pure. Self-check: countdown.check.ts

export type Countdown = {
  /** `limited`: stops at `endsAt`. `loop`: at `endsAt`, starts again for `cycleHours`, forever. */
  mode: 'limited' | 'loop'
  /** ISO date: the end, or the end of the first cycle. */
  endsAt: string
  cycleHours?: number | null
  /** Shown above the timer; the storefront has a default. */
  label?: string | null
}

const HOUR = 3600_000

/** Milliseconds left; 0 once a limited countdown has ended. */
export const countdownLeft = (countdown: Countdown, now = Date.now()) => {
  const left = new Date(countdown.endsAt).getTime() - now
  if (!(left <= 0)) return Math.max(0, left || 0)
  if (countdown.mode !== 'loop') return 0
  const cycle = Math.max(1, countdown.cycleHours || 24) * HOUR
  return cycle - (-left % cycle)
}

/** Days, hours, minutes and seconds of a duration. */
export const splitDuration = (ms: number) => {
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    minutes: Math.floor(s / 60) % 60,
    seconds: s % 60,
  }
}
