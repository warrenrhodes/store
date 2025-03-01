'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getRegularPrice, priceFormatted } from '@/lib/utils/utils'
import Image from 'next/image'
import { CartItem as CartItemType } from '@/hooks/useCart'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Inventory, ProductSeoMetadata } from '@/lib/type'

interface CartItemProps {
  item: CartItemType
  increaseQuantity: (id: string, quantity: number) => void
  decreaseQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, increaseQuantity, decreaseQuantity, onRemove }: CartItemProps) {
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
        {isRemoving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="mb-4">{localization.removeConfirmation}</p>
              <div className="flex gap-2 justify-center">
                <Button variant="destructive" onClick={() => onRemove(item.product.path as string)}>
                  {localization.remove}
                </Button>
                <Button variant="outline" onClick={() => setIsRemoving(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative aspect-square w-24 rounded-lg overflow-hidden">
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
              {item.product.isFeature && (
                <Badge className="absolute top-1 left-1">{localization.featured}</Badge>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.product.title}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsRemoving(true)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      decreaseQuantity(item.product.path, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
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
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-right">
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
