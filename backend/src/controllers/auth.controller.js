import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Resend } from 'resend';
import { generateToken } from '../utils/jwt.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Template for the password reset email
const resetEmailHtml = (name, url) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#ec4899);padding:40px;border-radius:16px 16px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">Vad.er</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:48px 40px;">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#111827;">Reset your password 🔒</h2>
              <p style="margin:0 0 24px;color:#6b7280;font-size:16px;line-height:1.6;">
                Hi <strong>${name}</strong>, we received a request to reset your password. Click the button below to choose a new one. This link expires in 20 minutes.
              </p>
              <div style="text-align:center;margin:32px 0;">
                <a href="${url}" style="background:#4f46e5;color:#fff;padding:16px 32px;border-radius:12px;text-decoration:none;font-weight:700;display:inline-block;box-shadow:0 10px 15px -3px rgba(79, 70, 229, 0.4);">
                  Reset Password
                </a>
              </div>
              <p style="margin:24px 0 0;color:#9ca3af;font-size:13px;line-height:1.6;text-align:center;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#111827;padding:32px 40px;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;">© 2026 Vad.er E-Commerce</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * Handles new user registration
 */
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ ok: false, message: "All fields are required" });
    }

    // Check if email is already taken
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
        return res.status(409).json({ ok: false, message: "This email is already registered" });
    }

    // Encrypt password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role
    `, [name, email, hashedPassword]);

    res.status(201).json({ ok: true, user: rows[0] });
};

/**
 * Handles user login and session cookie creation
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ ok: false, message: "Email and password are required" });
    }

    // Check if user exists
    const { rows } = await pool.query(
        'SELECT id, name, password, role FROM users WHERE email = $1',
        [email]
    );

    if (rows.length === 0) {
        return res.status(404).json({ ok: false, message: "No account found with this email" });
    }

    const user = rows[0];

    // Verify password match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    // Generate JWT for the session
    const token = generateToken({ id: user.id, name: user.name, email, role: user.role });

    // Set secure cookie and return user info
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }).json({
        ok: true,
        user: { id: user.id, name: user.name, email, role: user.role }
    });
};

/**
 * Clears the session cookie to logout
 */
export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
    });
    res.json({ ok: true, message: 'Successfully logged out' });
};

/**
 * Initiates the password reset flow by sending a token via email
 */
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const { rows } = await pool.query('SELECT id, name FROM users WHERE email = $1', [email]);

    // For security, don't confirm if the email exists or not
    if (rows.length === 0) return res.json({ ok: true });

    const user = rows[0];
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + 20 * 60 * 1000); // Token expires in 20 minutes

    // Save hashed token and expiry in DB
    await pool.query(
        'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
        [hash, expires, user.id]
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            // En modo testing enviamos siempre al email configurado en el .env (propietario)
            to: process.env.RESEND_EMAIL,
            subject: '🔑 Reset your Vad.er password',
            html: resetEmailHtml(user.name, resetUrl)
        });

        console.log('🔑 Recovery email sent to (Testing Mode):', process.env.RESEND_EMAIL);
        res.json({ ok: true });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({ ok: false, message: 'Could not send reset email' });
    }
};

/**
 * Verifies the token and updates the user's password
 */
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ ok: false, message: 'Broken link or missing password' });
    }

    const hash = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user with a valid, non-expired token
    const { rows } = await pool.query(
        'SELECT id FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()',
        [hash]
    );

    if (rows.length === 0) {
        return res.status(400).json({ ok: false, message: 'The link is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear the reset fields
    await pool.query(
        'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
        [hashedPassword, rows[0].id]
    );

    res.json({ ok: true, message: 'Password updated successfully' });
};

/**
 * Handles the Google OAuth callback
 */
export const googleCallback = (req, res) => {
    const { token } = req.user;

    // Cookie details for cross-origin authentication
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: 'none',
    });

    // Back to frontend
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/');
};

/**
 * Returns current authenticated user
 */
export const getMe = (req, res) => {
    res.json({ user: req.user });
};
