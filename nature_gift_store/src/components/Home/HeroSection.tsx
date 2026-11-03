'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { SiteLink as Link, useSite } from '@/components/Site'
import { useLocalization } from '@/hooks/useLocalization'
import { cn } from '@/lib/utils/utils'

/**
 * The home banner. A store's hero section sets its texts, image and button; without an image
 * it sits on the theme's primary color (contrast checked when the theme is saved).
 */
export function HeroSection(props: {
  title?: string | null
  subtitle?: string | null
  imageUrl?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}) {
  const { localization } = useLocalization()
  const { isMarket } = useSite()
  const image = props.imageUrl || (isMarket ? '/hero.jpeg' : null)

  return (
    <section
      className={cn(
        'relative isolate flex min-h-[460px] h-[70vh] max-h-[720px] items-center overflow-hidden',
        image ? 'text-white' : 'bg-primary text-primary-foreground',
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            // Only Cloudinary (next.config images) is resized; another https host is shown as is.
            unoptimized={/^https:\/\/(?!res\.cloudinary\.com\/)/.test(image)}
            className="-z-10 object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />
        </>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {props.title || localization.heroSectionTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed opacity-90 sm:text-lg">
            {props.subtitle || localization.heroSectionDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              variant={image ? 'default' : 'secondary'}
              className="group h-12 px-7 text-base"
              asChild
            >
              <Link href={props.ctaHref || '/shop'}>
                {props.ctaLabel || localization.shop}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {isMarket && (
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base border-white bg-transparent text-white hover:bg-white hover:text-foreground"
                asChild
              >
                <Link href="/blogs">{localization.learnMore}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
