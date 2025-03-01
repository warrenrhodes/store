'use client'

import * as React from 'react'
import {
  BaggageClaim,
  BookOpenTextIcon,
  CarTaxiFrontIcon,
  Gift,
  LayoutDashboard,
  LogIn,
  LogOut,
  Shapes,
  ShoppingBag,
  Stars,
  Tag,
} from 'lucide-react'
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
      isActive: true,
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
      url: '/orders',
      icon: ShoppingBag,
      title: 'Orders',
    },
    // {
    //   url: '/customers',
    //   icon: UsersRound,
    //   title: 'Customers',
    // },
    {
      url: '/blogs',
      icon: BookOpenTextIcon,
      title: 'Blogs',
    },
    {
      url: '/reviews',
      icon: Stars,
      title: 'Reviews',
    },
    {
      url: '/shipments',
      icon: CarTaxiFrontIcon,
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
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BaggageClaim className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{"Nature's Gift"}</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
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
        {user && (
          <div
            onClick={async () => {
              await logout()
              router.replace(ROUTES.signIn)
            }}
            className="flex items-center gap-3 w-full justify-start p-0 bg-transparent pl-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </div>
        )}
        {!user && (
          <Link
            href={ROUTES.signIn}
            className="flex items-center gap-3 w-full justify-start p-0 bg-transparent pl-2 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
