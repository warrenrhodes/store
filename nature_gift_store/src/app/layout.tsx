import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import localFont from 'next/font/local'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

import './globals.css'
import ToasterProvider from '@/lib/providers/ToasterProvider'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header/Index'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}`),
  title: {
    default: 'N.Gift - Heath, Style et Innovation',
    template: '%s | N.Gift',
  },
  description: 'Explore N.Gift, your online boutique dedicated to health, style and innovation.',
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return await ClerkProvider({
    children: (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </head>

          <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
            <div>
              <ToasterProvider />
              <Header />
              {children}
              <Footer />
              <Toaster />
            </div>
          </body>
        </html>
      </ClerkProvider>
    ),
  })
}
