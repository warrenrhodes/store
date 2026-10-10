'use client'

import { useLocale } from '@/hooks/useLocale'
import { useLocalization } from '@/hooks/useLocalization'
import { navItems } from '@/lib/utils/navItems'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { SearchBar } from './SearchBar'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { localization } = useLocalization()
  const { locale } = useLocale()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon" aria-label={localization.menu}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Image
                src="/logo-wordmark.png"
                alt="N.Gift"
                width={258}
                height={79}
                className="h-7 w-auto"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label={localization.cancel}
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="py-4">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-4 py-3 text-base font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="relative">{item.title[locale]}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
