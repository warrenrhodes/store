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
import { SiteLink as Link } from '@/components/Site'
import { useLocalization } from '@/hooks/useLocalization'
import { useAuthStore } from '@/hooks/store/auth-store'
import { useSiteRouter } from '@/components/Site'

export function UserNav() {
  const { user, logout } = useAuthStore()
  const { localization } = useLocalization()
  const router = useSiteRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={localization.account}>
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {!(!user || user.isAnonymous) ? (
          <>
            <DropdownMenuLabel>
              <Link className="flex flex-col" href="/profile?tabs=info">
                <span>{localization.myAccount}</span>
                <span className="text-muted-foreground">{user?.fullName}</span>
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
              <Link href={'/profile?tabs=orders'}>{localization.signIn}</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
