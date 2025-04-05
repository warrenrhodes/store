'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/utils'
import { MainNav } from './MainNav'
import { MobileNav } from './NavMobile'
import { SearchBar } from './SearchBar'
import { UserNav } from './UserNav'
import { CartSidebar } from '../Cart/CartSidebar'
import { LocaleSelector } from './LocaleSelector'
import { Product } from '@/lib/firebase/models'
import { ProgressBar } from './ProgressBar'

export function Header(props: { products: Product[] }) {
  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b shadow-sm',
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
          <MainNav />
          <div className="hidden md:flex md:flex-1">
            <SearchBar products={props.products} />
          </div>
          <div className="flex items-center gap-4">
            <LocaleSelector />
            <CartSidebar />
            <UserNav />
          </div>
          <MobileNav products={props.products} />
        </div>
      </div>
      <ProgressBar />
    </motion.header>
  )
}
