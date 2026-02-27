import pool from "../config/db.js";
import express from 'express';

const router = express.Router();

// Testing Route

router.get("/", (req, res) => {
    res.json({ message: 'Test route working'})
});

router.get("/users", async (req, res) => {
        const { rows } = await pool.query(`SELECT * FROM users`)
        res.json(rows);
});

export default router;