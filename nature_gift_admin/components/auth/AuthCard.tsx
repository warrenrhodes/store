import Image from 'next/image'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  description?: string
}

export const AuthCard = ({ children, title, description }: AuthCardProps) => (
  <div className="w-full max-w-md">
    <div className="mb-6 flex items-center justify-center gap-2">
      <Image src="/logo-wordmark.png" alt="N.Gift" width={258} height={79} priority className="h-8 w-auto" />
      <span className="rounded-md bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
        Admin
      </span>
    </div>
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  </div>
)
