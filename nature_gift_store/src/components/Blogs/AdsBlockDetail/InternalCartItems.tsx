'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getRegularPrice, priceFormatted } from '@/lib/utils/utils'
import Image from 'next/image'
import { CartItem } from '@/hooks/useCart'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Inventory, ProductSeoMetadata } from '@/lib/type'

interface CartItemProps {
  item: CartItem
  increaseQuantity: (id: string, quantity: number) => void
  decreaseQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  canRemoveItem: boolean
}

export function InternalItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  onRemove,
  canRemoveItem = true,
}: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const { localization } = useLocalization()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-4 max-sm:p-1">
          <div className="flex gap-4 items-center">
            <div className="relative aspect-square  w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={item.product.medias[0].url}
                fill
                alt={(item.product.metadata as ProductSeoMetadata).seoTitle}
                className="object-cover w-full h-full"
                onError={() => console.log('Image not found')}
                placeholder="blur"
                blurDataURL={item.product.medias[0].blurDataUrl || FAKE_BLUR}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col max-sm:gap-1">
              <div className="flex justify-between">
                <div className="max-sm:text-xs line-clamp-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                </div>
              </div>
              <div className="flex md:items-center md:justify-between mt-4 max-sm:mt-0 max-md:flex-col">
                <div className="md:text-right mb-2 max-sm:mb-0 md:hidden">
                  <div className="font-medium">
                    {priceFormatted(getRegularPrice(item.product) * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-sm text-muted-foreground">
                      {priceFormatted(getRegularPrice(item.product))} {localization.each}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      decreaseQuantity(item.product.path, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                    className="max-sm:h-7 max-sm:w-7"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(item.product.path, item.quantity + 1)}
                    disabled={
                      item.quantity >= ((item.product.inventory as Inventory).stockQuantity || 0)
                    }
                    className="max-sm:h-7 max-sm:w-7"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-right max-md:hidden">
                  <div className="font-medium">
                    {priceFormatted(getRegularPrice(item.product) * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-sm text-muted-foreground">
                      {priceFormatted(getRegularPrice(item.product))} {localization.each}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
