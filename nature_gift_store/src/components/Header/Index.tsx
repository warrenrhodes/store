'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils/utils'
import { MainNav } from './MainNav'
import { MobileNav } from './NavMobile'
import { SearchBar } from './SearchBar'
import { UserNav } from './UserNav'
import { CartSidebar } from '../Cart/CartSidebar'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 0)
    })
  }, [scrollY])

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full',
        isScrolled && 'backdrop-blur-lg bg-background/80 border-b shadow-sm',
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
          <MainNav />
          <div className="hidden md:flex md:flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            <CartSidebar />
            <UserNav />
          </div>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}