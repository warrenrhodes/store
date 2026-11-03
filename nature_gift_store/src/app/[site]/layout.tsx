import { AuthProvider } from '@/components/Auth/AuthProvider'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header/Index'
import { PromoLinkCapture } from '@/components/Promotions/PromoLinkCapture'
import { PLATFORM_SITE, SiteInfo, SiteProvider } from '@/components/Site'
import { Toaster } from '@/components/ui/toaster'
import { siteOf, SiteStore } from '@/lib/api/utils'
import ToasterProvider from '@/lib/providers/ToasterProvider'
import { absoluteUrl, PLATFORM_URL } from '@/lib/site'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'

type Props = { params: Promise<{ site: string }> }

/** A store's GTM containers (Settings); the marketplace gets the platform's (PLATFORM_GTM_ID). */
const gtmIdsOf = (store: SiteStore | null) =>
  store
    ? (store.settings?.gtmIds ?? [])
    : [process.env.PLATFORM_GTM_ID].filter((id): id is string => !!id)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site, store } = await siteOf(params)
  if (!store) {
    return {
      metadataBase: new URL(PLATFORM_URL || 'http://localhost'),
      title: { default: 'N.Gift - Santé, Style et Innovation', template: '%s | N.Gift' },
      description:
        'Explore N.Gift, your online boutique dedicated to health, style and innovation.',
      keywords: ['Gift', 'Longrich', 'Health', 'Style', 'Innovation'],
      twitter: { card: 'summary_large_image' },
    }
  }
  return {
    metadataBase: new URL(PLATFORM_URL || 'http://localhost'),
    title: { default: store.name, template: `%s | ${store.name}` },
    alternates: { canonical: absoluteUrl(site) },
    openGraph: { siteName: store.name, url: absoluteUrl(site) },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function SiteLayout({
  params,
  children,
}: Readonly<Props & { children: React.ReactNode }>) {
  const { site, store } = await siteOf(params)
  const info: SiteInfo = store
    ? {
        site,
        name: store.name,
        whatsapp: store.settings?.whatsapp ?? null,
        email: store.settings?.contactEmail ?? null,
        isMarket: false,
      }
    : PLATFORM_SITE
  const gtmIds = gtmIdsOf(store)
  const pixelIds = store?.settings?.metaPixelIds ?? []

  return (
    <SiteProvider value={info}>
      {gtmIds.length > 0 && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});`}
        </Script>
      )}
      {/* Every container of the store, on the same dataLayer (sendGTMEvent pushes there). */}
      {gtmIds.map(id => (
        <Script
          key={id}
          id={`gtm-${id}`}
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`}
        />
      ))}
      {pixelIds.length > 0 && (
        // Meta Pixel base code; fbq('track') then reaches every Pixel of the store.
        <Script id="meta-pixels" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');${pixelIds
            .map(id => `fbq('init',${JSON.stringify(id)});`)
            .join('')}fbq('track','PageView');`}
        </Script>
      )}
      <div>
        <ToasterProvider />
        <Header />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
        <Toaster />
        <Suspense>
          <PromoLinkCapture />
        </Suspense>
      </div>
    </SiteProvider>
  )
}
