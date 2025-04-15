import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ToasterProvider from '@/lib/providers/ToasterProvider'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header/Index'
import { GoogleTagManager } from '@next/third-parties/google'
import { getAllCollectionCache } from '@/lib/api/utils'
import { CollectionsName } from '@/lib/firebase/collection-name'
import { Product, ProductStatus } from '@/lib/firebase/models'
import { QueryFilter } from '@spreeloop/database'
import { AuthProvider } from '@/components/Auth/AuthProvider'

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

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL}`),
  title: {
    default: 'N.Gift - Heath, Style et Innovation',
    template: '%s | N.Gift',
  },
  description: 'Explore N.Gift, your online boutique dedicated to health, style and innovation.',
  keywords: ['Gift', 'Longrich', 'Health', 'Style', 'Innovation'],
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const products = await getAllCollectionCache<Product>({
    collection: CollectionsName.Products,
    filters: [
      new QueryFilter('status', '==', ProductStatus.PUBLISHED),
      new QueryFilter('visibility', '==', true),
    ],
  })
  return (
    <html lang="en" suppressHydrationWarning className="!scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <div>
          <ToasterProvider />
          <Header products={products} />
          <AuthProvider>{children}</AuthProvider>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
