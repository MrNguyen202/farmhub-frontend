"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { newsData } from "@/datalocals/news"
import { CalendarDays, Tag } from "lucide-react"

const ARTICLES_PER_PAGE = 6

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1)

    // Logic phân trang
    const totalPages = Math.ceil(newsData.length / ARTICLES_PER_PAGE)
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
    const endIndex = startIndex + ARTICLES_PER_PAGE
    const currentArticles = newsData.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-green-600 to-green-800 text-white py-20 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin Tức Nông Nghiệp</h1>
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                        Cập nhật những thông tin mới nhất, kiến thức chuyên sâu và mẹo hay về nông nghiệp.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentArticles.map((article) => (
                        <Card key={article.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Link href={`/news/${article.slug}`}>
                                <img
                                    src={article.image || "/placeholder.svg"}
                                    alt={article.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-52 object-cover"
                                />
                            </Link>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        {article.category}
                                    </Badge>
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <CalendarDays className="w-3 h-3" />
                                        {new Date(article.date).toLocaleDateString("vi-VN")}
                                    </span>
                                </div>
                                <Link href={`/news/${article.slug}`}>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-green-700 transition-colors">
                                        {article.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                                <Button asChild variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700">
                                    <Link href={`/news/${article.slug}`}>Đọc thêm</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Trước
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Sau
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
