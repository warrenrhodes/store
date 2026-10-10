import Link from 'next/link'

/** Shared 404 / error screen. */
export default function StatusPage({
  code,
  title,
  description,
  onRetry,
}: {
  code?: string
  title: string
  description: string
  onRetry?: () => void
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      {code && <p className="font-heading text-6xl font-semibold text-primary">{code}</p>}
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="h-11 rounded-xl border px-6 font-medium hover:bg-muted"
          >
            Réessayer
          </button>
        )}
        <Link
          href="/shop"
          className="inline-flex h-11 items-center rounded-xl bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Voir la boutique
        </Link>
      </div>
    </main>
  )
}
