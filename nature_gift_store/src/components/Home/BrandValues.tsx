'use client'

import { HeartPulse, MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import { useLocale } from '@/hooks/useLocale'
import { useLocalization } from '@/hooks/useLocalization'

const values = [
  {
    icon: ShieldCheck,
    title: { en: 'Quality assured', fr: 'Qualité garantie' },
    description: {
      en: 'Every product is verified and tested',
      fr: 'Tous nos produits sont vérifiés et testés',
    },
  },
  {
    icon: HeartPulse,
    title: { en: 'Healthy products', fr: 'Produits sains' },
    description: {
      en: 'Selected for your well-being',
      fr: 'Sélectionnés pour votre bien-être',
    },
  },
  {
    icon: Truck,
    title: { en: 'Fast delivery', fr: 'Livraison rapide' },
    description: { en: 'Yaoundé & Douala', fr: 'Yaoundé & Douala' },
  },
  {
    icon: MessageCircle,
    title: { en: 'Here to help', fr: 'À votre écoute' },
    description: { en: 'Advice 7 days a week', fr: 'Conseils 7j/7' },
  },
]

export function BrandValues() {
  const { locale } = useLocale()
  const { localization } = useLocalization()

  return (
    <section className="border-y bg-muted/40 py-12" aria-label={localization.whyChooseUs}>
      <ul className="max-w-7xl mx-auto grid grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {values.map(({ icon: Icon, title, description }) => (
          <li key={title.en} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-7 w-7 text-primary" aria-hidden />
            <h3 className="font-sans text-sm font-semibold">{title[locale]}</h3>
            <p className="text-sm text-muted-foreground">{description[locale]}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
