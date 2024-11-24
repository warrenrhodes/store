'use client'

import Link from 'next/link'
import HeartFavorite from './HeartFavorite'
import { IProduct, UserType } from '@/lib/types'
import Image from 'next/image'

interface ProductCardProps {
  product: IProduct
  updateSignedInUser?: (updatedUser: UserType) => void
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link href={`/products/${product._id}`} className="w-[220px] flex flex-col gap-2">
      <Image
        src={`${product.media[0].url}`}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">
          {product.categories.map(category => category.title).join(', ')}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="line-through text-sm text-red-600">FCFA {product.price}</p>
          <p className="text-body-bold">FCFA {product.promoPrice}</p>
        </div>

        <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
      </div>
    </Link>
  )
}

export default ProductCard
