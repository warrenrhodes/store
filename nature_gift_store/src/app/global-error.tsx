'use client'
import StatusPage from '@/components/NotFound'
import { Fredoka } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600'],
})

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${fredoka.variable} font-sans antialiased`}>
        <StatusPage
          title="Un problème est survenu"
          description="Nous n'avons pas pu charger cette page. Réessayez dans un instant."
          onRetry={reset}
        />
      </body>
    </html>
  )
}
