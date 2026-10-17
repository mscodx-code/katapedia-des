import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Candidate {
  id: string;
  name: string;
  level: string;
  dapil: string;
  accounts: string;
  dataCoverage: string;
  baseline: string;
  sync: string;
  status: string;
  anomali?: boolean;
  stale?: boolean;
}

const initialCandidates: Candidate[] = [
  { id: 'CAN-0001', name: 'Bakal Caleg 01', level: 'DPR RI', dapil: 'Jawa Barat · Dapil 1', accounts: 'IG ✓ · TikTok ✓', dataCoverage: 'Data Sufficient', baseline: 'Above Baseline', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0002', name: 'Bakal Caleg 02', level: 'DPR RI', dapil: 'Jawa Barat · Dapil 1', accounts: 'IG ✓ · TikTok pending', dataCoverage: 'Partial', baseline: 'Near Baseline', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0003', name: 'Bakal Caleg 03', level: 'DPR RI', dapil: 'Jawa Barat · Dapil 1', accounts: 'IG ✓ · TikTok ✓', dataCoverage: 'Data Sufficient', baseline: 'Below Baseline', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0004', name: 'Bakal Caleg 04', level: 'DPR RI', dapil: 'Jawa Barat · Dapil 2', accounts: 'IG ✓', dataCoverage: 'Partial', baseline: 'Above Baseline', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0005', name: 'Bakal Caleg 05', level: 'DPRD Provinsi', dapil: 'Jawa Barat · Dapil 3', accounts: 'IG ✓ · TikTok ✓', dataCoverage: 'Data Sufficient', baseline: 'Near Baseline', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0006', name: 'Bakal Caleg 06', level: 'DPRD Provinsi', dapil: 'Jawa Barat · Dapil 3', accounts: 'TikTok ✓', dataCoverage: 'Insufficient', baseline: 'Belum dapat dihitung', sync: '13 Okt, 06:00', status: 'Active' },
  { id: 'CAN-0007', name: 'Bakal Caleg 07', level: 'DPRD Kab/Kota', dapil: 'Kota Depok · Dapil 1', accounts: 'IG ✓ · TikTok ✓', dataCoverage: 'Data Sufficient', baseline: 'Above Baseline', sync: '13 Okt, 06:00', status: 'Active', anomali: true },
  { id: 'CAN-0008', name: 'Bakal Caleg 08', level: 'DPRD Kab/Kota', dapil: 'Kota Depok · Dapil 1', accounts: 'IG ✓ · TikTok invalid', dataCoverage: 'Partial', baseline: 'Near Baseline', sync: '10 Okt, 06:00', status: 'Suspended/Review', stale: true },
];

export const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('Semua level');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  const [coverageFilter, setCoverageFilter] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newId, setNewId] = useState('CAN-0009');
  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState('DPR RI');
  const [newDapil, setNewDapil] = useState('Jawa Barat · Dapil 1');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase());
      const matchLevel = levelFilter === 'Semua level' || c.level === levelFilter;
      const matchStatus = statusFilter === 'Semua status' || c.status.toLowerCase().includes(statusFilter.toLowerCase());
      const matchCoverage = coverageFilter === 'Semua' || c.dataCoverage.toLowerCase().includes(coverageFilter.toLowerCase());
      return matchQuery && matchLevel && matchStatus && matchCoverage;
    });
  }, [candidates, query, levelFilter, statusFilter, coverageFilter]);

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const item: Candidate = {
      id: newId,
      name: newName,
      level: newLevel,
      dapil: newDapil,
      accounts: 'IG pending · TikTok pending',
      dataCoverage: 'Partial',
      baseline: 'Near Baseline',
      sync: 'Hari ini, baru dibuat',
      status: 'Active'
    };
    setCandidates([item, ...candidates]);
    setIsModalOpen(false);
    setNewName('');
    showToast(`Kandidat ${item.name} (${item.id}) berhasil ditambahkan.`);
  };

  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0E5A63', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', fontWeight: 500 }}>
          {toastMessage}
        </div>
      )}

      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Pemantauan</div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Daftar Kandidat</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
          <button 
            type="button" 
            onClick={() => showToast('Ekspor CSV daftar kandidat berhasil diunduh.')}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
          >
            Export CSV
          </button>
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "0", background: "#0E5A63", color: "#fff", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
          >
            Tambah kandidat
          </button>
        </div>
      </header>

      <section aria-label="Filter dan pencarian" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "2 1 240px" }}>
          <label htmlFor="q" style={{ fontSize: "12px", color: "#5B6672" }}>Cari nama atau Candidate ID</label>
          <input 
            id="q" 
            type="search" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Contoh: Bakal Caleg 03 atau CAN-0003" 
            style={{ height: "38px", padding: "0 12px", border: "1px solid #B9C1C9", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box" }} 
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="a1" style={{ fontSize: "12px", color: "#5B6672" }}>Level</label>
          <select 
            id="a1" 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua level</option>
            <option>DPR RI</option>
            <option>DPRD Provinsi</option>
            <option>DPRD Kab/Kota</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="a2" style={{ fontSize: "12px", color: "#5B6672" }}>Wilayah</label>
          <select id="a2" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua wilayah</option>
            <option>Jawa Barat</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="a3" style={{ fontSize: "12px", color: "#5B6672" }}>Dapil</label>
          <select id="a3" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua dapil</option>
            <option>Dapil 1</option>
            <option>Dapil 2</option>
            <option>Dapil 3</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="a4" style={{ fontSize: "12px", color: "#5B6672" }}>Status kandidat</label>
          <select 
            id="a4" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended/Review</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="a5" style={{ fontSize: "12px", color: "#5B6672" }}>Kecukupan data</label>
          <select 
            id="a5" 
            value={coverageFilter}
            onChange={(e) => setCoverageFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua</option>
            <option>Data Sufficient</option>
            <option>Partial</option>
            <option>Insufficient</option>
          </select>
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "8px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", padding: "14px 0 6px", alignItems: "baseline" }}>
          <div style={{ fontSize: "14px", color: "#3B4651" }}>Menampilkan {filteredCandidates.length} dari {candidates.length} kandidat · urut berdasarkan Candidate ID</div>
          <div style={{ fontSize: "12px", color: "#5B6672" }}>Daftar ini tidak menampilkan peringkat atau skor kelayakan.</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "980px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Candidate ID</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Nama</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Level</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Wilayah · Dapil</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Akun</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Kecukupan data</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Posisi vs baseline (90 hari)</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Sync terakhir</th>
                <th style={{ padding: "10px 10px", borderBottom: "1px solid #DDE1DA" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c) => (
                <tr key={c.id}>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC", fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px" }}>
                    {c.id}
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>
                    <Link to={`/candidates/${c.id}`} style={{ fontWeight: "500", color: "#0E5A63" }}>
                      {c.name}
                    </Link>
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>{c.level}</td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>{c.dapil}</td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>
                    <span style={{ fontSize: "13px" }}>{c.accounts}</span>
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>
                    <span style={{
                      padding: "2px 9px",
                      borderRadius: "999px",
                      background: c.dataCoverage === 'Data Sufficient' ? "#E2F1E6" : c.dataCoverage === 'Partial' ? "#FBEFD6" : "#E9ECEF",
                      color: c.dataCoverage === 'Data Sufficient' ? "#1F5E34" : c.dataCoverage === 'Partial' ? "#7A4A00" : "#3B4651",
                      fontSize: "12px",
                      fontWeight: 500
                    }}>
                      {c.dataCoverage}
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>
                    {c.baseline === 'Belum dapat dihitung' ? (
                      <span style={{ color: "#5B6672", fontSize: "13px" }}>Belum dapat dihitung</span>
                    ) : (
                      <>
                        <span style={{
                          padding: "2px 9px",
                          borderRadius: "999px",
                          background: c.baseline === 'Above Baseline' ? "#E0EFF1" : c.baseline === 'Near Baseline' ? "#E9ECEF" : "#FBEFD6",
                          color: c.baseline === 'Above Baseline' ? "#0B4A52" : c.baseline === 'Near Baseline' ? "#3B4651" : "#7A4A00",
                          fontSize: "12px",
                          fontWeight: 500
                        }}>
                          {c.baseline}
                        </span>
                        {c.anomali && (
                          <span style={{ marginLeft: "4px", padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>
                            Anomali
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC", fontSize: "13px", color: "#3B4651" }}>
                    {c.sync}
                    {c.stale && (
                      <span style={{ marginLeft: "4px", padding: "2px 9px", borderRadius: "999px", background: "#FBE4E1", color: "#8E2420", fontSize: "12px", fontWeight: "500" }}>
                        Stale
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 10px", borderBottom: "1px solid #EEF0EC" }}>
                    <span style={{
                      padding: "2px 9px",
                      borderRadius: "999px",
                      background: c.status === 'Active' ? "#E2F1E6" : "#FBEFD6",
                      color: c.status === 'Active' ? "#1F5E34" : "#7A4A00",
                      fontSize: "12px",
                      fontWeight: 500
                    }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", paddingTop: "16px", fontSize: "13px", color: "#5B6672" }}>
          <span>Halaman 1 dari 1 (Total {filteredCandidates.length} kandidat)</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Sebelumnya</button>
            <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Berikutnya</button>
          </div>
        </div>
      </section>

      {/* Modal Tambah Kandidat */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 28px', width: '100%', maxWidth: '480px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Tambah Kandidat Baru</h2>
            <form onSubmit={handleAddCandidate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>Candidate ID</label>
                <input value={newId} onChange={e => setNewId(e.target.value)} style={{ width: '100%', height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>Nama Bakal Caleg</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Contoh: Bakal Caleg 09" required style={{ width: '100%', height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>Level Pemilihan</label>
                <select value={newLevel} onChange={e => setNewLevel(e.target.value)} style={{ width: '100%', height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', background: '#fff' }}>
                  <option>DPR RI</option>
                  <option>DPRD Provinsi</option>
                  <option>DPRD Kab/Kota</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#5B6672', display: 'block', marginBottom: '4px' }}>Dapil</label>
                <input value={newDapil} onChange={e => setNewDapil(e.target.value)} style={{ width: '100%', height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ height: '38px', padding: '0 16px', border: '1px solid #B9C1C9', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Batal</button>
                <button type="submit" style={{ height: '38px', padding: '0 16px', border: 0, borderRadius: '8px', background: '#0E5A63', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default CandidatesPage;
