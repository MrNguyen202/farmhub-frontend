"use client"

import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import { useState, useEffect } from "react" // Thêm useEffect để load data user
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Lock, ArrowLeft, Save, Eye, EyeOff, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "react-toastify"
import { useAuth } from "@/contexts/AuthContext" // Import useAuth để lấy user và logout
import { useRouter } from 'next/navigation' // Import để chuyển hướng sau logout

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { user, refreshUser } = useAuth() // Lấy user từ AuthContext
    const router = useRouter()
    const [loading, setLoading] = useState(false) // Thêm state loading cho form

    // State cho thông tin cá nhân (load từ user thực thay vì mock)
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        avatarUrl: "/placeholder.svg?height=100&width=100&text=AV", // Default avatar
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    // Load data user từ AuthContext khi component mount
    useEffect(() => {
        if (user) {
            setUserData({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                avatarUrl: user.avatar_url || "/placeholder.svg",
            })
        } else {
            router.push('/auth/login') // Chuyển hướng nếu chưa đăng nhập
        }
    }, [user, router])

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Gọi API để cập nhật profile (bạn cần tạo endpoint này, ví dụ: /api/auth/update-profile)
            const response = await fetch('/api/auth/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Gửi cookie auth-token
                body: JSON.stringify(userData),
            })
            if (response.ok) {
                toast.success("Cập nhật thành công! Thông tin cá nhân của bạn đã được cập nhật.")
                await refreshUser() // Refresh user từ AuthContext để cập nhật state
            } else {
                const data = await response.json()
                toast.error(data.error || "Đã có lỗi khi cập nhật profile.")
            }
        } catch (error) {
            console.error("Save profile error:", error)
            toast.error("Không thể kết nối đến server.")
        } finally {
            setLoading(false)
        }
    }

    const handleSavePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("Lỗi: Mật khẩu mới và xác nhận mật khẩu không khớp.", {
                className: "bg-red-100 text-red-700"
            })
            setLoading(false)
            return
        }
        if (passwordData.newPassword.length < 6) {
            toast.error("Lỗi: Mật khẩu mới phải có ít nhất 6 ký tự.", {
                className: "bg-red-100 text-red-700"
            })
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Gửi cookie auth-token
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            })

            const data = await response.json()
            if (response.ok) {
                toast.success("Cập nhật thành công! Mật khẩu của bạn đã được thay đổi.")
                setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" }) // Clear fields
                await refreshUser() // Refresh user từ AuthContext để cập nhật state
            } else {
                toast.error(data.error || "Đã có lỗi khi đổi mật khẩu.")
            }
        } catch (error) {
            console.error("Change password error:", error)
            toast.error("Không thể kết nối đến server.")
        } finally {
            setLoading(false)
        }
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUserData((prev) => ({ ...prev, avatarUrl: reader.result as string }))
                toast(
                    <>
                        <div className="font-semibold">Cập nhật ảnh đại diện</div>
                        <div>Ảnh đại diện của bạn đã được thay đổi.</div>
                    </>
                )
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Về trang chủ
                    </Link>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-3xl font-bold">Quản lý tài khoản</CardTitle> {/* Sửa tiêu đề từ "Quản lý" thành đúng */}
                        <CardDescription>Cập nhật thông tin cá nhân và thay đổi mật khẩu của bạn.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                                <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile" className="p-6 space-y-6">
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center gap-4 mb-6">
                                        <Avatar className="w-24 h-24 border-2 border-green-500">
                                            <AvatarImage src={userData.avatarUrl || "/placeholder.svg"} alt="Ảnh đại diện" />
                                            <AvatarFallback className="bg-green-100 text-green-600 text-3xl font-bold">
                                                {userData.fullName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Label htmlFor="avatar-upload" className="cursor-pointer">
                                            <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                                                <Camera className="w-4 h-4" />
                                                Thay đổi ảnh đại diện
                                            </Button>
                                            <Input
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                        </Label>
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Họ và tên</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                placeholder="Nguyễn Văn A"
                                                value={userData.fullName}
                                                onChange={handleProfileChange}
                                                className="pl-10"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="example@email.com"
                                                value={userData.email}
                                                onChange={handleProfileChange}
                                                className="pl-10"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="0912345678"
                                                value={userData.phone}
                                                onChange={handleProfileChange}
                                                className="pl-10"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Địa chỉ</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Textarea
                                                id="address"
                                                name="address"
                                                placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"
                                                value={userData.address}
                                                onChange={handleProfileChange}
                                                className="pl-10 min-h-[80px]"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={loading}>
                                        <Save className="w-4 h-4 mr-2" /> {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="password" className="p-6 space-y-6">
                                <form onSubmit={handleSavePassword} className="space-y-4">
                                    {/* Current Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="pl-10 pr-10"
                                                required
                                                disabled={loading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">Mật khẩu mới</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="pl-10 pr-10"
                                                required
                                                disabled={loading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={passwordData.confirmNewPassword}
                                                onChange={handlePasswordChange}
                                                className="pl-10 pr-10"
                                                required
                                                disabled={loading}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={loading}>
                                        <Save className="w-4 h-4 mr-2" /> {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}