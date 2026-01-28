// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge'
import { clientConfig, serverConfig } from './config'

const PUBLIC_PATHS = ['/sign-in', '/sign-up']

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
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
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

// Configure middleware to match all routes except public ones
export const config = {
  matcher: [
    '/api/refresh-token',
    '/api/login',
    '/api/logout',
    '/((?!_next|favicon.ico|api|.*\\.).*)',
  ],
}
