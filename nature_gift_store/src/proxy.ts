import { NextRequest, NextResponse } from 'next/server'

import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge'
import { clientConfig, serverConfig } from '../config'

const UN_AUTH_PUBLIC_PATHS = ['/reset-password', '/sign-in', '/sign-up']
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
  '/cart',
  '/sitemap.xml',
  '/robots.txt',
  '/checkout',
  '/contact',
  '/not-found',
  '/reset-password',
  '/sign-in',
  '/sign-up',
]

export default async function proxy(request: NextRequest) {
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
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (!decodedToken.email_verified) {
        return redirectToLogin(request, {
          path: '/sign-in',
          publicPaths: PUBLIC_PATHS,
        })
      }
      if (UN_AUTH_PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },
    handleInvalidToken: async reason => {
      console.info('Missing or malformed credentials', { reason })

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      })
    },
    handleError: async error => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/sign-in',
        publicPaths: PUBLIC_PATHS,
      })
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
