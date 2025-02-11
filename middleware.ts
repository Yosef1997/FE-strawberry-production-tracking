import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  if (pathname === '/login') {
    if (session?.user) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (!session || !session?.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/pic') && session.user.role === 'PIC') {
    return NextResponse.redirect(new URL('/?error', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
