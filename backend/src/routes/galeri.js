const express = require('express');
const pool = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/galeri -> [...]
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, caption, photo FROM galeri ORDER BY sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data galeri.' });
  }
});

// POST /api/galeri (admin)
router.post('/', requireAdmin, async (req, res) => {
  const { caption, photo } = req.body;
  if (!photo) {
    return res.status(400).json({ message: 'Foto wajib diisi.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO galeri (caption, photo) VALUES (?, ?)',
      [caption || '', photo]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan foto.' });
  }
});

// PUT /api/galeri/:id (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const { caption, photo } = req.body;
  if (!photo) {
    return res.status(400).json({ message: 'Foto wajib diisi.' });
  }
  try {
    await pool.query(
      'UPDATE galeri SET caption=?, photo=? WHERE id=?',
      [caption || '', photo, req.params.id]
    );
    res.json({ message: 'Foto diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui foto.' });
  }
});

// DELETE /api/galeri/:id (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM galeri WHERE id=?', [req.params.id]);
    res.json({ message: 'Foto dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus.' });
  }
});

module.exports = router;