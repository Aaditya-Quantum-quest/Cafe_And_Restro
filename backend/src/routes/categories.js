import express from 'express';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories WHERE is_active = true ORDER BY display_order ASC'
        );
        res.json({ categories: result.rows });
    } catch (err) { next(err); }
});

// POST /api/categories (admin)
router.post('/', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { name, slug, description, image_url, display_order } = req.body;
        const result = await pool.query(
            'INSERT INTO categories (name, slug, description, image_url, display_order) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [name, slug, description, image_url, display_order || 0]
        );
        res.status(201).json({ category: result.rows[0] });
    } catch (err) { next(err); }
});

// PUT /api/categories/:id (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { name, slug, description, image_url, display_order, is_active } = req.body;
        const result = await pool.query(
            `UPDATE categories SET name=$1, slug=$2, description=$3, image_url=$4, display_order=$5, is_active=$6
       WHERE id=$7 RETURNING *`,
            [name, slug, description, image_url, display_order, is_active, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
        res.json({ category: result.rows[0] });
    } catch (err) { next(err); }
});

// DELETE /api/categories/:id (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        await pool.query('DELETE FROM categories WHERE id=$1', [req.params.id]);
        res.json({ message: 'Category deleted' });
    } catch (err) { next(err); }
});

export default router;
