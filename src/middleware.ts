import { jwtVerify } from 'jose'

export interface UserPayload {
    userId: number
    email: string
    fullName: string
}

// Verify JWT token
export const verifyToken = async (token: string): Promise<UserPayload | null> => {
    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'your-jwt-secret-key'
        )

        const { payload } = await jwtVerify(token, secret)

        // Validate payload structure
        if (
            typeof payload.userId === 'number' &&
            typeof payload.email === 'string' &&
            typeof payload.fullName === 'string'
        ) {
            return {
                userId: payload.userId,
                email: payload.email,
                fullName: payload.fullName
            }
        }

        return null
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
}

// Get user from request (cookie or header)
export const getUserFromRequest = async (request: NextRequest): Promise<UserPayload | null> => {
    try {
        // Try to get token from cookie first
        let token = request.cookies.get('auth-token')?.value

        // If no cookie, try Authorization header
        if (!token) {
            const authHeader = request.headers.get('authorization')
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.substring(7)
            }
        }

        if (!token) {
            return null
        }

        return await verifyToken(token)
    } catch (error) {
        console.error('Error getting user from request:', error)
        return null
    }
}

// middleware.ts - Next.js middleware for route protection
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/orders']
    const authRoutes = ['/auth/login', '/auth/register']

    const { pathname } = request.nextUrl

    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Check if current route is auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    // If accessing protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
    }

    // If accessing auth routes with valid token, redirect to dashboard
    if (isAuthRoute && token) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/orders/:path*',
        '/account/:path*'
    ]
}