'use client'
import NotFoundGameClient from '@/components/NotFound'

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <NotFoundGameClient />
    </div>
  )
}
