"use client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ProductGallery } from "./_components/product-gallery"
import { ProductInfo } from "./_components/product-info"
import { ProductTabs } from "./_components/product-tabs"
import { RelatedProducts } from "./_components/related-products"
import { productsData } from "@/datalocals/product"
import reviews from "@/datalocals/feedback"
import { use } from "react"
import categories from "@/datalocals/categories"

interface ProductData {
    id: number,
    name: string,
    price: number,
    originalPrice: number,
    image: string,
    rating: number,
    reviews: number,
    badge: string | null,
    category: string,
    description: string,
    specifications: {
        "Thành phần": string,
        "Trọng lượng": string,
        "Xuất xứ": string,
        "Hạn sử dụng": string,
        "Bảo quản": string,
    },
    usage: string,
    brand: string,
    sku: string,
    inStock: true,
    stockQuantity: number,
    images: string[]
}


export default function ProductDetailPage({ params }: { params: Promise<{ detail: string }> }) {
    const { detail } = use(params)
    const productId = Number.parseInt(detail)
    const product = productsData.find((p) => p.id === productId)

    if (!product) {
        notFound()
    }

    //Lấy tên category từ product
    const categoryName = categories.find((c) => c.slug === product.category)?.name || "Không xác định"

    // Lọc sản phẩm liên quan
    // Ensure 'category' exists on all product objects in productsData, or replace 'category' with an existing property for filtering
    const relatedProducts = productsData.filter(
        (p) => (p as ProductData).category === (product as ProductData).category && p.id !== product.id
    ).slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-green-600">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-green-600">
                            Sản phẩm
                        </Link>
                        <span>/</span>
                        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-green-600">
                            {categoryName}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{product.name}</span>
                    </div>
                </nav>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <ProductGallery images={product.images} productName={product.name} />
                    <ProductInfo product={product} />
                </div>

                <ProductTabs
                    product={{
                        ...product,
                        specifications: Object.fromEntries(
                            Object.entries(product.specifications).map(([key, value]) => [key, value ?? ""])
                        ),
                    }}
                    reviews={reviews}
                />
                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    )
}
