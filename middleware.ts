import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('Middleware function invoked');
    const userId = request.cookies.get('userId');
    console.log('User ID:', userId);

    if (!userId) {
        return NextResponse.redirect(new URL('/dashboard/Login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/dashboard'],
};