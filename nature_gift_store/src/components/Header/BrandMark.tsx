'use client'

import { useSite } from '@/components/Site'
import Image from 'next/image'

/** The platform's wordmark on the marketplace, the store's name in a store (logo: phase 3). */
export function BrandMark({ className, priority }: { className?: string; priority?: boolean }) {
  const { isMarket, name } = useSite()
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
