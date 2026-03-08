import express from 'express';
import passport from '../config/passport.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import asyncHandler from '../middleware/asyncHandler.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Google Auth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  authController.googleCallback
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ ok: false, message: "Google authentication failed" });
});

router.get('/me', authMiddleware, authController.getMe);

// Auth Routes (controlled by authController)
router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post('/logout', authController.logout);
router.post('/forgot-password', asyncHandler(authController.forgotPassword));
router.post('/reset-password', asyncHandler(authController.resetPassword));

export default router;