import { jwtVerify, SignJWT } from 'jose'
import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt';

export interface UserPayload {
    userId: number
    email: string
    fullName: string
}

export const verifyToken = async (token: string): Promise<UserPayload | null> => {
    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || 'your-jwt-secret-key'
        )

        const { payload } = await jwtVerify(token, secret)

        const { userId, email, fullName } = payload as Record<string, unknown>
        if (
            typeof userId === 'number' &&
            typeof email === 'string' &&
            typeof fullName === 'string'
        ) {
            return { userId, email, fullName }
        }
        return null
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
}

export const getUserFromRequest = async (request: NextRequest): Promise<UserPayload | null> => {
    try {
        let token = request.cookies.get('auth-token')?.value

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

export const simpleHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (user: { id: number; email: string }): Promise<string> => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-jwt-secret-key');
    return await new SignJWT({ userId: user.id, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);
};