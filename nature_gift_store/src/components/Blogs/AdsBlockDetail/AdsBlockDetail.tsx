'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format, subDays } from 'date-fns'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog, Product, Shipment } from '@/lib/firebase/models'
import { AdsForm } from './AdsForm'
import { CartItem as CartItemType, useCart } from '@/hooks/useCart'
import { useCallback, useEffect } from 'react'
import { cn, getRegularPrice } from '@/lib/utils/utils'
import CountdownTimer from '@/components/CountDown'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { RelatedBlogs } from '../BlockDetail/RelatedBlogs'
import { InternalItem } from './InternalCartItems'

const AdsBlogDetail = ({
  blog,
  shipments,
  associateProduct,
  relatedBlogs,
}: {
  blog: Blog
  shipments: Shipment[]
  associateProduct?: Product
  relatedBlogs: Blog[]
}) => {
  const { localization } = useLocalization()
  const metadata = blog.metadata
  const content = blog.content

  const { addItem, cartItems, increaseQuantity, decreaseQuantity } = useCart()
  const addProductToCart = useCallback(async () => {
    if (associateProduct)
      addItem({
        product: associateProduct,
        quantity: 1,
        price: getRegularPrice(associateProduct),
      })
  }, [])

  useEffect(() => {
    if (associateProduct) {
      addProductToCart()
    }
  }, [addProductToCart, associateProduct])

  let cartItem: CartItemType | null = null
  if (associateProduct) {
    cartItem = cartItems.find(e => e.product.path === associateProduct.path)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Button variant="ghost" asChild>
        <Link href="/blogs" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {localization.backToBlogs}
        </Link>
      </Button>
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
              blurDataURL={metadata.coverImage?.blurDataUrl || FAKE_BLUR}
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
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <div key={tag} className="flex items-center text-sm text-muted-foreground">
              <Tag className="w-4 h-4 mr-1" />#{tag}
            </div>
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

      {associateProduct && cartItem && <AdsForm shipments={shipments} />}
      {associateProduct && cartItem && (
        <motion.footer
          className={cn(
            'sticky bottom-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b shadow-sm',
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CountdownTimer />
          <AnimatePresence initial={false}>
            {cartItem && (
              <InternalItem
                key={`${cartItem.product.path}`}
                item={cartItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                onRemove={() => {}}
                canRemoveItem={false}
              />
            )}
          </AnimatePresence>
        </motion.footer>
      )}
      {associateProduct && !cartItem && (
        <Button id="checkout-form" onClick={addProductToCart} className="w-full">
          {localization.addToCart}
        </Button>
      )}
      <Separator />
      {relatedBlogs.length > 0 && <RelatedBlogs relatedBlogs={relatedBlogs.slice(0, 5)} />}
    </motion.div>
  )
}

export default AdsBlogDetail
