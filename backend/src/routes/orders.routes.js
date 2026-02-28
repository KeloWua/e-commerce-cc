import express from 'express';
import pool from '../config/db.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/:orderId', asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const { rows: order } = await pool.query(`
        SELECT * FROM orders WHERE id = $1`, [orderId]);

    const { rows: items } = await pool.query(`
        SELECT oi.id, oi.product_id, p.name, oi.quantity, oi.price
        FROM order_items oi
        JOIN products p
        ON oi.product_id = p.id
        WHERE oi.order_id = $1
        `, [orderId]);
    
    res.json({
        order: order,
        items: items
    })
}));

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

router.post('/:orderId/items', asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;

  await pool.query('BEGIN');


  const { rows } = await pool.query(
    'SELECT price FROM products WHERE id = $1',
    [productId]
  );

  const price = rows[0].price;

  // insert item
  await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES ($1,$2,$3,$4)`,
    [orderId, productId, quantity, price]
  );

  // recalc total
  const { rows: totalRows } = await pool.query(
    `SELECT SUM(quantity * price) AS total
     FROM order_items WHERE order_id = $1`,
    [orderId]
  );

  await pool.query(
    `UPDATE orders SET total = $1 WHERE id = $2`,
    [totalRows[0].total, orderId]
  );

  await pool.query('COMMIT');

  res.json({ ok: true });
}));

export default router;