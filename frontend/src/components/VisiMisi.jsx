const MISI = [
  'Mengembangkan kebijakan publik dari formulasi, implementasi, hingga evaluasi dengan penguasaan analitik data dan tata kelola digital.',
  'Mencetak sumber daya aparatur yang profesional, terpercaya, unggul, dan kompeten dalam beradaptasi terhadap disrupsi teknologi.',
  'Memperkuat inovasi formulasi dan implementasi kebijakan berbasis evidence-based policy making serta pemanfaatan kecerdasan buatan (AI).',
  'Membangun kemitraan strategis melalui platform digital, transparansi anggaran, akuntabilitas kebijakan, dan inovasi riset berbasis teknologi.'
];

const TUJUAN = [
  'Meningkatkan pengetahuan, sikap, dan keterampilan profesional analis kebijakan termasuk kapasitas data dan teknologi digital.',
  'Mendorong kinerja dan profesionalisme Kepala Daerah, Aparatur Pemerintah, DPR/D, dan Lembaga/Instansi lain melalui rekomendasi model kebijakan.',
  'Mengembangkan standar kerja bagi penguatan kompetensi sektor kebijakan publik berbasis bukti yang didukung teknologi analitik data.',
  'Mendorong integrasi tata kelola digital dan keterbukaan data yang selaras dengan agenda perlindungan data pribadi dan keamanan siber.'
];

function NumberedList({ items }) {
  return (
    <ol className="num-list">
      {items.map((text, i) => (
        <li key={i}>
          <span className="num-badge">{String(i + 1).padStart(2, '0')}</span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
}

export default function VisiMisi() {
  return (
    <section className="sec" id="visimisi">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Visi, Misi & Tujuan</h2>
          </div>
          <p>Arah dan agenda strategis AKAPI dalam memperkuat kebijakan publik Indonesia.</p>
        </div>

        <div className="point-heading">Visi</div>
        <div className="visi-quote">
          "Menjadi organisasi profesi terdepan berskala nasional dan internasional yang mampu mencetak tenaga profesional, terpercaya, unggul, dan kompeten di bidang analisis kebijakan, yang adaptif terhadap transformasi digital dan berbasis data, guna memperkuat kualitas kebijakan publik Indonesia di era pemerintahan digital."
        </div>

        <div className="point-heading">Misi</div>
        <NumberedList items={MISI} />

        <div className="point-heading">Tujuan</div>
        <NumberedList items={TUJUAN} />

               <div className="sasaran-box">
          <strong>Sasaran.</strong> Meningkatkan independensi dan netralitas, profesionalisme kinerja, integritas, kualitas pelayanan publik, pengawasan dan akuntabilitas — termasuk akuntabilitas digital dan transparansi anggaran berbasis dashboard.
        </div>
      </div>
    </section>
  );
}