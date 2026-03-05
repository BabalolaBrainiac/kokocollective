import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
    // Only protect /admin routes, but allow access to the main /admin page 
    // because that's where the login form lives. We'll handle the redirect
    // logic inside the Server Component or Server Actions where needed.
    // Wait, actually, if they are logged in, we show dashboard, if not, login.
    // So /admin itself doesn't need to be blocked by middleware, but ANY sub-routes
    // like /admin/events or API routes under /api/admin/* should be.

    if (request.nextUrl.pathname.startsWith('/admin/') && request.nextUrl.pathname !== '/admin') {
        const session = await getSession();
        if (!session) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
