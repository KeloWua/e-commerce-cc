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
    success_url: `${FRONTEND_URL}/success/${orderId}`,
    cancel_url: `${FRONTEND_URL}/cancel`,

    client_reference_id: orderId,

    shipping_address_collection: {
      allowed_countries: ["US", "ES", "FR", "DE"]
    },

    phone_number_collection: {
      enabled: true
    }
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
    const orderId = session.client_reference_id;

    const customer = session.customer_details;

    if (!customer || !customer.address) {
      console.error("No customer address received");
      return res.status(400).json({ error: "Customer address missing" });
    }

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // 1️⃣ Update orders with shipping and order info
      await client.query(`
        UPDATE orders
        SET 
          status='paid',
          shipping_name=$1,
          shipping_email=$2,
          shipping_phone=$3,
          shipping_address_line1=$4,
          shipping_address_line2=$5,
          shipping_city=$6,
          shipping_postal_code=$7,
          shipping_country=$8
        WHERE id=$9
      `, [
        customer.name,
        customer.email,
        customer.phone,
        customer.address.line1,
        customer.address.line2,
        customer.address.city,
        customer.address.postal_code,
        customer.address.country,
        orderId
      ]);

      // 2️⃣ Decrease stock
      await client.query(`
        UPDATE products
        SET stock = stock - oi.quantity
        FROM order_items oi
        WHERE oi.order_id = $1
        AND products.id = oi.product_id
      `, [orderId]);

      await client.query('COMMIT');
      console.log(`Order ${orderId} marked as paid and stock updated.`);
    } catch (err) {
      await client.query('ROLLBACK');
      console.error("Error updating order and stock:", err);
      return res.status(500).json({ error: "Failed to update order" });
    } finally {
      client.release();
    }
  }

  res.status(200).json({ received: true });
});

export default router;