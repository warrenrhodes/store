'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IProduct } from '@/lib/api/products'
import { FAKE_BLUR } from '@/lib/utils/constants'
import Image from 'next/image'
import { useLocalization } from '@/hooks/useLocalization'

export function ProductGallery({ product }: { product: IProduct }) {
  const { media } = product
  const [currentImage, setCurrentImage] = useState(0)
  const { localization } = useLocalization()
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
              src={product.media[currentImage].media.url}
              alt={product.metadata.seoTitle}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={product.media[0].media.blurDataUrl || FAKE_BLUR}
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
            onClick={() => setCurrentImage(prev => (prev === 0 ? media.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setCurrentImage(prev => (prev === media.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {media.map((value, index) => (
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
              src={value.media.url}
              alt={product.metadata.seoTitle}
              fill
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={value.media.blurDataUrl || FAKE_BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
