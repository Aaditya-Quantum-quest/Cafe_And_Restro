import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import pool from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only images allowed'));
    },
});

async function processAndSaveImage(buffer, filename) {
    const outputPath = path.join(__dirname, '../../../uploads', filename);
    await sharp(buffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 90 })
        .toFile(outputPath);
    return `/uploads/${filename}`;
}

// GET /api/menu
router.get('/', async (req, res, next) => {
    try {
        const { category, search, sort, page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        let conditions = ['m.is_available = true'];
        const params = [];

        if (category && category !== 'all') {
            params.push(category);
            conditions.push(`c.slug = $${params.length}`);
        }
        if (search) {
            params.push(`%${search}%`);
            conditions.push(`(m.name ILIKE $${params.length} OR m.description ILIKE $${params.length})`);
        }

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        let orderClause = 'ORDER BY m.created_at DESC';
        if (sort === 'price_asc') orderClause = 'ORDER BY m.price ASC';
        else if (sort === 'price_desc') orderClause = 'ORDER BY m.price DESC';
        else if (sort === 'popular') orderClause = 'ORDER BY m.rating DESC, m.rating_count DESC';
        else if (sort === 'new') orderClause = 'ORDER BY m.created_at DESC';

        params.push(limit, offset);
        const query = `
      SELECT m.*, c.name as category_name, c.slug as category_slug
      FROM menu_items m
      LEFT JOIN categories c ON m.category_id = c.id
      ${whereClause}
      ${orderClause}
      LIMIT $${params.length - 1} OFFSET $${params.length}
    `;
        const result = await pool.query(query, params);

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM menu_items m LEFT JOIN categories c ON m.category_id = c.id ${whereClause}`,
            params.slice(0, -2)
        );

        res.json({ items: result.rows, total: parseInt(countResult.rows[0].count), page: +page, limit: +limit });
    } catch (err) { next(err); }
});

// GET /api/menu/featured
router.get('/featured', async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT m.*, c.name as category_name FROM menu_items m LEFT JOIN categories c ON m.category_id = c.id WHERE m.is_available = true ORDER BY RANDOM() LIMIT 10'
        );
        res.json({ items: result.rows });
    } catch (err) { next(err); }
});

// GET /api/menu/popular
router.get('/popular', async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT m.*, c.name as category_name FROM menu_items m LEFT JOIN categories c ON m.category_id = c.id WHERE m.is_available = true ORDER BY m.rating DESC, m.rating_count DESC LIMIT 6'
        );
        res.json({ items: result.rows });
    } catch (err) { next(err); }
});

// GET /api/menu/today
router.get('/today', async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT m.*, c.name as category_name, c.slug as category_slug 
       FROM menu_items m 
       LEFT JOIN categories c ON m.category_id = c.id 
       WHERE m.is_available = true 
       ORDER BY c.display_order ASC, m.rating DESC`
        );
        res.json({ items: result.rows });
    } catch (err) { next(err); }
});

// GET /api/menu/:id
router.get('/:id', async (req, res, next) => {
    try {
        const result = await pool.query(
            'SELECT m.*, c.name as category_name, c.slug as category_slug FROM menu_items m LEFT JOIN categories c ON m.category_id = c.id WHERE m.id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ item: result.rows[0] });
    } catch (err) { next(err); }
});

// POST /api/menu (admin)
router.post('/', authenticate, requireAdmin, upload.single('image'), async (req, res, next) => {
    try {
        const { name, description, price, category_id, cook_time_min, spicy_level, veg_nonveg, is_featured } = req.body;
        let image_url = null;
        if (req.file) {
            const filename = `${uuidv4()}.png`;
            image_url = await processAndSaveImage(req.file.buffer, filename);
        }
        const result = await pool.query(
            `INSERT INTO menu_items (name, description, price, category_id, image_url, cook_time_min, spicy_level, veg_nonveg, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [name, description, price, category_id, image_url, cook_time_min || 30, spicy_level || 0, veg_nonveg || 'nonveg', is_featured === 'true']
        );
        res.status(201).json({ item: result.rows[0] });
    } catch (err) { next(err); }
});

// PUT /api/menu/:id (admin)
router.put('/:id', authenticate, requireAdmin, upload.single('image'), async (req, res, next) => {
    try {
        const { name, description, price, category_id, cook_time_min, spicy_level, veg_nonveg, is_featured, is_available } = req.body;
        let image_url = req.body.image_url;
        if (req.file) {
            const filename = `${uuidv4()}.png`;
            image_url = await processAndSaveImage(req.file.buffer, filename);
        }
        const result = await pool.query(
            `UPDATE menu_items SET name=$1, description=$2, price=$3, category_id=$4, image_url=$5,
       cook_time_min=$6, spicy_level=$7, veg_nonveg=$8, is_featured=$9, is_available=$10, updated_at=NOW()
       WHERE id=$11 RETURNING *`,
            [name, description, price, category_id, image_url, cook_time_min, spicy_level, veg_nonveg, is_featured === 'true', is_available !== 'false', req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json({ item: result.rows[0] });
    } catch (err) { next(err); }
});

// DELETE /api/menu/:id (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res, next) => {
    try {
        await pool.query('DELETE FROM menu_items WHERE id=$1', [req.params.id]);
        res.json({ message: 'Menu item deleted' });
    } catch (err) { next(err); }
});

export default router;
