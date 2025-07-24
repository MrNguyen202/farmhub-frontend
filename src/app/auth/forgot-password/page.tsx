"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Reset password for:", email)
        setIsLoading(false)
        setIsSuccess(true)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto">
                    <Card className="shadow-xl border-0 text-center">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Email đã được gửi!</h2>
                            <p className="text-gray-600 mb-6">
                                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email <strong>{email}</strong>. Vui lòng kiểm tra hộp
                                thư và làm theo hướng dẫn.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                                    <Link href="/auth/login">Quay lại đăng nhập</Link>
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsSuccess(false)}>
                                    Gửi lại email
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quên mật khẩu?</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Đừng lo lắng! Chúng tôi sẽ giúp bạn lấy lại quyền truy cập tài khoản
                        </p>
                    </div>

                    <div className="relative">
                        <Image
                            src="/placeholder.svg?height=400&width=500"
                            alt="Hỗ trợ khách hàng"
                            width={500}
                            height={400}
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl" />
                    </div>
                </div>

                {/* Right Side - Reset Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-6">
                        <Link href="/auth/login" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Quay lại đăng nhập
                        </Link>
                    </div>

                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold">Đặt lại mật khẩu</CardTitle>
                            <CardDescription>Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email đã đăng ký</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isLoading}>
                                    {isLoading ? "Đang gửi..." : "Gửi hướng dẫn"}
                                </Button>
                            </form>

                            {/* Help Text */}
                            <div className="text-center text-sm text-gray-600">
                                <p>Bạn sẽ nhận được email với liên kết để đặt lại mật khẩu. Liên kết này sẽ hết hạn sau 24 giờ.</p>
                            </div>

                            {/* Contact Support */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Vẫn gặp khó khăn?{" "}
                                    <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
                                        Liên hệ hỗ trợ
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
