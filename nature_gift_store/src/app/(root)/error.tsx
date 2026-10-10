'use client'
import StatusPage from '@/components/NotFound'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <StatusPage
      title="Un problème est survenu"
      description="Nous n'avons pas pu charger cette page. Réessayez dans un instant."
      onRetry={reset}
    />
  )
}
