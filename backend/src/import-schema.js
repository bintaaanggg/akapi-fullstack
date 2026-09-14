// Script sekali-pakai buat import schema.sql ke database Aiven (atau MySQL manapun)
// tanpa perlu mysql client. Jalankan: node src/import-schema.js
require('dotenv').config({ path: '.env.aiven' });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function run() {
  let conn;
  if (process.env.DB_URI) {
    // pakai Service URI lengkap dari Aiven (lebih reliable untuk SSL)
    conn = await mysql.createConnection(process.env.DB_URI + (process.env.DB_URI.includes('?') ? '&' : '?') + 'multipleStatements=true');
  } else {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
      ssl: { rejectUnauthorized: false }
    });
  }

  const sqlPath = path.join(__dirname, 'sql', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Menjalankan schema.sql...');
  await conn.query(sql);
  console.log('Selesai! Tabel & data awal berhasil dibuat.');
  await conn.end();
  process.exit(0);
}

run().catch(err => {
  console.error('Gagal import:', err.message);
  process.exit(1);
});