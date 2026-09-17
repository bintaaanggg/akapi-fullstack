import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="sec" id="kontak" style={{ borderBottom: 'none' }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Hubungi Kami</h2>
          </div>
          <p>Untuk pertanyaan keanggotaan, kolaborasi riset, atau kerja sama kebijakan.</p>
        </div>
        <div className="contact-grid">
          <div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="field"><label>Nama</label><input type="text" required /></div>
              <div className="field"><label>Surel</label><input type="email" required /></div>
              <div className="field"><label>Pesan</label><textarea rows="3" required /></div>
              <button className="btn btn-solid" type="submit">Kirim Pesan</button>
              {sent && <p style={{ marginTop: 14, fontSize: 13.5, color: 'var(--cloth)' }}>Terkirim — tim kami akan membalas melalui surel.</p>}
            </form>
          </div>
          <div>
            <div className="info-line"><div className="k">Alamat</div><div>Sekretariat AKAPI, Jakarta, Indonesia <em style={{ opacity: 0.6 }}>(placeholder)</em></div></div>
            <div className="info-line"><div className="k">Telepon</div><div>+62 21 000 0000 <em style={{ opacity: 0.6 }}>(placeholder)</em></div></div>
            <div className="info-line"><div className="k">Surel</div><div>sekretariat@akapi.or.id <em style={{ opacity: 0.6 }}>(placeholder)</em></div></div>
            <div className="info-line"><div className="k">Legalitas</div><div>SK Kemenkumham No. AHU-0002531.AH.01.07</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
