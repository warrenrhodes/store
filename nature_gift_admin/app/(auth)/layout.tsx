import { Metadata } from 'next'
import '../globals.css'
import { Fredoka } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication pages including login, register, and forgot password.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} font-sans antialiased`}>
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-12">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
