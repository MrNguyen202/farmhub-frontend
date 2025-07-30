"use client"

import { CardDescription } from "@/components/ui/card"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Package, Calendar, DollarSign, Info, MapPin, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

// Định nghĩa kiểu dữ liệu cho sản phẩm trong đơn hàng
interface OrderItem {
    productId: number
    name: string
    quantity: number
    unitPrice: number
    image: string
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
    id: string
    date: string // YYYY-MM-DD
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    totalAmount: number
    items: OrderItem[]
    shippingAddress: string
    paymentMethod: string
}

// Dữ liệu đơn hàng giả định
const mockOrders: Order[] = [
    {
        id: "ORD001",
        date: "2024-07-20",
        status: "delivered",
        totalAmount: 770000,
        items: [
            {
                productId: 1,
                name: "Phân bón NPK 16-16-8 (Bao 50kg)",
                quantity: 1,
                unitPrice: 450000,
                image: "/placeholder.svg?height=50&width=50&text=NPK",
            },
            {
                productId: 3,
                name: "Thuốc trừ sâu sinh học BT (500ml)",
                quantity: 1,
                unitPrice: 320000,
                image: "/placeholder.svg?height=50&width=50&text=BT",
            },
        ],
        shippingAddress: "123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh",
        paymentMethod: "Thanh toán khi nhận hàng",
    },
    {
        id: "ORD002",
        date: "2024-07-18",
        status: "shipped",
        totalAmount: 170000,
        items: [
            {
                productId: 2,
                name: "Hạt giống lúa ST25 (1kg)",
                quantity: 2,
                unitPrice: 85000,
                image: "/placeholder.svg?height=50&width=50&text=ST25",
            },
        ],
        shippingAddress: "456 Đường DEF, Phường GHI, Quận 2, TP. Hồ Chí Minh",
        paymentMethod: "Chuyển khoản ngân hàng",
    },
    {
        id: "ORD003",
        date: "2024-07-15",
        status: "processing",
        totalAmount: 2850000,
        items: [
            {
                productId: 4,
                name: "Máy phun thuốc mini 16L",
                quantity: 1,
                unitPrice: 2850000,
                image: "/placeholder.svg?height=50&width=50&text=Máy phun",
            },
        ],
        shippingAddress: "789 Đường JKL, Phường MNO, Quận 3, TP. Hồ Chí Minh",
        paymentMethod: "Thanh toán khi nhận hàng",
    },
    {
        id: "ORD004",
        date: "2024-07-10",
        status: "cancelled",
        totalAmount: 800000,
        items: [
            {
                productId: 5,
                name: "Phân hữu cơ (100kg)",
                quantity: 1,
                unitPrice: 800000,
                image: "/placeholder.svg?height=50&width=50&text=Hữu cơ",
            },
        ],
        shippingAddress: "101 Đường PQR, Phường STU, Quận 4, TP. Hồ Chí Minh",
        paymentMethod: "Thanh toán khi nhận hàng",
    },
]

const orderStatuses = ["pending", "processing", "shipped", "delivered"]

const getStatusIndex = (status: Order["status"]) => {
    return orderStatuses.indexOf(status)
}

const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
        case "delivered":
            return "default"
        case "shipped":
            return "secondary"
        case "processing":
            return "outline"
        case "pending":
            return "outline"
        case "cancelled":
            return "destructive"
        default:
            return "secondary"
    }
}

const getStatusText = (status: Order["status"]) => {
    switch (status) {
        case "pending":
            return "Đang chờ xử lý"
        case "processing":
            return "Đang xử lý"
        case "shipped":
            return "Đã giao hàng"
        case "delivered":
            return "Đã nhận hàng"
        case "cancelled":
            return "Đã hủy"
        default:
            return "Không xác định"
    }
}

