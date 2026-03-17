import express from 'express';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders
router.post('/', authenticate, async (req, res, next) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { items, delivery_address, notes, coupon_code, discount_amount } = req.body;
        if (!items || !items.length) return res.status(400).json({ error: 'No items in order' });

        const total = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0) - (discount_amount || 0);

        const orderResult = await client.query(
            `INSERT INTO orders (user_id, total_amount, delivery_address, notes, coupon_code, discount_amount)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [req.user.id, total, delivery_address, notes, coupon_code, discount_amount || 0]
        );
        const order = orderResult.rows[0];

        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, menu_item_id, name, quantity, unit_price, size, addons)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                [order.id, item.menu_item_id, item.name, item.quantity, item.unit_price, item.size, item.addons]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ order });
    } catch (err) {
        await client.query('ROLLBACK');
        next(err);
    } finally { client.release(); }
});

// GET /api/orders/me
router.get('/me', authenticate, async (req, res, next) => {
    try {
        const orders = await pool.query(
            `SELECT o.*, json_agg(oi.*) as items FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id ORDER BY o.created_at DESC`,
            [req.user.id]
        );
        res.json({ orders: orders.rows });
    } catch (err) { next(err); }
});

// GET /api/orders (admin)
router.get('/', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        const params = [limit, offset];
        let where = '';
        if (status) { params.unshift(status); where = `WHERE o.status = $1`; }

        const result = await pool.query(
            `SELECT o.*, u.name as user_name, u.email as user_email, json_agg(oi.*) as items
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       LEFT JOIN order_items oi ON o.id = oi.order_id
       ${where}
       GROUP BY o.id, u.name, u.email
       ORDER BY o.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );
        res.json({ orders: result.rows });
    } catch (err) { next(err); }
});

// GET /api/orders/stats (admin)
router.get('/stats', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const revenue = await pool.query(`SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'`);
        const orderCount = await pool.query(`SELECT COUNT(*) as total FROM orders`);
        const userCount = await pool.query(`SELECT COUNT(*) as total FROM users WHERE role = 'customer'`);
        const topItems = await pool.query(`
      SELECT oi.name, SUM(oi.quantity) as qty, SUM(oi.unit_price * oi.quantity) as revenue
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status != 'cancelled'
      GROUP BY oi.name ORDER BY qty DESC LIMIT 5`);
        const daily = await pool.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as revenue, COUNT(*) as orders
      FROM orders WHERE created_at >= NOW() - INTERVAL '7 days' AND status != 'cancelled'
      GROUP BY DATE(created_at) ORDER BY date ASC`);

        res.json({
            revenue: parseFloat(revenue.rows[0].total),
            orders: parseInt(orderCount.rows[0].total),
            users: parseInt(userCount.rows[0].total),
            topItems: topItems.rows,
            daily: daily.rows,
        });
    } catch (err) { next(err); }
});

// PUT /api/orders/:id/status (admin)
router.put('/:id/status', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { status } = req.body;
        const result = await pool.query(
            `UPDATE orders SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
            [status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        res.json({ order: result.rows[0] });
    } catch (err) { next(err); }
});

export default router;
