import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@mui/material/Rating";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

interface CartProductProps {
    product: {
        id: number;
        name: string;
        image: string;
        description: string;
        price: number;
        rating: number;
        discount: number;
        badge: string;
    };
}

const CartProduct = ({ product, viewMode }: CartProductProps & { viewMode: "grid" | "list" }) => {
    return (
        <div key={product.id} className="relative">
            <Link href={`/products/${product.id}`}>
                <Card className="group hover:shadow-lg transition-shadow p-0 cursor-pointer">
                    <CardContent className={`p-4 ${viewMode === 'list' ? 'md:grid md:grid-cols-3 xl:grid-cols-4 md:gap-4' : 'md:grid md:grid-cols-1'}`}>
                        <div className={`relative mb-4 ${viewMode === 'list' ? 'md:col-span-1' : ''}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="min-w-full h-52 object-cover rounded-lg group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    e.currentTarget.onerror = null
                                    e.currentTarget.src = '/placeholder.svg'
                                }}
                            />
                            <Badge className="absolute top-4 right-4 md:right-2 bg-red-500">{product.badge}</Badge>
                        </div>
                        <div className={`${viewMode === 'list' ? 'md:col-span-2 xl:col-span-3' : ''}`}>
                            <h1 className="font-semibold mb-2 line-clamp-2 text-lg">{product.name}</h1>
                            {viewMode === 'list' && (
                                <p className="hidden md:block text-sm text-gray-600 mb-2">{product.description}</p>
                            )}
                            <div className="flex items-center mb-2">
                                <div className="flex items-center">
                                    <Rating name="half-rating" defaultValue={product.rating} precision={0.5} />
                                    <span className="text-sm text-gray-600 ml-1">
                                        {product.rating} (100 lượt)
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-lg font-bold text-green-600">{product.price.toLocaleString()}đ</span>
                                    {product.discount != 0 && (
                                        <span className="text-sm text-gray-500 line-through ml-2">
                                            {(product.price - (product.price * product.discount / 100)).toLocaleString()}đ
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            {/* Button nằm ngoài Link để hoạt động được */}
            <Button
                className={`absolute bottom-4 right-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors w-12 h-12 hover:cursor-pointer ${viewMode === 'list' ? '' : 'xl:bottom-2 xl:right-2 xl:w-8 xl:h-8'}`}
                onClick={() => alert(`Đã thêm ${product.name} vào giỏ hàng`)}
            >
                <ShoppingBasketIcon fontSize='medium' />
            </Button>
        </div>
    );
}

export default CartProduct;