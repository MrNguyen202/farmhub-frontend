export interface NewsArticle {
    id: number
    title: string
    slug: string
    image: string
    excerpt: string
    date: string
    category: string
}

export const newsData: NewsArticle[] = [
    {
        id: 1,
        title: "5 mẹo nhỏ giúp tăng năng suất lúa vụ Đông Xuân",
        slug: "5-meo-tang-nang-suat-lua-dong-xuan",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Vụ Đông Xuân là vụ mùa quan trọng. Áp dụng 5 mẹo sau để đảm bảo năng suất cao và chất lượng hạt gạo tốt nhất.",
        date: "2024-07-20",
        category: "Kỹ thuật canh tác",
    },
    {
        id: 2,
        title: "Phân bón hữu cơ: Xu hướng mới cho nông nghiệp bền vững",
        slug: "phan-bon-huu-co-xu-huong-ben-vung",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Tìm hiểu về lợi ích của phân bón hữu cơ, cách sử dụng hiệu quả và những sản phẩm nổi bật trên thị trường.",
        date: "2024-07-18",
        category: "Sản phẩm",
    },
    {
        id: 3,
        title: "Phòng trừ sâu bệnh hại cà chua hiệu quả trong mùa mưa",
        slug: "phong-tru-sau-benh-ca-chua-mua-mua",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Mùa mưa là điều kiện thuận lợi cho sâu bệnh phát triển. Bài viết này sẽ hướng dẫn bạn cách bảo vệ cây cà chua.",
        date: "2024-07-15",
        category: "Bảo vệ thực vật",
    },
    {
        id: 4,
        title: "Giới thiệu giống ngô lai mới cho năng suất vượt trội",
        slug: "gioi-thieu-giong-ngo-lai-moi",
        image: "/placeholder.svg?height=400&width=600",
        excerpt: "Khám phá giống ngô lai thế hệ mới với khả năng chống chịu sâu bệnh tốt và tiềm năng năng suất cao.",
        date: "2024-07-12",
        category: "Hạt giống",
    },
    {
        id: 5,
        title: "Ứng dụng công nghệ IoT trong quản lý trang trại thông minh",
        slug: "ung-dung-iot-trang-trai-thong-minh",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Công nghệ IoT đang thay đổi cách chúng ta làm nông nghiệp. Tìm hiểu cách áp dụng IoT để tối ưu hóa quản lý trang trại.",
        date: "2024-07-10",
        category: "Công nghệ",
    },
    {
        id: 6,
        title: "Lịch bón phân cho cây ăn quả theo từng giai đoạn phát triển",
        slug: "lich-bon-phan-cay-an-qua",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Hướng dẫn chi tiết lịch bón phân cho các loại cây ăn quả phổ biến, giúp cây phát triển khỏe mạnh và cho trái sai.",
        date: "2024-07-08",
        category: "Kỹ thuật canh tác",
    },
    {
        id: 7,
        title: "Cách chọn và bảo quản hạt giống rau màu đúng cách",
        slug: "cach-chon-bao-quan-hat-giong-rau-mau",
        image: "/placeholder.svg?height=400&width=600",
        excerpt:
            "Hạt giống chất lượng là yếu tố tiên quyết. Bài viết này chia sẻ kinh nghiệm chọn và bảo quản hạt giống rau màu.",
        date: "2024-07-05",
        category: "Hạt giống",
    },
    {
        id: 8,
        title: "Những lưu ý khi sử dụng thuốc bảo vệ thực vật an toàn",
        slug: "luu-y-su-dung-thuoc-bvtv-an-toan",
        image: "/placeholder.svg?height=400&width=600",
        excerpt: "Sử dụng thuốc BVTV đúng cách để đảm bảo an toàn cho người, cây trồng và môi trường.",
        date: "2024-07-03",
        category: "Bảo vệ thực vật",
    },
]
