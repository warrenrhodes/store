'use client'

import { useLocalization } from '@/hooks/useLocalization'
import { Truck } from 'lucide-react'
import { CartSidebar } from '../Cart/CartSidebar'
import { LocaleSelector } from './LocaleSelector'
import { MainNav } from './MainNav'
import { MobileNav } from './NavMobile'
import { ProgressBar } from './ProgressBar'
import { SearchBar } from './SearchBar'
import { UserNav } from './UserNav'
import { WishlistLink } from './WishlistLink'

export function Header() {
  const { localization } = useLocalization()
  return (
    <>
      <div className="bg-foreground text-background text-xs sm:text-sm">
        <p className="container mx-auto flex items-center justify-center gap-2 py-2 text-center">
          <Truck className="h-4 w-4 shrink-0" aria-hidden />
          {localization.announcement}
        </p>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
            <MobileNav />
            <MainNav />
            <div className="hidden md:flex md:flex-1">
              <SearchBar />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <LocaleSelector />
              <UserNav />
              <WishlistLink />
              <CartSidebar />
            </div>
          </div>
        </div>
        <ProgressBar />
      </header>
    </>
  )
}
