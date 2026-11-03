'use client'

import { Check, Loader2, Tag, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePromoCodes } from '@/hooks/usePromoCodes'
import { cn, foldFreeShipping } from '@/lib/utils/utils'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { CartItem, useCart, useCartDeliveryInfo } from '@/hooks/useCart'
import { priceFormatted } from '@/lib/utils/utils'
import { MutableRefObject, useState } from 'react'
import { useEffect } from 'react'
import { usePromotionCalculator } from '@/hooks/usePromotionCalculator'
import { OrderSummary as OrderSummaryType } from '@/lib/firebase/models'
import { Skeleton } from '../ui/skeleton'
import { useLocalization } from '@/hooks/useLocalization'

export function OrderSummary({
  orderSummary,
  items,
  onTotalChange,
}: {
  orderSummary: MutableRefObject<OrderSummaryType | undefined>
  /** Items to summarize; defaults to the global cart. */
  items?: CartItem[]
  /** Lets the form show the up-to-date total on its submit button. */
  onTotalChange?: (total: number) => void
}) {
  const cart = useCart()
  const cartItems = items ?? cart.cartItems
  const { cartDeliveryInfo } = useCartDeliveryInfo()

  const [summary, setSummary] = useState<
    | (OrderSummaryType & {
        codeStatuses?: Record<string, string>
        /** One per store of the cart (docs 3.4): each is ordered and delivered apart. */
        groups?: (OrderSummaryType & {
          storeId: string
          storeName: string
          shippingKnown: boolean
        })[]
      })
    | null
  >(null)
  const { calculatePromotions, isCalculating, error } = usePromotionCalculator()
  const { localization } = useLocalization()
  const { codes, add, remove } = usePromoCodes()
  const [draft, setDraft] = useState('')

  useEffect(() => {
    async function updatePromotions() {
      const result = await calculatePromotions(cartItems, cartDeliveryInfo, codes)
      if (result) {
        orderSummary.current = result
        setSummary(result)
        onTotalChange?.(result.total)
      }
    }

    updatePromotions()
  }, [cartItems, cartDeliveryInfo, codes])

  const codeLabel = (status?: string) =>
    status === 'applied'
      ? localization.codeApplied
      : status === 'not_applicable'
        ? localization.codeNotApplicable
        : status === 'invalid'
          ? localization.codeInvalid
          : ''
  const applyDraft = () => {
    add(draft)
    setDraft('')
  }

  return (
    <div className="rounded-xl border bg-muted/40 p-5 lg:sticky lg:top-24">
      <h2 className="text-xl font-semibold">{localization.orderSummary}</h2>
      <ul className="mt-5 space-y-4">
        {cartItems.map(item => (
          <li key={`${item.product.path}`} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-lg border bg-background">
              <Image
                src={item.product.medias[0].url}
                alt=""
                fill
                sizes="64px"
                className="rounded-lg object-cover"
              />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs font-semibold text-background">
                {item.quantity}
              </span>
            </div>
            <span className="flex-1 text-sm font-medium line-clamp-2">{item.product.title}</span>
            <span className="text-sm tabular-nums">
              {priceFormatted(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      {/* <Separator className="my-5" /> */}

      {/* <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          applyDraft()
        }}
      >
        <Input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder={localization.promoCode}
          aria-label={localization.promoCode}
          autoCapitalize="characters"
          className="bg-background uppercase placeholder:normal-case"
        />
        <Button type="submit" variant="outline" disabled={!draft.trim()}>
          {localization.apply}
        </Button>
      </form> */}
      {codes.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-live="polite">
          {codes.map(code => {
            const status = summary?.codeStatuses?.[code]
            return (
              <li
                key={code}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs',
                  status === 'applied'
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : status
                      ? 'border-destructive/40 bg-destructive/10 text-destructive'
                      : 'bg-background',
                )}
              >
                {isCalculating ? (
                  <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
                ) : status === 'applied' ? (
                  <Check className="h-3 w-3" aria-hidden />
                ) : (
                  <Tag className="h-3 w-3" aria-hidden />
                )}
                <span className="font-medium">{code}</span>
                {status && !isCalculating && <span>· {codeLabel(status)}</span>}
                <button
                  type="button"
                  onClick={() => remove(code)}
                  aria-label={`${localization.removeCode} ${code}`}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <Separator className="my-5" />

      {isCalculating || !summary ? (
        <div className="space-y-3" aria-busy>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          {(summary.groups?.length ?? 0) > 1 ? (
            <>
              <p className="text-muted-foreground">{localization.ordersByStore}</p>
              {summary.groups!.map(group => (
                <div key={group.storeId} className="space-y-1 rounded-lg border bg-background p-3">
                  <p className="font-medium">{group.storeName}</p>
                  <Lines
                    summary={group}
                    shippingKnown={!!cartDeliveryInfo?.locationId && group.shippingKnown}
                  />
                  <div className="flex justify-between font-medium">
                    <span>{localization.total}</span>
                    <span className="tabular-nums">{priceFormatted(group.total)}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Lines summary={summary} shippingKnown={!!cartDeliveryInfo?.locationId} />
          )}
          <Separator className="!my-4" />
          <div className="flex items-baseline justify-between text-base font-semibold">
            <span>{localization.total}</span>
            <span className="text-xl tabular-nums">{priceFormatted(summary.total)}</span>
          </div>
        </div>
      )}
      {error && (
        <p className="mt-3 text-sm text-destructive">{localization.failedToLoadPromotions}</p>
      )}
    </div>
  )
}

/** Subtotal, shipping and promotions of one summary (the cart, or one store of it). */
function Lines({ summary, shippingKnown }: { summary: OrderSummaryType; shippingKnown: boolean }) {
  const { localization } = useLocalization()
  const shown = foldFreeShipping(summary.shipping, summary.appliedPromotions)
  return (
    <>
      <div className="flex justify-between">
        <span>{localization.subtotal}</span>
        <span className="tabular-nums">{priceFormatted(summary.subtotal)}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span>{localization.shipping}</span>
        {shippingKnown ? (
          <span className={shown.waived ? 'font-medium text-primary' : 'tabular-nums'}>
            {shown.shipping > 0 ? priceFormatted(shown.shipping) : localization.free}
          </span>
        ) : (
          <span className="text-right text-muted-foreground">{localization.shippingToConfirm}</span>
        )}
      </div>
      {shown.promotions.map(promo => (
        <div key={`${promo.id}-${promo.type}`} className="flex justify-between text-primary">
          <span className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" aria-hidden /> {promo.code}
          </span>
          <span className="tabular-nums">-{priceFormatted(promo.discountAmount)}</span>
        </div>
      ))}
    </>
  )
}
