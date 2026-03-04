import pool from "../config/db.js";
import express from 'express';
import asyncHandler from "../middleware/asyncHandler.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();




router.get("/", asyncHandler(async (req, res) => {
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
            conditions.push(`category = $${values.length}`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        if (sort === "price_asc") {
            query += ` ORDER BY price ASC`;
        } else if (sort === "price_desc") {
            query += ` ORDER BY price DESC`;
        } else if (sort === "newest") {
            query += ` ORDER BY created_at DESC`;
        }

        const offset = (page - 1) * limit;
        values.push(limit);
        values.push(offset);

        query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

        const { rows } = await pool.query(query, values);

        res.json({
            ok: true,
            products: rows
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    }
}));


router.get("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [id])
    if (!rows.length > 0) {
        return res.status(404).json({
            ok: false, message: "Product not found"
        })
    }
    const { rows: reviews } = await pool.query(`SELECT * FROM reviews WHERE product_id = $1`, [id]);
    res.json({
        ok: true,
        product: rows[0],
        reviews: reviews
    });
}));

router.post("/", authMiddleware, requireRole("admin"), asyncHandler(async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    if (!name || !price) {
        return res.status(400).json({ ok: false, message: "Missing fields" });
    }
    const { rows } = await pool.query(`
            INSERT INTO products (name, description, price, image_url)
            VALUES ($1, $2, $3, $4) RETURNING *
            `, [name, description, price, imageUrl])
    res.json({
        ok: true,
        products: rows
    });
}));

router.post('/:productId/review', authMiddleware, asyncHandler
    (async (req, res) => {
        const userId = req.user.id;
        const { productId } = req.params;
        const { rating, comment } = req.body

        const productIdNumber = Number(productId);
        if (isNaN(productIdNumber)) return res.status(400).json({ message: "Invalid product ID" });
        if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });
        if (!comment || comment.trim() === "") return res.status(400).json({ message: "Comment cannot be empty" });

        const productResult = await pool.query(
            "SELECT id FROM products WHERE id = $1",
            [productIdNumber]
        );
        if (productResult.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingReview = await pool.query(`
            SELECT id FROM reviews WHERE product_id = $1 AND user_id = $2
            `, [productIdNumber, userId]);
        if (existingReview.rows.length > 0) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        const insertReview = await pool.query(`
            INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *
            `, [productIdNumber, userId, rating, comment])

        res.status(201).json(insertReview.rows[0]);
    }));



export default router;