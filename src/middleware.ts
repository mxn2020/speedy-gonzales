import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

type Role = 'user' | 'admin' | 'super_admin';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const locale = req.nextUrl.locale || 'en';
  const { pathname } = req.nextUrl;

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
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('[Middleware] Error getting user:', userError);
    }
    
    // Fetch user roles if user exists
    let userRoles: Role[] = [];
    if (user) {
      const { data: roles, error: rolesError } = await supabase
        .rpc('get_user_roles', { user_id: user.id });
    
      if (rolesError) {
        console.error('[Middleware] Error fetching user roles:', rolesError);
      } else {
        if (roles && Array.isArray(roles)) {
          userRoles = roles
            .filter((r): r is { role: Role } => 
              typeof r === 'object' && r !== null && 'role' in r && 
              (r.role === 'user' || r.role === 'admin' || r.role === 'super_admin')
            )
            .map(r => r.role);
        } else {
          console.error('[Middleware] Unexpected roles data structure:', roles);
        }
      }
    }


    
    const protectedRoutes: Array<{ path: string; roles: Role[] }> = [
      { path: '/dashboard', roles: ['user', 'admin', 'super_admin'] },
      { path: '/admin', roles: ['admin', 'super_admin'] },
      { path: '/profile', roles: ['user', 'admin', 'super_admin'] },
      { path: '/super-admin', roles: ['super_admin'] },
    ];

    const matchedRoute = protectedRoutes.find(route => 
      pathname.startsWith(`/${locale}${route.path}`)
    );

    if (matchedRoute) {
      if (!user) {
        const redirectUrl = new URL(`/${locale}/auth/login`, req.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
      }

      const hasRequiredRole = matchedRoute.roles.some(role => userRoles.includes(role));
      if (!hasRequiredRole) {
        return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
      }
    }

    if (pathname.includes('/auth/login') && user) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    // Apply the internationalization middleware
    response = intlMiddleware(req);
    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response;

  } catch (e) {
    console.error('[Middleware] Error in middleware:', e);
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};