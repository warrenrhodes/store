'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Category } from '@/lib/firebase/models'

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const { localization } = useLocalization()
  if (categories.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {localization.exploreCategories}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map(category => (
            <Link
              key={`${category.path}`}
              href={`/shop?category=${encodeURIComponent(category.slug)}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={category.image?.url || '/default-image.png'}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={category.image?.blurDataUrl || FAKE_BLUR}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <h3 className="text-lg font-semibold sm:text-xl">{category.name}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/90">
                  {localization.exploreMore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
