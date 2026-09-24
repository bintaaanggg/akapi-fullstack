import { useEffect, useRef, useState } from 'react';
import api from '../api.js';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    api.get('/galeri').then(res => setPhotos(res.data)).catch(err => console.error(err));
  }, []);

  const start = () => {
    stop();
    if (photos.length > 1) timerRef.current = setInterval(() => setIdx(i => (i + 1) % photos.length), 4500);
  };
  const stop = () => { if (timerRef.current) clearInterval(timerRef.current); };

  useEffect(() => {
    setIdx(0);
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  const goTo = (i) => setIdx((i + photos.length) % photos.length);

  return (
    <section className="sec" id="galeri">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Galeri Kegiatan</h2>
          </div>
          <p>Dokumentasi kegiatan dan acara AKAPI.</p>
        </div>

        {photos.length ? (
          <div className="gslide" onMouseEnter={stop} onMouseLeave={start}>
            <div className="gslide-frame">
              <div className="gslide-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
                {photos.map((p, i) => (
                  <div className="gslide-item" key={p.id}>
                    <img src={p.photo} alt={p.caption} />
                    {p.caption && <div className="gslide-caption">{p.caption}</div>}
                  </div>
                ))}
              </div>
            </div>
            {photos.length > 1 && (
              <>
                <button className="gslide-arrow left" onClick={() => { goTo(idx - 1); start(); }}>‹</button>
                <button className="gslide-arrow right" onClick={() => { goTo(idx + 1); start(); }}>›</button>
                <div className="gslide-dots">
                  {photos.map((_, i) => (
                    <button key={i} className={`gslide-dot${i === idx ? ' active' : ''}`} onClick={() => { goTo(i); start(); }} />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="drawer-empty">Belum ada foto — tambahkan lewat panel Admin.</div>
        )}
      </div>
    </section>
  );
}