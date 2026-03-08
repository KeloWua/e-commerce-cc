import pool from "../config/db.js";

/**
 * Get all products with optional filters, search and pagination
 */
export const getProducts = async (req, res) => {
    try {
        const {
            search,
            minPrice,
            maxPrice,
            category,
            sort,
            page = 1,
            limit = 12,
        } = req.query;

        let query = `SELECT * FROM products`;
        let conditions = [];
        let values = [];

        // Dynamic filters based on query params
        if (search) {
            values.push(`%${search}%`);
            conditions.push(`name ILIKE $${values.length}`);
        }

        if (minPrice) {
            values.push(minPrice);
            conditions.push(`price >= $${values.length}`);
        }

        if (maxPrice) {
            values.push(maxPrice);
            conditions.push(`price <= $${values.length}`);
        }

        if (category) {
            values.push(category);
            conditions.push(`category_id = $${values.length}`);
        }

        // Apply WHERE clause if we have filters
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        // Handle sorting
        const sortOptions = {
            price_asc: " ORDER BY price ASC",
            price_desc: " ORDER BY price DESC",
            newest: " ORDER BY created_at DESC",
            rating_asc: " ORDER BY rating ASC",
            rating_desc: " ORDER BY rating DESC"
        };

        if (sortOptions[sort]) {
            query += sortOptions[sort];
        }

        // Get total count for pagination before limiting the main query
        const totalQuery = `SELECT COUNT(*) FROM products ${conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : ""}`;
        const totalResult = await pool.query(totalQuery, values);
        const total = Number(totalResult.rows[0].count);

        // Pagination logic
        const offset = (page - 1) * limit;
        values.push(limit);
        values.push(offset);
        query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const { rows: products } = await pool.query(query, values);

        res.json({
            ok: true,
            products,
            total
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get all available categories
 */
export const getCategories = async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT id, name FROM categories`);
        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: "No categories found" });
        }
        res.json({ categories: rows });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

/**
 * Get a single product by ID including its reviews
 */
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: "Product not found" });
        }

        const { rows: reviews } = await pool.query(`
            SELECT r.id, r.rating, r.comment, r.created_at, u.name AS user_name, r.user_id
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC
        `, [id]);

        res.json({
            ok: true,
            product: rows[0],
            reviews: reviews
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product details' });
    }
};

/**
 * Create a new product (Admin only)
 */
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, category_id } = req.body;
        if (!name || !price) {
            return res.status(400).json({ ok: false, message: "Name and price are required" });
        }

        const { rows } = await pool.query(`
            INSERT INTO products (name, description, price, image_url, category_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [name, description, price, imageUrl, category_id]);

        res.status(201).json({
            ok: true,
            product: rows[0]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};

/**
 * Add or update a product review
 */
export const createOrUpdateReview = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) return res.status(400).json({ message: "Invalid product ID" });
    if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be between 1 and 5" });
    if (!comment || comment.trim() === "") return res.status(400).json({ message: "Review comment cannot be empty" });

    try {
        const productResult = await pool.query("SELECT id FROM products WHERE id = $1", [productIdNumber]);
        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if user already reviewed this product
        const existingReview = await pool.query(
            "SELECT id FROM reviews WHERE product_id = $1 AND user_id = $2",
            [productIdNumber, userId]
        );

        if (existingReview.rows.length > 0) {
            // Update existing review
            await pool.query(`
                UPDATE reviews
                SET rating = $1, comment = $2, created_at = NOW()
                WHERE user_id = $3 AND product_id = $4
            `, [rating, comment, userId, productIdNumber]);

            return res.status(200).json({ ok: true, message: 'Review updated successfully' });
        }

        // Insert new review
        const insertReview = await pool.query(`
            INSERT INTO reviews (product_id, user_id, rating, comment) 
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [productIdNumber, userId, rating, comment]);

        res.status(201).json({ ok: true, review: insertReview.rows[0] });
    } catch (error) {
        console.error("Error processing review:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
