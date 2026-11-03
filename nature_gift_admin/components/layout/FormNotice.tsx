/** Result of a form action, carried back in the URL (?saved=… or ?error=…). */
export function FormNotice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return (
      <p
        role="alert"
        className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
      >
        {error}
      </p>
    )
  }
  if (saved) {
    return (
      <p
        role="status"
        className="rounded-md border border-emerald-600/30 bg-emerald-50 p-3 text-sm text-emerald-800"
      >
        {saved === '1' ? 'Saved.' : saved}
      </p>
    )
  }
  return null
}
