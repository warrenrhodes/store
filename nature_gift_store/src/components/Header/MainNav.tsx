'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils/utils'
import { motion } from 'framer-motion'
import { navItems } from '@/lib/utils/navItems'
import { useLocale } from '@/hooks/useLocale'

export function MainNav() {
  const pathname = usePathname()
  const { locale } = useLocale()

  return (
    <div className="flex items-center gap-6 lg:gap-8">
      <Link href="/" aria-label="N.Gift" className="shrink-0">
        <Image
          src="/logo-wordmark.png"
          alt="N.Gift"
          width={258}
          height={79}
          priority
          className="h-7 w-auto"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-foreground relative',
              pathname === item.href ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {item.title[locale]}

            {pathname === item.href && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                layoutId="navbar-indicator"
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}
