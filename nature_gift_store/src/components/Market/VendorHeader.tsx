'use client'

import { SiteLink as Link } from '@/components/Site'
import { Button } from '@/components/ui/button'
import { useLocalization } from '@/hooks/useLocalization'
import { siteHref } from '@ngift/core/site'

export function VendorHeader(props: { name: string; slug: string; empty: boolean }) {
  const { localization } = useLocalization()
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-muted-foreground">{localization.soldBy}</p>
        <h1 className="text-3xl font-semibold">{props.name}</h1>
        {props.empty && <p className="mt-2 text-muted-foreground">{localization.noProductsYet}</p>}
      </div>
      <Button variant="outline" asChild>
        <Link href={siteHref(props.slug, '/')}>{localization.visitStore}</Link>
      </Button>
    </div>
  )
}
