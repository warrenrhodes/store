'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { useCart } from '@/hooks/useCart'
import { priceFormatted, getRegularPrice } from '@/lib/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/lib/api/products'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { trackSearch } from '@/lib/pixel-events'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])

  const fetchData = useCallback(async () => {
    const result = await fetch('/api/products')
    if (!result.ok) {
      return
    }

    setProducts(await result.json())
  }, [])

  useEffect(() => {
    if (products.length > 0) return
    fetchData()
  }, [fetchData, products.length])
  if (products.length === 0) return null

  const productsFiltered = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  )

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4"
          value={query}
          onKeyDown={handleKeyPress}
          onChange={e => {
            setQuery(e.target.value)
            trackSearch({
              search_string: e.target.value,
            })
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 rounded-md border bg-background shadow-lg"
          >
            <div className="p-4">
              {productsFiltered.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
                  {productsFiltered.map(e => (
                    <ItemResult product={e} key={e.id} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{`No results found for "${query}"`}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ItemResult = ({ product }: { product: IProduct }) => {
  const cart = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Link href={`/shop/${product.slug}`}>
              <div className="relative aspect-square w-24 rounded-lg overflow-hidden">
                <Image
                  src={product.media[0].media.url}
                  fill
                  alt={product.title}
                  className="object-cover w-full h-full"
                  onError={() => console.log('Image not found')}
                  placeholder="blur"
                  blurDataURL={product.media[0].media.blurDataUrl || FAKE_BLUR}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isFeature && <Badge className="absolute top-1 left-1">Feature</Badge>}
              </div>
            </Link>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    className=" group"
                    onClick={() => {
                      cart.addItem({
                        product: product,
                        price: getRegularPrice(product),
                        quantity: 1,
                      })
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </div>
                <div className="text-right">
                  <div className="font-medium">{priceFormatted(getRegularPrice(product))}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
