import pool from "../config/db.js";
import express from 'express';
import asyncHandler from "../middleware/asyncHandler.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();



router.get("/", asyncHandler(async (req, res) => {
        const { rows } = await pool.query(`SELECT * FROM products`)
        res.json({
            ok: true,
            products: rows
        });
}));


router.get("/:id", asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [id])
        if (!rows.length > 0) {
            return res.status(404).json({
                ok: false, message: "Product not found"
            })
        }
        res.json({
            ok: true,
            products: rows[0]
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

export default router;