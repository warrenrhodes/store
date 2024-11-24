import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Tag, Trash2 } from 'lucide-react'
import { CartItem } from '@/lib/types'
import { Badge } from '../ui/badge'
import { calculateTotalPriceOfItemCart } from '@/lib/utils'

export const CartItemView = ({
  cartItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}: {
  cartItem: CartItem
  removeItem: (idToRemove: string) => void
  increaseQuantity: (idToIncrease: string) => void
  decreaseQuantity: (idToDecrease: string) => void
}) => {
  function calculatePercentageChange(oldPrice: number, newPrice: number): number {
    if (oldPrice === 0) {
      throw new Error('Old price cannot be zero.')
    }

    const difference = newPrice - oldPrice
    const percentageChange = (difference / oldPrice) * 100

    return percentageChange
  }

  return (
    <Card key={cartItem.item._id}>
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-secondary/10">
            <Image
              src={cartItem.item.media[0].url}
              fill
              className="object-contain"
              alt={cartItem.item.title}
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{cartItem.item.title}</h3>
                <span className="my-1 text-sm text-neutral-500">
                  {cartItem.item.categories
                    .slice(0, 2)
                    .map(category => category.title)
                    .join(', ')}
                </span>
              </div>

              <Button variant="ghost" size="icon" onClick={() => removeItem(cartItem.item._id)}>
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
            <div className="flex gap-1 items-end">
              <h4 className=" line-through text-[12px] max-sm:text-base font-bold text-gray-500 text-end ">
                {cartItem.item.price} FCFA
              </h4>
              <h4 className="text-lg max-sm:text-base font-bold">
                {cartItem.item.promoPrice} FCFA
              </h4>
            </div>

            {cartItem.promotion && (
              <Badge variant="secondary" className="gap-1">
                <Tag className="h-4 w-4" />
                {cartItem.promotion.promotionName}
              </Badge>
            )}

            {cartItem.color && (
              <p className="text-sm text-muted-foreground">Color: {cartItem.color}</p>
            )}
            {cartItem.size && (
              <p className="text-sm text-muted-foreground">Size: {cartItem.size}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  onClick={() => decreaseQuantity(cartItem.item._id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{cartItem.quantity}</span>
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  onClick={() => increaseQuantity(cartItem.item._id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {calculateTotalPriceOfItemCart(cartItem).toLocaleString()} FCFA
                </p>
                {cartItem.promotion &&
                  cartItem.quantity >= cartItem.promotion.minProductsToApply && (
                    <p className="text-sm text-green-600">
                      {calculatePercentageChange(
                        cartItem.quantity * cartItem.item.promoPrice,
                        calculateTotalPriceOfItemCart(cartItem),
                      ).toFixed(1)}{' '}
                      off applied
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
