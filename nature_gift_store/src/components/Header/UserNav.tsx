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
import { useClerk } from '@clerk/nextjs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'

export function UserNav() {
  const clerk = useClerk()
  const { user } = useCurrentUser()

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
                <span>My Account</span>
                <span className="text-muted-foreground">{user?.fullName}</span>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem ownMenuItem>Profile</DropdownMenuItem> */}
              <DropdownMenuItem>
                <Link href="/cart">Cart</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile?tabs=orders">Orders</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Wishlist</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => await clerk.signOut()}>Log out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={async () => clerk.openSignIn({})}>Sign in</DropdownMenuItem>
            <DropdownMenuItem>Create account</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
