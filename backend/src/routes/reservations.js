import express from 'express';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/reservations
router.post('/', async (req, res, next) => {
    try {
        const { name, email, phone, party_size, date, time, notes } = req.body;
        if (!name || !email || !phone || !party_size || !date || !time) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }
        const userId = req.cookies?.token ? null : null; // optionally decode
        const result = await pool.query(
            `INSERT INTO reservations (user_id, name, email, phone, party_size, date, time, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [userId, name, email, phone, party_size, date, time, notes]
        );
        res.status(201).json({ reservation: result.rows[0] });
    } catch (err) { next(err); }
});

// GET /api/reservations (admin)
router.get('/', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reservations ORDER BY date DESC, time DESC'
        );
        res.json({ reservations: result.rows });
    } catch (err) { next(err); }
});

// PUT /api/reservations/:id/status (admin)
router.put('/:id/status', authenticate, requireAdmin, async (req, res, next) => {
    try {
        const { status } = req.body;
        const result = await pool.query(
            'UPDATE reservations SET status=$1 WHERE id=$2 RETURNING *',
            [status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
        res.json({ reservation: result.rows[0] });
    } catch (err) { next(err); }
});

export default router;
