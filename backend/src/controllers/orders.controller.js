import pool from '../config/db.js';

/**
 * Get all orders for the current user
 */
export const getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const { rows } = await pool.query(
            "SELECT id, user_id, total, status, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        if (rows.length === 0) {
            return res.json({ ok: true, message: 'No orders found', orders: [] });
        }

        res.json({ ok: true, orders: rows });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ ok: false, message: 'Server error fetching orders' });
    }
};

/**
 * Get the current pending (cart) order for the user
 */
export const getPendingOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        const { rows } = await pool.query(
            "SELECT id, total FROM orders WHERE user_id = $1 AND status = 'pending' LIMIT 1",
            [userId]
        );

        if (rows.length === 0) {
            return res.json({ ok: true, message: 'No pending order (empty cart)', items: [] });
        }

        const orderId = rows[0].id;
        const total = rows[0].total;

        const { rows: items } = await pool.query(`
      SELECT oi.id, oi.product_id, p.name, p.image_url, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
      ORDER BY oi.id
    `, [orderId]);

        res.json({
            ok: true,
            orderId,
            total,
            items
        });
    } catch (error) {
        console.error("Error fetching pending order:", error);
        res.status(500).json({ ok: false, message: 'Server error' });
    }
};

/**
 * Get details of a specific order by ID
 */
export const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
        const { rows: order } = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);

        if (order.length === 0) {
            return res.status(404).json({ ok: false, message: 'Order not found' });
        }

        const { rows: items } = await pool.query(`
      SELECT oi.id, oi.product_id, p.image_url, p.name, oi.quantity, oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
      ORDER BY oi.id
    `, [orderId]);

        res.json({
            ok: true,
            order: order[0],
            items
        });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ ok: false, message: 'Server error' });
    }
};

/**
 * Add an item to the cart (creates a pending order if none exists)
 */
export const addItemToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Find existing pending order or create a new one
        let { rows } = await client.query(
            "SELECT id FROM orders WHERE user_id = $1 AND status = 'pending' LIMIT 1",
            [userId]
        );

        let orderId;
        if (rows.length === 0) {
            const newOrder = await client.query(
                "INSERT INTO orders (user_id, total, status) VALUES ($1, 0, 'pending') RETURNING id",
                [userId]
            );
            orderId = newOrder.rows[0].id;
        } else {
            orderId = rows[0].id;
        }

        // Verify product exists and check stock
        const productRes = await client.query(
            "SELECT price, stock FROM products WHERE id = $1",
            [productId]
        );

        if (productRes.rows.length === 0) {
            throw new Error('Product not found');
        }

        const { price, stock } = productRes.rows[0];

        // Calculate new total quantity if already in cart
        const existingRes = await client.query(
            "SELECT quantity FROM order_items WHERE order_id = $1 AND product_id = $2",
            [orderId, productId]
        );

        let newQuantity = quantity;
        if (existingRes.rows.length > 0) {
            newQuantity = Number(existingRes.rows[0].quantity) + Number(quantity);
        }

        if (newQuantity > stock) {
            return res.status(400).json({
                ok: false,
                message: `Stock limit reached. Max available: ${stock}`
            });
        }

        // Insert or update quantity in order_items
        await client.query(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (order_id, product_id)
      DO UPDATE SET quantity = EXCLUDED.quantity
    `, [orderId, productId, newQuantity, price]);

        // Update the parent order total
        const totalResult = await client.query(
            "SELECT SUM(quantity * price) AS total FROM order_items WHERE order_id = $1",
            [orderId]
        );

        await client.query(
            "UPDATE orders SET total = $1 WHERE id = $2",
            [totalResult.rows[0].total, orderId]
        );

        await client.query('COMMIT');
        res.json({ ok: true, orderId });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Cart error:", err);
        res.status(500).json({ ok: false, message: 'Error updating cart' });
    } finally {
        client.release();
    }
};

/**
 * Update the quantity of an item in the cart or remove it
 */
export const updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    let { quantity } = req.body;

    if (quantity < 0) {
        return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(
            "SELECT id FROM orders WHERE user_id = $1 AND status = 'pending' LIMIT 1",
            [userId]
        );

        if (rows.length === 0) throw new Error("No active cart found");
        const orderId = rows[0].id;

        const productRes = await client.query("SELECT stock FROM products WHERE id = $1", [productId]);
        if (productRes.rows.length === 0) throw new Error("Product not found");

        const stock = Number(productRes.rows[0].stock);
        if (quantity > stock) quantity = stock;

        if (quantity === 0) {
            // Remove item if quantity is zero
            await client.query(
                "DELETE FROM order_items WHERE order_id = $1 AND product_id = $2",
                [orderId, productId]
            );
        } else {
            // Update quantity
            await client.query(`
        UPDATE order_items
        SET quantity = $1
        WHERE order_id = $2 AND product_id = $3
      `, [quantity, orderId, productId]);
        }

        // Recalculate order total
        const totalResult = await client.query(
            "SELECT COALESCE(SUM(quantity * price), 0) AS total FROM order_items WHERE order_id = $1",
            [orderId]
        );

        await client.query(
            "UPDATE orders SET total = $1 WHERE id = $2",
            [totalResult.rows[0].total, orderId]
        );

        await client.query('COMMIT');
        res.json({ ok: true, message: 'Cart items updated successfully' });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Cart update error:", err);
        res.status(500).json({ ok: false, message: 'Internal server error' });
    } finally {
        client.release();
    }
};
