import { useEffect, useRef, useState } from 'react';

const BG_IMAGES = [
  'https://picsum.photos/seed/akapi1/1600/900',
  'https://picsum.photos/seed/akapi2/1600/900',
  'https://picsum.photos/seed/akapi3/1600/900',
  'https://picsum.photos/seed/akapi4/1600/900'
];

const FOCUS_AREAS = [
  { title: 'Digital Governance', color: '#2E5AA8', note: 'Tata kelola pemerintahan berbasis teknologi digital dan data real-time.' },
  { title: 'Evidence-Based Policy', color: '#A9832E', note: 'Perumusan kebijakan berbasis bukti dan data terverifikasi.' },
  { title: 'AI & Kebijakan', color: '#122343', note: 'Pemanfaatan kecerdasan buatan untuk prediksi dampak kebijakan.' },
  { title: 'Data Governance', color: '#3E6A8F', note: 'Literasi data dan tata kelola data cerdas (smart data governance).' },
  { title: 'Agile Governance', color: '#48566F', note: 'Perumusan kebijakan iteratif yang responsif terhadap perubahan.' },
  { title: 'Advokasi Kebijakan', color: '#1E3E6B', note: 'Kemitraan strategis lintas pemerintah, akademisi, dan swasta.' }
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const heroRef = useRef(null);
  const timerRef = useRef(null);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % BG_IMAGES.length), 4500);
  };
  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i) => setIdx((i + BG_IMAGES.length) % BG_IMAGES.length);

  return (
    <section className="hero hero-photo" id="beranda" ref={heroRef}
      onMouseEnter={stop} onMouseLeave={start}>
      <div className="hero-bg">
        {BG_IMAGES.map((src, i) => (
          <div key={i} className={`hero-bg-slide${i === idx ? ' active' : ''}`} style={{ backgroundImage: `url('${src}')` }} />
        ))}
      </div>
      <div className="hero-scrim" />
      <div className="hero-bg-nav">
        <button className="hero-bg-arrow" onClick={() => { goTo(idx - 1); start(); }} aria-label="Sebelumnya">‹</button>
        <div className="hero-bg-dots">
          {BG_IMAGES.map((_, i) => (
            <button key={i} className={`hero-bg-dot${i === idx ? ' active' : ''}`} onClick={() => { goTo(i); start(); }} />
          ))}
        </div>
        <button className="hero-bg-arrow" onClick={() => { goTo(idx + 1); start(); }} aria-label="Berikutnya">›</button>
      </div>

      <div className="container hero-grid">
        <div>
          <div className="eyebrow-plain"><span className="rule" /> Asosiasi Kebijakan Publik Indonesia, sejak 2020</div>
          <h1>bintang<em>adaptif</em> dan berbasis data.</h1>
          <p className="lede">AKAPI menghimpun analis dan pakar kebijakan publik dari seluruh Indonesia untuk mendorong tata kelola kebijakan yang partisipatif, berbasis bukti, dan siap menghadapi era transformasi digital.</p>
          <div className="hero-cta">
            <a href="#pengurus" className="btn btn-solid">Lihat Pengurus</a>
            <a href="#tentang" className="btn btn-ghost">Tentang AKAPI</a>
          </div>
        </div>
        <div>
          <div className="shelf">
            {FOCUS_AREAS.map((b, i) => (
              <div key={b.title} className="spine-book" style={{ background: b.color, height: `${130 + (i % 3) * 34}px` }}>
                <span>{b.title}</span>
                <div className="tip">{b.note}</div>
              </div>
            ))}
          </div>
          <div className="shelf-caption">arahkan kursor ke tiap bidang fokus kebijakan</div>
        </div>
      </div>
    </section>
  );
}
