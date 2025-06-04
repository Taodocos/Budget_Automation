import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    // Simulate authentication logic
    const isAuthenticated = username === 'validUser' && password === 'validPassword'; // Replace with real logic

    if (isAuthenticated) {
        const response = NextResponse.redirect('/dashboard');
        response.cookies.set('userId', 'someUserId', { path: '/' }); // Set your user ID here
        return response;
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}