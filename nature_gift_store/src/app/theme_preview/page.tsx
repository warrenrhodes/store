import { ThemePreview } from '@/components/ThemePreview'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Theme preview', robots: { index: false } }

/** The admin's theme preview (components/ThemePreview); served as is by the proxy. */
export default function ThemePreviewPage() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL
  return adminUrl ? <ThemePreview adminOrigin={new URL(adminUrl).origin} /> : null
}
