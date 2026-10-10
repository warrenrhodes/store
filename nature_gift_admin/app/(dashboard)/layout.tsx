import type { Metadata } from 'next'
import '../globals.css'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb'
import { Separator } from '@radix-ui/react-separator'
import { AppSidebar } from '@/components/layout/AppSibar'
import { Toaster } from '@/components/ui/toaster'
import { Fredoka } from 'next/font/google'
import React from 'react'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: { default: 'N.Gift Admin', template: '%s · N.Gift Admin' },
  description: "Admin dashboard to manage N.Gift's data",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} antialiased font-sans`}>
        <NewSideBar>{children}</NewSideBar>
        <Toaster />
      </body>
    </html>
  )
}

const NewSideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <PageBreadcrumb />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
