const categories = [
    {
        id: 1,
        name: 'Hạt giống',
        label: 'Hạt giống',
        slug: 'hat-giong',
        image: '/images/hat-giong.webp',
        icon: '/icons/hat-giong.png',
        numberOfProducts: 120,
        subCategories: [
            {
                id: 1,
                name: 'Lúa',
                slug: 'hat-giong-lua',
                image: '',
                items: ["Giống ST24", "Giống OM 5451", "Giống IR 50404", "Giống Jasmine 85", "Giống Nàng Hoa 9", "Giống Khang Dân", "Giống Bắc Hương 9", "Giống Thiên Ưu 8"]
            },
            {
                id: 2,
                name: 'Hoa',
                slug: 'hat-giong-hoa',
                image: '/images/hat-giong-hoa.jpg',
                items: ["Giống hoa hồng", "Giống hoa cúc", "Giống hoa lan"]
            },
            {
                id: 3,
                name: 'Cây ăn quả',
                slug: 'hat-giong-cay-an-qua',
                image: '/images/hat-giong-cay-an-qua.jpg',
                items: ["Giống cây xoài", "Giống cây cam", "Giống cây bưởi"]
            },
            {
                id: 4,
                name: 'Cây công nghiệp',
                slug: 'hat-giong-cay-cong-nghiep',
                image: '/images/hat-giong-cay-cong-nghiep.jpg',
                items: ["Giống cây cao su", "Giống cây cà phê", "Giống cây tiêu"]
            },
            {
                id: 5,
                name: 'Cây dược liệu',
                slug: 'hat-giong-cay-duoc-lieu',
                image: '/images/hat-giong-cay-duoc-lieu.jpg',
                items: ["Giống cây nghệ", "Giống cây gừng", "Giống cây đinh lăng"]
            }
        ]
    },
    {
        id: 2,
        name: 'Phân bón',
        label: 'Phân bón',
        slug: 'phan-bon',
        image: '/images/5-loai-phan-bon-huu-co.jpg',
        icon: '/icons/phan-bon.jpg',
        numberOfProducts: 85,
        subCategories: [
            {
                id: 1,
                name: 'Phân bón hữu cơ',
                slug: 'phan-bon-huu-co',
                image: '/images/phan-bon-huu-co.jpg',
                items: ["Phân bón hữu cơ vi sinh", "Phân bón hữu cơ sinh học", "Phân bón hữu cơ truyền thống"]
            },
            {
                id: 2,
                name: 'Phân bón vô cơ',
                slug: 'phan-bon-vo-co',
                image: '/images/phan-bon-vo-co.jpg',
                items: ["Phân bón NPK", "Phân bón lân", "Phân bón kali"]
            },
            {
                id: 3,
                name: 'Phân bón lá',
                slug: 'phan-bon-la',
                image: '/images/phan-bon-la.jpg',
                items: ["Phân bón lá dinh dưỡng", "Phân bón lá kích thích ra hoa", "Phân bón lá tăng trưởng"]
            },
            {
                id: 4,
                name: 'Phân bón vi sinh',
                slug: 'phan-bon-vi-sinh',
                image: '/images/phan-bon-vi-sinh.jpg',
                items: ["Phân bón vi sinh cho cây trồng", "Phân bón vi sinh cho đất", "Phân bón vi sinh đa năng"]
            },
            {
                id: 5,
                name: 'Phân bón khác',
                slug: 'phan-bon-khac',
                image: '/images/phan-bon-khac.jpg',
                items: ["Phân bón chuyên dụng", "Phân bón hỗn hợp", "Phân bón tự nhiên"]
            }
        ]
    },
    {
        id: 3,
        name: 'Thuốc bảo vệ thực vật',
        label: 'Thuốc BVTV',
        slug: 'thuoc-bvtv',
        image: '/images/thuoc-bao-ve-thuc-vat.jpg',
        icon: '/icons/thuoc-bvtv.png',
        numberOfProducts: 60,
        subCategories: [
            {
                id: 1,
                name: 'Thuốc trừ sâu',
                slug: 'thuoc-tru-sau',
                image: '/images/thuoc-tru-sau.jpg',
                items: ["Thuốc trừ sâu sinh học", "Thuốc trừ sâu hóa học", "Thuốc trừ sâu tổng hợp"]
            },
            {
                id: 2,
                name: 'Thuốc trừ bệnh',
                slug: 'thuoc-tru-benh',
                image: '/images/thuoc-tru-benh.jpg',
                items: ["Thuốc trừ bệnh nấm", "Thuốc trừ bệnh vi khuẩn", "Thuốc trừ bệnh virus"]
            },
            {
                id: 3,
                name: 'Thuốc diệt cỏ',
                slug: 'thuoc-diet-co',
                image: '/images/thuoc-diet-co.jpg',
                items: ["Thuốc diệt cỏ chọn lọc", "Thuốc diệt cỏ không chọn lọc", "Thuốc diệt cỏ sinh học"]
            },
            {
                id: 4,
                name: 'Thuốc diệt nấm',
                slug: 'thuoc-diet-nam',
                image: '/images/thuoc-diet-nam.jpg',
                items: ["Thuốc diệt nấm sinh học", "Thuốc diệt nấm hóa học", "Thuốc diệt nấm tổng hợp"]
            },
            {
                id: 5,
                name: 'Thuốc khác',
                slug: 'thuoc-khac',
                image: '/images/thuoc-khac.jpg',
                items: ["Thuốc kích thích sinh trưởng", "Thuốc phòng ngừa sâu bệnh", "Thuốc bảo vệ cây trồng khác"]
            }
        ]
    },
    {
        id: 5,
        name: 'Thiết bị nông nghiệp',
        label: 'Thiết bị',
        slug: 'thiet-bi',
        image: '/images/thiet-bi-may-moc.jpg',
        icon: '/icons/thiet-bi.webp',
        numberOfProducts: 30,
        subCategories: [
            {
                id: 1,
                name: 'Máy bay nông nghiệp',
                slug: 'may-bay-nong-nghiep',
                image: '/images/may-bay-nong-nghiep.jpg',
                items: ["DJI Agras T20", "Phantom 4 RTK", "Mavic 2 Enterprise"]
            },
            {
                id: 2,
                name: 'Máy phun thuốc',
                slug: 'may-phun-thuoc',
                image: '/images/may-phun-thuoc.jpg',
                items: ["Honda SABRE PL-25PS", "Oshima OS20-L12", "Máy Phun thuốc 2 thì Yamata 767"]
            }
        ]
    },
    {
        id: 6,
        name: 'Dụng cụ',
        label: 'Dụng cụ',
        slug: 'dung-cu',
        image: '/images/dung-cu-nong-nghiep.jpeg',
        icon: '/icons/dung-cu.webp',
        numberOfProducts: 45,
        subCategories: [
            {
                id: 1,
                name: 'Dụng cụ làm đất',
                slug: 'dung-cu-lam-dat',
                image: '/images/dung-cu-lam-dat.jpg',
                items: ["Xẻng", "Cuốc", "Bừa"]
            },
            {
                id: 2,
                name: 'Dụng cụ tưới nước',
                slug: 'dung-cu-tuoi-nuoc',
                image: '/images/dung-cu-tuoi-nuoc.jpg',
                items: ["Ống tưới", "Bình tưới", "Vòi phun"]
            },
            {
                id: 3,
                name: 'Dụng cụ thu hoạch',
                slug: 'dung-cu-thu-hoach',
                image: '/images/dung-cu-thu-hoach.jpg',
                items: ["Dao thu hoạch", "Kéo cắt cành", "Giỏ thu hoạch"]
            },
            {
                id: 4,
                name: 'Dụng cụ bảo quản nông sản',
                slug: 'dung-cu-bao-quan-nong-san',
                image: '/images/dung-cu-bao-quan-nong-san.jpg',
                items: ["Thùng chứa nông sản", "Bình bảo quản", "Giỏ đựng nông sản"]
            },
            {
                id: 5,
                name: 'Dụng cụ khác',
                slug: 'dung-cu-khac',
                image: '/images/dung-cu-khac.jpg',
                items: ["Găng tay làm vườn", "Bộ dụng cụ đa năng", "Thước đo độ ẩm"]
            }
        ]
    },
    {
        id: 7,
        name: 'Vât tư khác',
        label: 'Vật tư khác',
        slug: 'vat-tu-khac',
        image: '/images/vat-tu-khac.jpg',
        numberOfProducts: 20,
        subCategories: [
            {
                id: 1,
                name: 'Hệ thống tưới tiêu',
                slug: 'he-thong-tuoi-tieu',
                image: '/images/he-thong-tuoi-tieu.jpg',
                items: ["Hệ thống tưới nhỏ giọt", "Hệ thống tưới phun mưa", "Hệ thống tưới tự động"]
            },
            {
                id: 2,
                name: 'Hệ thống nhà kính',
                slug: 'he-thong-nha-kinh',
                image: '/images/he-thong-nha-kinh.jpg',
                items: ["Nhà kính trồng rau", "Nhà kính trồng hoa", "Nhà kính trồng cây ăn quả"]
            },
            {
                id: 3,
                name: 'Vật tư bảo vệ cây trồng',
                slug: 'vat-tu-bao-ve-cay-trong',
                image: '/images/vat-tu-bao-ve-cay-trong.jpg',
                items: ["Lưới che nắng", "Lưới chống côn trùng", "Vật tư bảo vệ cây trồng khác"]
            },
            {
                id: 4,
                name: 'Vật tư khác',
                slug: 'vat-tu-khac',
                image: '/images/vat-tu-khac.jpg',
                items: ["Chậu trồng cây", "Giàn leo cây", "Vật tư nông nghiệp khác"]
            }
        ]
    }
];

export default categories;

