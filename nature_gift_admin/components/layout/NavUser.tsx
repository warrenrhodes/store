'use client'

import {
  Building2,
  ChevronsUpDown,
  Copy,
  ExternalLink,
  LayoutDashboard,
  LogIn,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useAuthStore } from '@/hooks/auth-store'
import { toast } from '@/hooks/use-toast'
import { ROUTES } from '@/lib/router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

/** The sidebar's last row: who is signed in; a click opens the account's menu. */
export function NavUser(props: {
  /** In the platform console, not a store's dashboard. */
  platform: boolean
  platformAdmin: boolean
  /** The current store's storefront. */
  storeUrl?: string
}) {
  const { platform, platformAdmin, storeUrl } = props
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const name = user?.displayName || ''
  const email = user?.email || ''

  const identity = (
    <>
      <Avatar className="h-8 w-8 rounded-full border">
        <AvatarImage src={user?.photoURL || ''} alt={name} className="rounded-full" />
        <AvatarFallback className="rounded-full text-xs">
          {(name || email || 'A').slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name || (email ? '' : 'Account')}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </span>
    </>
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label="Account menu"
              className="data-[state=open]:bg-sidebar-accent"
            >
              {identity}
              <ChevronsUpDown className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-64">
            {user && (
              <>
                <DropdownMenuLabel className="flex items-center gap-2 font-normal">
                  {identity}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            {/* The way between the two areas: a platform admin's store(s) and the console. */}
            {platform ? (
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Store dashboard
                </Link>
              </DropdownMenuItem>
            ) : (
              platformAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/platform">
                    <Building2 className="mr-2 h-4 w-4" />
                    Platform console
                  </Link>
                </DropdownMenuItem>
              )
            )}
            {!platform && storeUrl && (
              <>
                <DropdownMenuItem asChild>
                  <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View my store
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={async () => {
                    await navigator.clipboard.writeText(storeUrl)
                    toast({ description: `Link copied: ${storeUrl}` })
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy store link
                </DropdownMenuItem>
              </>
            )}
            {(platform || platformAdmin || storeUrl) && <DropdownMenuSeparator />}
            {user ? (
              <DropdownMenuItem
                onSelect={async () => {
                  await logout()
                  router.replace(ROUTES.signIn)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link href={ROUTES.signIn}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
