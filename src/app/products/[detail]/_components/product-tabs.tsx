"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Product {
    description: string
    usage: string
    specifications: { [key: string]: string }
    reviews: number
}

interface Review {
    id: number
    name: string
    rating: number
    date: string
    comment: string
}

interface ProductTabsProps {
    product: Product
    reviews: Review[]
}

export function ProductTabs({ product, reviews }: ProductTabsProps) {
    return (
        <Card className="mb-12">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto">
                    <TabsTrigger value="description" className="py-3">
                        Mô tả sản phẩm
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="py-3">
                        Thông số kỹ thuật
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="py-3">
                        Đánh giá ({product.reviews})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6">
                    <div className="prose max-w-none text-gray-700">
                        <h4 className="font-semibold text-lg mb-2 text-gray-800">Mô tả:</h4>
                        <p className="mb-4 leading-relaxed">{product.description}</p>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800">Hướng dẫn sử dụng:</h4>
                        <p className="leading-relaxed">{product.usage}</p>
                    </div>
                </TabsContent>

                <TabsContent value="specifications" className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1 border-b border-gray-200">
                                <span className="font-bold text-gray-700">{key}:</span>
                                <span className="text-gray-800">{value}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4 border-gray-200 last:border-b-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-800 mr-3">{review.name}</span>
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    )
}
