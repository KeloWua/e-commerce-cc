import pool from "../config/db.js";
import express from 'express';
import asyncHandler from "../middleware/asyncHandler.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Testing Route

router.get("/", asyncHandler(async (req, res) => {
        const { rows } = await pool.query(`SELECT * FROM products`)
        res.json({
            ok: true,
            products: rows
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