const categories = [
    {
        id: 1,
        name: 'Hạt giống',
        slug: 'hat-giong',
        image: '/images/hat-giong.webp',
        numberOfProducts: 120,
        subCategories: [
            {
                id: 1,
                name: 'Hạt giống rau',
                slug: 'hat-giong-rau',
                image: '/images/hat-giong-rau.jpg',
            },
            {
                id: 2,
                name: 'Hạt giống hoa',
                slug: 'hat-giong-hoa',
                image: '/images/hat-giong-hoa.jpg',
            },
            {
                id: 3,
                name: 'Hạt giống cây ăn quả',
                slug: 'hat-giong-cay-an-qua',
                image: '/images/hat-giong-cay-an-qua.jpg',
            },
            {
                id: 4,
                name: 'Hạt giống cây cảnh',
                slug: 'hat-giong-cay-canh',
                image: '/images/hat-giong-cay-canh.jpg',
            },
            {
                id: 5,
                name: 'Hạt giống cây công nghiệp',
                slug: 'hat-giong-cay-cong-nghiep',
                image: '/images/hat-giong-cay-cong-nghiep.jpg',
            },
            {
                id: 6,
                name: 'Hạt giống cây dược liệu',
                slug: 'hat-giong-cay-duoc-lieu',
                image: '/images/hat-giong-cay-duoc-lieu.jpg',
            },
            {
                id: 7,
                name: 'Hạt giống cây khác',
                slug: 'hat-giong-cay-khac',
                image: '/images/hat-giong-cay-khac.jpg',
            }
        ]
    },
    {
        id: 2,
        name: 'Phân bón',
        slug: 'phan-bon',
        image: '/images/5-loai-phan-bon-huu-co.jpg',
        numberOfProducts: 85,
        subCategories: [
            {
                id: 1,
                name: 'Phân bón hữu cơ',
                slug: 'phan-bon-huu-co',
                image: '/images/phan-bon-huu-co.jpg',
            },
            {
                id: 2,
                name: 'Phân bón vô cơ',
                slug: 'phan-bon-vo-co',
                image: '/images/phan-bon-vo-co.jpg',
            },
            {
                id: 3,
                name: 'Phân bón lá',
                slug: 'phan-bon-la',
                image: '/images/phan-bon-la.jpg',
            },
            {
                id: 4,
                name: 'Phân bón vi sinh',
                slug: 'phan-bon-vi-sinh',
                image: '/images/phan-bon-vi-sinh.jpg',
            },
            {
                id: 5,
                name: 'Phân bón khác',
                slug: 'phan-bon-khac',
                image: '/images/phan-bon-khac.jpg',
            }
        ]
    },
    {
        id: 3,
        name: 'Thuốc bảo vệ thực vật',
        slug: 'thuoc-bvtv',
        image: '/images/thuoc-bao-ve-thuc-vat.jpg',
        numberOfProducts: 60,
        subCategories: [
            {
                id: 1,
                name: 'Thuốc trừ sâu',
                slug: 'thuoc-tru-sau',
                image: '/images/thuoc-tru-sau.jpg',
            },
            {
                id: 2,
                name: 'Thuốc trừ bệnh',
                slug: 'thuoc-tru-benh',
                image: '/images/thuoc-tru-benh.jpg',
            },
            {
                id: 3,
                name: 'Thuốc diệt cỏ',
                slug: 'thuoc-diet-co',
                image: '/images/thuoc-diet-co.jpg',
            },
            {
                id: 4,
                name: 'Thuốc diệt nấm',
                slug: 'thuoc-diet-nam',
                image: '/images/thuoc-diet-nam.jpg',
            },
            {
                id: 5,
                name: 'Thuốc khác',
                slug: 'thuoc-khac',
                image: '/images/thuoc-khac.jpg',
            }
        ]
    },
    {
        id: 5,
        name: 'Thiết bị nông nghiệp',
        slug: 'thiet-bi',
        image: '/images/thiet-bi-may-moc.jpg',
        numberOfProducts: 30,
        subCategories: [
            {
                id: 1,
                name: 'Máy cày',
                slug: 'may-cay',
                image: '/images/may-cay.jpg',
            },
            {
                id: 2,
                name: 'Máy gặt',
                slug: 'may-gat',
                image: '/images/may-gat.jpg',
            },
            {
                id: 3,
                name: 'Máy phun thuốc',
                slug: 'may-phun-thuoc',
                image: '/images/may-phun-thuoc.jpg',
            },
            {
                id: 4,
                name: 'Máy bơm nước',
                slug: 'may-bom-nuoc',
                image: '/images/may-bom-nuoc.jpg',
            },
            {
                id: 5,
                name: 'Máy khác',
                slug: 'may-khac',
                image: '/images/may-khac.jpg',
            }
        ]
    },
    {
        id: 6,
        name: 'Dụng cụ',
        slug: 'dung-cu',
        image: '/images/dung-cu-nong-nghiep.jpeg',
        numberOfProducts: 45,
        subCategories: [
            {
                id: 1,
                name: 'Dụng cụ làm đất',
                slug: 'dung-cu-lam-dat',
                image: '/images/dung-cu-lam-dat.jpg',
            },
            {
                id: 2,
                name: 'Dụng cụ tưới nước',
                slug: 'dung-cu-tuoi-nuoc',
                image: '/images/dung-cu-tuoi-nuoc.jpg',
            },
            {
                id: 3,
                name: 'Dụng cụ thu hoạch',
                slug: 'dung-cu-thu-hoach',
                image: '/images/dung-cu-thu-hoach.jpg',
            },
            {
                id: 4,
                name: 'Dụng cụ bảo quản nông sản',
                slug: 'dung-cu-bao-quan-nong-san',
                image: '/images/dung-cu-bao-quan-nong-san.jpg',
            },
            {
                id: 5,
                name: 'Dụng cụ khác',
                slug: 'dung-cu-khac',
                image: '/images/dung-cu-khac.jpg',
            }
        ]
    },
    {
        id: 7,
        name: 'Vât tư khác',
        slug: 'vat-tu-khac',
        image: '/images/vat-tu-khac.jpg',
        numberOfProducts: 20,
        subCategories: [
            {
                id: 1,
                name: 'Hệ thống tưới tiêu',
                slug: 'he-thong-tuoi-tieu',
                image: '/images/he-thong-tuoi-tieu.jpg',
            },
            {
                id: 2,
                name: 'Hệ thống nhà kính',
                slug: 'he-thong-nha-kinh',
                image: '/images/he-thong-nha-kinh.jpg',
            },
            {
                id: 3,
                name: 'Vật tư bảo vệ cây trồng',
                slug: 'vat-tu-bao-ve-cay-trong',
                image: '/images/vat-tu-bao-ve-cay-trong.jpg',
            },
            {
                id: 4,
                name: 'Vật tư khác',
                slug: 'vat-tu-khac',
                image: '/images/vat-tu-khac.jpg',
            }
        ]
    }
];

export default categories;

