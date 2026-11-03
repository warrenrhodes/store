import { AuthProvider } from '@/components/Auth/AuthProvider'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header/Index'
import { PromoLinkCapture } from '@/components/Promotions/PromoLinkCapture'
import { SiteInfo, SiteProvider } from '@/components/Site'
import { PLATFORM_SITE } from '@/lib/platform-site'
import { Toaster } from '@/components/ui/toaster'
import { getListedStoresCache, siteOf, SiteStore } from '@/lib/api/utils'
import ToasterProvider from '@/lib/providers/ToasterProvider'
import { absoluteUrl, PLATFORM_URL } from '@/lib/site'
import { siteTheme } from '@/lib/theme'
import { PixelPageViews } from '@/components/PixelPageViews'
import { themeCss } from '@ngift/core/theme'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'

type Props = { params: Promise<{ site: string }> }

/** A store's GTM containers (Settings); the marketplace gets the platform's (PLATFORM_GTM_ID). */
const gtmIdsOf = (store: SiteStore | null) =>
  store
    ? (store.settings?.gtmIds ?? [])
    : [process.env.PLATFORM_GTM_ID].filter((id): id is string => !!id)

/** The platform's icons; a store with a favicon in its theme uses it instead. */
const PLATFORM_ICONS: Metadata['icons'] = {
  icon: [
    { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    { url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  shortcut: '/favicon.ico',
  apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
}

/** Builds `am` (Meta advanced matching) from localStorage, in the Pixel's normalized form. */
const ADVANCED_MATCHING = `var am={country:'cm'};try{var u=((JSON.parse(localStorage.getItem('temporal-user-storage')||'null')||{}).state||{}).temporalUser||{};var d=String(u.phone||'').replace(/\\D/g,'');if(d)am.ph=d.length===9?'237'+d:d;var n=String(u.fullName||'').trim().toLowerCase().split(/\\s+/);if(n[0]){am.fn=n[0];if(n.length>1)am.ln=n.slice(1).join(' ')}if(u.email)am.em=String(u.email).trim().toLowerCase();if(u.city)am.ct=String(u.city).normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/[^a-z]/g,'')}catch(e){}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site, store } = await siteOf(params)
  if (!store) {
    return {
      icons: PLATFORM_ICONS,
      manifest: '/site.webmanifest',
      metadataBase: new URL(PLATFORM_URL || 'http://localhost'),
      title: { default: 'N.Gift - Santé, Style et Innovation', template: '%s | N.Gift' },
      description:
        'Explore N.Gift, your online boutique dedicated to health, style and innovation.',
      keywords: ['Gift', 'Longrich', 'Health', 'Style', 'Innovation'],
      twitter: { card: 'summary_large_image' },
    }
  }
  const { theme, preview } = await siteTheme(store)
  return {
    icons: theme.faviconUrl ? { icon: theme.faviconUrl } : PLATFORM_ICONS,
    ...(preview && { robots: { index: false } }),
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
  const { theme, custom } = await siteTheme(store)
  const info: SiteInfo = store
    ? {
        site,
        name: store.name,
        whatsapp: store.settings?.whatsapp ?? null,
        email: store.settings?.contactEmail ?? null,
        logoUrl: theme.logoUrl ?? null,
        announcement: theme.announcement ?? null,
        isMarket: false,
      }
    : {
        ...PLATFORM_SITE,
        stores: Object.fromEntries(
          (await getListedStoresCache()).map(s => [s.id, { name: s.name, slug: s.slug }]),
        ),
      }
  const gtmIds = gtmIdsOf(store)
  const pixelIds = store?.settings?.metaPixelIds ?? []

  return (
    <SiteProvider value={info}>
      {/* The theme's colors, radius and font (values checked by siteTheme and themeCss). */}
      {custom && <style dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />}
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
        // Meta Pixel base code; fbq('track') then reaches every Pixel of the store. `am`:
        // advanced matching from the customer data the browser kept after an order
        // (useTemporalUser); the Pixel hashes it before sending.
        <Script id="meta-pixels" strategy="afterInteractive">
          {`${ADVANCED_MATCHING}!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');${pixelIds
            .map(id => `fbq('init',${JSON.stringify(id)},am);`)
            .join('')}fbq('track','PageView');`}
        </Script>
      )}
      {pixelIds.length > 0 && <PixelPageViews />}
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
