'use client'

// Always under a store's own thank-you page: the order number and the tracking link.
import { SiteLink as Link } from '@/components/Site'
import { Button } from '@/components/ui/button'
import { useLocalization } from '@/hooks/useLocalization'

export function ThankYouFooter({ orderNumber, tracking }: { orderNumber: string; tracking: string }) {
  const { localization } = useLocalization()
  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border p-5 text-center">
      <p className="font-medium">
        {localization.orderNumber} {orderNumber}
      </p>
      <Button className="mt-4 h-12 w-full text-base" asChild>
        <Link href={tracking}>{localization.trackOrder}</Link>
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">{localization.keepTrackingLink}</p>
    </div>
  )
}
