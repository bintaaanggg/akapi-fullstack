const express = require('express');
const pool = require('../config/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, group_type, kategori, name, role FROM dewan_pembina ORDER BY group_type ASC, kategori ASC, sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data dewan pembina.' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  const { group_type, kategori, name, role } = req.body;
  if (!group_type || !name) {
    return res.status(400).json({ message: 'Jenis dan nama wajib diisi.' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO dewan_pembina (group_type, kategori, name, role) VALUES (?, ?, ?, ?)',
      [group_type, kategori || null, name, role || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan data.' });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { group_type, kategori, name, role } = req.body;
  if (!group_type || !name) {
    return res.status(400).json({ message: 'Jenis dan nama wajib diisi.' });
  }
  try {
    await pool.query(
      'UPDATE dewan_pembina SET group_type=?, kategori=?, name=?, role=? WHERE id=?',
      [group_type, kategori || null, name, role || null, req.params.id]
    );
    res.json({ message: 'Data diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui data.' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM dewan_pembina WHERE id=?', [req.params.id]);
    res.json({ message: 'Data dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus.' });
  }
});

module.exports = router;