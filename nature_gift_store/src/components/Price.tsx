import { IProduct } from '@/lib/models/Product'
import { canDisplayPromoPrice, priceFormatted } from '@/lib/utils/utils'

/**
 * Component to display the price of a product.
 * If the product is on sale and the sale can be displayed, it shows the sale price
 * alongside the regular price, with the regular price struck through.
 * Otherwise, it displays the regular price.
 *
 * @param {Object} props - The component props.
 * @param {IProduct} props.product - The product object containing price information.
 * @returns {JSX.Element} The JSX element displaying the product's price.
 */
export const Price = ({ product }: { product: IProduct }) => {
  if (product.price.sale && canDisplayPromoPrice(product)) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold">{priceFormatted(product.price.sale)}</span>
        <span className="text-sm text-muted-foreground line-through">
          {priceFormatted(product.price.regular)}
        </span>
      </div>
    )
  }
  return (
    <div>
      <span className="text-lg font-bold">{priceFormatted(product.price.regular)}</span>
    </div>
  )
}
