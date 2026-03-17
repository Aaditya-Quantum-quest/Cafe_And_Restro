import express from 'express';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/combos
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM combo_meals WHERE is_active = true ORDER BY created_at DESC`
        );
        res.json({ combos: result.rows });
    } catch (err) { next(err); }
});

// POST /api/combos (admin)
router.post('/', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { name, description, original_price, combo_price, image_url, badge, items_list } = req.body;
        const result = await pool.query(
            `INSERT INTO combo_meals (name, description, original_price, combo_price, image_url, badge, items_list)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [name, description, original_price, combo_price, image_url, badge, items_list]
        );
        res.status(201).json({ combo: result.rows[0] });
    } catch (err) { next(err); }
});

// PUT /api/combos/:id (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { name, description, original_price, combo_price, image_url, badge, items_list, is_active } = req.body;
        const result = await pool.query(
            `UPDATE combo_meals SET name=$1, description=$2, original_price=$3, combo_price=$4,
       image_url=$5, badge=$6, items_list=$7, is_active=$8 WHERE id=$9 RETURNING *`,
            [name, description, original_price, combo_price, image_url, badge, items_list, is_active, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Combo not found' });
        res.json({ combo: result.rows[0] });
    } catch (err) { next(err); }
});

// DELETE /api/combos/:id (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        await pool.query('DELETE FROM combo_meals WHERE id=$1', [req.params.id]);
        res.json({ message: 'Combo deleted' });
    } catch (err) { next(err); }
});

export default router;
