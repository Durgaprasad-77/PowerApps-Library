// Middleware for authentication, authorization, and security
// Runs at the edge before every request

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_ROUTES = ['/admin'];

// Routes that require MFA (AAL2)
const MFA_REQUIRED_ROUTES = ['/admin'];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/login'];

// Public routes that don't need any auth check


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Create response object
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Create Supabase client with cookie handling
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value);
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // Refresh session (important for keeping sessions alive)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    // Check if route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isMfaRequiredRoute = MFA_REQUIRED_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && user) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Redirect unauthenticated users to login for protected routes
    if (isProtectedRoute && (!user || userError)) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // MFA enforcement for admin routes
    if (isMfaRequiredRoute && user) {
        // Get session to check AAL
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            // Check MFA factors
            const { data: factors } = await supabase.auth.mfa.listFactors();
            const hasTotpFactors = (factors?.totp?.length ?? 0) > 0;

            // Extract AAL from JWT claims
            let aal = 'aal1';
            try {
                const parts = session.access_token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    aal = payload.aal || 'aal1';
                }
            } catch {
                // Default to aal1 if parsing fails
            }

            // If user has MFA set up but hasn't verified this session
            if (hasTotpFactors && aal !== 'aal2') {
                // Redirect to MFA verification
                if (!pathname.startsWith('/auth/mfa')) {
                    return NextResponse.redirect(new URL('/auth/mfa/verify', request.url));
                }
            }

            // If admin route requires MFA but user hasn't set it up yet
            // (Optional: force MFA setup for admins)
            // Uncomment the following to enforce MFA setup:
            /*
            if (!hasTotpFactors && pathname.startsWith('/admin')) {
                // Check if user is admin
                const claims = extractClaimsFromSession(session);
                if (claims.user_role === 'admin' && !pathname.startsWith('/auth/mfa/setup')) {
                    return NextResponse.redirect(new URL('/auth/mfa/setup', request.url));
                }
            }
            */
        }
    }

    // Add security headers (backup, also in next.config.ts)
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Static assets (images, fonts, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
    ],
};
