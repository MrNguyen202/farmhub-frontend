"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Tag, Truck, Shield, CreditCard, User, Gift } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

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

// Dữ liệu giỏ hàng mẫu
const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "Phân bón NPK 16-16-8 (Bao 50kg)",
        price: 450000,
        originalPrice: 500000,
        image: "/placeholder.svg?height=100&width=100&text=NPK",
        category: "Phân bón",
        quantity: 2,
        inStock: true,
        maxQuantity: 10,
    },
    {
        id: 2,
        name: "Hạt giống lúa ST25 (1kg)",
        price: 85000,
        image: "/placeholder.svg?height=100&width=100&text=ST25",
        category: "Hạt giống",
        quantity: 3,
        inStock: true,
        maxQuantity: 20,
    },
    {
        id: 3,
        name: "Thuốc trừ sâu sinh học BT (500ml)",
        price: 320000,
        image: "/placeholder.svg?height=100&width=100&text=BT",
        category: "Thuốc BVTV",
        quantity: 1,
        inStock: false,
        maxQuantity: 5,
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: "",
    })

    // Tính toán tổng tiền
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
    const shippingFee = subtotal >= 1000000 ? 0 : 50000
    const total = subtotal - discount + shippingFee

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setCartItems((items) =>
            items.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item)),
        )
    }

    // Xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    // Áp dụng mã giảm giá
    const applyCoupon = () => {
        // Giả lập kiểm tra mã giảm giá
        const validCoupons = {
            NONGDAN10: 10,
            VATTU15: 15,
            NEWCUSTOMER: 20,
        }

        if (validCoupons[couponCode as keyof typeof validCoupons]) {
            setAppliedCoupon({
                code: couponCode,
                discount: validCoupons[couponCode as keyof typeof validCoupons],
            })
            setCouponCode("")
        } else {
            alert("Mã giảm giá không hợp lệ!")
        }
    }

    // Xóa mã giảm giá
    const removeCoupon = () => {
        setAppliedCoupon(null)
    }

    // Xử lý đặt hàng
    const handleCheckout = () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!")
            return
        }

        // Kiểm tra sản phẩm hết hàng
        const outOfStockItems = cartItems.filter((item) => !item.inStock)
        if (outOfStockItems.length > 0) {
            alert("Có sản phẩm hết hàng trong giỏ hàng. Vui lòng xóa hoặc thay thế!")
            return
        }

        // Giả lập đặt hàng
        console.log("Đặt hàng:", { cartItems, customerInfo, total })
        alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.")
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
                                    <div className="relative">
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        {!item.inStock && (
                                            <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center rounded-lg">
                                                <Badge variant="destructive" className="text-xs">
                                                    Hết hàng
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                                <Badge variant="secondary" className="text-xs mt-1">
                                                    {item.category}
                                                </Badge>
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

                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-500">Còn lại: {item.maxQuantity} sản phẩm</span>
                                            <span className="font-semibold">Tổng: {(item.price * item.quantity).toLocaleString()}đ</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Coupon Section */}
                            <div className="border-t pt-4">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Nhập mã giảm giá"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        />
                                    </div>
                                    <Button onClick={applyCoupon} disabled={!couponCode} className="bg-green-600 hover:bg-green-700">
                                        <Tag className="w-4 h-4 mr-2" />
                                        Áp dụng
                                    </Button>
                                </div>

                                {appliedCoupon && (
                                    <div className="mt-2 flex items-center justify-between bg-green-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Gift className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium">
                                                Mã "{appliedCoupon.code}" - Giảm {appliedCoupon.discount}%
                                            </span>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={removeCoupon}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="mt-2 text-xs text-gray-500">
                                    Mã giảm giá có sẵn: NONGDAN10 (10%), VATTU15 (15%), NEWCUSTOMER (20%)
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary & Customer Info */}
                <div className="space-y-6">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Thông tin giao hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Họ và tên *</Label>
                                <Input
                                    id="name"
                                    placeholder="Nguyễn Văn A"
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Số điện thoại *</Label>
                                <Input
                                    id="phone"
                                    placeholder="0123456789"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={customerInfo.email}
                                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div>
                                <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                                <Textarea
                                    id="address"
                                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                    value={customerInfo.address}
                                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                                />
                            </div>
                            <div>
                                <Label htmlFor="note">Ghi chú đơn hàng</Label>
                                <Textarea
                                    id="note"
                                    placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                                    value={customerInfo.note}
                                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, note: e.target.value }))}
                                />
                            </div>
                        </CardContent>
                    </Card>

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

                            {appliedCoupon && (
                                <div className="flex justify-between text-green-600">
                                    <span>Giảm giá ({appliedCoupon.discount}%):</span>
                                    <span>-{discount.toLocaleString()}đ</span>
                                </div>
                            )}

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
