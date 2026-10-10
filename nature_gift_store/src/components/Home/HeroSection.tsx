'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useLocalization } from '@/hooks/useLocalization'

export function HeroSection() {
  const { localization } = useLocalization()

  return (
    <section className="relative isolate flex min-h-[460px] h-[70vh] max-h-[720px] items-center overflow-hidden">
      <Image src="/hero.jpeg" alt="" fill priority className="-z-10 object-cover" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {localization.heroSectionTitle}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
            {localization.heroSectionDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="group h-12 px-7 text-base" asChild>
              <Link href="/shop">
                {localization.shop}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base border-white bg-transparent text-white hover:bg-white hover:text-foreground"
              asChild
            >
              <Link href="/blogs">{localization.learnMore}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
