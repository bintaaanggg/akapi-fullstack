const express = require('express');
const pool = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
const CATEGORIES = ['harian', 'pengawas', 'penasihat'];

// GET /api/pengurus -> { harian: [...], pengawas: [...], penasihat: [...] }
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, category, name, role, note, photo FROM pengurus ORDER BY category, sort_order ASC, id ASC'
    );
    const grouped = { harian: [], pengawas: [], penasihat: [] };
    rows.forEach(r => {
      if (grouped[r.category]) grouped[r.category].push(r);
    });
    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pengurus.' });
  }
});

// POST /api/pengurus (admin)
router.post('/', requireAdmin, async (req, res) => {
  const { category, name, role, note, photo } = req.body;
  if (!CATEGORIES.includes(category) || !name || !role) {
    return res.status(400).json({ message: 'Data tidak lengkap atau kategori tidak valid.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO pengurus (category, name, role, note, photo) VALUES (?, ?, ?, ?, ?)',
      [category, name, role, note || '', photo || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan pengurus.' });
  }
});

// PUT /api/pengurus/:id (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const { category, name, role, note, photo } = req.body;
  if (!CATEGORIES.includes(category) || !name || !role) {
    return res.status(400).json({ message: 'Data tidak lengkap atau kategori tidak valid.' });
  }
  try {
    await pool.query(
      'UPDATE pengurus SET category=?, name=?, role=?, note=?, photo=? WHERE id=?',
      [category, name, role, note || '', photo || null, req.params.id]
    );
    res.json({ message: 'Data pengurus diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui pengurus.' });
  }
});

// DELETE /api/pengurus/:id (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM pengurus WHERE id=?', [req.params.id]);
    res.json({ message: 'Pengurus dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus pengurus.' });
  }
});

module.exports = router;
