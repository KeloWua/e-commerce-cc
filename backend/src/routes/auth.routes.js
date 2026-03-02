import express from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import asyncHandler from '../middleware/asyncHandler.js';
import passport from '../config/passport.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();

// Google Auth 

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    const { token } = req.user;

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production', 
      maxAge: 1000 * 60 * 60 * 24,
    });


    res.redirect('http://localhost:5173/home');
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ ok: false, message: "Google authentication failed" });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
// Register

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
        RETURNING id, name, email, role
    `, [name, email, hashedPassword]);

    res.status(201).json({ ok: true, user: rows[0] });
}));


//Login

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ ok: false, message: "Missing email or password" });
    }

    const { rows } = await pool.query(
        'SELECT id, name, password, role FROM users WHERE email = $1',
        [email]
    );

    if (rows.length === 0) return res.status(404).json({ ok: false, message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ ok: false, message: "Incorrect password" });

    const token = generateToken({ id: user.id, name: user.name, email, role: user.role });

    res
    .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24
    })
    .json({ ok: true, user: { id: user.id, name: user.name, email, role: user.role } });
}));


router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    sameSite: 'none' // 
  });
  res.json({ ok: true, message: 'Logged out' });
});

export default router;