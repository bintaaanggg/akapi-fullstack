import { useState } from 'react';

const PHOTOS = [];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="sec" id="galeri">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Galeri Kegiatan</h2>
          </div>
          <p>Dokumentasi kegiatan dan acara AKAPI.</p>
        </div>

        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <div className="gallery-item" key={i} onClick={() => setActive(p)}>
              <img src={p.src} alt={p.caption} />
              <div className="gallery-caption">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActive(null)}>
          <button className="gallery-close" onClick={() => setActive(null)}>✕</button>
          <img src={active.src} alt={active.caption} onClick={(e) => e.stopPropagation()} />
          <div className="gallery-lightbox-caption">{active.caption}</div>
        </div>
      )}
    </section>
  );
}