export default function OrdersPage() {
    const [searchTerm] = useState("")
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const filteredOrders = mockOrders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            getStatusText(order.status).toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Về trang chủ
                    </Link>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-3xl font-bold">Đơn hàng của tôi</CardTitle>
                        <CardDescription>Xem lịch sử các đơn hàng bạn đã đặt.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        {filteredOrders.length === 0 ? (
                            <div className="text-center text-gray-600 py-10">
                                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg">Không tìm thấy đơn hàng nào.</p>
                                <p className="text-sm text-gray-500">Hãy thử tìm kiếm với từ khóa khác.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {filteredOrders.map((order) => (
                                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                                <div className="mb-2 md:mb-0">
                                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-green-600" />
                                                        Đơn hàng #{order.id}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                                        <Calendar className="w-5 h-5" />
                                                        Ngày đặt: {new Date(order.date).toLocaleDateString("vi-VN")}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={getStatusBadgeVariant(order.status)} className="px-3 py-1 text-sm">
                                                        {getStatusText(order.status)}
                                                    </Badge>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                                        <Info className="w-4 h-4 mr-2" />
                                                        Chi tiết
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="border-t border-b py-4 mb-4">
                                                <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
                                                    <span>Tổng cộng:</span>
                                                    <span className="text-green-700">{order.totalAmount.toLocaleString()}đ</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-700 font-medium">Sản phẩm:</p>
                                                <ul className="list-disc list-inside text-sm text-gray-600">
                                                    {order.items.map((item) => (
                                                        <li key={item.productId}>
                                                            {item.name} x {item.quantity} ({item.unitPrice.toLocaleString()}đ/sản phẩm)
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Order Detail Modal/Card */}
                        {selectedOrder && (
                            <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
                                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex justify-between items-center">
                                            Chi tiết đơn hàng #{selectedOrder.id}
                                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                                                ✕
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>Thông tin chi tiết về đơn hàng của bạn.</CardDescription>
                                    </CardHeader>
                                    {/* Thêm thanh trạng thái ở đây */}
                                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                        <h4 className="font-semibold text-gray-800 mb-3">Trạng thái đơn hàng</h4>
                                        <div className="flex items-center justify-between relative">
                                            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 -translate-y-1/2" />
                                            <div
                                                className="absolute left-0 h-1 bg-green-500 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
                                                style={{
                                                    width: `${(getStatusIndex(selectedOrder.status) / (orderStatuses.length - 1)) * 100}%`,
                                                }}
                                            />
                                            {orderStatuses.map((status, index) => {
                                                const isCompleted = index <= getStatusIndex(selectedOrder.status)
                                                const isCurrent = index === getStatusIndex(selectedOrder.status)
                                                return (
                                                    <div key={status} className="relative z-10 flex flex-col items-center flex-1">
                                                        <div
                                                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isCompleted ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                                                                }`}
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle className="w-3 h-3" />
                                                            ) : (
                                                                <span className="text-xs">{index + 1}</span>
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`mt-4 text-center text-xs font-medium ${isCurrent ? "text-green-700 font-bold" : "text-gray-600"}`}
                                                            style={{ minHeight: "2rem" }} // hoặc chiều cao tùy bạn test phù hợp
                                                        >
                                                            {getStatusText(status as Order["status"])}
                                                        </span>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {selectedOrder.status === "cancelled" && (
                                            <div className="mt-2 text-center text-red-600 font-semibold flex items-center justify-center gap-2">
                                                <XCircle className="w-5 h-5" />
                                                Đơn hàng đã bị hủy.
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Thông tin chung</h4>
                                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    Ngày đặt: {new Date(selectedOrder.date).toLocaleDateString("vi-VN")}
                                                </p>
                                                <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                                                    <DollarSign className="w-4 h-4 text-gray-500" />
                                                    Tổng tiền:{" "}
                                                    <span className="font-bold text-green-700">
                                                        {selectedOrder.totalAmount.toLocaleString()}đ
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Địa chỉ & Thanh toán</h4>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <p className="text-sm text-gray-700 flex items-start gap-2">
                                                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                        Địa chỉ giao hàng: {selectedOrder.shippingAddress}
                                                    </p>
                                                    <p className="text-sm text-gray-700 flex items-start gap-2">
                                                        <Info className="w-4 h-4 text-gray-500" />
                                                        Phương thức thanh toán: {selectedOrder.paymentMethod}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Sản phẩm trong đơn hàng</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[60px]">Ảnh</TableHead>
                                                        <TableHead>Sản phẩm</TableHead>
                                                        <TableHead className="text-center">SL</TableHead>
                                                        <TableHead className="text-right">Đơn giá</TableHead>
                                                        <TableHead className="text-right">Thành tiền</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedOrder.items.map((item) => (
                                                        <TableRow key={item.productId}>
                                                            <TableCell>
                                                                <Image
                                                                    src={item.image || "/placeholder.svg"}
                                                                    alt={item.name}
                                                                    className="w-10 h-10 object-cover rounded"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="font-medium">{item.name}</TableCell>
                                                            <TableCell className="text-center">{item.quantity}</TableCell>
                                                            <TableCell className="text-right">{item.unitPrice.toLocaleString()}đ</TableCell>
                                                            <TableCell className="text-right">
                                                                {(item.quantity * item.unitPrice).toLocaleString()}đ
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button onClick={() => setSelectedOrder(null)}>Đóng</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
