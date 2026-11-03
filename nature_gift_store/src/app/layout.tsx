import { DM_Sans, Fredoka, Inter, Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

export const dynamic = 'force-dynamic'

// The theme fonts (THEME_FONTS in @ngift/core/theme): each store's theme picks one through
// --font-theme. Self-hosted by next/font; a browser only downloads the one in use.
// next/font needs each call assigned to a module const, with literal options.
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-fredoka',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-playfair',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
})
const fonts = [fredoka, inter, poppins, playfair, dmSans]

// The marketplace and every store render under app/[site]/layout.tsx (header, trackers, brand).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`!scroll-smooth ${fonts.map(f => f.variable).join(' ')}`}
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
