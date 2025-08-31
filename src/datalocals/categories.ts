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
                types: [
                    {
                        name: 'Giống lúa Bắc Hương 9',
                        slug: 'giong-lua-bac-huong-9'
                    },
                    {
                        name: 'Giống lúa Khang Dân',
                        slug: 'giong-lua-khang-dan'
                    },
                    {
                        name: 'Giống lúa OM 5451',
                        slug: 'giong-lua-om-5451'
                    },
                    {
                        name: 'Giống lúa IR 50404',
                        slug: 'giong-lua-ir-50404'
                    },
                    {
                        name: 'Giống lúa ST24',
                        slug: 'giong-lua-st24'
                    },
                    {
                        name: 'Giống lúa Nàng Hoa 9',
                        slug: 'giong-lua-nang-hoa-9'
                    },
                    {
                        name: 'Giống lúa Thiên Ưu 8',
                        slug: 'giong-lua-thien-uu-8'
                    }
                ]
            },
            {
                id: 2,
                name: 'Hoa',
                slug: 'hat-giong-hoa',
                types: [
                    {
                        name: 'Giống hoa hồng',
                        slug: 'giong-hoa-hong'
                    },
                    {
                        name: 'Giống hoa cúc',
                        slug: 'giong-hoa-cuc'
                    },
                    {
                        name: 'Giống hoa lan',
                        slug: 'giong-hoa-lan'
                    }
                ]
            },
            {
                id: 3,
                name: 'Cây ăn quả',
                slug: 'hat-giong-cay-an-qua',
                types: [
                    {
                        name: 'Giống cây xoài',
                        slug: 'giong-cay-xoai'
                    },
                    {
                        name: 'Giống cây cam',
                        slug: 'giong-cay-cam'
                    },
                    {
                        name: 'Giống cây bưởi',
                        slug: 'giong-cay-buoi'
                    },
                    {
                        name: 'Giống cây táo',
                        slug: 'giong-cay-tao'
                    }
                ]
            },
            {
                id: 4,
                name: 'Cây công nghiệp',
                slug: 'hat-giong-cay-cong-nghiep',
                types: [
                    {
                        name: 'Giống cây cao su',
                        slug: 'giong-cay-cao-su'
                    },
                    {
                        name: 'Giống cây cà phê',
                        slug: 'giong-cay-ca-phe'
                    },
                    {
                        name: 'Giống cây tiêu',
                        slug: 'giong-cay-tieu'
                    }
                ]
            },
            {
                id: 5,
                name: 'Cây dược liệu',
                slug: 'hat-giong-cay-duoc-lieu',
                types: [
                    {
                        name: 'Giống cây nghệ',
                        slug: 'giong-cay-nghe'
                    },
                    {
                        name: 'Giống cây gừng',
                        slug: 'giong-cay-gung'
                    },
                    {
                        name: 'Giống cây đinh lăng',
                        slug: 'giong-cay-dinh-lang'
                    }
                ]
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
                types: [
                    {
                        name: 'Phân bón hữu cơ vi sinh',
                        slug: 'phan-bon-huu-co-vi-sinh'
                    },
                    {
                        name: 'Phân bón hữu cơ sinh học',
                        slug: 'phan-bon-huu-co-sinh-hoc'
                    },
                    {
                        name: 'Phân bón hữu cơ truyền thống',
                        slug: 'phan-bon-huu-co-truyen-thong'
                    }
                ]
            },
            {
                id: 2,
                name: 'Phân bón vô cơ',
                slug: 'phan-bon-vo-co',
                types: [
                    {
                        name: 'Phân bón NPK',
                        slug: 'phan-bon-npk'
                    },
                    {
                        name: 'Phân bón lân',
                        slug: 'phan-bon-lan'
                    },
                    {
                        name: 'Phân bón kali',
                        slug: 'phan-bon-kali'
                    }
                ]
            },
            {
                id: 3,
                name: 'Phân bón lá',
                slug: 'phan-bon-la',
                types: [
                    {
                        name: 'Phân bón lá dinh dưỡng',
                        slug: 'phan-bon-la-dinh-duong'
                    },
                    {
                        name: 'Phân bón lá kích thích ra hoa',
                        slug: 'phan-bon-la-kich-thich-ra-hoa'
                    },
                    {
                        name: 'Phân bón lá tăng trưởng',
                        slug: 'phan-bon-la-tang-truong'
                    }
                ]
            },
            {
                id: 4,
                name: 'Phân bón vi sinh',
                slug: 'phan-bon-vi-sinh',
                types: [
                    {
                        name: 'Phân bón vi sinh cho cây trồng',
                        slug: 'phan-bon-vi-sinh-cho-cay-trong'
                    },
                    {
                        name: 'Phân bón vi sinh cho đất',
                        slug: 'phan-bon-vi-sinh-cho-dat'
                    },
                    {
                        name: 'Phân bón vi sinh đa năng',
                        slug: 'phan-bon-vi-sinh-da-nang'
                    }
                ]
            },
            {
                id: 5,
                name: 'Phân bón khác',
                slug: 'phan-bon-khac',
                types: [
                    {
                        name: 'Phân bón chuyên dụng',
                        slug: 'phan-bon-chuyen-dung'
                    },
                    {
                        name: 'Phân bón hỗn hợp',
                        slug: 'phan-bon-hon-hop'
                    },
                    {
                        name: 'Phân bón tự nhiên',
                        slug: 'phan-bon-tu-nhien'
                    }
                ]
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
                types: [
                    {
                        name: 'Thuốc trừ sâu sinh học',
                        slug: 'thuoc-tru-sau-sinh-hoc'
                    },
                    {
                        name: 'Thuốc trừ sâu hóa học',
                        slug: 'thuoc-tru-sau-hoa-hoc'
                    },
                    {
                        name: 'Thuốc trừ sâu tổng hợp',
                        slug: 'thuoc-tru-sau-tong-hop'
                    }
                ]
            },
            {
                id: 2,
                name: 'Thuốc trừ bệnh',
                slug: 'thuoc-tru-benh',
                types: [
                    {
                        name: 'Thuốc trừ bệnh nấm',
                        slug: 'thuoc-tru-benh-nam'
                    },
                    {
                        name: 'Thuốc trừ bệnh vi khuẩn',
                        slug: 'thuoc-tru-benh-vi-khuan'
                    },
                    {
                        name: 'Thuốc trừ bệnh virus',
                        slug: 'thuoc-tru-benh-virus'
                    }
                ]
            },
            {
                id: 3,
                name: 'Thuốc diệt cỏ',
                slug: 'thuoc-diet-co',
                types: [
                    {
                        name: 'Thuốc diệt cỏ chọn lọc',
                        slug: 'thuoc-diet-co-chon-loc'
                    },
                    {
                        name: 'Thuốc diệt cỏ không chọn lọc',
                        slug: 'thuoc-diet-co-khong-chon-loc'
                    },
                    {
                        name: 'Thuốc diệt cỏ sinh học',
                        slug: 'thuoc-diet-co-sinh-hoc'
                    }
                ]
            },
            {
                id: 4,
                name: 'Thuốc diệt nấm',
                slug: 'thuoc-diet-nam',
                types: [
                    {
                        name: 'Thuốc diệt nấm sinh học',
                        slug: 'thuoc-diet-nam-sinh-hoc'
                    },
                    {
                        name: 'Thuốc diệt nấm hóa học',
                        slug: 'thuoc-diet-nam-hoa-hoc'
                    },
                    {
                        name: 'Thuốc diệt nấm tổng hợp',
                        slug: 'thuoc-diet-nam-tong-hop'
                    }
                ]
            },
            {
                id: 5,
                name: 'Thuốc khác',
                slug: 'thuoc-khac',
                types: [
                    {
                        name: 'Thuốc kích thích sinh trưởng',
                        slug: 'thuoc-kich-thich-sinh-truong'
                    },
                    {
                        name: 'Thuốc phòng ngừa sâu bệnh',
                        slug: 'thuoc-phong-ngua-sau-benh'
                    },
                    {
                        name: 'Thuốc bảo vệ cây trồng khác',
                        slug: 'thuoc-bao-ve-cay-trong-khac'
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'Thiết bị nông nghiệp',
        label: 'Thiết bị nông nghiệp',
        slug: 'thiet-bi',
        image: '/images/thiet-bi-may-moc.jpg',
        icon: '/icons/thiet-bi.webp',
        numberOfProducts: 30,
        subCategories: [
            {
                id: 1,
                name: 'Máy bay nông nghiệp',
                slug: 'may-bay-nong-nghiep',
                types: [
                    {
                        name: 'DJI Agras T20',
                        slug: 'dji-agras-t20'
                    },
                    {
                        name: 'Phantom 4 RTK',
                        slug: 'phantom-4-rtk'
                    },
                    {
                        name: 'Mavic 2 Enterprise',
                        slug: 'mavic-2-enterprise'
                    }
                ]
            },
            {
                id: 2,
                name: 'Máy phun thuốc',
                slug: 'may-phun-thuoc',
                types: [
                    {
                        name: 'Honda SABRE PL-25PS',
                        slug: 'honda-sabre-pl-25ps'
                    },
                    {
                        name: 'Oshima OS20-L12',
                        slug: 'oshima-os20-l12'
                    },
                    {
                        name: 'Máy Phun thuốc 2 thì Yamata 767',
                        slug: 'may-phun-thuoc-2-thi-yamata-767'
                    }
                ]
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
                types: [
                    {
                        name: 'Xẻng',
                        slug: 'xeng'
                    },
                    {
                        name: 'Cuốc',
                        slug: 'cuoc'
                    },
                    {
                        name: 'Bừa',
                        slug: 'bua'
                    }
                ]
            },
            {
                id: 2,
                name: 'Dụng cụ tưới nước',
                slug: 'dung-cu-tuoi-nuoc',
                types: [
                    {
                        name: 'Ống tưới',
                        slug: 'ong-tuoi'
                    },
                    {
                        name: 'Bình tưới',
                        slug: 'binh-tuoi'
                    },
                    {
                        name: 'Vòi phun',
                        slug: 'voi-phun'
                    }
                ]
            },
            {
                id: 3,
                name: 'Dụng cụ thu hoạch',
                slug: 'dung-cu-thu-hoach',
                types: [
                    {
                        name: 'Dao thu hoạch',
                        slug: 'dao-thu-hoach'
                    },
                    {
                        name: 'Kéo cắt cành',
                        slug: 'keo-cat-canh'
                    },
                    {
                        name: 'Giỏ thu hoạch',
                        slug: 'gio-thu-hoach'
                    }
                ]
            },
            {
                id: 4,
                name: 'Dụng cụ bảo quản nông sản',
                slug: 'dung-cu-bao-quan-nong-san',
                types: [
                    {
                        name: 'Thùng chứa nông sản',
                        slug: 'thung-chua-nong-san'
                    },
                    {
                        name: 'Bình bảo quản',
                        slug: 'binh-bao-quan'
                    },
                    {
                        name: 'Giỏ đựng nông sản',
                        slug: 'gio-dung-nong-san'
                    }
                ]
            },
            {
                id: 5,
                name: 'Dụng cụ khác',
                slug: 'dung-cu-khac',
                types: [
                    {
                        name: 'Găng tay làm vườn',
                        slug: 'gang-tay-lam-vuon'
                    },
                    {
                        name: 'Bộ dụng cụ đa năng',
                        slug: 'bo-dung-cu-da-nang'
                    },
                    {
                        name: 'Thước đo độ ẩm',
                        slug: 'thước-do-do-am'
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'Vât tư khác',
        label: 'Vật tư khác',
        slug: 'vat-tu-khac',
        image: null,
        icon: '/icons/different.jpg',
        numberOfProducts: 20,
        subCategories: [
            {
                id: 1,
                name: 'Hệ thống tưới tiêu',
                slug: 'he-thong-tuoi-tieu',
                types: [
                    {
                        name: 'Hệ thống tưới nhỏ giọt',
                        slug: 'he-thong-tuoi-nho-giot'
                    },
                    {
                        name: 'Hệ thống tưới phun mưa',
                        slug: 'he-thong-tuoi-phun-mua'
                    },
                    {
                        name: 'Hệ thống tưới tự động',
                        slug: 'he-thong-tuoi-tu-dong'
                    }
                ]
            },
            {
                id: 2,
                name: 'Hệ thống nhà kính',
                slug: 'he-thong-nha-kinh',
                types: [
                    {
                        name: 'Nhà kính trồng rau',
                        slug: 'nha-kinh-trong-rau'
                    },
                    {
                        name: 'Nhà kính trồng hoa',
                        slug: 'nha-kinh-trong-hoa'
                    },
                    {
                        name: 'Nhà kính trồng cây ăn quả',
                        slug: 'nha-kinh-trong-cay-an-qua'
                    }
                ]
            },
            {
                id: 3,
                name: 'Vật tư bảo vệ cây trồng',
                slug: 'vat-tu-bao-ve-cay-trong',
                types: [
                    {
                        name: 'Lưới che nắng',
                        slug: 'luoi-che-nang'
                    },
                    {
                        name: 'Lưới chống côn trùng',
                        slug: 'luoi-chong-con-trung'
                    },
                    {
                        name: 'Vật tư bảo vệ cây trồng khác',
                        slug: 'vat-tu-bao-ve-cay-trong-khac'
                    }
                ]
            },
            {
                id: 4,
                name: 'Vật tư khác',
                slug: 'vat-tu-khac',
                types: [
                    {
                        name: 'Chậu trồng cây',
                        slug: 'chau-trong-cay'
                    },
                    {
                        name: 'Giàn leo cây',
                        slug: 'gian-leo-cay'
                    },
                    {
                        name: 'Vật tư nông nghiệp khác',
                        slug: 'vat-tu-nong-nghiep-khac'
                    }
                ]
            }
        ]
    }
];

export default categories;

