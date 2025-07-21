import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, MessageSquare } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-green-600 to-green-800 text-white py-20 md:py-24 md:bg-gradient-to-r">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                        Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn.
                    </p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16 px-[5%]">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
                            <p className="text-gray-700 leading-relaxed mb-8">
                                Bạn có bất kỳ câu hỏi nào về sản phẩm, dịch vụ hay cần tư vấn kỹ thuật? Đừng ngần ngại liên hệ với chúng
                                tôi qua các kênh dưới đây.
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Địa chỉ</h3>
                                        <p className="text-gray-700">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Điện thoại</h3>
                                        <p className="text-gray-700">Hotline: 1900-6789</p>
                                        <p className="text-gray-700">Hỗ trợ kỹ thuật: 09xx.xxx.xxx</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                                        <p className="text-gray-700">info@vattunongnghiep.com</p>
                                        <p className="text-gray-700">hotro@vattunongnghiep.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Giờ làm việc</h3>
                                        <p className="text-gray-700">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                                        <p className="text-gray-700">Thứ 7: 8:00 - 12:00</p>
                                        <p className="text-gray-700">Chủ nhật: Nghỉ</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3">Theo dõi chúng tôi</h3>
                                <div className="flex gap-3">
                                    <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                                        <Facebook className="w-5 h-5 text-blue-600" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                                        <Youtube className="w-5 h-5 text-red-600" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                                        <MessageSquare className="w-5 h-5 text-green-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <Card className="shadow-lg border-0 max-w-sm md:max-w-xl xl:max-w-3xl mx-auto">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl font-bold text-center">Gửi tin nhắn cho chúng tôi</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Họ và tên</Label>
                                            <Input id="name" placeholder="Nguyễn Văn A" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="your@email.com" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Số điện thoại (Tùy chọn)</Label>
                                            <Input id="phone" type="tel" placeholder="0123456789" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Chủ đề</Label>
                                            <Input id="subject" placeholder="Về sản phẩm NPK 16-16-8" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Nội dung tin nhắn</Label>
                                            <Textarea id="message" placeholder="Tôi cần tư vấn về..." rows={5} required />
                                        </div>
                                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">
                                            Gửi tin nhắn
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white px-[5%]">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Tìm chúng tôi trên bản đồ</h2>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src="/placeholder.svg?height=400&width=1200"
                            alt="Vị trí cửa hàng trên bản đồ"
                            width={1200}
                            height={400}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action (Optional, if not already in footer) */}
            <section className="py-16 bg-green-600 text-white px-[5%]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Bạn cần tư vấn trực tiếp?</h2>
                    <p className="text-xl mb-8 text-green-100">Đừng ngần ngại gọi cho chúng tôi hoặc ghé thăm cửa hàng!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                            Gọi ngay: 1900-6789
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                            asChild
                        >
                            <Link href="/products">Xem sản phẩm</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
