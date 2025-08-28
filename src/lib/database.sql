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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Table: category
CREATE TABLE
    category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        label VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        image VARCHAR(255) NOT NULL,
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
        image VARCHAR(255) NOT NULL,
        icon VARCHAR(255) NOT NULL,
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
        stock INT NOT NULL DEFAULT 0,
        category_id INT NOT NULL,
        subcategory_id INT NOT NULL,
        type_subcategory_id INT NOT NULL,
        image VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE,
        FOREIGN KEY (subcategory_id) REFERENCES subcategory (id) ON DELETE CASCADE,
        FOREIGN KEY (type_subcategory_id) REFERENCES TypeSubcategory (id) ON DELETE CASCADE
    );

-- Table: PriceHistory
CREATE TABLE
    PriceHistory (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        effective_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE
    );

-- Table: Discount
CREATE TABLE
    Discount (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT NOT NULL,
        discount_percentage DECIMAL(5, 2) NOT NULL,
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES Product (id) ON DELETE CASCADE
    );
