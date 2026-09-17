export default function Footer({ onOpenAdmin }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <div className="footer-brand-row">
            <span className="footer-logo">
              <img src="/logo-akapi.jpg" alt="Logo AKAPI" />
            </span>
            <div className="footer-brand">AKAPI</div>
          </div>
          <p className="footer-tag">Asosiasi Kebijakan Publik Indonesia — mencetak analis kebijakan yang adaptif dan berbasis data sejak 2020.</p>
        </div>
        <div>
          <h4>Jelajahi</h4>
          <ul>
            <li><a href="#tentang">Tentang Kami</a></li>
            <li><a href="#visimisi">Visi &amp; Misi</a></li>
            <li><a href="#pengurus">Pengurus</a></li>
            <li><a href="#agenda">Agenda</a></li>
            <li><a href="#pelatihan">Pelatihan</a></li>
          </ul>
        </div>
        <div>
          <h4>Legalitas</h4>
          <ul>
            <li>Berdiri 4 Feb 2020</li>
            <li>SK Kemenkumham 2021</li>
            <li>Asas Pancasila &amp; UUD 1945</li>
          </ul>
        </div>
        <div>
          <h4>Kontak</h4>
          <ul>
            <li>Jakarta, Indonesia</li>
            <li>sekretariat@akapi.or.id</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 AKAPI. Seluruh hak cipta dilindungi.</span>
        <span><button className="admin-link" onClick={onOpenAdmin}>Admin</button></span>
      </div>
    </footer>
  );
}