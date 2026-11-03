'use client'

// Live timer: a blog page's countdown (admin, Blogs) or a promotion's end date. Rendered after
// mount only, so the server's clock never mismatches the browser's.
import { useLocalization } from '@/hooks/useLocalization'
import { cn } from '@/lib/utils/utils'
import { Countdown as CountdownSettings, countdownLeft, splitDuration } from '@ngift/core/countdown'
import { useEffect, useState } from 'react'

export function Countdown({
  countdown,
  className,
}: {
  countdown: CountdownSettings
  className?: string
}) {
  const { localization } = useLocalization()
  const [left, setLeft] = useState<number | null>(null)
  const { mode, endsAt, cycleHours } = countdown

  useEffect(() => {
    const tick = () => setLeft(countdownLeft({ mode, endsAt, cycleHours }))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [mode, endsAt, cycleHours])

  if (left === null) return null
  const { days, hours, minutes, seconds } = splitDuration(left)
  const units = [
    ...(days ? [[days, localization.daysShort] as const] : []),
    [hours, localization.hoursShort] as const,
    [minutes, localization.minutesShort] as const,
    [seconds, localization.secondsShort] as const,
  ]

  return (
    <div role="timer" className={cn('flex flex-col items-center gap-2', className)}>
      <p className="text-sm font-semibold uppercase tracking-wide">
        {left === 0 ? localization.offerEnded : countdown.label || localization.offerEndsIn}
      </p>
      <div className="flex gap-2">
        {units.map(([value, unit]) => (
          <span
            key={unit}
            className="min-w-14 rounded-md bg-sale px-2 py-1.5 text-center text-sale-foreground"
          >
            <span className="block text-2xl font-bold tabular-nums leading-none">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs">{unit}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
