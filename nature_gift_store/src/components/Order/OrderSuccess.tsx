'use client'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteLink as Link } from '@/components/Site'
import { useLocalization } from '@/hooks/useLocalization'
import { useAuthStore } from '@/hooks/store/auth-store'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

/** The platform's confirmation: shown when the order's ad page has no thank-you page of its own. */
const OrderSuccessContent = () => {
  const { user } = useAuthStore()
  const params = useSearchParams()
  const orderId = params.get('order')
  const groupId = params.get('group')
  const token = params.get('t')
  // A marketplace cart with several stores: one tracking page for all its orders.
  const tracking = groupId ? `/order/group/${groupId}?t=${token}` : `/order/${orderId}?t=${token}`
  const hasTracking = !!(orderId || groupId) && !!token
  const { localization } = useLocalization()
  const isGuest = !user || user.isAnonymous

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">{localization.orderSuccessful}</h1>
        <p className="mt-3 text-lg">{localization.thankYouForYourPurchase}</p>
        <p className="mt-2 text-muted-foreground">{localization.confirmationEmailSent}</p>

        {isGuest && (
          <p className="mt-6 rounded-xl bg-muted p-4 text-sm">
            {localization.createAccountMessage}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {groupId && <p className="text-sm text-muted-foreground">{localization.ordersByStore}</p>}
          {hasTracking && (
            <>
              <Button className="h-12 w-full text-base" asChild>
                <Link href={tracking}>{localization.trackOrder}</Link>
              </Button>
              <p className="text-xs text-muted-foreground">{localization.keepTrackingLink}</p>
            </>
          )}
          <Button
            variant={hasTracking ? 'outline' : 'default'}
            className="h-12 w-full text-base"
            asChild
          >
            <Link href="/shop">{localization.continueShopping}</Link>
          </Button>
          <Button variant="outline" className="h-12 w-full text-base" asChild>
            <Link href={isGuest ? '/sign-up' : '/profile?tabs=orders'}>
              {isGuest ? localization.createAccount : localization.myOrders}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

// useSearchParams needs a Suspense boundary.
export const OrderSuccess = () => (
  <Suspense>
    <OrderSuccessContent />
  </Suspense>
)
