'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FAKE_BLUR } from '@/lib/utils/constants'
import Image from 'next/image'
import { useLocalization } from '@/hooks/useLocalization'
import { sendGTMEvent } from '@next/third-parties/google'
import { Price } from '@/lib/type'
import { Product } from '@/lib/firebase/models'
import { cn } from '@/lib/utils/utils'

export function ProductGallery({ product }: { product: Product }) {
  const { medias } = product
  const [currentImage, setCurrentImage] = useState(0)
  const { localization } = useLocalization()
  const price = product.price as unknown as Price | undefined
  const many = medias.length > 1
  const current = medias[currentImage]

  useEffect(() => {
    sendGTMEvent({
      event: 'view_item',
      currency: 'XAF',
      value: price?.regular,
      items: [
        {
          item_name: product.title,
          item_id: product.path,
          price: price?.regular,
          quantity: 0,
          category: product.categories[0],
        },
      ],
    })
  }, [])

  const go = (step: number) => setCurrentImage(i => (i + step + medias.length) % medias.length)

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:sticky lg:top-24 lg:self-start">
      {many && (
        <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
          {medias.map((value, index) => (
            <button
              type="button"
              key={value.url}
              aria-label={`${product.title} ${index + 1}`}
              aria-current={currentImage === index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted transition lg:h-20 lg:w-20',
                currentImage === index
                  ? 'ring-2 ring-foreground'
                  : 'ring-1 ring-border opacity-70 hover:opacity-100',
              )}
            >
              <Image
                src={value.url}
                alt=""
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={value.blurDataUrl || FAKE_BLUR}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden rounded-lg bg-muted">
        <Image
          key={current.url}
          src={current.url}
          alt={product.title}
          fill
          priority
          className="object-cover animate-in fade-in duration-300"
          placeholder="blur"
          blurDataURL={current.blurDataUrl || FAKE_BLUR}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {many && (
          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              type="button"
              aria-label={localization.previousImage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={localization.nextImage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
              onClick={() => go(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
