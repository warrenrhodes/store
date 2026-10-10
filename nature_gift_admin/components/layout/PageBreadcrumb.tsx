'use client'

import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Breadcrumb derived from the URL: /products/abc123 → Dashboard / Products / Edit. */
export function PageBreadcrumb() {
  const segments = usePathname().split('/').filter(Boolean)
  const crumbs = segments.map((segment, i) => ({
    href: '/' + segments.slice(0, i + 1).join('/'),
    label: i === 0 ? capitalize(segment) : segment === 'new' ? 'New' : 'Edit',
  }))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {crumbs.length ? (
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {i === crumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
