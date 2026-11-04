'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog, Product } from '@/lib/firebase/models'
import { ShippingZone } from '@/lib/utils/shipping-zones'
import { AdsForm } from './AdsForm'
import { CartItem as CartItemType } from '@/hooks/useCart'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { hasOrderFormSlot, ORDER_FORM_ATTR, placeOrderFormSlot } from '@ngift/core/order-form-slot'
import { cn, getRegularPrice } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import { Inventory } from '@/lib/type'
import { sendGTMEvent } from '@next/third-parties/google'
import { trackPixel } from '@/lib/analytics/pixel'
import { getDocumentId } from '@spreeloop/database'

import { SiteLink as Link } from '@/components/Site'
import { Separator } from '@/components/ui/separator'
import { RelatedBlogs } from '../BlockDetail/RelatedBlogs'
import { InternalItem } from './InternalCartItems'
import { FreeShippingBadge } from '@/components/Shop/ProductDetail/FreeShippingBadge'
import { Countdown } from '@/components/Countdown'

const AdsBlogDetail = ({
  blog,
  shipments,
  associateProduct,
  relatedBlogs,
  freeShippingAreas = null,
  adId,
}: {
  blog: Blog
  shipments: ShippingZone[]
  associateProduct?: Product
  relatedBlogs: Blog[]
  freeShippingAreas?: string[] | null
  /** This page's blog id: the confirmation shows its thank-you page, if it has one. */
  adId?: string
}) => {
  const { localization, formatDate } = useLocalization()
  const metadata = blog.metadata
  const content = blog.content

  // Local item for the direct-checkout form; the global cart is left untouched.
  const [quantity, setQuantity] = useState(1)
  const cartItem: CartItemType | null = associateProduct
    ? { product: associateProduct, quantity, price: getRegularPrice(associateProduct) }
    : null
  const soldOut = (associateProduct?.inventory as Inventory | undefined)?.stockQuantity === 0

  // The form's place: inside the content when it says so (a portal: the content stays whole,
  // in a section or a column), else before or after it.
  const isHtml = content.type === 'HTML' || content.type === 'MARKDOWN'
  const html = isHtml ? placeOrderFormSlot(content.content) : content.content
  const placedInContent = isHtml && hasOrderFormSlot(html)
  // The same object between renders: a new one makes React rewrite the HTML, and lose the form.
  const markup = useMemo(() => ({ __html: html }), [html])
  const [slot, setSlot] = useState<Element | null>(null)
  const articleRef = useCallback(
    (article: HTMLDivElement | null) =>
      setSlot(placedInContent && article ? article.querySelector(`[${ORDER_FORM_ATTR}]`) : null),
    [placedInContent],
  )

  const orderBlock = (
    <div className="space-y-8">
      {blog.countdown && <Countdown countdown={blog.countdown} />}
      {cartItem && soldOut && (
        <Button disabled className="w-full">
          {localization.outOfStock}
        </Button>
      )}
      {cartItem && !soldOut && <FreeShippingBadge areas={freeShippingAreas} />}
      {cartItem && !soldOut && <AdsForm shipments={shipments} items={[cartItem]} adId={adId} />}
    </div>
  )
  const position = placedInContent ? null : blog.orderFormPosition === 'start' ? 'start' : 'end'

  useEffect(() => {
    if (!associateProduct) return
    const price = getRegularPrice(associateProduct)
    sendGTMEvent({
      event: 'view_item',
      currency: 'XAF',
      value: price,
      items: [
        {
          item_id: getDocumentId(associateProduct.path),
          item_name: associateProduct.title,
          price,
          category: associateProduct.categories?.[0],
        },
      ],
    })
    trackPixel('ViewContent', [{ path: associateProduct.path, quantity: 1, price }])
  }, [associateProduct?.path])

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
        {metadata.coverImage?.url && !associateProduct && (
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
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          )}
          {!!metadata.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {metadata.readingTime} {localization.minRead}
              </span>
            </div>
          )}
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

      {position === 'start' && orderBlock}

      <div ref={articleRef}>
        {content.type === 'HTML' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            dangerouslySetInnerHTML={markup}
          />
        )}

        {content.type === 'MARKDOWN' && <div dangerouslySetInnerHTML={markup} />}

        {content.type === 'TEXT' && <div>{content.content}</div>}
      </div>

      {position === 'end' && orderBlock}
      {slot && (createPortal(orderBlock, slot) as unknown as ReactNode)}

      {cartItem && !soldOut && (
        <motion.footer
          className={cn(
            'sticky bottom-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b shadow-sm',
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence initial={false}>
            {cartItem && (
              <InternalItem
                key={`${cartItem.product.path}`}
                item={cartItem}
                increaseQuantity={(_, q) => setQuantity(q)}
                decreaseQuantity={(_, q) => setQuantity(q)}
                onRemove={() => {}}
                canRemoveItem={false}
              />
            )}
          </AnimatePresence>
        </motion.footer>
      )}
      <Separator />
      {relatedBlogs.length > 0 && <RelatedBlogs relatedBlogs={relatedBlogs.slice(0, 5)} />}
    </motion.div>
  )
}

export default AdsBlogDetail
