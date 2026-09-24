export default function Agenda({ data }) {
  return (
    <section className="sec" id="agenda">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Agenda &amp; Pelatihan</h2>
          </div>
          <p>Jadwal kongres, kajian, dan pelatihan yang melibatkan anggota AKAPI.</p>
        </div>
        <div className="event-list">
          {data.length ? data.map(ev => (
            <div className="event-card" key={ev.id}>
              <div className="event-date">
                <div className="d">{ev.day}</div>
                <div className="m">{ev.month}</div>
              </div>
              <div>
                <div className="event-title">{ev.title}</div>
                <div className="event-meta">{ev.meta}</div>
              </div>
              <a href="#kontak" className="btn btn-ghost">Info Lengkap</a>
            </div>
          )) : <div className="drawer-empty">Belum ada agenda.</div>}
        </div>

        <div className="point-heading" style={{ marginTop: '56px' }}>Pelatihan</div>
        <div className="visi-quote">
          Program pengembangan kompetensi analis kebijakan publik. Daftar program pelatihan AKAPI akan segera hadir di halaman ini — nantikan kabar lebih lanjut lewat kanal resmi kami.
        </div>
      </div>
    </section>
  );
}