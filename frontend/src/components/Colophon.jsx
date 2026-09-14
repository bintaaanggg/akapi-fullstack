import CountUp from './CountUp.jsx';

export default function Colophon() {
  return (
    <section className="colophon container">
      <div className="colophon-item">
        <div className="colophon-num"><CountUp target={2020} /></div>
        <div className="colophon-label">Tahun berdiri, disahkan Kemenkumham RI 2021</div>
      </div>
      <div className="colophon-item">
        <div className="colophon-num"><CountUp target={4} /></div>
        <div className="colophon-label">Misi strategis pengembangan kompetensi analis kebijakan</div>
      </div>
      <div className="colophon-item">
        <div className="colophon-num"><CountUp target={4} /></div>
        <div className="colophon-label">Tujuan utama penguatan kebijakan publik nasional</div>
      </div>
      <div className="colophon-item">
        <div className="colophon-num"><CountUp target={6} suffix="+" /></div>
        <div className="colophon-label">Tahun mengawal transformasi kebijakan berbasis data</div>
      </div>
    </section>
  );
}
