const MISI = [
  'Melaksanakan program-program peningkatan kompetensi sumber daya manusia dibidang kebijakan publik mencakup formulasi, implementasi dan evaluasi kebijakan. ',
  'Melembagakan profesionalitas, terpercaya, unggul, dan kompeten bagi profesi dibidang kebijakan publik. ',
  'Mengembangkan inovasi standar kompetensi dibidang analis kebijakan publik.',
];

const TUJUAN = [
  'Melaksanakan program peningkatan pengetahuan, sikap dan ketrampilan yang profesional sebagai analis kebijakan publik.',
  'Melaksanakan pelembagaan karakter profesional, terpercaya, unggul, dan kompeten bagi profesi di bidang kebijakan publik. ',
  'Melaksanakan pengembangan inovasi standar kompetensi di bidang kebijakan publik dan analis yang mencakup formulasi, implementasi dan evaluasi kebijakan.',
];

export default function VisiMisi() {
  return (
    <section className="sec" id="visimisi">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Visi &amp; Misi</h2>
          </div>
          <p>Arah dan agenda strategis AKAPI dalam memperkuat kebijakan publik Indonesia.</p>
        </div>

        <div className="sub-label">Visi</div>
        <div className="visi-quote">
         Menjadi organisasi profesi yang memiliki reputasi pada skala nasional dan internasional, serta mampu mengembangkan kompetensi analis kebijakan publik yang profesional, berakar pada nilai-nilai karakter Indonesia. 
        </div>

        <div className="sub-label">Misi</div>
        <div className="point-block">
          <ul>
            {MISI.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="sub-label">Tujuan</div>
        <div className="point-block">
          <ul>
            {TUJUAN.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="sasaran-box">
          <strong>Sasaran.</strong> Meningkatkan profesionalisme, independensi, netralitas dan integritas analis kebijakan dalam rangka  peningkatan kualitas pelayanan publik, pengawasan dan akuntabilitas di lingkungan instansi/lembaga pemerintah, swasta dan lembaga-lembaga nirlaba sebagai upaya peningkatan kesejahteraan masyarakat. 
        </div>
      </div>
    </section>
  );
}
