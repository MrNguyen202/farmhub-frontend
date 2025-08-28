import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { connectToDatabase } from '@/config/database'
import { RowDataPacket } from 'mysql2'

// Interface for user data
interface User extends RowDataPacket {
    id: number
    full_name: string
    email: string
    phone: string
    address: string
    avatar_url: string | null
    created_at: Date
    updated_at: Date
}

// Get current user data from database
const getCurrentUser = async (userId: number): Promise<User | null> => {
    try {
        const connection = await connectToDatabase()
        const [rows] = await connection.execute(
            'SELECT id, full_name, email, phone, address, avatar_url, created_at FROM users WHERE id = ? LIMIT 1',
            [userId]
        ) as [User[]]
        return rows.length > 0 ? rows[0] : null
    } catch (error) {
        console.error('Error getting current user:', error)
        throw new Error('Database error')
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get user from token
        const userPayload = await getUserFromRequest(request)

        if (!userPayload) {
            return NextResponse.json(
                { error: 'Unauthorized - Token không hợp lệ' },
                { status: 401 }
            )
        }

        // Get fresh user data from database
        const user = await getCurrentUser(userPayload.userId)

        if (!user) {
            return NextResponse.json(
                { error: 'User không tồn tại' },
                { status: 404 }
            )
        }

        // Return user data
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

        return NextResponse.json({
            user: userData
        })

    } catch (error) {
        console.error('Get current user error:', error)

        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' },
            { status: 500 }
        )
    }
}

// Handle other HTTP methods
export async function POST() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}

export async function PUT() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}

export async function DELETE() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}