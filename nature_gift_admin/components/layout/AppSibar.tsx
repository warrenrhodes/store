'use client'

import * as React from 'react'
import {
  BaggageClaim,
  BookOpenTextIcon,
  CarTaxiFrontIcon,
  Gift,
  LayoutDashboard,
  LogOut,
  LucideImage,
  Shapes,
  ShoppingBag,
  Stars,
  Tag,
  UsersRound,
} from 'lucide-react'
import { SignedIn, SignOutButton, useUser } from '@clerk/nextjs'
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
import { NavUser } from './NavUser'
import Link from 'next/link'

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
    {
      url: '/medias',
      icon: LucideImage,
      title: 'Medias',
    },
    {
      url: '/orders',
      icon: ShoppingBag,
      title: 'Orders',
    },
    {
      url: '/customers',
      icon: UsersRound,
      title: 'Customers',
    },
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
  const { isSignedIn, user } = useUser()

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
        {isSignedIn && (
          <NavUser
            user={{
              name: user.fullName || user.emailAddresses[0].emailAddress,
              email: user.emailAddresses[0].emailAddress,
              avatar: user.imageUrl,
            }}
          />
        )}
        {isSignedIn && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <SignedIn>
                  <SignOutButton redirectUrl="/sign-in">
                    <span className="flex items-center gap-3 w-full cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </span>
                  </SignOutButton>
                </SignedIn>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
