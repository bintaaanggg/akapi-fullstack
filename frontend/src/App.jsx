import { useEffect, useState, useCallback } from 'react';
import api from './api.js';

import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Colophon from './components/Colophon.jsx';
import About from './components/About.jsx';
import VisiMisi from './components/VisiMisi.jsx';
import Pengurus from './components/Pengurus.jsx';
import Pelatihan from './components/Pelatihan.jsx';
import Agenda from './components/Agenda.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [pengurusData, setPengurusData] = useState({ harian: [], pengawas: [], penasihat: [] });
  const [agendaData, setAgendaData] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);

  const loadPublicData = useCallback(async () => {
    try {
      const [pRes, aRes] = await Promise.all([api.get('/pengurus'), api.get('/agenda')]);
      setPengurusData(pRes.data);
      setAgendaData(aRes.data);
    } catch (err) {
      console.error('Gagal memuat data dari backend:', err);
    }
  }, []);

  useEffect(() => { loadPublicData(); }, [loadPublicData]);

  return (
    <>
      <div className="paper-tex" />
      <Nav />
      <div className="page">
        <Hero />
        <Colophon />
        <About />
        <VisiMisi />
        <Pengurus data={pengurusData} />
        <Agenda data={agendaData} />
        <Pelatihan />
        <Contact />
      </div>
      <Footer onOpenAdmin={() => setAdminOpen(true)} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} onDataChanged={loadPublicData} />
    </>
  );
}
