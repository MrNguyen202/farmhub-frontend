"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    Star,
    Minus,
    Plus,
    ShoppingCart,
    Heart,
    Share2,
    Truck,
    Shield,
    RotateCcw,
    Phone,
    Tag,
    Package,
    CheckCircle,
    XCircle,
} from "lucide-react"

interface Product {
    id: number
    name: string
    price: number
    originalPrice: number | null
    rating: number
    reviews: number
    badge: string | null
    category: string
    brand: string
    sku: string
    inStock: boolean
    stockQuantity: number
}

interface ProductInfoProps {
    product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <Badge className="text-sm px-3 py-1">{product.category}</Badge>
                {product.badge && (
                    <Badge variant="destructive" className="text-sm px-3 py-1">
                        {product.badge}
                    </Badge>
                )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="ml-2 text-base text-gray-700 font-medium">
                        {product.rating} <span className="text-gray-500">({product.reviews} đánh giá)</span>
                    </span>
                </div>
            </div>

            <div className="mb-6 border-b pb-6">
                <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-green-700">{product.price.toLocaleString()}đ</span>
                    {product.originalPrice && (
                        <span className="text-xl text-gray-500 line-through ml-4">{product.originalPrice.toLocaleString()}đ</span>
                    )}
                </div>
                {product.originalPrice && (
                    <p className="text-sm text-gray-600">
                        Tiết kiệm:{" "}
                        <span className="font-semibold text-red-600">
                            {(product.originalPrice - product.price).toLocaleString()}đ
                        </span>
                    </p>
                )}
            </div>

            {/* Key Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base mb-6">
                <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Thương hiệu:</span>
                    <span className="font-medium text-gray-800">{product.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Mã sản phẩm:</span>
                    <span className="font-medium text-gray-800">{product.sku}</span>
                </div>
                <div className="flex items-center gap-2">
                    {product.inStock ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-gray-600">Tình trạng:</span>
                    <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                        {product.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Số lượng tồn:</span>
                    <span className="font-medium text-gray-800">{product.stockQuantity} sản phẩm</span>
                </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6 border-b pb-6">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-base font-medium text-gray-700">Số lượng:</span>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                            className="h-10 w-10"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[60px] text-center text-lg font-semibold">{quantity}</span>
                        <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-3">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Thêm vào giỏ hàng
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                    <Truck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Miễn phí vận chuyển</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                    <Shield className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Bảo hành chính hãng</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                    <RotateCcw className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>Đổi trả trong 7 ngày</span>
                </div>
            </div>

            {/* Contact */}
            <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-gray-800">Cần tư vấn thêm?</p>
                        <p className="text-sm text-gray-600">
                            Gọi ngay hotline của chúng tôi để được hỗ trợ: <span className="font-bold text-green-700">1900-xxxx</span>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
