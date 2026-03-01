import express from "express";
import pool from '../config/db.js';
import Stripe from 'stripe';
import { authMiddleware } from '../middleware/auth.middleware.js';
import asyncHandler from "../middleware/asyncHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL;
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/checkout', authMiddleware, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const { rows: orderRows } = await pool.query(`
        SELECT id FROM orders
        WHERE user_id = $1 AND status = 'pending'
        LIMIT 1`,
        [userId]);
    
    if (orderRows.length === 0) {
        return res.status(400).json({ message: "No active order" });
    }
    
    const orderId = orderRows[0].id;

    const { rows: items } = await pool.query(`
        SELECT p.name, oi.quantity, oi.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1
        `,
        [orderId]
    );

    if (items.length === 0) {
        return res.status(400).json({ message: "Order is empty" });
    }

    const lineItems = items.map(item => ({
        price_data: {
            currency: 'eur',
            product_data: {
                name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `${FRONTEND_URL}/success`,
        cancel_url: `${FRONTEND_URL}/cancel`,
    });

    await pool.query(
        `UPDATE orders SET stripe_session_id = $1 WHERE id = $2`,
        [session.id, orderId]
    );

    res.json({ url: session.url });
}))


// Webhook
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;


    await pool.query(
      `UPDATE orders SET status = 'paid' WHERE stripe_session_id = $1`,
      [session.id]
    );
  }

  res.status(200).json({ received: true });
});


export default router;


