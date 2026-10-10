'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useLocalization } from '@/hooks/useLocalization'
import { useWishlistStore } from '@/hooks/store/useWishlistStore'
import { buttonVariants } from '../ui/button'

export function WishlistLink() {
  const count = useWishlistStore(s => s.items.size)
  const { localization } = useLocalization()
  return (
    <Link
      href="/favoris"
      aria-label={`${localization.wishlist} (${count})`}
      className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'relative' })}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-foreground text-[11px] font-semibold flex items-center justify-center text-background"
        >
          {count}
        </span>
      )}
    </Link>
  )
}
