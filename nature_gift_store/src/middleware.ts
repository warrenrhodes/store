import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/(api|trpc)(.*)',
    '/shop',
    '/shop/(.*)',
    '/blogs',
    '/blogs/(.*)',
    '/cart',
    '/checkout',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
