CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pengurus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('harian','pengawas','penasihat') NOT NULL,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(150) NOT NULL,
  note TEXT,
  photo LONGTEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agenda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day VARCHAR(10) NOT NULL,
  month VARCHAR(30) NOT NULL,
  title VARCHAR(200) NOT NULL,
  meta TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Data awal (placeholder) — bisa diedit lewat panel Admin setelah aplikasi berjalan
INSERT INTO pengurus (category, name, role, note, sort_order) VALUES
('harian', 'Nama Ketua Umum', 'Ketua Umum', 'Placeholder — perbarui lewat panel Admin dengan data pengurus AKAPI yang sebenarnya.', 1),
('harian', 'Nama Sekretaris Jenderal', 'Sekretaris Jenderal', 'Placeholder — perbarui lewat panel Admin dengan data pengurus AKAPI yang sebenarnya.', 2),
('harian', 'Nama Bendahara Umum', 'Bendahara Umum', 'Placeholder — perbarui lewat panel Admin dengan data pengurus AKAPI yang sebenarnya.', 3),
('pengawas', 'Nama Ketua Pengawas', 'Ketua Dewan Pengawas', 'Placeholder — perbarui lewat panel Admin dengan data pengurus AKAPI yang sebenarnya.', 1),
('penasihat', 'Nama Penasihat', 'Dewan Penasihat', 'Placeholder — perbarui lewat panel Admin dengan data pengurus AKAPI yang sebenarnya.', 1);

INSERT INTO agenda (day, month, title, meta, sort_order) VALUES
('—', 'SEGERA', 'Belum ada agenda', 'Tambahkan agenda pertama lewat panel Admin.', 1);
