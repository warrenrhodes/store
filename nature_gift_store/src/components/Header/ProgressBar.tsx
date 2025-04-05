'use client'

import { useReadingProgress } from '@/hooks/useReadingScrolling'

export function ProgressBar() {
  const completion = useReadingProgress()

  return (
    <span
      id="progress-bar"
      style={{
        transform: `translateX(${completion - 100}%)`,
      }}
      className={`absolute bottom-0 w-full transition-transform duration-150 h-1 bg-primary`}
    />
  )
}
