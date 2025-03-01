'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FAKE_BLUR } from '@/lib/utils/constants'
import Image from 'next/image'
import { useLocalization } from '@/hooks/useLocalization'
import { sendGTMEvent } from '@next/third-parties/google'
import { Price, ProductSeoMetadata } from '@/lib/type'
import { Product } from '@/lib/firebase/models'

export function ProductGallery({ product }: { product: Product }) {
  const { medias } = product
  const [currentImage, setCurrentImage] = useState(0)
  const { localization } = useLocalization()

  const iProduct = useMemo(() => {
    return product
  }, [product])

  const price: Price | undefined = iProduct?.price as unknown as Price | undefined
  const metadata = iProduct?.metadata as ProductSeoMetadata

  useEffect(() => {
    sendGTMEvent({
      event: 'view_item',
      currency: 'XAF',
      value: price?.regular,
      items: [
        {
          item_name: iProduct?.title,
          item_id: iProduct?.path,
          price: price.regular,
          quantity: 0,
          category: iProduct?.categories[0],
        },
      ],
    })
  }, [])
  return (
    <div className="space-y-4">
      <div itemScope className="relative aspect-square rounded-lg overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            itemProp="image"
            className="absolute inset-0"
          >
            <Image
              src={product.medias[currentImage].url}
              alt={metadata.seoTitle}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={product.medias[0].blurDataUrl || FAKE_BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        <Badge className="absolute top-4 left-4">{localization.new}</Badge>

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setCurrentImage(prev => (prev === 0 ? medias.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setCurrentImage(prev => (prev === medias.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {medias.map((value, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              currentImage === index ? 'ring-2 ring-primary' : 'ring-1 ring-border'
            }`}
          >
            <Image
              src={value.url}
              alt={metadata.seoTitle}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={value.blurDataUrl || FAKE_BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
