import pool from "../config/db.js";
import express from 'express';

const router = express.Router();

// Testing Route

router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM products`)
        res.json({
            ok: true,
            products: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Internal Server Error' })
    }
});

export default router;