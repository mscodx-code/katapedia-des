import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Finding {
  id: string;
  dimension: string;
  candidateName: string;
  candidateId: string;
  platform: string;
  status: 'Verified' | 'Pending Review' | 'Needs Review' | 'Disputed';
  statement: string;
  reason: string;
  confidence: 'Tinggi' | 'Sedang' | 'Rendah';
  evidenceCount: number;
  model: string;
  created: string;
  isSensitive?: boolean;
}

const initialFindings: Finding[] = [
  {
    id: 'f-1',
    dimension: 'D03 Issue Ownership',
    candidateName: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram & TikTok',
    status: 'Verified',
    statement: 'Isu layanan kesehatan paling sering muncul di konten 90 hari terakhir.',
    reason: '18 dari 62 konten dikelompokkan ke topik ini; topik konsisten di 11 dari 13 minggu.',
    confidence: 'Tinggi',
    evidenceCount: 18,
    model: '[nama-model] v1.2',
    created: '13 Okt 2026, 06:40'
  },
  {
    id: 'f-2',
    dimension: 'D02 Positioning',
    candidateName: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram',
    status: 'Pending Review',
    statement: 'Pesan utama konsisten pada format cerita personal.',
    reason: 'pola kalimat pembuka dan tema kedekatan dengan warga berulang di 9 konten.',
    confidence: 'Sedang',
    evidenceCount: 9,
    model: '[nama-model] v1.2',
    created: '13 Okt 2026, 06:41'
  },
  {
    id: 'f-3',
    dimension: 'D07 Trust & Reputation',
    candidateName: 'Bakal Caleg 03',
    candidateId: 'CAN-0003',
    platform: 'Instagram',
    status: 'Needs Review',
    statement: 'Komentar bernada kritik meningkat pada topik tertentu dalam 30 hari terakhir.',
    reason: 'proporsi komentar kritik naik dibanding periode sebelumnya; sampel kecil, perlu dibaca manusia.',
    confidence: 'Rendah',
    evidenceCount: 6,
    model: '[nama-model] v1.2',
    created: '13 Okt 2026, 06:44',
    isSensitive: true
  },
  {
    id: 'f-4',
    dimension: 'D04 Winning Narrative',
    candidateName: 'Bakal Caleg 05',
    candidateId: 'CAN-0005',
    platform: 'TikTok',
    status: 'Pending Review',
    statement: 'Konten berformat cerita memiliki struktur pembuka, konflik, dan penutup yang jelas.',
    reason: 'struktur terdeteksi pada 7 transkrip; 5 video lain belum memiliki transkrip.',
    confidence: 'Sedang',
    evidenceCount: 7,
    model: '[nama-model] v1.2',
    created: '13 Okt 2026, 06:47'
  },
  {
    id: 'f-5',
    dimension: 'D03 Issue Ownership',
    candidateName: 'Bakal Caleg 07',
    candidateId: 'CAN-0007',
    platform: 'TikTok',
    status: 'Disputed',
    statement: 'Topik pendidikan diasosiasikan kuat dengan kandidat.',
    reason: 'Catatan reviewer: klasifikasi keliru pada 4 konten; evidence perlu dikaji ulang.',
    confidence: 'Sedang',
    evidenceCount: 12,
    model: '[nama-model] v1.1',
    created: '6 Okt 2026, 06:30'
  }
];

