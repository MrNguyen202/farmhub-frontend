"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Truck, Shield, CreditCard } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Image from "next/image"

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    quantity: number
    inStock: boolean
    maxQuantity: number
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    // Giả lập dữ liệu giỏ hàng từ localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    // Tính toán tổng tiền
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingFee = subtotal >= 1000000 ? 0 : 50000
    const total = subtotal + shippingFee

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (id: number, newQuantity: number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const itemIndex = cart.findIndex((item: CartItem) => item.id === id)
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                cart.splice(itemIndex, 1)
            } else {
                cart[itemIndex].quantity = newQuantity
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            setCartItems(cart)
        }
    }


    // Xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id: number) => {
        const updatedItems = cartItems.filter((item) => item.id !== id)
        setCartItems(updatedItems)
        localStorage.setItem("cart", JSON.stringify(updatedItems))
    }

    // Xử lý đặt hàng
    const handleCheckout = () => {
        // Kiểm tra sản phẩm hết hàng
        const outOfStockItems = cartItems.filter((item) => !item.inStock)
        if (outOfStockItems.length > 0) {
            alert("Có sản phẩm hết hàng trong giỏ hàng. Vui lòng xóa hoặc thay thế!")
            return
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-4">
                <div className="mb-4">
                    <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Tiếp tục mua sắm
                    </Link>
                </div>

                <Card className="text-center py-16">
                    <CardContent className="flex flex-col items-center">
                        <ShoppingCart className="w-24 h-24 mb-6 text-gray-400" />
                        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
                        <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                        <Button asChild className="bg-green-600 hover:bg-green-700">
                            <Link href="/products">Khám phá sản phẩm</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto mb-10 p-4">
            {/* Breadcrumb */}
            <div className="mb-4">
                <Breadcrumb>
                    <BreadcrumbList className="text-base">
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Trang chủ</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbPage>Giỏ hàng</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Giỏ hàng của bạn ({cartItems.length} sản phẩm)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                                    <div className="relative hidden md:block">
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="grid grid-cols-1 gap-2 items-center">
                                                <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                                                {item.inStock ? (
                                                    <Badge className="bg-green-100 text-green-800">Còn hàng</Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-800">Hết hàng</Badge>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-green-600">{item.price.toLocaleString()}đ</span>
                                                {item.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {item.originalPrice.toLocaleString()}đ
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.maxQuantity || !item.inStock}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex justify-end items-center mt-2">
                                            <span className="font-semibold">Tổng: {(item.price * item.quantity).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary & Customer Info */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Tóm tắt đơn hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Tạm tính:</span>
                                <span>{subtotal.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span>
                                    {shippingFee === 0 ? (
                                        <span className="text-green-600">Miễn phí</span>
                                    ) : (
                                        `${shippingFee.toLocaleString()}đ`
                                    )}
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Tổng cộng:</span>
                                <span className="text-green-600">{total.toLocaleString()}đ</span>
                            </div>

                            {/* Shipping Info */}
                            <div className="bg-green-50 p-3 rounded-lg space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Truck className="w-4 h-4 text-green-600" />
                                    <span>Giao hàng: 2-3 ngày làm việc</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Shield className="w-4 h-4 text-green-600" />
                                    <span>Thanh toán khi nhận hàng</span>
                                </div>
                                {subtotal < 1000000 && (
                                    <div className="text-xs text-gray-600">
                                        Mua thêm {(1000000 - subtotal).toLocaleString()}đ để được miễn phí vận chuyển
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={handleCheckout}
                                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                                size="lg"
                            >
                                Đặt hàng ngay
                            </Button>

                            <div className="text-center">
                                <Link href="/products" className="text-sm text-green-600 hover:text-green-700">
                                    ← Tiếp tục mua sắm
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
