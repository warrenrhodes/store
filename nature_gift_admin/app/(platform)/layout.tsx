// The platform console (/platform/…): the super admin's area, with its own sidebar and header,
// apart from the store dashboards (app/(dashboard)). Each page checks the platform admin too.
import type { Metadata } from 'next'
import '../globals.css'

import { AppSidebar } from '@/components/layout/AppSibar'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { isPlatformAdmin } from '@/lib/actions/platform.actions'
import { Separator } from '@radix-ui/react-separator'
import { Fredoka } from 'next/font/google'
import Link from 'next/link'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: { default: 'Platform console', template: '%s · N.Gift Platform' },
}

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const platformAdmin = await isPlatformAdmin()
  return (
    <html lang="en">
      <body className={`${fredoka.variable} antialiased font-sans`}>
        {platformAdmin ? (
          <SidebarProvider>
            <div className="contents print:hidden">
              <AppSidebar
                area="platform"
                stores={[]}
                isOwner={false}
                platformAdmin
              />
            </div>
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-amber-500/40 bg-amber-50/95 px-4 backdrop-blur print:hidden">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <PageBreadcrumb root={{ label: 'Platform console', href: '/platform' }} />
                <span className="ml-auto rounded-md bg-amber-500 px-2 py-0.5 text-xs font-medium text-amber-950">
                  Super admin
                </span>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        ) : (
          <main className="mx-auto max-w-md space-y-2 p-10 text-center">
            <p className="text-muted-foreground">Reserved to the platform administrator.</p>
            <Link className="text-sm underline" href="/">
              Back to my dashboard
            </Link>
          </main>
        )}
        <Toaster />
      </body>
    </html>
  )
}
