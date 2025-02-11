import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Allow access to login page without authentication
  if (pathname === '/login') {
    // If user is already logged in and tries to access login page,
    // redirect them to home page
    if (session?.user) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!session || !session?.user) {
    // Store the original URL they were trying to visit
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based access control
  if (pathname.startsWith('/pic') && session.user.role === 'PIC') {
    return NextResponse.redirect(
      new URL('/?error=unauthorized_role', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except public assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
