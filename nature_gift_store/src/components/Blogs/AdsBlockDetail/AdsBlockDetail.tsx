'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format, subDays } from 'date-fns'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog, Product, Shipment } from '@/lib/firebase/models'
import { AdsForm } from './AdsForm'
import { useCart } from '@/hooks/useCart'
import { useCallback, useEffect } from 'react'
import { cn, getRegularPrice } from '@/lib/utils/utils'
import { CartItem } from '@/components/Cart/CartItem'

const AdsBlogDetail = ({
  blog,
  shipments,
  associateProduct,
}: {
  blog: Blog
  shipments: Shipment[]
  associateProduct?: Product
}) => {
  const { localization } = useLocalization()
  const metadata = blog.metadata
  const content = blog.content

  const { addItem, cartItems, clearCart, increaseQuantity, decreaseQuantity } = useCart()
  const addProductToCart = useCallback(async () => {
    clearCart()
    if (associateProduct)
      addItem({
        product: associateProduct,
        quantity: 1,
        price: getRegularPrice(associateProduct),
      })
  }, [])

  useEffect(() => {
    addProductToCart()
  }, [addProductToCart])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        {metadata.featured && <Badge className="mb-4">{localization.featuredArticle}</Badge>}
        <h1 className="text-5xl font-bold tracking-tight">{blog.title}</h1>
        <p className="text-muted-foreground">{content.excerpt}</p>
        {metadata.coverImage?.url && (
          <div className="relative aspect-video overflow-hidden rounded-lg ">
            <Image
              src={metadata.coverImage?.url}
              alt={blog.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={metadata.coverImage.blurDataUrl || FAKE_BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {blog.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              && <span>{format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{metadata.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{metadata.author.name}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {blog.categories.map(category => (
            <Badge key={`${category}`} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {content.type === 'HTML' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      )}

      {content.type === 'MARKDOWN' && <div dangerouslySetInnerHTML={{ __html: content.content }} />}

      {content.type === 'TEXT' && <div>{content.content}</div>}

      <AdsForm shipments={shipments} />
      <motion.footer
        className={cn(
          'sticky bottom-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b shadow-sm p-2',
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence initial={false}>
          {cartItems.map(item => (
            <CartItem
              key={`${item.product.path}`}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              onRemove={() => {}}
              canRemoveItem={false}
            />
          ))}
        </AnimatePresence>
      </motion.footer>
    </motion.div>
  )
}

export default AdsBlogDetail
