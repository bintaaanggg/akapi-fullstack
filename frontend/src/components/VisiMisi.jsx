const MISI = [
  'Meningkatkan kompetensi sumber daya manusia di bidang analis kebijakan publik yang mencakup ranah formulasi, implementasi dan evaluasi kebijakan.',
  'Meningkatkan profesionalisme dalam kinerja tata kelola pemerintahan untuk mencetak sumber daya manusia yang terpercaya, unggul, dan kompeten di bidang kebijakan publik yang mampu beradaptasi dengan disrupsi teknologi dan tuntutan akuntabilitas digital.',
  'Meningkatkan dan mengembangkan inovasi standar kompetensi kerja di bidang keahlian analis kebijakan dalam ranah formulasi, implementasi dan evaluasi kebijakan publik berbasis bukti (evidence based) dan pemanfaatan kecerdasan buatan atau Artificial Intelegent untuk mendukung prediksi dampak kebijakan.',
  'Mendorong adaptabilitas dalam perumusan kebijakan publik melalui kemitraan strategis dengan lembaga pemerintah, akademisi, dan sektor swasta, berbasis platform digital, guna meningkatkan transparansi anggaran, serta akuntabilitas kebijakan dan inovasi riset kebijakan.'
];

const TUJUAN = [
  'Melaksanakan program dan kegiatan dalam rangka meningkatkan pengetahuan, sikap dan keterampilan yang profesional di bidang analis kebijakan',
  'Merekomendasikan model kebijakan yang efektif untuk peningkatan kinerja dan profesionalisme Kepala Pemerintah Pusat dan Daerah, DPR RI dan DPRD serta Lembaga/Instansi Pemerintah lainnya',
  'Meningkatkan dan mengembangkan inovasi standar kompetensi kerja di lingkungan Pemerintah Pusat dan Daerah, serta Lembaga/Instansi lainnya',
  'Mendorong integrasi prinsip tata kelola digital (digital governance) dalam setiap tahapan siklus kebijakan publik yang sejalan dengan agenda pembangunan nasional'
];

export default function VisiMisi() {
  return (
    <section className="sec" id="visimisi">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Visi &amp; Misi</h2>
          </div>

          <p>
            Arah dan agenda strategis AKAPI dalam memperkuat kebijakan publik Indonesia.
          </p>
        </div>

        <div className="sub-label">Visi</div>

        <div className="visi-quote">
          "Menjadi organisasi profesi terdepan berskala nasional dan internasional yang unggul, dan kompeten di bidang kebijakan publik, di era pemerintahan digital."
        </div>

        <div className="sub-label">Misi</div>

        <div className="point-block">
          <ul>
            {MISI.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="sub-label">Tujuan</div>

        <div className="point-block">
          <ul>
            {TUJUAN.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="sasaran-box">
          <strong>Sasaran.</strong>{' '}
          1. Meningkatkan independensi dan netralitas, profesionalisme
          kinerja/produktivitas kerja, integritas, kualitas pelayanan publik,
          pengawasan dan akuntabilitas, termasuk akuntabilitas digital dan
          transparansi anggaran di lingkungan instansi/lembaga pemerintah,
          perguruan tinggi, perusahaan dan lembaga profesi.
          <br /><br />
          2. Mewujudkan tata kelola kebijakan publik yang inklusif,
          partisipatif, dan berkelanjutan dalam rangka peningkatan
          kesejahteraan masyarakat.
        </div>
      </div>
    </section>
  );
}