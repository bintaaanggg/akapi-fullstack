// Membuat/memperbarui akun admin dari ADMIN_USERNAME & ADMIN_PASSWORD di .env
// Jalankan: npm run seed
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./config/db');

async function run() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'akapi2026';
  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [username, hash]
  );

  console.log(`Akun admin siap -> username: ${username} / password: ${password}`);
  process.exit(0);
}

run().catch(err => {
  console.error('Gagal membuat akun admin:', err);
  process.exit(1);
});
