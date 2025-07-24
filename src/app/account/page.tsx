"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Lock, ArrowLeft, Save, Eye, EyeOff, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "react-toastify"


export default function AccountPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Mock user data (replace with actual data fetched from backend)
    const [userData, setUserData] = useState({
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0912345678",
        address: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
        avatarUrl: "/placeholder.svg?height=100&width=100&text=AV", // Default avatar
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    })

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSaveProfile = (e: React.FormEvent) => {
        toast.success("Cập nhật thành công! Thông tin cá nhân của bạn đã được cập nhật.")
        e.preventDefault()
        // Simulate API call
        console.log("Saving profile:", userData)
    }

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("Lỗi: Mật khẩu mới và xác nhận mật khẩu không khớp.", {
                className: "bg-red-100 text-red-700"
            })
            return
        }
        if (passwordData.newPassword.length < 6) {
            toast.error("Lỗi: Mật khẩu mới phải có ít nhất 6 ký tự.", {
                className: "bg-red-100 text-red-700"
            })
            return
        }
        // Simulate API call
        console.log("Changing password:", passwordData)
        toast("Cập nhật thành công! Mật khẩu của bạn đã được thay đổi.")
        setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" }) // Clear fields
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
                        <CardTitle className="text-3xl font-bold">Quản lý tài khoản</CardTitle>
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
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email (usually read-only or requires verification) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={userData.email}
                                                className="pl-10 bg-gray-100 cursor-not-allowed"
                                                readOnly // Email is often read-only or requires special flow to change
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
                                                placeholder="0123456789"
                                                value={userData.phone}
                                                onChange={handleProfileChange}
                                                className="pl-10"
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
                                                placeholder="Nhập địa chỉ của bạn"
                                                value={userData.address}
                                                onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
                                                className="pl-10 min-h-[80px]"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                                        <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
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

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                                        <Save className="w-4 h-4 mr-2" /> Đổi mật khẩu
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
