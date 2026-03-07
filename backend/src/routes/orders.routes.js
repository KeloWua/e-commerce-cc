import express from 'express';
import pool from '../config/db.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { rows } = await pool.query(
    `SELECT id, user_id, total, status
    FROM orders 
    WHERE user_id = $1`,
    [userId]
  );

  if (rows.length === 0) {
    return res.json({ message: 'No orders' })
  }
  res.json({
    orders: rows
  })
}));



router.get('/pending', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(userId)

  const { rows } = await pool.query(
    `SELECT id, total FROM orders 
       WHERE user_id = $1 AND status = 'pending'
       LIMIT 1`,
    [userId]
  );

  if (rows.length === 0) {

    return res.json({ message: 'No pending order' })

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
    orderId,
    total,
    items
  });

}));

router.get('/:orderId', asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const { rows: order } = await pool.query(`
        SELECT * FROM orders WHERE id = $1`, [orderId]);

  const { rows: items } = await pool.query(`
        SELECT oi.id, oi.product_id, p.image_url, p.name, oi.quantity, oi.price
        FROM order_items oi
        JOIN products p
        ON oi.product_id = p.id
        WHERE oi.order_id = $1
        ORDER BY oi.id
        `, [orderId]);

  res.json({
    order: order,
    items: items
  })
}));
//test

router.post('/', asyncHandler(async (req, res) => {
  const { userId, total } = req.body;

  const { rows } = await pool.query(`
        INSERT INTO orders (user_id, total) VALUES ($1, $2) returning *
        `, [userId, total]);
  res.json({
    ok: true,
    orderId: rows[0].id
  });
}));
// finish test

router.post('/items', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ We search pending order for the user
    let { rows } = await client.query(
      `SELECT id FROM orders 
       WHERE user_id = $1 AND status = 'pending'
       LIMIT 1`,
      [userId]
    );

    let orderId;

    // 2️⃣ If no pending order, we creat eone
    if (rows.length === 0) {
      const newOrder = await client.query(
        `INSERT INTO orders (user_id, total, status)
         VALUES ($1, 0, 'pending')
         RETURNING id`,
        [userId]
      );
      orderId = newOrder.rows[0].id;
    } else {
      orderId = rows[0].id;
    }

    // 3️⃣ We get product price and stoc
    const productRes = await client.query(
      `SELECT price, stock FROM products WHERE id = $1`,
      [productId]
    );

    if (productRes.rows.length === 0) {
      throw new Error('Product not found');
    }

    const { price, stock } = productRes.rows[0];

    // 4️⃣ We get actual quantity from cart
    const existingRes = await client.query(
      `SELECT quantity FROM order_items WHERE order_id = $1 AND product_id = $2`,
      [orderId, productId]
    );

    let newQuantity = quantity;
    if (existingRes.rows.length > 0) {
      newQuantity = existingRes.rows[0].quantity + quantity;
    }

    // 5️⃣ Validate quantity is not higher than stock
    if (newQuantity > stock) {
      return res.status(400).json({
        ok: false,
        message: `Cannot add more than ${stock} items to the cart`
      });
    }

    // 6️⃣ Insert or update quantity
    await client.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (order_id, product_id)
      DO UPDATE SET quantity = EXCLUDED.quantity
      `,
      [orderId, productId, newQuantity, price]
    );

    // 7️⃣ Update order total
    const totalResult = await client.query(
      `SELECT SUM(quantity * price) AS total
       FROM order_items WHERE order_id = $1`,
      [orderId]
    );

    await client.query(
      `UPDATE orders SET total = $1 WHERE id = $2`,
      [totalResult.rows[0].total, orderId]
    );

    await client.query('COMMIT');

    res.json({ ok: true, orderId });

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}));


router.patch('/items/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  let { quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get pending order id
    const { rows } = await client.query(
      `SELECT id FROM orders WHERE user_id = $1 AND status = 'pending' LIMIT 1`,
      [userId]
    );

    if (rows.length === 0) throw new Error("No active order");
    const orderId = rows[0].id;

    // Get stock from products
    const productRes = await client.query(
      `SELECT stock FROM products WHERE id = $1`,
      [productId]
    );

    if (productRes.rows.length === 0) throw new Error("Product not found");

    const stock = productRes.rows[0].stock;

    // Limit quantity to the available stock
    if (quantity > stock) quantity = stock;

    if (quantity === 0) {
      await client.query(
        `DELETE FROM order_items WHERE order_id = $1 AND product_id = $2`,
        [orderId, productId]
      );
    } else {
      await client.query(
        `UPDATE order_items
         SET quantity = $1
         WHERE order_id = $2 AND product_id = $3`,
        [quantity, orderId, productId]
      );
    }

    // Recalculate total
    const totalResult = await client.query(
      `SELECT COALESCE(SUM(quantity * price), 0) AS total FROM order_items WHERE order_id = $1`,
      [orderId]
    );

    await client.query(
      `UPDATE orders SET total = $1 WHERE id = $2`,
      [totalResult.rows[0].total, orderId]
    );

    await client.query('COMMIT');
    res.json({ ok: true });

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}));





export default router;