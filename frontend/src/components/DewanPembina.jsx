const INSTITUSI = [
  'Rektor Universitas Brawijaya Malang',
  'Rektor Universitas Merdeka Malang',
  'Rektor Universitas Islam Malang'
];

const PEMBINA = [
  { name: 'Aries Agus Paewai, S.STP., M.M', role: 'Kepala BPSDM Provinsi Jawa Timur' },
  { name: 'Prof. Dr. Kausar AS., M.Si', role: 'Lembaga Ketahanan Nasional' },
  { name: 'Dr. Asmawi Rewansyah, M.Sc', role: 'STIA LAN Jakarta' },
  { name: 'Prof. Dr. Bambang Supriyono, M.S', role: 'Dekan FIA Universitas Brawijaya' },
  { name: 'Prof. Dr. Bonaventura Ngarawula, MS', role: 'Ketua Prodi S3 Ilmu Sosial Universitas Merdeka Malang' },
  { name: 'Prof. Setyaningsih, SE., MM', role: 'Ketua Yayasan STIE Indonesia Malang' },
  { name: 'Dr. H. Said Mulyadi, SE., M.Si', role: 'Wakil Bupati Pidie Jaya' },
  { name: 'Dr. Harun, MM., M.Si', role: 'Praktisi' }
];

const PAKAR = [
  {
    kategori: 'Pakar Kebijakan Poleksosbud',
    anggota: [
      { name: "Prof. H.M. Mas'ud Said, MM., Ph.D", role: 'Direktur Pasca Sarjana Universitas Islam Malang' },
      { name: 'Dr. Sukardi, M.Si', role: 'Dekan FISIP Universitas Merdeka Malang' },
      { name: 'Dr. Maulina Pia Wulandari, Ph.D., M.Kom., S.Sos', role: 'Universitas Brawijaya Malang' }
    ]
  },
  {
    kategori: 'Pakar Kebijakan Pemberdayaan, Kesehatan Masyarakat',
    anggota: [
      { name: 'Prof. Dr. Agus Widodo, M.Kes', role: 'Universitas Brawijaya' },
      { name: 'Dr. Chairun Nashirin, M.Pd., MARS', role: 'Ketua STIKES Mataram Lombok' },
      { name: 'Dr. Ir. J.E. Sutanto, MM', role: 'Universitas Ciputra Surabaya' }
    ]
  },
  {
    kategori: 'Pakar Kebijakan Pengembangan SDM dan Kompetensi',
    anggota: [
      { name: 'Dr. Ir. Gentur Prihatono, MT', role: 'Praktisi' },
      { name: 'Nurul Indah Susanti, S.Psi., M.Psi', role: 'Direktur LSP MSDM Profesional (Master Asesor BNSP)' },
      { name: 'Dr. Prihat Assih, M.Si., AK., CSRS', role: 'Wakil Rektor II Universitas Merdeka Malang' },
      { name: 'Dr. Vecky Nelwan, S.Psi., M.Psi', role: 'Universitas Wisnu Wardhana Malang' }
    ]
  },
  {
    kategori: 'Pakar Kebijakan Lingkungan Hidup dan Pembangunan',
    anggota: [
      { name: 'Dr. Ir. Diah Susilowati, MT', role: 'Praktisi' }
    ]
  }
];

function SimpleTable({ rows }) {
  return (
    <table className="pembina-table">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}><td colSpan={2}>{r}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

function NameRoleTable({ rows }) {
  return (
    <table className="pembina-table">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className="pembina-name">{r.name}</td>
            <td className="pembina-role">{r.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DewanPembina() {
  return (
    <section className="sec" id="dewanpembina">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Dewan Pembina</h2>
          </div>
          <p>Jajaran pembina dan pakar kebijakan yang mendampingi AKAPI.</p>
        </div>

        <div className="sub-label">Institusi Pembina</div>
        <SimpleTable rows={INSTITUSI} />

        <div className="sub-label">Dewan Pembina</div>
        <NameRoleTable rows={PEMBINA} />

        {PAKAR.map((grup, i) => (
          <div key={i}>
            <div className="sub-label">{grup.kategori}</div>
            <NameRoleTable rows={grup.anggota} />
          </div>
        ))}
      </div>
    </section>
  );
}