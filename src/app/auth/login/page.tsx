"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Facebook, Chrome } from "lucide-react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Login data:", formData)
        setIsLoading(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding */}
                <div className="hidden lg:block">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">VT</span>
                            </div>
                            <div>
                                <div className="font-bold text-3xl text-green-600">Vật Tư</div>
                                <div className="text-lg text-gray-600">Nông Nghiệp</div>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Chào mừng trở lại!</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Đăng nhập để tiếp tục mua sắm vật tư nông nghiệp chất lượng cao
                        </p>
                    </div>

                    <div className="relative">
                        <Image
                            src="/placeholder.svg?height=400&width=500"
                            alt="Nông nghiệp hiện đại"
                            width={500}
                            height={400}
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl" />
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Về trang chủ
                        </Link>
                    </div>

                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
                            <CardDescription>Nhập thông tin để truy cập tài khoản của bạn</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={formData.rememberMe}
                                            onCheckedChange={(checked) =>
                                                setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                                            }
                                        />
                                        <Label htmlFor="remember" className="text-sm">
                                            Ghi nhớ đăng nhập
                                        </Label>
                                    </div>
                                    <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isLoading}>
                                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập với</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full bg-transparent">
                                    <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                                    Facebook
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent">
                                    <Chrome className="w-4 h-4 mr-2" />
                                    Google
                                </Button>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/auth/register" className="text-green-600 hover:text-green-700 font-medium">
                                        Đăng ký ngay
                                    </Link>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
