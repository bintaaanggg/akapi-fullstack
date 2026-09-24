require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pengurusRoutes = require('./routes/pengurus');
const agendaRoutes = require('./routes/agenda');
const galeriRoutes = require('./routes/galeri');


const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/pengurus', pengurusRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/galeri', galeriRoutes);

app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan.' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`AKAPI backend berjalan di http://localhost:${PORT}`));