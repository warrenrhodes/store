import type { Metadata } from 'next'
import '../globals.css'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb'
import { Separator } from '@radix-ui/react-separator'
import { AppSidebar } from '@/components/layout/AppSibar'
import { Toaster } from '@/components/ui/toaster'
import { Fredoka } from 'next/font/google'
import React from 'react'
import { isPlatformAdmin } from '@/lib/actions/platform.actions'
import { StoreRole, StoreStatus } from '@/lib/firebase/models'
import { getMyStores, getStoreContext } from '@/lib/tenant'
import { StorefrontProvider } from '@/components/layout/Storefront'
import { PLATFORM_URL, storefrontUrl } from '@/lib/storefront'

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

const NewSideBar = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [ctx, stores, platformAdmin] = await Promise.all([
    getStoreContext(),
    getMyStores(),
    isPlatformAdmin(),
  ])
  const storefront = {
    url: ctx ? storefrontUrl(ctx.store) : PLATFORM_URL,
    name: ctx?.store.name ?? 'N.Gift',
  }
  return (
    <StorefrontProvider value={storefront}>
      <SidebarProvider>
        <div className="contents print:hidden">
          <AppSidebar
            area="store"
            storeUrl={ctx ? storefront.url : undefined}
            stores={stores.map(s => ({ id: s.id, name: s.store.name }))}
            currentStoreId={ctx?.storeId}
            isOwner={ctx?.role === StoreRole.OWNER}
            platformAdmin={platformAdmin}
          />
        </div>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex print:hidden h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <PageBreadcrumb />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 print:p-0">
            <StoreBanner
              status={ctx?.store.status}
              hasStore={!!ctx}
              platformAdmin={platformAdmin}
            />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </StorefrontProvider>
  )
}

/** Pending payment, suspension, or no store yet: the reason the storefront isn't live. */
function StoreBanner(props: { status?: StoreStatus; hasStore: boolean; platformAdmin: boolean }) {
  const contact = process.env.PLATFORM_CONTACT_WHATSAPP
  const howToPay = contact ? (
    <>
      {' '}
      Contact the platform on{' '}
      <a className="underline" href={`https://wa.me/${contact}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
      .
    </>
  ) : null
  const message = !props.hasStore ? (
    props.platformAdmin ? (
      <>
        No store selected. Stores are managed in the{' '}
        <a className="underline" href="/platform">
          platform console
        </a>
        .
      </>
    ) : (
      <>
        You don&apos;t have a store yet.{' '}
        <a className="underline" href="/onboarding">
          Create your store
        </a>
        .
      </>
    )
  ) : props.status === StoreStatus.PENDING ? (
    <>
      Your store is waiting for its subscription payment (cash). You can prepare your catalogue now;
      the storefront opens once the payment is confirmed.{howToPay}
    </>
  ) : props.status === StoreStatus.SUSPENDED ? (
    <>Your store is suspended: the storefront is closed.{howToPay}</>
  ) : null
  if (!message) return null
  return (
    <div
      role="status"
      className="rounded-md border border-amber-500/50 bg-amber-50 p-3 text-sm text-amber-900 print:hidden"
    >
      {message}
    </div>
  )
}
