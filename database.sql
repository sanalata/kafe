-- Create database
CREATE DATABASE IF NOT EXISTS cafe_ordering_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafe_ordering_system;

-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    room_number VARCHAR(10) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    credits DECIMAL(10, 2) DEFAULT 0.00,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    category_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_category (category_id),
    INDEX idx_stock (stock)
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'preparing', 'delivering', 'completed') DEFAULT 'pending',
    total_credits DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- Order items table
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_order (order_id)
);

-- Credit transactions table
CREATE TABLE credit_transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('add', 'subtract', 'order') NOT NULL,
    reference_id VARCHAR(36),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id)
);

-- Insert default categories
INSERT INTO categories (id, name) VALUES
    (UUID(), 'Sıcak İçecekler'),
    (UUID(), 'Soğuk İçecekler'),
    (UUID(), 'Pastane Ürünleri'),
    (UUID(), 'Market Ürünleri');

-- Insert admin user (password: admin123)
INSERT INTO users (id, name, room_number, username, password_hash, credits, role) VALUES
    (UUID(), 'Admin User', 'ADMIN', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, 'admin');

-- Create triggers for stock management
DELIMITER //

CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products 
    SET stock = stock - NEW.quantity 
    WHERE id = NEW.product_id;
END//

CREATE TRIGGER after_order_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO credit_transactions (id, user_id, amount, type, reference_id, notes)
        VALUES (UUID(), NEW.user_id, -NEW.total_credits, 'order', NEW.id, 'Order payment');
        
        UPDATE users 
        SET credits = credits - NEW.total_credits 
        WHERE id = NEW.user_id;
    END IF;
END//

DELIMITER ;

-- Create views for analytics
CREATE VIEW daily_orders_view AS
SELECT 
    DATE(created_at) as order_date,
    COUNT(*) as total_orders,
    SUM(total_credits) as total_revenue
FROM orders
GROUP BY DATE(created_at);

CREATE VIEW product_analytics_view AS
SELECT 
    p.id,
    p.name,
    p.category_id,
    c.name as category_name,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as total_quantity_sold,
    SUM(oi.quantity * oi.price_per_unit) as total_revenue
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed' OR o.status IS NULL
GROUP BY p.id, p.name, p.category_id, c.name;

-- Create indexes for better performance
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_credit_transactions_created ON credit_transactions(created_at);