const MISI = [
  { title: 'Peningkatan Kompetensi SDM', desc: 'Pengembangan kebijakan publik dari formulasi, implementasi, dan evaluasi, termasuk penguasaan analitik data dan tata kelola digital.' },
  { title: 'Profesionalisme Aparatur', desc: 'Mencetak SDM yang terpercaya, unggul, dan kompeten, mampu beradaptasi dengan disrupsi teknologi dan akuntabilitas digital.' },
  { title: 'Inovasi Standar Kompetensi', desc: 'Penguatan formulasi dan implementasi kebijakan berbasis evidence based policy making serta pemanfaatan kecerdasan buatan (AI).' },
  { title: 'Kemitraan Strategis', desc: 'Memperluas partisipasi publik lewat platform digital, transparansi anggaran, akuntabilitas kebijakan, dan inovasi riset berbasis teknologi.' }
];

const TUJUAN = [
  { title: 'Penguatan Kapasitas', desc: 'Meningkatkan pengetahuan, sikap, dan keterampilan profesional analis kebijakan, termasuk kapasitas data dan teknologi digital.' },
  { title: 'Rekomendasi Model Kebijakan', desc: 'Mendorong kinerja dan profesionalisme Kepala Daerah, Aparatur Pemerintah, DPR/D, dan Lembaga/Instansi lain.' },
  { title: 'Pengembangan Standar Kerja', desc: 'Penguatan kompetensi sektor kebijakan publik berbasis bukti yang didukung teknologi analitik data.' },
  { title: 'Integrasi Tata Kelola Digital', desc: 'Mendorong digital governance dan keterbukaan data selaras dengan agenda perlindungan data pribadi dan keamanan siber.' }
];

function TocList({ items, page }) {
  return (
    <div className="toc-list">
      {items.map((it, i) => (
        <div className="toc-row" key={it.title}>
          <div className="toc-num">{String(i + 1).padStart(2, '0')}</div>
          <div className="toc-title">{it.title}<small>{it.desc}</small></div>
          <div className="toc-page">{page}</div>
        </div>
      ))}
    </div>
  );
}

export default function VisiMisi() {
  return (
    <section className="sec" id="visimisi">
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-index">Bab 02</div>
            <h2>Visi &amp; Misi</h2>
          </div>
          <p>Arah dan agenda strategis AKAPI dalam memperkuat kebijakan publik Indonesia.</p>
        </div>

        <div className="visi-quote">
          "Menjadi organisasi profesi terdepan berskala nasional dan internasional yang mampu mencetak tenaga profesional, terpercaya, unggul, dan kompeten di bidang analis kebijakan, yang adaptif terhadap transformasi digital dan berbasis data, guna memperkuat kualitas kebijakan publik Indonesia di era pemerintahan digital."
        </div>

        <div className="sub-label">Misi</div>
        <TocList items={MISI} page="Misi" />

        <div className="sub-label">Tujuan</div>
        <TocList items={TUJUAN} page="Tujuan" />

        <div className="sasaran-box">
          <strong>Sasaran.</strong> Meningkatkan independensi dan netralitas, profesionalisme kinerja, integritas, kualitas pelayanan publik, pengawasan dan akuntabilitas — termasuk akuntabilitas digital dan transparansi anggaran berbasis dashboard publik — di lingkungan instansi pemerintah, akademisi, perusahaan, dan profesi/praktisi, guna mewujudkan tata kelola kebijakan yang inklusif, partisipatif, dan berbasis data.
        </div>
      </div>
    </section>
  );
}
