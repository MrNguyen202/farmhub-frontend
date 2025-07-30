import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface RelatedProduct {
    id: number
    name: string
    price: number
    image: string
    rating: number
}

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm liên quan</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <Card className="group hover:shadow-lg transition-shadow h-full py-0">
                            <CardContent className="p-4 h-full flex flex-col justify-between">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                                />
                                <div className="flex flex-col justify-between h-full">
                                    <h3 className="font-semibold mb-2 line-clamp-2 text-gray-800">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-green-600">{product.price.toLocaleString()}đ</span>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
