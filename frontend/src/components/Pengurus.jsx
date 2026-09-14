import { useEffect, useRef, useState } from 'react';

function initials(name = '') {
  return name.split(' ')
    .filter(w => !/^(Dr\.|Prof\.|Ir\.|Drs\.|Dra\.)$/i.test(w))
    .slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function IndexCard({ person }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`index-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="index-card-inner">
        <div className="index-face">
          <div className="index-avatar">
            {person.photo ? <img src={person.photo} alt={person.name} /> : initials(person.name)}
          </div>
          <div className="index-name">{person.name}</div>
          <div className="index-role">{person.role}</div>
          <div className="index-hint">Ketuk untuk detail →</div>
        </div>
        <div className="index-face index-back">
          <p>{person.note}</p>
          <div className="stamp">KARTU INDEKS · AKAPI</div>
        </div>
      </div>
    </div>
  );
}

function Spotlight({ all }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const wrapRef = useRef(null);

  const start = () => {
    stop();
    if (all.length > 1) timerRef.current = setInterval(() => setIdx(i => (i + 1) % all.length), 4200);
  };
  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    setIdx(0);
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all.length]);

  if (!all.length) return null;

  const goTo = (i) => setIdx((i + all.length) % all.length);

  return (
    <div className="reveal">
      <div className="car-label">Sorotan Pengurus</div>
      <div className="carousel" ref={wrapRef} onMouseEnter={stop} onMouseLeave={start}>
        <button className="car-arrow left" onClick={() => { goTo(idx - 1); start(); }}>‹</button>
        <div className="car-track-wrap">
          <div className="car-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
            {all.map(p => (
              <div className="car-slide" key={p.id}>
                <div className="car-photo">{p.photo ? <img src={p.photo} alt={p.name} /> : initials(p.name)}</div>
                <div className="car-info">
                  <div className="name">{p.name}</div>
                  <div className="role">{p.role}</div>
                  <div className="note">{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="car-arrow right" onClick={() => { goTo(idx + 1); start(); }}>›</button>
      </div>
      <div className="car-dots">
        {all.map((_, i) => (
          <button key={i} className={`car-dot${i === idx ? ' active' : ''}`} onClick={() => { goTo(i); start(); }} />
        ))}
      </div>
    </div>
  );
}

const CATS = [
  { key: 'harian', label: 'Pengurus Harian' },
  { key: 'pengawas', label: 'Dewan Pengawas' },
  { key: 'penasihat', label: 'Dewan Penasihat' }
];

export default function Pengurus({ data }) {
  const [activeCat, setActiveCat] = useState('harian');
  const all = [...(data.harian || []), ...(data.pengawas || []), ...(data.penasihat || [])];
  const list = data[activeCat] || [];

  return (
    <section className="sec" id="pengurus">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-index">Bab 03</div>
            <h2>Kartu Indeks Pengurus</h2>
          </div>
          <p>Pilih laci, lalu ketuk kartu untuk membaca riwayat singkat masing-masing pengurus.</p>
        </div>

        <Spotlight all={all} />

        <div className="drawer-tabs">
          {CATS.map(c => (
            <button key={c.key} className={`drawer-tab${activeCat === c.key ? ' active' : ''}`}
              onClick={() => setActiveCat(c.key)}>{c.label}</button>
          ))}
        </div>

        <div className="drawer-panel">
          {list.length
            ? list.map(p => <IndexCard key={p.id} person={p} />)
            : <div className="drawer-empty">Belum ada data — tambahkan lewat panel Admin.</div>}
        </div>
      </div>
    </section>
  );
}
