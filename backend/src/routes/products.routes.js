import pool from "../config/db.js";
import express from 'express';
import asyncHandler from "../middleware/asyncHandler.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Testing Route

router.get("/", authMiddleware, asyncHandler(async (req, res) => {
        const { rows } = await pool.query(`SELECT * FROM products`)
        res.json({
            ok: true,
            products: rows
        });
}));

export default router;