export const AIFindingsPage: React.FC = () => {
  const [findings, setFindings] = useState<Finding[]>(initialFindings);
  const [candidateFilter, setCandidateFilter] = useState('Semua kandidat');
  const [dimensionFilter, setDimensionFilter] = useState('Semua dimensi');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = (id: string, newStatus: Finding['status']) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    showToast(`Status temuan diperbarui menjadi "${newStatus}".`);
  };

  const filteredFindings = findings.filter(f => {
    const matchCand = candidateFilter === 'Semua kandidat' || f.candidateName.includes(candidateFilter);
    const matchDim = dimensionFilter === 'Semua dimensi' || f.dimension.includes(dimensionFilter);
    const matchStat = statusFilter === 'Semua status' || f.status === statusFilter;
    return matchCand && matchDim && matchStat;
  });

  const counts = {
    pending: findings.filter(f => f.status === 'Pending Review').length,
    needsReview: findings.filter(f => f.status === 'Needs Review').length,
    verified: findings.filter(f => f.status === 'Verified').length,
    disputed: findings.filter(f => f.status === 'Disputed').length,
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
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Temuan AI</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
          <button 
            type="button" 
            onClick={() => showToast('Ekspor temuan dan evidence berhasil diunduh.')}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
          >
            Export temuan + evidence
          </button>
        </div>
      </header>

      <div style={{ padding: "14px 18px", borderRadius: "10px", background: "#FBEFD6", color: "#5E3900", fontSize: "14px", lineHeight: "1.5" }}>
        Temuan reputasi dan isu sensitif diperlakukan sebagai sinyal atau bahan diskusi sampai ditinjau manusia, bukan fakta terverifikasi. Setiap temuan wajib bisa ditelusuri ke evidence.
      </div>

      <section aria-label="Ringkasan status review" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "14px 18px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Pending Review</div>
          <div style={{ fontSize: "28px", fontWeight: "600", marginTop: "2px" }}>{counts.pending}</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "14px 18px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Needs Review</div>
          <div style={{ fontSize: "28px", fontWeight: "600", marginTop: "2px" }}>{counts.needsReview}</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "14px 18px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Verified</div>
          <div style={{ fontSize: "28px", fontWeight: "600", marginTop: "2px" }}>{counts.verified}</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "14px 18px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Disputed</div>
          <div style={{ fontSize: "28px", fontWeight: "600", marginTop: "2px" }}>{counts.disputed}</div>
        </div>
      </section>

      <section aria-label="Filter temuan" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="g1" style={{ fontSize: "12px", color: "#5B6672" }}>Kandidat</label>
          <select 
            id="g1" 
            value={candidateFilter}
            onChange={e => setCandidateFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua kandidat</option>
            <option>Bakal Caleg 01</option>
            <option>Bakal Caleg 03</option>
            <option>Bakal Caleg 05</option>
            <option>Bakal Caleg 07</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="g2" style={{ fontSize: "12px", color: "#5B6672" }}>Dimensi DES</label>
          <select 
            id="g2" 
            value={dimensionFilter}
            onChange={e => setDimensionFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua dimensi</option>
            <option>D02 Positioning</option>
            <option>D03 Issue Ownership</option>
            <option>D04 Winning Narrative</option>
            <option>D07 Trust & Reputation</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="g3" style={{ fontSize: "12px", color: "#5B6672" }}>Status review</label>
          <select 
            id="g3" 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua status</option>
            <option>Pending Review</option>
            <option>Needs Review</option>
            <option>Verified</option>
            <option>Disputed</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="g4" style={{ fontSize: "12px", color: "#5B6672" }}>Confidence</label>
          <select id="g4" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua</option>
            <option>Tinggi</option>
            <option>Sedang</option>
            <option>Rendah</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="g5" style={{ fontSize: "12px", color: "#5B6672" }}>Versi model</label>
          <select id="g5" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Terbaru (v1.2)</option>
            <option>v1.1</option>
          </select>
        </div>
      </section>

      <section aria-label="Daftar temuan" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredFindings.map((f) => (
          <article key={f.id} style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>{f.dimension}</span>
                <Link to={`/candidates/${f.candidateId}`} style={{ fontSize: "13px", fontWeight: 500 }}>{f.candidateName}</Link>
                <span style={{ fontSize: "13px", color: "#5B6672" }}>{f.platform}</span>
                {f.isSensitive && (
                  <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Sinyal sensitif</span>
                )}
              </div>
              <span style={{
                padding: "2px 9px",
                borderRadius: "999px",
                background: f.status === 'Verified' ? "#E2F1E6" : f.status === 'Disputed' ? "#FBE4E1" : f.status === 'Needs Review' ? "#FBEFD6" : "#E0EFF1",
                color: f.status === 'Verified' ? "#1F5E34" : f.status === 'Disputed' ? "#8E2420" : f.status === 'Needs Review' ? "#7A4A00" : "#0B4A52",
                fontSize: "12px",
                fontWeight: "500"
              }}>
                {f.status}
              </span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "500", lineHeight: "1.4" }}>{f.statement}</div>
            <div style={{ fontSize: "14px", color: "#3B4651", lineHeight: "1.5" }}><b style={{ fontWeight: "600" }}>Alasan:</b> {f.reason}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", fontSize: "13px", color: "#5B6672" }}>
              <span>Confidence: <b style={{ color: "#17212B", fontWeight: "600" }}>{f.confidence}</b></span>
              <span>Evidence: <b style={{ color: "#17212B", fontWeight: "600" }}>{f.evidenceCount}</b></span>
              <span>Model: {f.model}</span>
              <span>Dibuat: {f.created}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Link to="/evidence/EVD-0001" style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "8px", background: "#0E5A63", color: "#fff", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>
                Lihat evidence
              </Link>
              {f.status !== 'Verified' && (
                <button 
                  type="button" 
                  onClick={() => handleUpdateStatus(f.id, 'Verified')}
                  style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}
                >
                  Verify
                </button>
              )}
              {f.status !== 'Needs Review' && (
                <button 
                  type="button" 
                  onClick={() => handleUpdateStatus(f.id, 'Needs Review')}
                  style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}
                >
                  Needs Review
                </button>
              )}
              {f.status !== 'Disputed' && (
                <button 
                  type="button" 
                  onClick={() => handleUpdateStatus(f.id, 'Disputed')}
                  style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}
                >
                  Dispute
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default AIFindingsPage;
