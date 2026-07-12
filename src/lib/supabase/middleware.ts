import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/forgot-password') || url.pathname.startsWith('/reset-password')
  const isDashboardPage = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/settings') || url.pathname.startsWith('/favorites') || url.pathname.startsWith('/collections')
  const isAdminPage = url.pathname.startsWith('/admin')

  // Auth Guard
  if (!user && isDashboardPage) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuthPage) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Admin Guard (basic implementation, assumes role is available in user metadata or JWT)
  if (user && isAdminPage) {
    // Note: Best practice is to check role from database, but for middleware 
    // relying on JWT app_metadata is standard.
    const role = user.app_metadata?.role || user.user_metadata?.role;
    if (role !== 'admin') {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  } else if (!user && isAdminPage) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
