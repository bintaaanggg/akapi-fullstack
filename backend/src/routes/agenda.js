const express = require('express');
const pool = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/agenda -> [...]
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, day, month, title, meta FROM agenda ORDER BY sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data agenda.' });
  }
});

// POST /api/agenda (admin)
router.post('/', requireAdmin, async (req, res) => {
  const { day, month, title, meta } = req.body;
  if (!day || !month || !title) {
    return res.status(400).json({ message: 'Data tidak lengkap.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO agenda (day, month, title, meta) VALUES (?, ?, ?, ?)',
      [day, month, title, meta || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan agenda.' });
  }
});

// PUT /api/agenda/:id (admin)
router.put('/:id', requireAdmin, async (req, res) => {
  const { day, month, title, meta } = req.body;
  if (!day || !month || !title) {
    return res.status(400).json({ message: 'Data tidak lengkap.' });
  }
  try {
    await pool.query(
      'UPDATE agenda SET day=?, month=?, title=?, meta=? WHERE id=?',
      [day, month, title, meta || '', req.params.id]
    );
    res.json({ message: 'Agenda diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui agenda.' });
  }
});

// DELETE /api/agenda/:id (admin)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM agenda WHERE id=?', [req.params.id]);
    res.json({ message: 'Agenda dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus agenda.' });
  }
});

module.exports = router;
