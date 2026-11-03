'use client'

// The admin's theme preview (iframe on PREVIEW_PATH): the store's draft theme, sent by the
// theme editor at every change (postMessage), shown at once on a sample catalogue. No database
// read, no reload, nothing clickable: it only shows what the storefront will look like.
import Footer from '@/components/Footer'
import { Header } from '@/components/Header/Index'
import { CategoryShowcase } from '@/components/Home/CategoryShowcase'
import { ProductSection } from '@/components/Home/FeaturedProducts'
import { HeroSection } from '@/components/Home/HeroSection'
import { PromotionBanner } from '@/components/Home/PromotionBanner'
import { Faq, Of, PRODUCTS_TITLE, ReviewList, RichText, Video } from '@/components/Home/SectionViews'
import { SiteProvider } from '@/components/Site'
import {
  SAMPLE_CATEGORIES,
  SAMPLE_PRODUCTS,
  SAMPLE_PROMOTIONS,
  SAMPLE_REVIEWS,
} from '@/lib/preview-fixtures'
import {
  isHsl,
  PREVIEW_MESSAGE,
  PREVIEW_READY,
  Section,
  StoreTheme,
  themeCss,
  themeOf,
} from '@ngift/core/theme'
import { ReactNode, useEffect, useState } from 'react'

type Message = {
  theme: Partial<StoreTheme>
  store: { name: string; whatsapp: string | null; email: string | null }
}

const RENDER: { [T in Section['type']]: (section: Of<T>) => ReactNode } = {
  hero: section => <HeroSection {...section} />,
  featuredProducts: section => (
    <ProductSection
      title={section.title}
      titleKey={PRODUCTS_TITLE[section.source]}
      products={SAMPLE_PRODUCTS.filter(
        p => section.source === 'all' || (section.source === 'new' ? p.isNewProduct : p.isFeature),
      ).slice(0, Math.max(1, Number(section.limit) || 4))}
    />
  ),
  categoryGrid: section => <CategoryShowcase title={section.title} categories={SAMPLE_CATEGORIES} />,
  promoBanner: () => <PromotionBanner promotions={SAMPLE_PROMOTIONS} />,
  reviews: section => <ReviewList section={section} reviews={SAMPLE_REVIEWS} />,
  faq: section => <Faq section={{ ...section, items: section.items ?? [] }} />,
  richText: section => <RichText section={{ ...section, text: section.text ?? '' }} />,
  video: section => <Video section={section} />,
}

export function ThemePreview({ adminOrigin }: { adminOrigin: string }) {
  const [message, setMessage] = useState<Message | null>(null)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin === adminOrigin && event.data?.type === PREVIEW_MESSAGE) {
        setMessage(event.data)
      }
    }
    window.addEventListener('message', onMessage)
    window.parent.postMessage({ type: PREVIEW_READY }, adminOrigin)
    return () => window.removeEventListener('message', onMessage)
  }, [adminOrigin])

  if (!message) return null
  // Only well-formed colors reach the CSS (the others fall back to the preset's); radius and
  // font are checked by themeOf. Contrast is the editor's job: it refuses to publish.
  const colors = Object.fromEntries(
    Object.entries(message.theme.colors ?? {}).filter(([, value]) => isHsl(value)),
  )
  const theme = themeOf({ ...message.theme, colors: colors as StoreTheme['colors'] })
  const sections = (theme.sections ?? []).filter(s => !s.hidden && RENDER[s.type])

  return (
    <SiteProvider
      value={{
        site: 'theme_preview',
        name: message.store.name,
        whatsapp: message.store.whatsapp,
        email: message.store.email,
        logoUrl: theme.logoUrl || null,
        announcement: theme.announcement || null,
        isMarket: false,
        preview: true,
      }}
    >
      <style>{themeCss(theme)}</style>
      <div inert>
        <Header />
        <main>
          {sections.map(section => {
            const render = RENDER[section.type] as (section: Section) => ReactNode
            return <div key={section.id}>{render(section)}</div>
          })}
        </main>
        <Footer />
      </div>
      <p className="fixed bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs text-background shadow">
        Preview with sample products
      </p>
    </SiteProvider>
  )
}
