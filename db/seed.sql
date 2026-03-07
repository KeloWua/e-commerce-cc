-- CATEGORIES
INSERT INTO categories (name) VALUES
('Electronics'),
('Clothing'),
('Books');

-- PRODUCTS
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Smartphone X1', 'Latest model with OLED screen', 799.99, 10, 'https://picsum.photos/seed/p1/300/200', 1),
('Laptop Pro 15', 'Powerful laptop for professionals', 1299.99, 5, 'https://picsum.photos/seed/p2/300/200', 1),
('Wireless Earbuds', 'Noise-cancelling earbuds', 149.99, 20, 'https://picsum.photos/seed/p3/300/200', 1),
('Smartwatch S', 'Track your health and notifications', 199.99, 15, 'https://picsum.photos/seed/p4/300/200', 1),
('Mens T-Shirt', '100% cotton, comfortable', 25.99, 50, 'https://picsum.photos/seed/p5/300/200', 2),
('Women Jeans', 'Slim fit, stretchy', 49.99, 30, 'https://picsum.photos/seed/p6/300/200', 2),
('Jacket Unisex', 'Warm and waterproof', 89.99, 20, 'https://picsum.photos/seed/p7/300/200', 2),
('Running Shoes', 'Lightweight sneakers', 59.99, 40, 'https://picsum.photos/seed/p8/300/200', 2),
('Fantasy Novel', 'Epic tale of adventure', 19.99, 100, 'https://picsum.photos/seed/p9/300/200', 3),
('Science Book', 'Learn the basics of physics', 29.99, 60, 'https://picsum.photos/seed/p10/300/200', 3),
('Cookbook', 'Easy recipes for beginners', 24.99, 70, 'https://picsum.photos/seed/p11/300/200', 3),
('Mystery Thriller', 'Edge-of-your-seat story', 21.99, 50, 'https://picsum.photos/seed/p12/300/200', 3),
('Bluetooth Speaker', 'Portable and waterproof', 79.99, 25, 'https://picsum.photos/seed/p13/300/200', 1),
('Hoodie Unisex', 'Comfortable and stylish', 39.99, 35, 'https://picsum.photos/seed/p14/300/200', 2),
('Notebook Pack', 'Set of 5 notebooks', 12.99, 100, 'https://picsum.photos/seed/p15/300/200', 3);

-- REVIEWS
-- Producto 1: Smartphone X1
INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Amazing phone, battery lasts all day!'),
(1, 2, 4, 'Great screen and performance.'),
(5, 3, 4, 'Very comfortable and fits perfectly.'),
(9, 2, 5, 'Couldn’t put it down! Epic adventure.');

INSERT INTO categories (name) VALUES
('beauty'),
('fragrances'),
('furniture'),
('groceries'),
('home decoration'),
('kitchen accessories'),
('laptops'),
('mens shirts'),
('mens shoes'),
('mens watches'),
('mobile accessories'),
('motorcycle'),
('skin care'),
('smartphones'),
('sports accessories'),
('sunglasses'),
('tablets'),
('tops'),
('vehicle'),
('womens bags'),
('womens dresses'),
('womens jewellery'),
('womens shoes'),
('womens watches');