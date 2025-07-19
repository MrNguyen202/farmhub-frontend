import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Handshake, Leaf, Users, History, CalendarCheck } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-green-600 to-green-800 text-white py-20 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sứ mệnh của chúng tôi</h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                        Đồng hành cùng nông dân Việt Nam trên hành trình phát triển nông nghiệp bền vững.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-6xl font-bold mb-6 text-green-700">
                                Vật Tư Nông Nghiệp
                            </h2>
                            <h3 className="text-3xl font-thin text-black mb-6">
                                Nền tảng vững chắc cho mùa màng bội thu
                            </h3>
                            <p className="text-gray-700 leading-[1.7] mb-4 text-lg">
                                Chúng tôi là nhà cung cấp hàng đầu các sản phẩm và giải pháp vật tư nông nghiệp tại Việt Nam. Với nhiều
                                năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến những sản phẩm chất lượng cao, chính hãng, và
                                giá cả cạnh tranh nhất để hỗ trợ bà con nông dân đạt được năng suất tối ưu và phát triển bền vững.
                            </p>
                            <p className="text-gray-700 leading-[1.7] text-lg">
                                Từ hạt giống, phân bón, thuốc bảo vệ thực vật đến máy móc và dụng cụ nông nghiệp, mỗi sản phẩm đều được
                                chọn lọc kỹ lưỡng, đảm bảo nguồn gốc rõ ràng và hiệu quả sử dụng.
                            </p>
                        </div>
                        <div className="relative flex justify-center">
                            <Image
                                src="/images/anh-noi-bat-gioi-thieu-ve-cua-hang.png"
                                alt="Nông dân hạnh phúc"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center p-6 shadow-xl hover:shadow-2xl transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Sứ mệnh</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-lg">
                                    Cung cấp giải pháp nông nghiệp toàn diện, nâng cao chất lượng và năng suất cây trồng, góp phần vào sự
                                    phát triển của nền nông nghiệp Việt Nam.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 shadow-xl hover:shadow-2xl transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Eye className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Tầm nhìn</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-lg">
                                    Trở thành đối tác tin cậy hàng đầu của mọi nhà nông, dẫn đầu trong việc ứng dụng công nghệ mới vào sản
                                    xuất nông nghiệp.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center p-6 shadow-xl hover:shadow-2xl transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Handshake className="w-8 h-8 text-yellow-600" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Giá trị cốt lõi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-lg">
                                    Chất lượng - Uy tín - Bền vững - Đổi mới - Đồng hành. Luôn đặt lợi ích của khách hàng lên hàng đầu.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Chúng tôi cung cấp</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Đa dạng các sản phẩm và dịch vụ thiết yếu cho mọi nhu cầu canh tác.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <Leaf className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Sản phẩm chất lượng cao</h3>
                                <p className="text-gray-600 text-md">
                                    Hạt giống, phân bón, thuốc BVTV, dụng cụ và máy móc nông nghiệp từ các thương hiệu uy tín.
                                </p>
                            </div>
                        </Card>
                        <Card className="p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Tư vấn kỹ thuật chuyên sâu</h3>
                                <p className="text-gray-600 text-md">
                                    Đội ngũ kỹ sư nông nghiệp giàu kinh nghiệm sẵn sàng hỗ trợ bà con 24/7.
                                </p>
                            </div>
                        </Card>
                        <Card className="p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <History className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Giải pháp bền vững</h3>
                                <p className="text-gray-600 text-md">
                                    Tư vấn các phương pháp canh tác hữu cơ, an toàn, thân thiện với môi trường.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Development History */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Lịch sử phát triển</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Hành trình của chúng tôi qua các mốc thời gian quan trọng.
                        </p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200 rounded-full hidden md:block" />
                        <div className="space-y-12">
                            {/* Milestone 1 */}
                            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
                                <div className="md:w-1/2 md:pr-8 text-right">
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">2015</h3>
                                    <p className="text-gray-700">
                                        Thành lập cửa hàng VậtTư Nông Nghiệp với mục tiêu ban đầu là cung cấp hạt giống và phân bón cho nông
                                        dân địa phương.
                                    </p>
                                </div>
                                <div className="absolute md:relative w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white z-10 md:mx-auto">
                                    <CalendarCheck className="w-4 h-4" />
                                </div>
                                <div className="md:w-1/2 md:pl-8" />
                            </div>

                            {/* Milestone 2 */}
                            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
                                <div className="md:w-1/2 md:pr-8 hidden md:block" />
                                <div className="absolute md:relative w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white z-10 md:mx-auto">
                                    <CalendarCheck className="w-4 h-4" />
                                </div>
                                <div className="md:w-1/2 md:pl-8 text-left">
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">2018</h3>
                                    <p className="text-gray-700">
                                        Mở rộng danh mục sản phẩm bao gồm thuốc bảo vệ thực vật và dụng cụ nông nghiệp, đáp ứng nhu cầu đa
                                        dạng hơn của thị trường.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 3 */}
                            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
                                <div className="md:w-1/2 md:pr-8 text-right">
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">2020</h3>
                                    <p className="text-gray-700">
                                        Ra mắt nền tảng thương mại điện tử, giúp khách hàng trên toàn quốc dễ dàng tiếp cận sản phẩm và dịch
                                        vụ của chúng tôi.
                                    </p>
                                </div>
                                <div className="absolute md:relative w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white z-10 md:mx-auto">
                                    <CalendarCheck className="w-4 h-4" />
                                </div>
                                <div className="md:w-1/2 md:pl-8" />
                            </div>

                            {/* Milestone 4 */}
                            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
                                <div className="md:w-1/2 md:pr-8 hidden md:block" />
                                <div className="absolute md:relative w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white z-10 md:mx-auto">
                                    <CalendarCheck className="w-4 h-4" />
                                </div>
                                <div className="md:w-1/2 md:pl-8 text-left">
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">2022</h3>
                                    <p className="text-gray-700">
                                        Thành lập đội ngũ kỹ sư nông nghiệp chuyên trách, cung cấp dịch vụ tư vấn kỹ thuật miễn phí cho bà
                                        con.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 5 */}
                            <div className="flex flex-col md:flex-row items-center md:justify-between relative">
                                <div className="md:w-1/2 md:pr-8 text-right">
                                    <h3 className="text-2xl font-bold text-green-700 mb-2">Hiện tại</h3>
                                    <p className="text-gray-700">
                                        Tiếp tục nghiên cứu và phát triển, ứng dụng công nghệ mới để mang đến những giải pháp nông nghiệp
                                        bền vững và hiệu quả nhất.
                                    </p>
                                </div>
                                <div className="absolute md:relative w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white z-10 md:mx-auto">
                                    <CalendarCheck className="w-4 h-4" />
                                </div>
                                <div className="md:w-1/2 md:pl-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-green-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng cho một mùa vụ thành công?</h2>
                    <p className="text-xl mb-8 text-green-100">Hãy để Vật Tư Nông Nghiệp đồng hành cùng bạn!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-green-600 hover:bg-green-50" asChild>
                            <Link href="/products">Khám phá sản phẩm</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                            asChild
                        >
                            <Link href="/contact">Liên hệ tư vấn</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
