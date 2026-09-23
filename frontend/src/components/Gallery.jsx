import { useEffect, useState } from 'react';
import api from '../api.js';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get('/galeri').then(res => setPhotos(res.data)).catch(err => console.error(err));
  }, []);

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
          {photos.length ? photos.map(p => (
            <div className="gallery-item" key={p.id} onClick={() => setActive(p)}>
              <img src={p.photo} alt={p.caption} />
              {p.caption && <div className="gallery-caption">{p.caption}</div>}
            </div>
          )) : <div className="drawer-empty">Belum ada foto — tambahkan lewat panel Admin.</div>}
        </div>
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActive(null)}>
          <button className="gallery-close" onClick={() => setActive(null)}>✕</button>
          <img src={active.photo} alt={active.caption} onClick={(e) => e.stopPropagation()} />
          {active.caption && <div className="gallery-lightbox-caption">{active.caption}</div>}
        </div>
      )}
    </section>
  );
}