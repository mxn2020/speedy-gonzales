import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const locale = req.nextUrl.locale || 'en';
  const { pathname } = req.nextUrl;

  console.log(`[Middleware] Executing for path: ${pathname}`);

  // Create a response object that we'll manipulate and return
  let response = NextResponse.next();

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
        setAll: (updatedCookies) => updatedCookies.forEach(cookie => {
          cookies().set(cookie.name, cookie.value, cookie.options);
        }),
      },
    }
  );

  try {
    console.log('[Middleware] Attempting to get user');
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('[Middleware] Error getting user:', userError);
    }
    
    console.log(`[Middleware] User status: ${user ? 'Authenticated' : 'Unauthenticated'}`);

    const protectedRoutes = [
      { path: '/dashboard', roles: ['user', 'admin'] },
      { path: '/admin', roles: ['admin'] },
      { path: '/profile', roles: ['user', 'admin'] },
    ];

    const isProtectedRoute = protectedRoutes.find(route => 
      pathname.startsWith(`/${locale}${route.path}`)
    );

    console.log(`[Middleware] Is protected route: ${!!isProtectedRoute}`);

    if (isProtectedRoute && !user) {
      console.log('[Middleware] Redirecting unauthenticated user to login');
      const redirectUrl = new URL(`/${locale}/auth/login`, req.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (pathname.includes('/auth/login') && user) {
      console.log('[Middleware] Redirecting authenticated user to dashboard');
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    console.log('[Middleware] Applying intl middleware');
    // Apply the internationalization middleware
    response = intlMiddleware(req);
    response.headers.set('Cache-Control', 'no-store, max-age=0');

    console.log('[Middleware] Finished processing');
    return response;

  } catch (e) {
    console.error('[Middleware] Error in middleware:', e);
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};