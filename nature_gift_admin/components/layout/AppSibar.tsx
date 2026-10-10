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
} from 'lucide-react'
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
    // {
    //   url: '/customers',
    //   icon: UsersRound,
    //   title: 'Customers',
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" aria-label="N.Gift Admin">
                <Image
                  src="/logo-wordmark.png"
                  alt="N.Gift"
                  width={258}
                  height={79}
                  priority
                  className="h-7 w-auto"
                />
                <span className="rounded-md bg-sidebar-accent px-1.5 py-0.5 text-xs font-medium text-sidebar-accent-foreground">
                  Admin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
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
          {process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                  <span>View store</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
