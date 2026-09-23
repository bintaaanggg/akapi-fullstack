import { useEffect, useState } from 'react';
import api from '../api.js';

function SimpleTable({ rows }) {
  return (
    <table className="pembina-table">
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}><td colSpan={2}>{r.name}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

function NameRoleTable({ rows }) {
  return (
    <table className="pembina-table">
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td className="pembina-name">{r.name}</td>
            <td className="pembina-role">{r.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DewanPembina() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/dewanpembina').then(res => setData(res.data)).catch(err => console.error(err));
  }, []);

  const institusi = data.filter(d => d.group_type === 'institusi');
  const pembina = data.filter(d => d.group_type === 'pembina');
  const pakarList = data.filter(d => d.group_type === 'pakar');

  const pakarGrouped = [];
  pakarList.forEach(p => {
    let grup = pakarGrouped.find(g => g.kategori === p.kategori);
    if (!grup) { grup = { kategori: p.kategori, anggota: [] }; pakarGrouped.push(grup); }
    grup.anggota.push(p);
  });

  return (
    <section className="sec" id="dewanpembina">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2>Dewan Pembina</h2>
          </div>
          <p>Jajaran pembina dan pakar kebijakan yang mendampingi AKAPI.</p>
        </div>

        {institusi.length > 0 && (
          <>
            <div className="sub-label">Institusi Pembina</div>
            <SimpleTable rows={institusi} />
          </>
        )}

        {pembina.length > 0 && (
          <>
            <div className="sub-label">Dewan Pembina</div>
            <NameRoleTable rows={pembina} />
          </>
        )}

        {pakarGrouped.map((grup, i) => (
          <div key={i}>
            <div className="sub-label">{grup.kategori}</div>
            <NameRoleTable rows={grup.anggota} />
          </div>
        ))}
      </div>
    </section>
  );
}