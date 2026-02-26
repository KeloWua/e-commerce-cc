import pool from "../config/db.js";
import express from 'express';

const router = express.Router();

// Testing Route

router.get("/", (req, res) => {
    res.json({ message: 'Test route working'})
})

router.get("/testPostgres", async (req, res) => {
    const { rows } = await pool.query(`SELECT NOW()`)
    res.json({
        ok: true,
        result: rows[0]
    })
})
export default router;