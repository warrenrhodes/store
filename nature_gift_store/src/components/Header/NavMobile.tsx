import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, Package, X, XIcon } from 'lucide-react'
import Image from 'next/image'
import Logo from '../Logo/Logo'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { SearchBar } from './SearchBar'
import { navItems } from '@/lib/utils/navItems'

// export interface NavMobileProps {
//   onClickClose?: () => void;
// }

// const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
//   return (
//     <div className="h-screen w-full divide-y divide-neutral-300 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition">
//       <div className="px-5 py-2">
//         <Logo />
//         <span className="absolute right-2 top-2 p-1" onClick={onClickClose}>
//           <XIcon />
//         </span>
//       </div>
//     </div>
//   );
// };

// export default NavMobile;

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Package className="h-6 w-6" />
              <span className="font-semibold">Store</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
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
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="relative">
                  {item.title}
                 
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
