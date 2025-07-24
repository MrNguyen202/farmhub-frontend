import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Tag, ArrowLeft } from "lucide-react"
import { newsData } from "@/datalocals/news"

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
    const article = newsData.find((a) => a.slug === params.slug)

    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
                    <Link href="/news" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại Tin tức
                    </Link>

                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="text-sm flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {article.category}
                        </Badge>
                        <span className="text-base text-gray-500 flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString("vi-VN")}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

                    <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                        <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            style={{ objectFit: "cover" }}
                            className="rounded-lg w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose max-w-none text-gray-800 leading-relaxed text-lg">
                        <p className="font-semibold text-xl mb-4">{article.excerpt}</p>
                        <p>
                            Đây là nội dung chi tiết của bài viết "{article.title}". Bạn có thể thêm nội dung đầy đủ ở đây. Nội dung
                            này sẽ bao gồm các đoạn văn, hình ảnh, video, biểu đồ, v.v. để cung cấp thông tin chuyên sâu cho người
                            đọc.
                        </p>
                        <p>
                            Chúng tôi luôn nỗ lực mang đến những kiến thức hữu ích và cập nhật nhất để hỗ trợ bà con nông dân trong
                            quá trình canh tác. Hãy theo dõi thường xuyên để không bỏ lỡ các bài viết mới!
                        </p>
                        {/* Thêm nội dung chi tiết khác ở đây */}
                        <h2 className="text-2xl font-bold mt-8 mb-4">Phần tiếp theo của bài viết</h2>
                        <p>
                            Ví dụ, bạn có thể thêm các phần như "Các bước thực hiện", "Lưu ý quan trọng", "Câu hỏi thường gặp", hoặc
                            "Sản phẩm liên quan" để làm phong phú nội dung.
                        </p>
                        <ul>
                            <li>Điểm 1: Chi tiết về chủ đề.</li>
                            <li>Điểm 2: Thông tin bổ sung.</li>
                            <li>Điểm 3: Lời khuyên hữu ích.</li>
                        </ul>
                        <p>Cảm ơn bạn đã đọc bài viết này. Nếu có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
