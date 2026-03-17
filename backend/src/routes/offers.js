import express from 'express';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/offers
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM offers WHERE is_active = true AND (valid_until IS NULL OR valid_until > NOW()) ORDER BY created_at DESC`
        );
        res.json({ offers: result.rows });
    } catch (err) { next(err); }
});

// POST /api/offers (admin)
router.post('/', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { title, description, discount_pct, coupon_code, valid_until, image_url, min_order_amount } = req.body;
        const result = await pool.query(
            `INSERT INTO offers (title, description, discount_pct, coupon_code, valid_until, image_url, min_order_amount)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [title, description, discount_pct, coupon_code, valid_until, image_url, min_order_amount || 0]
        );
        res.status(201).json({ offer: result.rows[0] });
    } catch (err) { next(err); }
});

// PUT /api/offers/:id (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { title, description, discount_pct, coupon_code, valid_until, image_url, min_order_amount, is_active } = req.body;
        const result = await pool.query(
            `UPDATE offers SET title=$1, description=$2, discount_pct=$3, coupon_code=$4, valid_until=$5,
       image_url=$6, min_order_amount=$7, is_active=$8 WHERE id=$9 RETURNING *`,
            [title, description, discount_pct, coupon_code, valid_until, image_url, min_order_amount, is_active, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Offer not found' });
        res.json({ offer: result.rows[0] });
    } catch (err) { next(err); }
});

// DELETE /api/offers/:id (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        await pool.query('DELETE FROM offers WHERE id=$1', [req.params.id]);
        res.json({ message: 'Offer deleted' });
    } catch (err) { next(err); }
});

export default router;
