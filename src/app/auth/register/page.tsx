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
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Facebook, Chrome } from "lucide-react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
        agreeTerms: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Vui lòng nhập họ tên"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại"
        } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ"
        }

        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu"
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "Vui lòng đồng ý với điều khoản sử dụng"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                // Handle successful registration
                toast.success("Đăng ký thành công!")
                // Clear form data
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    address: "",
                    agreeTerms: false,
                })
                // Redirect to login page
                setTimeout(() => {
                    router.push("/auth/login")
                }, 1500)
            } else {
                // Handle errors from the server
                toast.error(data.error || "Đăng ký không thành công, vui lòng thử lại.")

                // If it's a validation error, you could set specific field errors
                if (data.error.includes("Email")) {
                    setErrors(prev => ({ ...prev, email: data.error }))
                } else if (data.error.includes("điện thoại")) {
                    setErrors(prev => ({ ...prev, phone: data.error }))
                }
            }
        } catch (error) {
            console.error("Registration error:", error)
            toast.error("Không thể kết nối đến server. Vui lòng thử lại sau.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))

        // Clear error when user changes checkbox
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full grid lg:grid-cols-2 gap-8 items-center container">
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
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tham gia cùng chúng tôi!</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Tạo tài khoản để trải nghiệm dịch vụ vật tư nông nghiệp tốt nhất
                        </p>
                    </div>

                    <div className="relative w-[80%] place-self-center">
                        <Image
                            src="/placeholder.svg?height=400&width=500"
                            alt="Nông dân hạnh phúc"
                            width={500}
                            height={400}
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl" />
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="w-full max-w-lg mx-auto">
                    <div className="mb-2">
                        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Về trang chủ
                        </Link>
                    </div>

                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold">Đăng ký tài khoản</CardTitle>
                            <CardDescription>Điền thông tin để tạo tài khoản mới</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và tên *</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="Nguyễn Văn A"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
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
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="0123456789"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="pl-10"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Nhập đầy đủ địa chỉ (ví dụ: 123 Lê Lợi, Quận 1, TP. HCM)"
                                        value={formData.address || ""}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Mật khẩu *</Label>
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
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="pl-10 pr-10"
                                            required
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                                </div>

                                {/* Terms and Newsletter */}
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange("agreeTerms", checked as boolean)
                                            }
                                            disabled={isLoading}
                                        />
                                        <Label htmlFor="agreeTerms" className="text-sm leading-5">
                                            Tôi đồng ý với{" "}
                                            <Link href="/terms" className="text-green-600 hover:text-green-700">
                                                Điều khoản sử dụng
                                            </Link>{" "}
                                            và{" "}
                                            <Link href="/privacy" className="text-green-600 hover:text-green-700">
                                                Chính sách bảo mật
                                            </Link>
                                        </Label>
                                    </div>
                                    {errors.agreeTerms && <p className="text-sm text-red-500">{errors.agreeTerms}</p>}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">Hoặc đăng ký với</span>
                                </div>
                            </div>

                            {/* Social Register */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                                    <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                                    Facebook
                                </Button>
                                <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                                    <Chrome className="w-4 h-4 mr-2" />
                                    Google
                                </Button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Đã có tài khoản?{" "}
                                    <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
                                        Đăng nhập ngay
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