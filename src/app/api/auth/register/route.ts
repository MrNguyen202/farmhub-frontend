import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/config/database' // Adjust path as needed
import { ResultSetHeader, RowDataPacket } from 'mysql2'

// Interface for user data
interface User extends RowDataPacket {
    id: number
    fullName: string
    email: string
    phone: string
    password: string
    address: string
    avatar_url: string | null
    createdAt: Date
    updatedAt: Date
}

interface UserData {
    fullName: string;
    email: string;
    phone: string;
    hashedPassword: string;
    address: string;
    avatar_url?: string | null;
}

// Simple validation function
const validateRegistrationData = (data: UserData & { password: string; confirmPassword: string; agreeTerms: boolean }) => {
    const errors: string[] = []

    if (!data.fullName || data.fullName.trim().length === 0) {
        errors.push('Vui lòng nhập họ tên')
    }

    if (!data.email || data.email.trim().length === 0) {
        errors.push('Vui lòng nhập email')
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.push('Email không hợp lệ')
    }

    if (!data.phone || data.phone.trim().length === 0) {
        errors.push('Vui lòng nhập số điện thoại')
    } else if (!/^[0-9]{10,11}$/.test(data.phone)) {
        errors.push('Số điện thoại không hợp lệ')
    }

    if (!data.password) {
        errors.push('Vui lòng nhập mật khẩu')
    } else if (data.password.length < 6) {
        errors.push('Mật khẩu phải có ít nhất 6 ký tự')
    }

    if (data.password !== data.confirmPassword) {
        errors.push('Mật khẩu xác nhận không khớp')
    }

    if (!data.agreeTerms) {
        errors.push('Vui lòng đồng ý với điều khoản sử dụng')
    }

    return errors
}

// Simple hash function (for demo - use bcrypt in production)
const simpleHash = async (password: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password + 'your-secret-salt')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Database functions
const findUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const connection = await connectToDatabase()
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        )
        return (rows as User[]).length > 0 ? (rows as User[])[0] : null
    } catch (error) {
        console.error('Error finding user by email:', error)
        throw new Error('Database error')
    }
}

const findUserByPhone = async (phone: string): Promise<User | null> => {
    try {
        const connection = await connectToDatabase()
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE phone = ? LIMIT 1',
            [phone]
        )
        return (rows as User[]).length > 0 ? (rows as User[])[0] : null
    } catch (error) {
        console.error('Error finding user by phone:', error)
        throw new Error('Database error')
    }
}

const createUser = async (userData: UserData): Promise<{
    id: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    avatar_url: string | null;
    createdAt: Date;
}> => {
    try {
        const connection = await connectToDatabase();

        const [result] = await connection.execute(
            `INSERT INTO users (full_name, email, phone, password, address, avatar_url, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [
                userData.fullName,
                userData.email,
                userData.phone,
                userData.hashedPassword,
                userData.address,
                userData.avatar_url || null,
            ]
        ) as [ResultSetHeader];

        return {
            id: result.insertId,
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            avatar_url: userData.avatar_url || null,
            createdAt: new Date(),
        };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Database error');
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input data
        const validationErrors = validateRegistrationData(body)
        if (validationErrors.length > 0) {
            return NextResponse.json(
                { error: validationErrors[0] },
                { status: 400 }
            )
        }

        const { fullName, email, phone, password, address } = body

        // Check if user already exists with this email
        const existingUserByEmail = await findUserByEmail(email)
        if (existingUserByEmail) {
            return NextResponse.json(
                { error: 'Email này đã được sử dụng' },
                { status: 400 }
            )
        }

        // Check if user already exists with this phone
        const existingUserByPhone = await findUserByPhone(phone)
        if (existingUserByPhone) {
            return NextResponse.json(
                { error: 'Số điện thoại này đã được sử dụng' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await simpleHash(password)

        // Create new user
        const newUser = await createUser({
            fullName,
            email,
            phone,
            hashedPassword,
            address: address || '',
            avatar_url: null, // Default null for avatar
        })

        return NextResponse.json(
            {
                message: 'Đăng ký thành công',
                user: {
                    id: newUser.id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    phone: newUser.phone,
                    address: newUser.address,
                    avatar_url: newUser.avatar_url,
                    createdAt: newUser.createdAt,
                }
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('Registration error:', error)

        return NextResponse.json(
            { error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' },
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