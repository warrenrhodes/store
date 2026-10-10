import { canDisplayPromoPrice, cn, priceFormatted } from '@/lib/utils/utils'
import { Price as IPrice } from '@/lib/type'
import { Product } from '@/lib/firebase/models'

/** Sale price (highlighted) next to the struck-through regular price, or the regular price. */
export const Price = ({ product, className }: { product: Product; className?: string }) => {
  const price = product.price as unknown as IPrice | undefined
  if (price.sale && canDisplayPromoPrice(product)) {
    return (
      <div className={cn('flex flex-wrap items-baseline gap-x-2', className)}>
        <span className="text-base font-semibold text-sale">{priceFormatted(price.sale)}</span>
        <span className="text-sm text-muted-foreground line-through">
          {priceFormatted(price.regular)}
        </span>
      </div>
    )
  }
  return (
    <div className={className}>
      <span className="text-base font-semibold">{priceFormatted(price.regular)}</span>
    </div>
  )
}
