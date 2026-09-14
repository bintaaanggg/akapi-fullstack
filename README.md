# AKAPI — React + Node.js (Express) + MySQL

Versi full-stack dari situs AKAPI. Frontend React (Vite) mengonsumsi REST API
dari backend Express, yang menyimpan data Pengurus & Agenda di MySQL.
Bagian Admin (login + CRUD) sekarang benar-benar tersambung ke database,
bukan lagi penyimpanan sisi klien.

```
akapi-fullstack/
├── backend/     Express API + MySQL
└── frontend/    React (Vite)
```

## 1. Siapkan database MySQL

1. Pastikan MySQL server sudah berjalan di komputer/servermu.
2. Jalankan skema database:
   ```bash
   mysql -u root -p < backend/src/sql/schema.sql
   ```
   Perintah ini membuat database `akapi_db`, tabel `admin_users`, `pengurus`,
   `agenda`, beserta beberapa data placeholder awal.

## 2. Jalankan backend

```bash
cd backend
cp .env.example .env
# lalu sesuaikan isi .env (DB_USER, DB_PASSWORD, JWT_SECRET, dst.)

npm install
npm run seed   # membuat akun admin sesuai ADMIN_USERNAME/ADMIN_PASSWORD di .env
npm run dev    # jalan di http://localhost:4000
```

Login admin default (bisa diganti lewat `.env` sebelum `npm run seed`):
- **Username:** `admin`
- **Password:** `akapi2026`

## 3. Jalankan frontend

Buka terminal baru:

```bash
cd frontend
cp .env.example .env
# sesuaikan VITE_API_URL jika backend tidak di localhost:4000

npm install
npm run dev    # jalan di http://localhost:5173
```

Buka `http://localhost:5173` di browser. Klik **Admin** di footer untuk masuk
dan mengelola data Pengurus & Agenda — perubahan langsung tersimpan di MySQL
dan tampil untuk semua pengunjung.

## Struktur API (backend)

| Method | Endpoint              | Akses   | Keterangan                          |
|--------|------------------------|---------|--------------------------------------|
| POST   | /api/auth/login        | Publik  | Login admin, mengembalikan JWT      |
| GET    | /api/pengurus          | Publik  | Ambil semua pengurus (per kategori) |
| POST   | /api/pengurus          | Admin   | Tambah pengurus                     |
| PUT    | /api/pengurus/:id      | Admin   | Ubah pengurus                       |
| DELETE | /api/pengurus/:id      | Admin   | Hapus pengurus                      |
| GET    | /api/agenda            | Publik  | Ambil semua agenda                  |
| POST   | /api/agenda             | Admin   | Tambah agenda                       |
| PUT    | /api/agenda/:id         | Admin   | Ubah agenda                         |
| DELETE | /api/agenda/:id         | Admin   | Hapus agenda                        |

Endpoint "Admin" memerlukan header `Authorization: Bearer <token>` yang
didapat dari `/api/auth/login`. Frontend menyimpan token ini di
`localStorage` dan mengirimkannya otomatis (lihat `frontend/src/api.js`).

## Catatan

- Foto pengurus disimpan sebagai base64 (kolom `LONGTEXT`) — cukup untuk skala
  kecil/menengah. Untuk skala lebih besar, sebaiknya dipindah ke penyimpanan
  file/objek (mis. folder `uploads/` atau S3) dan kolom `photo` cukup
  menyimpan URL-nya.
- Konten Tentang / Visi & Misi masih statis di komponen React
  (`About.jsx`, `VisiMisi.jsx`) karena bersumber dari dokumen resmi AKAPI.
  Kalau nanti ingin itu juga bisa diedit dari panel Admin, tinggal tambahkan
  tabel & endpoint serupa `pengurus`/`agenda`.
- Data kontak (alamat/telepon/surel) di halaman masih placeholder — ganti
  langsung di `frontend/src/components/Contact.jsx`.
