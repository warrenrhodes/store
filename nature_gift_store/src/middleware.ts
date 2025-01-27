import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/(api|trpc)(.*)',
  '/shop',
  '/shop/(.*)',
  '/blogs',
  '/blogs/(.*)',
  '/order/success',
  '/cart',
  '/sitemap.xml',
  '/robots.txt',
  '/checkout',
  '/contact',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
  if (request.nextUrl.pathname.startsWith('/api/')) return NextResponse.next()
  return handleTracking(request)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

function handleTracking(request: NextRequest) {
  // Récupérer les paramètres UTM de l'URL
  const searchParams = request.nextUrl.searchParams
  const source = searchParams.get('utm_source') || 'direct'
  const campaign = searchParams.get('utm_campaign') || 'none'

  // Créer un cookie pour stocker l'ID de visite
  const response = NextResponse.next()

  if (!request.cookies.has('visit_id')) {
    response.cookies.set('visit_id', crypto.randomUUID(), {
      httpOnly: true,
      sameSite: 'strict',
    })
  }

  // Ajouter les informations de tracking dans les headers
  response.headers.set('x-tracking-source', source)
  response.headers.set('x-tracking-campaign', campaign)

  return response
}
