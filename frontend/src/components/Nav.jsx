import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'visi', label: 'Visi & Misi' },
  { id: 'pengurus', label: 'Pengurus' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'kontak', label: 'Kontak' }
];

export default function Nav() {
  const [active, setActive] = useState('beranda');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="topnav" aria-label="Navigasi utama">
      <div className="topnav-inner">
        <div className="topnav-brand">
          <span className="topnav-mark">A</span>
          <span className="topnav-name">AKAPI</span>
        </div>

        <ul className="topnav-list">
          {LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'active' : ''}
                onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button className="topnav-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          ☰
        </button>
      </div>

      <div className={`topnav-mobile${menuOpen ? ' open' : ''}`}>
        {LINKS.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}
            className={active === l.id ? 'active' : ''}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}
