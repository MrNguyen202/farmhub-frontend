import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/config/database'
import { RowDataPacket } from 'mysql2'
import { comparePassword, generateToken } from '@/lib/auth'

// Interface for user data
interface User extends RowDataPacket {
    id: number
    full_name: string
    email: string
    phone: string
    password: string
    address: string
    avatar_url: string | null
    created_at: Date
    updated_at: Date
}

// Simple validation function
const validateLoginData = (data: { email: string; password: string }) => {
    const errors: string[] = []

    if (!data.email || data.email.trim().length === 0) {
        errors.push('Vui lòng nhập email')
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.push('Email không hợp lệ')
    }

    if (!data.password || data.password.trim().length === 0) {
        errors.push('Vui lòng nhập mật khẩu')
    }

    return errors
}

// Database function to find user by email
const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const connection = await connectToDatabase()
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        )
        return rows.length > 0 ? rows[0] : null
    } catch (error) {
        console.error('Error finding user by email:', error)
        throw new Error('Database error')
    }
}

// Update last login time
const updateLastLogin = async (userId: number) => {
    try {
        const connection = await connectToDatabase()
        await connection.execute(
            'UPDATE users SET updated_at = NOW() WHERE id = ?',
            [userId]
        )
    } catch (error) {
        console.error('Error updating last login:', error)
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input data
        const validationErrors = validateLoginData(body)
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { error: validationErrors[0] },
                { status: 400 }
            )
        }

        const { email, password, rememberMe } = body

        console.log("Login request body:", body)

        // Find user by email
        const user = await findUserByEmail(email)
        if (!user) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            )
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            )
        }

        // Update last login time
        await updateLastLogin(user.id)

        // Generate JWT token
        const token = await generateToken(user)

        // Prepare user data (without password)
        const userData = {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            avatar_url: user.avatar_url,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        // Create response with token
        const response = NextResponse.json(
            {
                message: 'Đăng nhập thành công',
                user: userData,
                token
            },
            { status: 200 }
        )

        // Set HTTP-only cookie with token
        const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60 // 7 days or 1 day
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge,
            path: '/'
        })

        return response

    } catch (error) {
        console.error('Login error:', error)

        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' },
            { status: 500 }
        )
    }
}

// Handle logout
export async function DELETE() {
    try {
        const response = NextResponse.json(
            { message: 'Đăng xuất thành công' },
            { status: 200 }
        )

        // Clear the auth cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/'
        })

        return response
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra' },
            { status: 500 }
        )
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}