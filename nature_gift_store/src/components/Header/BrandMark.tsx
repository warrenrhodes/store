'use client'

import { useSite } from '@/components/Site'
import Image from 'next/image'

/** The platform's wordmark on the marketplace; in a store, its logo or else its name. */
export function BrandMark({ className, priority }: { className?: string; priority?: boolean }) {
  const { isMarket, name, logoUrl } = useSite()
  if (!isMarket && logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- any size and host the owner uploaded
      <img src={logoUrl} alt={name} className="h-10 w-auto max-w-[180px] object-contain" />
    )
  }
  if (!isMarket) return <span className="text-lg font-semibold leading-none">{name}</span>
  return (
    <Image
      src="/logo-wordmark.png"
      alt={name}
      width={258}
      height={79}
      priority={priority}
      className={className}
    />
  )
}
