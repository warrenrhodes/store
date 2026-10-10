'use client'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocalization } from '@/hooks/useLocalization'
import { Product } from '@/lib/firebase/models'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { getRegularPrice, priceFormatted } from '@/lib/utils/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { localization } = useLocalization()
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    async function fetchProducts() {
      if (!debouncedQuery) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Failed to search products', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [debouncedQuery])

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (query.trim()) router.push(`/shop?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="search"
          placeholder={localization.searchProducts}
          aria-label={localization.searchProducts}
          className="w-full pl-10 pr-4"
          value={query}
          onKeyDown={handleKeyPress}
          onChange={e => {
            setQuery(e.target.value)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay closing to allow clicking on results
            setTimeout(() => setIsFocused(false), 200)
          }}
        />
        <Search
          aria-hidden
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 rounded-md border bg-background shadow-lg"
          >
            <div className="p-2">
              {loading ? (
                <p className="text-sm text-muted-foreground text-center">{localization.searching}</p>
              ) : results.length > 0 ? (
                <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
                  {results.map(e => (
                    <ItemResult product={e} key={e.path} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{`${localization.noResultsFoundFor} « ${query} »`}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Shape returned by /api/search: a trimmed product, not a full `Product`. */
type SearchResult = Pick<Product, 'title' | 'slug' | 'path' | 'medias' | 'price'>

const ItemResult = ({ product }: { product: SearchResult }) => (
  <Link
    href={`/shop/${product.slug}`}
    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
  >
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
      <Image
        src={product.medias[0].url}
        fill
        alt=""
        className="object-cover"
        placeholder="blur"
        blurDataURL={product.medias[0].blurDataUrl || FAKE_BLUR}
        sizes="56px"
      />
    </div>
    <span className="flex-1 text-sm font-medium line-clamp-2">{product.title}</span>
    <span className="text-sm tabular-nums">
      {priceFormatted(getRegularPrice(product as Product))}
    </span>
  </Link>
)
