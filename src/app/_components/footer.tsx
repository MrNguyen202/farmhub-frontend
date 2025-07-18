import Link from "next/link"
import { Facebook, Youtube, Mail, Phone, MapPin, FacebookIcon, YoutubeIcon, Calendar } from "lucide-react"
import { Separator } from "../../components/ui/separator"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

export function Footer() {
    return (
        <footer className="bg-[#111827] p-10">
            <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
                {/* Infor */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-14 h-14 text-2xl font-bold text-white bg-green-600 flex justify-center items-center rounded-lg">VT</div>
                        <div>
                            <h1 className="text-2xl font-bold text-green-600">Vật Tư</h1>
                            <p className="text-lg text-white">Nông Nghiệp</p>
                        </div>
                    </div>
                    <p className="text-gray-300 lg:w-[90%]">Chuyên cung cấp vật tư nông nghiệp chất lượng cao với giá cả cạnh tranh. Đồng hành cùng nhà nông Việt Nam</p>
                    <div className="flex items-center text-white gap-2">
                        <Link href={"https://facebook.com"}><FacebookIcon className="border border-gray-300 rounded-sm p-2 w-10 h-10" /></Link>
                        <Link href={"https://youtube.com"}><YoutubeIcon className="border border-gray-300 rounded-sm p-2 w-10 h-10" /></Link>
                        <Link href={"https://mail.google.com"}><Mail className="border border-gray-300 rounded-sm p-2 w-10 h-10" /></Link>
                    </div>
                </div>

                {/* Consult */}
                <div className="text-white flex flex-col items-center gap-6 lg:col-span-2 xl:col-span-3 xl:order-2">
                    <Separator className="bg-gray-700" />
                    <h1 className="text-white text-lg font-semibold">Đăng ký nhận tin khuyến mãi</h1>
                    <div className="flex flex-col items-center gap-4 w-full md:w-1/2 lg:flex-row">
                        <Input placeholder="Nhập email của bạn ..." />
                        <Button className="bg-green-600 hover:bg-green-700 hover:cursor-pointer">Đăng ký</Button>
                    </div>
                    <Separator className="bg-gray-700" />
                </div>

                {/* Link */}
                <div>
                    <h1 className="text-white text-xl pb-4">Liên kế nhanh</h1>
                    <ul className="text-gray-300 flex flex-col gap-2">
                        <li>
                            <Link href="/">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link href="/">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link href="/">Tin tức</Link>
                        </li>
                        <li>
                            <Link href="/">Liên hệ</Link>
                        </li>
                        <li>
                            <Link href="/">Chính sách</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h1 className="text-white text-xl pb-4">Liên kế nhanh</h1>
                    <ul className="text-gray-300 flex flex-col gap-2">
                        <li>
                            <Link href="/" className="flex gap-2">
                                <MapPin color="green" />
                                <span>123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="flex gap-2">
                                <Phone color="green" />
                                <span>1900-6789</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="flex gap-2">
                                <Mail color="green" />
                                <span>info@vattunongnghiep.com</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="flex gap-2">
                                <Calendar color="green" />
                                <div>
                                    <span>Thứ 2 - Thứ 6: 8:00 - 17:00</span>
                                    <br />
                                    <span>Thứ 7: 8:00 - 12:00</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <Separator className="bg-gray-700 lg:col-span-2 xl:hidden" />

                <p className="text-gray-300 text-center lg:col-span-2 xl:col-span-3 xl:order-4">&#169; 2024 Vật Tư Nông Nghiệp. Tất cả quyền được bảo lưu.</p>
            </div>
        </footer>
    )
}
