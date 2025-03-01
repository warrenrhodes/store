'use client'

import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useLocalization } from '@/hooks/useLocalization'
import { useAuthStore } from '@/hooks/store/auth-store'
import { useRouter } from 'next/navigation'

export function UserNav() {
  const { user, logout } = useAuthStore()
  const { localization } = useLocalization()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {!user?.isAnonymous ? (
          <>
            <DropdownMenuLabel>
              <Link className="flex flex-col" href="/profile?tabs=info">
                <span>{localization.myAccount}</span>
                <span className="text-muted-foreground">{user?.displayName}</span>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem ownMenuItem>Profile</DropdownMenuItem> */}
              <DropdownMenuItem>
                <Link href="/cart">{localization.cart}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile?tabs=orders">{localization.orders}</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Wishlist</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await logout()
                router.push('/')
              }}
            >
              {localization.signOut}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">{localization.signIn}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>{localization.createAccount}</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
