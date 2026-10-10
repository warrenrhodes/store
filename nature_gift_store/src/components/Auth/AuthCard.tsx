interface AuthCardProps {
  children: React.ReactNode
  title: string
  description?: string
}

export const AuthCard = ({ children, title, description }: AuthCardProps) => {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}

/** Form-level error (e.g. wrong password), announced to screen readers. */
export const AuthError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </p>
  ) : null
