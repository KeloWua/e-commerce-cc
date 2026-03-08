import pool from '../config/db.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;

/**
 * Create a Stripe checkout session for a pending order
 */
export const createCheckoutSession = async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Get the pending order for the user
        const { rows: orderRows } = await pool.query(
            "SELECT id FROM orders WHERE user_id = $1 AND status = 'pending' LIMIT 1",
            [userId]
        );

        if (orderRows.length === 0) {
            return res.status(400).json({ ok: false, message: "No active order found in cart" });
        }

        const orderId = orderRows[0].id;

        // 2. Get all items in this order
        const { rows: items } = await pool.query(`
      SELECT p.name, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [orderId]);

        if (items.length === 0) {
            return res.status(400).json({ ok: false, message: "Your cart is empty" });
        }

        // 3. Map items to Stripe format
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100), // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        // 4. Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${FRONTEND_URL}/success/${orderId}`,
            cancel_url: `${FRONTEND_URL}/cancel`,
            client_reference_id: orderId,
            shipping_address_collection: {
                allowed_countries: ["US", "ES", "FR", "DE", "GB", "IT"]
            },
            phone_number_collection: { enabled: true }
        });

        // 5. Store session ID in our database for reference
        await pool.query(
            "UPDATE orders SET stripe_session_id = $1 WHERE id = $2",
            [session.id, orderId]
        );

        res.json({ ok: true, url: session.url });

    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        res.status(500).json({ ok: false, message: "Failed to initiate payment" });
    }
};

/**
 * Handle Stripe Webhooks to confirm payments and update stock
 */
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature mismatch:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful payments
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.client_reference_id;
        const customer = session.customer_details;

        if (!customer) return res.status(400).send("No customer data");

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Update order status and save shipping info collected by Stripe
            await client.query(`
        UPDATE orders
        SET 
          status = 'paid',
          shipping_name = $1,
          shipping_email = $2,
          shipping_phone = $3,
          shipping_address_line1 = $4,
          shipping_address_line2 = $5,
          shipping_city = $6,
          shipping_postal_code = $7,
          shipping_country = $8
        WHERE id = $9
      `, [
                customer.name,
                customer.email,
                customer.phone,
                customer.address?.line1,
                customer.address?.line2,
                customer.address?.city,
                customer.address?.postal_code,
                customer.address?.country,
                orderId
            ]);

            // Decrease product stock based on the paid order
            await client.query(`
        UPDATE products
        SET stock = stock - oi.quantity
        FROM order_items oi
        WHERE oi.order_id = $1
        AND products.id = oi.product_id
      `, [orderId]);

            await client.query('COMMIT');
            console.log(`Payment confirmed for Order ID: ${orderId}. Stock updated.`);
        } catch (err) {
            await client.query('ROLLBACK');
            console.error("Webhook processing error:", err);
            return res.status(500).json({ error: "Failed to finalize order after payment" });
        } finally {
            client.release();
        }
    }

    res.status(200).json({ received: true });
};
