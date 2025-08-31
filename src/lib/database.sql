-- Table: users
CREATE TABLE
    users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        address VARCHAR(255),
        phone VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Table: category
CREATE TABLE
    category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        label VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        image VARCHAR(255),
        icon VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Table: subcategory
CREATE TABLE
    subcategory (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        image VARCHAR(255),
        icon VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE
    );

-- Table: TypeSubcategory
CREATE TABLE
    TypeSubcategory (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        subcategory_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subcategory_id) REFERENCES subcategory (id) ON DELETE CASCADE
    );

-- Table: Product
CREATE TABLE
    Product (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        price_sale DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        type_subcategory_id INT NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (type_subcategory_id) REFERENCES TypeSubcategory (id) ON DELETE CASCADE
    );

-- Table: Image
CREATE TABLE
    Image (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE
    );

-- Table: Feedback
CREATE TABLE
    Feedback (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE
    );


-- INSERT INTO
INSERT INTO category (id, name, description, label, slug, image, icon) VALUES
(1, 'Hạt giống', NULL, 'Hạt giống', 'hat-giong', '/images/hat-giong.webp', '/icons/hat-giong.png'),
(2, 'Phân bón', NULL, 'Phân bón', 'phan-bon', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
(3, 'Thuốc bảo vệ thực vật', NULL, 'Thuốc BVTV', 'thuoc-bvtv', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
(5, 'Thiết bị nông nghiệp', NULL, '    ', 'thiet-bi', '/images/thiet-bi-may-moc.jpg', '/icons/thiet-bi.webp'),
(6, 'Dụng cụ', NULL, 'Dụng cụ', 'dung-cu', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
(7, 'Vật tư khác', NULL, 'Vật tư khác', 'vat-tu-khac', NULL, '/icons/different.jpg');

INSERT INTO subcategory (id, name, description, category_id, slug, image, icon) VALUES
-- Subcategories for Hạt giống (category_id: 1)
(1, 'Lúa', NULL, 1, 'hat-giong-lua', '/images/hat-giong.webp', '/icons/hat-giong.png'),
(2, 'Hoa', NULL, 1, 'hat-giong-hoa', '/images/hat-giong.webp', '/icons/hat-giong.png'),
(3, 'Cây ăn quả', NULL, 1, 'hat-giong-cay-an-qua', '/images/hat-giong.webp', '/icons/hat-giong.png'),
(4, 'Cây công nghiệp', NULL, 1, 'hat-giong-cay-cong-nghiep', '/images/hat-giong.webp', '/icons/hat-giong.png'),
(5, 'Cây dược liệu', NULL, 1, 'hat-giong-cay-duoc-lieu', '/images/hat-giong.webp', '/icons/hat-giong.png'),
-- Subcategories for Phân bón (category_id: 2)
(6, 'Phân bón hữu cơ', NULL, 2, 'phan-bon-huu-co', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
(7, 'Phân bón vô cơ', NULL, 2, 'phan-bon-vo-co', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
(8, 'Phân bón lá', NULL, 2, 'phan-bon-la', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
(9, 'Phân bón vi sinh', NULL, 2, 'phan-bon-vi-sinh', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
(10, 'Phân bón khác', NULL, 2, 'phan-bon-khac', '/images/5-loai-phan-bon-huu-co.jpg', '/icons/phan-bon.jpg'),
-- Subcategories for Thuốc bảo vệ thực vật (category_id: 3)
(11, 'Thuốc trừ sâu', NULL, 3, 'thuoc-tru-sau', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
(12, 'Thuốc trừ bệnh', NULL, 3, 'thuoc-tru-benh', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
(13, 'Thuốc diệt cỏ', NULL, 3, 'thuoc-diet-co', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
(14, 'Thuốc diệt nấm', NULL, 3, 'thuoc-diet-nam', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
(15, 'Thuốc khác', NULL, 3, 'thuoc-khac', '/images/thuoc-bao-ve-thuc-vat.jpg', '/icons/thuoc-bvtv.png'),
-- Subcategories for Thiết bị nông nghiệp (category_id: 5)
(16, 'Máy bay nông nghiệp', NULL, 5, 'may-bay-nong-nghiep', '/images/thiet-bi-may-moc.jpg', '/icons/thiet-bi.webp'),
(17, 'Máy phun thuốc', NULL, 5, 'may-phun-thuoc', '/images/thiet-bi-may-moc.jpg', '/icons/thiet-bi.webp'),
-- Subcategories for Dụng cụ (category_id: 6)
(18, 'Dụng cụ làm đất', NULL, 6, 'dung-cu-lam-dat', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
(19, 'Dụng cụ tưới nước', NULL, 6, 'dung-cu-tuoi-nuoc', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
(20, 'Dụng cụ thu hoạch', NULL, 6, 'dung-cu-thu-hoach', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
(21, 'Dụng cụ bảo quản nông sản', NULL, 6, 'dung-cu-bao-quan-nong-san', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
(22, 'Dụng cụ khác', NULL, 6, 'dung-cu-khac', '/images/dung-cu-nong-nghiep.jpeg', '/icons/dung-cu.webp'),
-- Subcategories for Vật tư khác (category_id: 7)
(23, 'Hệ thống tưới tiêu', NULL, 7, 'he-thong-tuoi-tieu', NULL, '/icons/different.jpg'),
(24, 'Hệ thống nhà kính', NULL, 7, 'he-thong-nha-kinh', NULL, '/icons/different.jpg'),
(25, 'Vật tư bảo vệ cây trồng', NULL, 7, 'vat-tu-bao-ve-cay-trong', NULL, '/icons/different.jpg'),
(26, 'Vật tư khác', NULL, 7, 'vat-tu-khac', NULL, '/icons/different.jpg');

INSERT INTO TypeSubcategory (id, name, slug, subcategory_id) VALUES
-- Types for Lúa (subcategory_id: 1)
(1, 'Giống lúa Bắc Hương 9', 'giong-lua-bac-huong-9', 1),
(2, 'Giống lúa Khang Dân', 'giong-lua-khang-dan', 1),
(3, 'Giống lúa OM 5451', 'giong-lua-om-5451', 1),
(4, 'Giống lúa IR 50404', 'giong-lua-ir-50404', 1),
(5, 'Giống lúa ST24', 'giong-lua-st24', 1),
(6, 'Giống lúa Nàng Hoa 9', 'giong-lua-nang-hoa-9', 1),
(7, 'Giống lúa Thiên Ưu 8', 'giong-lua-thien-uu-8', 1),
-- Types for Hoa (subcategory_id: 2)
(8, 'Giống hoa hồng', 'giong-hoa-hong', 2),
(9, 'Giống hoa cúc', 'giong-hoa-cuc', 2),
(10, 'Giống hoa lan', 'giong-hoa-lan', 2),
-- Types for Cây ăn quả (subcategory_id: 3)
(11, 'Giống cây xoài', 'giong-cay-xoai', 3),
(12, 'Giống cây cam', 'giong-cay-cam', 3),
(13, 'Giống cây bưởi', 'giong-cay-buoi', 3),
(14, 'Giống cây táo', 'giong-cay-tao', 3),
-- Types for Cây công nghiệp (subcategory_id: 4)
(15, 'Giống cây cao su', 'giong-cay-cao-su', 4),
(16, 'Giống cây cà phê', 'giong-cay-ca-phe', 4),
(17, 'Giống cây tiêu', 'giong-cay-tieu', 4),
-- Types for Cây dược liệu (subcategory_id: 5)
(18, 'Giống cây nghệ', 'giong-cay-nghe', 5),
(19, 'Giống cây gừng', 'giong-cay-gung', 5),
(20, 'Giống cây đinh lăng', 'giong-cay-dinh-lang', 5),
-- Types for Phân bón hữu cơ (subcategory_id: 6)
(21, 'Phân bón hữu cơ vi sinh', 'phan-bon-huu-co-vi-sinh', 6),
(22, 'Phân bón hữu cơ sinh học', 'phan-bon-huu-co-sinh-hoc', 6),
(23, 'Phân bón hữu cơ truyền thống', 'phan-bon-huu-co-truyen-thong', 6),
-- Types for Phân bón vô cơ (subcategory_id: 7)
(24, 'Phân bón NPK', 'phan-bon-npk', 7),
(25, 'Phân bón lân', 'phan-bon-lan', 7),
(26, 'Phân bón kali', 'phan-bon-kali', 7),
-- Types for Phân bón lá (subcategory_id: 8)
(27, 'Phân bón lá dinh dưỡng', 'phan-bon-la-dinh-duong', 8),
(28, 'Phân bón lá kích thích ra hoa', 'phan-bon-la-kich-thich-ra-hoa', 8),
(29, 'Phân bón lá tăng trưởng', 'phan-bon-la-tang-truong', 8),
-- Types for Phân bón vi sinh (subcategory_id: 9)
(30, 'Phân bón vi sinh cho cây trồng', 'phan-bon-vi-sinh-cho-cay-trong', 9),
(31, 'Phân bón vi sinh cho đất', 'phan-bon-vi-sinh-cho-dat', 9),
(32, 'Phân bón vi sinh đa năng', 'phan-bon-vi-sinh-da-nang', 9),
-- Types for Phân bón khác (subcategory_id: 10)
(33, 'Phân bón chuyên dụng', 'phan-bon-chuyen-dung', 10),
(34, 'Phân bón hỗn hợp', 'phan-bon-hon-hop', 10),
(35, 'Phân bón tự nhiên', 'phan-bon-tu-nhien', 10),
-- Types for Thuốc trừ sâu (subcategory_id: 11)
(36, 'Thuốc trừ sâu sinh học', 'thuoc-tru-sau-sinh-hoc', 11),
(37, 'Thuốc trừ sâu hóa học', 'thuoc-tru-sau-hoa-hoc', 11),
(38, 'Thuốc trừ sâu tổng hợp', 'thuoc-tru-sau-tong-hop', 11),
-- Types for Thuốc trừ bệnh (subcategory_id: 12)
(39, 'Thuốc trừ bệnh nấm', 'thuoc-tru-benh-nam', 12),
(40, 'Thuốc trừ bệnh vi khuẩn', 'thuoc-tru-benh-vi-khuan', 12),
(41, 'Thuốc trừ bệnh virus', 'thuoc-tru-benh-virus', 12),
-- Types for Thuốc diệt cỏ (subcategory_id: 13)
(42, 'Thuốc diệt cỏ chọn lọc', 'thuoc-diet-co-chon-loc', 13),
(43, 'Thuốc diệt cỏ không chọn lọc', 'thuoc-diet-co-khong-chon-loc', 13),
(44, 'Thuốc diệt cỏ sinh học', 'thuoc-diet-co-sinh-hoc', 13),
-- Types for Thuốc diệt nấm (subcategory_id: 14)
(45, 'Thuốc diệt nấm sinh học', 'thuoc-diet-nam-sinh-hoc', 14),
(46, 'Thuốc diệt nấm hóa học', 'thuoc-diet-nam-hoa-hoc', 14),
(47, 'Thuốc diệt nấm tổng hợp', 'thuoc-diet-nam-tong-hop', 14),
-- Types for Thuốc khác (subcategory_id: 15)
(48, 'Thuốc kích thích sinh trưởng', 'thuoc-kich-thich-sinh-truong', 15),
(49, 'Thuốc phòng ngừa sâu bệnh', 'thuoc-phong-ngua-sau-benh', 15),
(50, 'Thuốc bảo vệ cây trồng khác', 'thuoc-bao-ve-cay-trong-khac', 15),
-- Types for Máy bay nông nghiệp (subcategory_id: 16)
(51, 'DJI Agras T20', 'dji-agras-t20', 16),
(52, 'Phantom 4 RTK', 'phantom-4-rtk', 16),
(53, 'Mavic 2 Enterprise', 'mavic-2-enterprise', 16),
-- Types for Máy phun thuốc (subcategory_id: 17)
(54, 'Honda SABRE PL-25PS', 'honda-sabre-pl-25ps', 17),
(55, 'Oshima OS20-L12', 'oshima-os20-l12', 17),
(56, 'Máy Phun thuốc 2 thì Yamata 767', 'may-phun-thuoc-2-thi-yamata-767', 17),
-- Types for Dụng cụ làm đất (subcategory_id: 18)
(57, 'Xẻng', 'xeng', 18),
(58, 'Cuốc', 'cuoc', 18),
(59, 'Bừa', 'bua', 18),
-- Types for Dụng cụ tưới nước (subcategory_id: 19)
(60, 'Ống tưới', 'ong-tuoi', 19),
(61, 'Bình tưới', 'binh-tuoi', 19),
(62, 'Vòi phun', 'voi-phun', 19),
-- Types for Dụng cụ thu hoạch (subcategory_id: 20)
(63, 'Dao thu hoạch', 'dao-thu-hoach', 20),
(64, 'Kéo cắt cành', 'keo-cat-canh', 20),
(65, 'Giỏ thu hoạch', 'gio-thu-hoach', 20),
-- Types for Dụng cụ bảo quản nông sản (subcategory_id: 21)
(66, 'Thùng chứa nông sản', 'thung-chua-nong-san', 21),
(67, 'Bình bảo quản', 'binh-bao-quan', 21),
(68, 'Giỏ đựng nông sản', 'gio-dung-nong-san', 21),
-- Types for Dụng cụ khác (subcategory_id: 22)
(69, 'Găng tay làm vườn', 'gang-tay-lam-vuon', 22),
(70, 'Bộ dụng cụ đa năng', 'bo-dung-cu-da-nang', 22),
(71, 'Thước đo độ ẩm', 'thước-do-do-am', 22),
-- Types for Hệ thống tưới tiêu (subcategory_id: 23)
(72, 'Hệ thống tưới nhỏ giọt', 'he-thong-tuoi-nho-giot', 23),
(73, 'Hệ thống tưới phun mưa', 'he-thong-tuoi-phun-mua', 23),
(74, 'Hệ thống tưới tự động', 'he-thong-tuoi-tu-dong', 23),
-- Types for Hệ thống nhà kính (subcategory_id: 24)
(75, 'Nhà kính trồng rau', 'nha-kinh-trong-rau', 24),
(76, 'Nhà kính trồng hoa', 'nha-kinh-trong-hoa', 24),
(77, 'Nhà kính trồng cây ăn quả', 'nha-kinh-trong-cay-an-qua', 24),
-- Types for Vật tư bảo vệ cây trồng (subcategory_id: 25)
(78, 'Lưới che nắng', 'luoi-che-nang', 25),
(79, 'Lưới chống côn trùng', 'luoi-chong-con-trung', 25),
(80, 'Vật tư bảo vệ cây trồng khác', 'vat-tu-bao-ve-cay-trong-khac', 25),
-- Types for Vật tư khác (subcategory_id: 26)
(81, 'Chậu trồng cây', 'chau-trong-cay', 26),
(82, 'Giàn leo cây', 'gian-leo-cay', 26),
(83, 'Vật tư nông nghiệp khác', 'vat-tu-nong-nghiep-khac', 26);
