'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
    id: number
    fullName: string
    email: string
    phone: string
    address: string
    avatar_url: string | null
    created_at: Date
    updated_at: Date
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            setLoading(true); // Đặt trạng thái loading
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include', // Gửi cookie
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Cập nhật user
            } else {
                setUser(null); // Xóa user nếu không đăng nhập
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    const login = async (email: string, password: string, rememberMe = false) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user); // Cập nhật trạng thái user
                await checkAuth(); // Gọi lại checkAuth để đảm bảo dữ liệu mới nhất
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Không thể kết nối đến server' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/login', {
                method: 'DELETE',
                credentials: 'include',
            })
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setUser(null)
            // Redirect to home or login page
            window.location.href = '/'
        }
    }

    const refreshUser = async () => {
        await checkAuth()
    }

    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        refreshUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// HOC for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return function AuthenticatedComponent(props: P) {
        const { user, loading } = useAuth()

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Đang tải...</p>
                    </div>
                </div>
            )
        }

        if (!user) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Bạn cần đăng nhập để truy cập trang này
                        </h2>
                        <a
                            href="/auth/login"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Đăng nhập
                        </a>
                    </div>
                </div>
            )
        }

        return <Component {...props} />
    }
}