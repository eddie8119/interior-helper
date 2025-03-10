import { NextResponse } from 'next/server'
import { auth } from './auth'
import { authRoutes, publicRoutes } from './routes'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isPublic = publicRoutes.some((route) => {
    // 如果路由包含正則表達式字符，直接使用它作為模式
    if (route.includes('\\')) {
      const regex = new RegExp(`^${route}$`)
      return regex.test(nextUrl.pathname)
    }
    return route === nextUrl.pathname
  })

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isPublic) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/members', nextUrl))
    }
    return NextResponse.next()
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
