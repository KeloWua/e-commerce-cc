import express from "express";
import { authMiddleware } from '../middleware/auth.middleware.js';
import asyncHandler from "../middleware/asyncHandler.js";
import * as paymentsController from '../controllers/payments.controller.js';

const router = express.Router();

/**
 * Stripe Checkout (User session)
 */
router.post('/checkout', authMiddleware, asyncHandler(paymentsController.createCheckoutSession));

/**
 * Stripe Webhook (Stripe notifications)
 * IMPORTANT: Webhook needs the RAW body for signature verification
 */
router.post("/webhook", express.raw({ type: "application/json" }), paymentsController.handleWebhook);

export default router;