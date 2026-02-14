import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname

  // ✅ Allow public routes (NO auth needed)
  if (
    pathname === '/' ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  try {

    // ✅ Only protect admin routes
    if (pathname.startsWith('/admin')) {
      return await updateSession(request)
    }

    return NextResponse.next()

  } catch (error) {

    console.error("Middleware error:", error)

    // ✅ Fail-safe fallback
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/admin/:path*'
  ],
}
