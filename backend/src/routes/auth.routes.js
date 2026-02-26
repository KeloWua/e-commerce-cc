import pool from "../config/db.js";
import express from 'express';
import bcrypt from 'bcryptjs';


const router = express.Router();

// Testing Route


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ ok: false, message: "Missing name, email or password" });
        };

        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ ok: false, message: "Email already registered" });
        };
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(`
            INSERT INTO users (name, email, password) VALUES
            ($1, $2, $3)
            RETURNING *
            `, [name, email, hashedPassword])
        res.json({
            ok: true,
            register: rows[0].id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
});


export default router;