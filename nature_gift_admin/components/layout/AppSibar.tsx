'use client'

import * as React from 'react'
import {
  BookOpenText,
  ExternalLink,
  Gift,
  LayoutDashboard,
  LogIn,
  LogOut,
  Shapes,
  ShoppingBag,
  Stars,
  Tag,
  Truck,
  MapPin,
  ShoppingCart,
  UsersRound,
  Palette,
  Settings,
  UserCog,
  Building2,
  Copy,
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from './NavMain'
import Link from 'next/link'
import { useAuthStore } from '@/hooks/auth-store'
import { ROUTES } from '@/lib/router'
import { NavUser } from './NavUser'
import { useRouter } from 'next/navigation'
import { StoreSwitcher } from './StoreSwitcher'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      url: '/orders',
      icon: ShoppingBag,
      title: 'Orders',
    },
    {
      url: '/checkouts',
      icon: ShoppingCart,
      title: 'Abandoned checkouts',
    },
    {
      url: '/customers',
      icon: UsersRound,
      title: 'Customers',
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: Shapes,
    },
    {
      url: '/products',
      icon: Tag,
      title: 'Products',
    },
    {
      url: '/promotions',
      icon: Gift,
      title: 'Promotions',
    },
    // {
    //   url: '/medias',
    //   icon: LucideImage,
    //   title: 'Medias',
    // },
    {
      url: '/blogs',
      icon: BookOpenText,
      title: 'Blogs',
    },
    {
      url: '/reviews',
      icon: Stars,
      title: 'Reviews',
    },
    {
      url: '/shipments',
      icon: Truck,
      title: 'Shipments',
    },
    {
      url: '/locations',
      icon: MapPin,
      title: 'Locations',
    },
  ],
}

/** The platform console (/platform): the super admin's own area, apart from any store. */
const platformNav = [
  { url: '/platform', icon: Building2, title: 'Stores' },
  { url: '/platform/products', icon: Tag, title: 'Marketplace products' },
]

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  /** The current store's dashboard, or the platform console. */
  area: 'store' | 'platform'
  stores: { id: string; name: string }[]
  currentStoreId?: string
  /** The current store's storefront (storefrontUrl). */
  storeUrl?: string
  isOwner: boolean
  platformAdmin: boolean
}

export function AppSidebar({
  area,
  stores,
  currentStoreId,
  storeUrl,
  isOwner,
  platformAdmin,
  ...props
}: AppSidebarProps) {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const platform = area === 'platform'
  const navItems = platform
    ? platformNav
    : [
        ...data.navMain,
        ...(isOwner
          ? [
              { url: '/settings', icon: Settings, title: 'Store settings' },
              { url: '/theme', icon: Palette, title: 'Theme' },
              { url: '/team', icon: UserCog, title: 'Team' },
            ]
          : []),
      ]
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href={platform ? '/platform' : '/'}
                aria-label={platform ? 'N.Gift platform console' : 'N.Gift Admin'}
              >
                <Image
                  src="/logo-wordmark.png"
                  alt="N.Gift"
                  width={258}
                  height={79}
                  priority
                  className="h-7 w-auto"
                />
                {platform ? (
                  <span className="rounded-md bg-amber-500 px-1.5 py-0.5 text-xs font-medium text-amber-950">
                    Platform
                  </span>
                ) : (
                  <span className="rounded-md bg-sidebar-accent px-1.5 py-0.5 text-xs font-medium text-sidebar-accent-foreground">
                    Admin
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {!platform && <StoreSwitcher stores={stores} currentStoreId={currentStoreId} />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.displayName || '',
              email: user?.email || '',
              avatar: user.photoURL || '',
            }}
          />
        )}
        <SidebarMenu>
          {/* The way between the two areas: a platform admin's store(s) and the console. */}
          {platform ? (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <LayoutDashboard />
                  <span>Store dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            platformAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/platform">
                    <Building2 />
                    <span>Platform console</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
          {!platform && storeUrl && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>View my store</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={async () => {
                    await navigator.clipboard.writeText(storeUrl)
                    toast({ description: `Link copied: ${storeUrl}` })
                  }}
                >
                  <Copy />
                  <span>Copy store link</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={async () => {
                  await logout()
                  router.replace(ROUTES.signIn)
                }}
              >
                <LogOut />
                <span>Sign out</span>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild>
                <Link href={ROUTES.signIn}>
                  <LogIn />
                  <span>Sign in</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
