import express from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.post("/register", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
        return res.status(409).json({ ok: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email
    `, [name, email, hashedPassword]);

    res.status(201).json({ ok: true, user: rows[0] });
}));

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ ok: false, message: "Missing email or password" });
    }

    const { rows } = await pool.query(
        'SELECT id, name, password FROM users WHERE email = $1',
        [email]
    );

    if (rows.length === 0) return res.status(404).json({ ok: false, message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ ok: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, name: user.name, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ ok: true, token, user: { id: user.id, name: user.name, email } });
}));

export default router;