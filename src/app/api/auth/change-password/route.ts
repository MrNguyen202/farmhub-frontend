import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/database';
import { comparePassword, getUserFromRequest, simpleHash } from '@/lib/auth';
import { generateToken } from '@/lib/auth';

const findUserById = async (userId: number): Promise<any | null> => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            'SELECT id, email, password, full_name, phone, address, avatar_url, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
            [userId]
        );
        return (rows as any[]).length > 0 ? (rows as any[])[0] : null;
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw new Error('Database error');
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        // Kiểm tra đầu vào
        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới.' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' }, { status: 400 });
        }

        // Lấy thông tin người dùng từ token
        const userPayload = await getUserFromRequest(request);
        if (!userPayload) {
            return NextResponse.json({ error: 'Unauthorized - Token không hợp lệ.' }, { status: 401 });
        }

        // Tìm user trong cơ sở dữ liệu
        const user = await findUserById(userPayload.userId);
        if (!user) {
            return NextResponse.json({ error: 'Người dùng không tồn tại.' }, { status: 404 });
        }

        // Xác minh mật khẩu hiện tại
        const hashedCurrentPassword = await comparePassword(currentPassword, user.password);
        if (!hashedCurrentPassword) {
            return NextResponse.json({ error: 'Mật khẩu hiện tại không đúng.' }, { status: 400 });
        }
        // Hash mật khẩu mới
        const hashedNewPassword = await simpleHash(newPassword);

        // Cập nhật mật khẩu trong cơ sở dữ liệu
        const connection = await connectToDatabase();
        await connection.execute('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [
            hashedNewPassword,
            user.id,
        ]);

        // Lấy thông tin người dùng đã cập nhật
        const updatedUser = await findUserById(user.id);
        if (!updatedUser) {
            return NextResponse.json({ error: 'Người dùng không tồn tại.' }, { status: 404 });
        }

        // Tạo token mới
        const newToken = await generateToken(user);
        const response = NextResponse.json({ message: 'Đổi mật khẩu thành công.', user: updatedUser }, { status: 200 });
        response.cookies.set('auth-token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 ngày
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ error: 'Đã có lỗi xảy ra, vui lòng thử lại sau.' }, { status: 500 });
    }
}