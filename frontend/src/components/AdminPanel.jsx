import { useEffect, useState } from 'react';
import api from '../api.js';

const CATS = [
  { key: 'harian', label: 'Pengurus Harian' },
  { key: 'pengawas', label: 'Dewan Pengawas' },
  { key: 'penasihat', label: 'Dewan Penasihat' }
];

const emptyPengurusForm = { id: null, category: 'harian', name: '', role: '', note: '', photo: '' };
const emptyAgendaForm = { id: null, day: '', month: '', title: '', meta: '' };
const emptyGaleriForm = { id: null, caption: '', photo: '' };

function resizePhoto(file, size = 160) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale, h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeGaleriPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        const scale = Math.min(1, maxW / img.width);
        const w = img.width * scale, h = img.height * scale;
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPanel({ open, onClose, onDataChanged }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('akapi_admin_token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('pengurus');

  const [pengurusData, setPengurusData] = useState({ harian: [], pengawas: [], penasihat: [] });
  const [agendaData, setAgendaData] = useState([]);
  const [galeriData, setGaleriData] = useState([]);
  const [activeCat, setActiveCat] = useState('harian');
  const [pForm, setPForm] = useState(emptyPengurusForm);
  const [aForm, setAForm] = useState(emptyAgendaForm);
  const [gForm, setGForm] = useState(emptyGaleriForm);

  const loadData = async () => {
    try {
      const [pRes, aRes, gRes] = await Promise.all([api.get('/pengurus'), api.get('/agenda'), api.get('/galeri')]);
      setPengurusData(pRes.data);
      setAgendaData(aRes.data);
      setGaleriData(gRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open && loggedIn) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, loggedIn]);

  if (!open) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginForm);
      localStorage.setItem('akapi_admin_token', res.data.token);
      setLoggedIn(true);
      setLoginError('');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Username atau password salah.');
    }
  };

  const refreshPublic = () => { loadData(); if (onDataChanged) onDataChanged(); };

  const submitPengurus = async (e) => {
    e.preventDefault();
    const payload = { category: activeCat, name: pForm.name, role: pForm.role, note: pForm.note, photo: pForm.photo };
    try {
      if (pForm.id) await api.put(`/pengurus/${pForm.id}`, payload);
      else await api.post('/pengurus', payload);
      setPForm(emptyPengurusForm);
      refreshPublic();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan data pengurus.');
    }
  };

  const deletePengurus = async (id) => {
    if (!confirm('Hapus data pengurus ini?')) return;
    try { await api.delete(`/pengurus/${id}`); refreshPublic(); }
    catch (err) { alert(err.response?.data?.message || 'Gagal menghapus.'); }
  };

  const editPengurus = (p) => {
    setPForm({ id: p.id, category: activeCat, name: p.name, role: p.role, note: p.note, photo: p.photo || '' });
  };

  const onPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await resizePhoto(file);
      setPForm(f => ({ ...f, photo: dataUrl }));
    } catch { /* ignore */ }
  };

  const submitAgenda = async (e) => {
    e.preventDefault();
    const payload = { day: aForm.day, month: aForm.month, title: aForm.title, meta: aForm.meta };
    try {
      if (aForm.id) await api.put(`/agenda/${aForm.id}`, payload);
      else await api.post('/agenda', payload);
      setAForm(emptyAgendaForm);
      refreshPublic();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan agenda.');
    }
  };

  const deleteAgenda = async (id) => {
    if (!confirm('Hapus agenda ini?')) return;
    try { await api.delete(`/agenda/${id}`); refreshPublic(); }
    catch (err) { alert(err.response?.data?.message || 'Gagal menghapus.'); }
  };

  const editAgenda = (ev) => setAForm({ id: ev.id, day: ev.day, month: ev.month, title: ev.title, meta: ev.meta });

  const onGaleriPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await resizeGaleriPhoto(file);
      setGForm(f => ({ ...f, photo: dataUrl }));
    } catch { /* ignore */ }
  };

  const submitGaleri = async (e) => {
    e.preventDefault();
    if (!gForm.id && !gForm.photo) { alert('Pilih foto terlebih dahulu.'); return; }
    const payload = { caption: gForm.caption, photo: gForm.photo };
    try {
      if (gForm.id) await api.put(`/galeri/${gForm.id}`, payload);
      else await api.post('/galeri', payload);
      setGForm(emptyGaleriForm);
      refreshPublic();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan foto.');
    }
  };

  const deleteGaleri = async (id) => {
    if (!confirm('Hapus foto ini?')) return;
    try { await api.delete(`/galeri/${id}`); refreshPublic(); }
    catch (err) { alert(err.response?.data?.message || 'Gagal menghapus.'); }
  };

  const editGaleri = (g) => setGForm({ id: g.id, caption: g.caption || '', photo: g.photo });

  const currentList = pengurusData[activeCat] || [];

  return (
    <div className={`admin-overlay${open ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="admin-panel">
        <button className="admin-close" onClick={onClose}>&times;</button>

        {!loggedIn ? (
          <div>
            <h3>Masuk Admin</h3>
            <p className="admin-sub">Kelola data Pengurus &amp; Agenda yang tampil di situs.</p>
            <form onSubmit={handleLogin}>
              <div className="field"><label>Username</label>
                <input type="text" value={loginForm.username}
                  onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))} />
              </div>
              <div className="field"><label>Password</label>
                <input type="password" value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <button className="btn btn-solid" type="submit">Masuk</button>
              <p id="adminLoginError">{loginError}</p>
            </form>
          </div>
        ) : (
          <div>
            <h3>Panel Admin</h3>
            <p className="admin-sub">Perubahan tersimpan di database dan langsung tampil bagi semua pengunjung situs.</p>
            <div className="admin-tabs">
              <button className={`admin-tab${tab === 'pengurus' ? ' active' : ''}`} onClick={() => setTab('pengurus')}>Pengurus</button>
              <button className={`admin-tab${tab === 'agenda' ? ' active' : ''}`} onClick={() => setTab('agenda')}>Agenda</button>
              <button className={`admin-tab${tab === 'galeri' ? ' active' : ''}`} onClick={() => setTab('galeri')}>Galeri</button>
              <button className="admin-tab" style={{ marginLeft: 'auto' }}
                onClick={() => { localStorage.removeItem('akapi_admin_token'); setLoggedIn(false); }}>Keluar</button>
            </div>

            {tab === 'pengurus' && (
              <div>
                <div className="admin-cat-select">
                  {CATS.map(c => (
                    <button key={c.key} className={activeCat === c.key ? 'active' : ''}
                      onClick={() => { setActiveCat(c.key); setPForm(emptyPengurusForm); }}>{c.label}</button>
                  ))}
                </div>
                <div className="admin-list">
                  {currentList.length ? currentList.map(p => (
                    <div className="admin-row" key={p.id}>
                      <div className="txt"><b>{p.name}</b><span>{p.role}</span></div>
                      <div className="acts">
                        <button className="btn btn-ghost btn-sm" onClick={() => editPengurus(p)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deletePengurus(p.id)}>Hapus</button>
                      </div>
                    </div>
                  )) : <div className="drawer-empty">Belum ada data di kategori ini.</div>}
                </div>
                <form className="admin-form" onSubmit={submitPengurus}>
                  <div className="field full">
                    <label>Foto</label>
                    <div className="photo-picker">
                      <div className="photo-preview">
                        {pForm.photo ? <img src={pForm.photo} alt="" /> : 'Tanpa foto'}
                      </div>
                      <input type="file" accept="image/*" onChange={onPhotoChange} />
                    </div>
                  </div>
                  <div className="field full"><label>Nama</label>
                    <input type="text" required value={pForm.name} onChange={e => setPForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="field full"><label>Jabatan</label>
                    <input type="text" required value={pForm.role} onChange={e => setPForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div className="field full"><label>Catatan Singkat</label>
                    <textarea rows="2" required value={pForm.note} onChange={e => setPForm(f => ({ ...f, note: e.target.value }))} />
                  </div>
                  <div className="admin-form-actions">
                    <button type="submit" className="btn btn-solid btn-sm">Simpan</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPForm(emptyPengurusForm)}>Batal Edit</button>
                  </div>
                </form>
              </div>
            )}

            {tab === 'agenda' && (
              <div>
                <div className="admin-list">
                  {agendaData.length ? agendaData.map(ev => (
                    <div className="admin-row" key={ev.id}>
                      <div className="txt"><b>{ev.title}</b><span>{ev.day} {ev.month}</span></div>
                      <div className="acts">
                        <button className="btn btn-ghost btn-sm" onClick={() => editAgenda(ev)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteAgenda(ev.id)}>Hapus</button>
                      </div>
                    </div>
                  )) : <div className="drawer-empty">Belum ada agenda.</div>}
                </div>
                <form className="admin-form" onSubmit={submitAgenda}>
                  <div className="field"><label>Tanggal</label>
                    <input type="text" placeholder="22" required value={aForm.day} onChange={e => setAForm(f => ({ ...f, day: e.target.value }))} />
                  </div>
                  <div className="field"><label>Bulan</label>
                    <input type="text" placeholder="OKTOBER" required value={aForm.month} onChange={e => setAForm(f => ({ ...f, month: e.target.value }))} />
                  </div>
                  <div className="field full"><label>Judul Agenda</label>
                    <input type="text" required value={aForm.title} onChange={e => setAForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div className="field full"><label>Keterangan</label>
                    <textarea rows="2" required value={aForm.meta} onChange={e => setAForm(f => ({ ...f, meta: e.target.value }))} />
                  </div>
                  <div className="admin-form-actions">
                    <button type="submit" className="btn btn-solid btn-sm">Simpan</button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAForm(emptyAgendaForm)}>Batal Edit</button>
                  </div>
                </form>
              </div>
            )}

            {tab === 'galeri' && (
              <div>
                <div className="admin-list">
                  {galeriData.length ? galeriData.map(g => (
                    <div className="admin-row" key={g.id}>
                      <div className="txt"><b>{g.caption || '(tanpa caption)'}</b></div>
                      <div className="acts">
                        <button className="btn btn-ghost btn-sm" onClick={() => editGaleri(g)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteGaleri(g.id)}>Hapus</button>
                      </div>
                    </div>
                  )) : <div className="drawer-empty">Belum ada foto galeri.</div>}
                </div>
                <form className="admin-form" onSubmit={submitGaleri}>
                  <div className="field full">
                    <label>Foto</label>
                    <div className="photo-picker">
                      <div className="photo-preview">
                        {gForm.photo ? <img src={gForm.photo} alt="" /> : 'Tanpa foto'}
                      </div>
                      <input type="file" accept="image/*" onChange={onGaleriPhotoChange} />
                    </div>
                  </div>
                  <div className="field full"><label>Caption</label>
                    <input type="text" placeholder="Kegiatan AKAPI ..." value={gForm.caption} onChange={e => setGForm(f => ({ ...f, caption: e.target.value }))} />
                  </div>
                  <div className="admin-form-actions">
                    <button type="submit" className="btn btn-solid btn-sm">{gForm.id ? 'Simpan Perubahan' : 'Tambah Foto'}</button>
                    {gForm.id && <button type="button" className="btn btn-ghost btn-sm" onClick={() => setGForm(emptyGaleriForm)}>Batal Edit</button>}
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}