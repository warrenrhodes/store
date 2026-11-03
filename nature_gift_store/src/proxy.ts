import { NextRequest, NextResponse } from 'next/server'

import { authMiddleware } from 'next-firebase-auth-edge'
import { parseSitePath, siteHref } from '@ngift/core/site'
import { PREVIEW_HEADER } from '@ngift/core/theme-preview'
import { clientConfig, serverConfig } from '../config'

const UN_AUTH_PUBLIC_PATHS = ['/reset-password', '/sign-in', '/sign-up']
// Paths inside a site: the same for the marketplace and for /boutique/<slug>/...
const PUBLIC_PATHS = [
  '/',
  '/shop',
  new RegExp('^/shop/.*$'),
  new RegExp('^/(api|trpc)/.*$'),
  '/blogs',
  '/blogs-ads',
  new RegExp('^/blogs/.*$'),
  new RegExp('^/blogs-ads/.*$'),
  '/order/success',
  // Customer order tracking: protected by the secret token in its link, no account needed.
  new RegExp('^/order/[^/]+$'),
  '/cart',
  '/favoris',
  '/sitemap.xml',
  '/robots.txt',
  '/checkout',
  '/contact',
  '/not-found',
  '/reset-password',
  '/sign-in',
  '/sign-up',
]
// Next runs the proxy again on the path it rewrote to (/_market/…, /<slug>/…): that second pass
// is recognised by this header, which only the first pass can set (unguessable per server).
const REWRITTEN = 'x-site-rewritten'
const MARK = crypto.randomUUID()

const isPublic = (path: string) =>
  PUBLIC_PATHS.some(p => (typeof p === 'string' ? p === path : p.test(path)))

/**
 * Path routing (docs/MULTI_TENANT_PLAN.md, 3.2), without reading the database:
 * /boutique/<slug>/rest is served by app/[site] with site = <slug>, any other page with
 * site = _market. API routes are not rewritten: the client sends its site, the server checks it.
 */
export default async function proxy(request: NextRequest) {
  if (request.headers.get(REWRITTEN) === MARK) return NextResponse.next()
  const { pathname } = request.nextUrl
  const isApi = /^\/(api|trpc)(\/|$)/.test(pathname)
  const { site, path } = parseSitePath(pathname)
  const serve = (headers?: Headers) => {
    if (isApi) return NextResponse.next(headers && { request: { headers } })
    const url = request.nextUrl.clone()
    url.pathname = `/${site}${path === '/' ? '' : path}`
    const forwarded = new Headers(headers ?? request.headers)
    forwarded.set(REWRITTEN, MARK)
    // ?preview=<token> reaches the layout (which has no search params); checked there.
    const preview = request.nextUrl.searchParams.get('preview')
    if (preview) forwarded.set(PREVIEW_HEADER, preview)
    else forwarded.delete(PREVIEW_HEADER)
    return NextResponse.rewrite(url, { request: { headers: forwarded } })
  }
  const toSignIn = () => {
    if (isApi || isPublic(path)) return serve()
    const url = request.nextUrl.clone()
    url.pathname = siteHref(site, '/sign-in')
    url.search = `redirect=${encodeURIComponent(path + request.nextUrl.search)}`
    return NextResponse.redirect(url)
  }

  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    refreshTokenPath: '/api/refresh-token',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 12 * 60 * 60 * 24,
    },
    serviceAccount: serverConfig.serviceAccount,
    enableMultipleCookies: true,
    enableCustomToken: false,
    debug: true,
    checkRevoked: true,
    authorizationHeaderName: 'Authorization',
    handleValidToken: async ({ decodedToken }, headers) => {
      if (!decodedToken.email_verified) return toSignIn()
      if (UN_AUTH_PUBLIC_PATHS.includes(path)) {
        return NextResponse.redirect(new URL(siteHref(site, '/'), request.url))
      }
      return serve(headers)
    },
    handleInvalidToken: async reason => {
      console.info('Missing or malformed credentials', { reason })
      return toSignIn()
    },
    handleError: async error => {
      console.error('Unhandled authentication error', { error })
      return toSignIn()
    },
  })
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/api/refresh-token',
  ],
}
