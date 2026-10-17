import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ReviewHistoryItem {
  title: string;
  time: string;
}

interface EvidenceItem {
  id: string;
  type: 'Caption' | 'Transkrip' | 'Komentar';
  sourceCode: string;
  sourceMeta: string;
  quote: string;
}

const initialEvidenceList: EvidenceItem[] = [
  {
    id: 'ev-1',
    type: 'Caption',
    sourceCode: 'IG-1784••••92',
    sourceMeta: 'Instagram · 2 Okt 2026',
    quote: '[Contoh] Berkeliling pasar pagi ini, mendengar langsung cerita para pedagang tentang harga dan kebutuhan harian.'
  },
  {
    id: 'ev-2',
    type: 'Transkrip',
    sourceCode: 'IG-1784••••57',
    sourceMeta: 'Instagram · 9 Sep 2026',
    quote: '[Contoh transkrip] Dulu saya mulai dari kegiatan kecil di lingkungan, dan dari situ saya belajar mendengarkan.'
  },
  {
    id: 'ev-3',
    type: 'Komentar',
    sourceCode: 'CMT-20••••41',
    sourceMeta: 'Instagram · 3 Okt 2026',
    quote: '[Contoh komentar] Senang melihat langsung turun ke warga, lanjutkan.'
  },
  {
    id: 'ev-4',
    type: 'Caption',
    sourceCode: 'TT-7391••••08',
    sourceMeta: 'TikTok · 21 Sep 2026',
    quote: '[Contoh] Ngobrol santai dengan warga soal layanan kesehatan di lingkungan kita.'
  }
];

export const EvidenceViewerPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('Pending Review');
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [currentStatus, setCurrentStatus] = useState('Pending Review');
  const [filterType, setFilterType] = useState<'Semua' | 'Caption' | 'Transkrip' | 'Komentar'>('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [history, setHistory] = useState<ReviewHistoryItem[]>([
    { title: 'Dibuat oleh sistem · Pending Review', time: '13 Okt 2026, 06:41' }
  ]);

  const handleSaveReview = () => {
    setCurrentStatus(selectedStatus);
    const newEntry: ReviewHistoryItem = {
      title: `Ditinjau oleh Pengguna Contoh · ${selectedStatus}`,
      time: 'Hari ini, baru saja'
    };
    setHistory([newEntry, ...history]);
    setToastMessage(`Status review berhasil disimpan sebagai "${selectedStatus}".`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredEvidence = initialEvidenceList.filter(ev => {
    if (filterType === 'Semua') return true;
    return ev.type === filterType;
  });

  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0E5A63', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', fontWeight: 500 }}>
          {toastMessage}
        </div>
      )}

      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>
            <Link to="/ai-findings">Temuan AI</Link> › <Link to="/candidates/CAN-0001">Bakal Caleg 01</Link> › Evidence
          </div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Evidence Viewer</h1>
        </div>
        <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 380px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
          <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ width: "fit-content", padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>D02 Positioning</span>
            <div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.35" }}>Pesan utama konsisten pada format cerita personal.</div>
            <div style={{ fontSize: "14px", color: "#3B4651", lineHeight: "1.5" }}><b style={{ fontWeight: "600" }}>Alasan:</b> pola kalimat pembuka dan tema kedekatan dengan warga berulang di 9 konten.</div>
            <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px 12px", fontSize: "14px" }}>
              <dt style={{ color: "#5B6672" }}>Confidence</dt><dd style={{ margin: "0" }}>Sedang</dd>
              <dt style={{ color: "#5B6672" }}>Jumlah evidence</dt><dd style={{ margin: "0" }}>9</dd>
              <dt style={{ color: "#5B6672" }}>Model/versi</dt><dd style={{ margin: "0" }}>[nama-model] v1.2</dd>
              <dt style={{ color: "#5B6672" }}>Dibuat</dt><dd style={{ margin: "0" }}>13 Okt 2026, 06:41 WIB</dd>
              <dt style={{ color: "#5B6672" }}>Status</dt>
              <dd style={{ margin: "0" }}>
                <span style={{
                  padding: "2px 9px",
                  borderRadius: "999px",
                  background: currentStatus === 'Verified' ? "#E2F1E6" : currentStatus === 'Disputed' ? "#FBE4E1" : currentStatus === 'Needs Review' ? "#FBEFD6" : "#E0EFF1",
                  color: currentStatus === 'Verified' ? "#1F5E34" : currentStatus === 'Disputed' ? "#8E2420" : currentStatus === 'Needs Review' ? "#7A4A00" : "#0B4A52",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  {currentStatus}
                </span>
              </dd>
            </dl>
          </section>

          <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Tinjau temuan</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="rs" style={{ fontSize: "13px", fontWeight: "500" }}>Status review</label>
              <select 
                id="rs" 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ height: "40px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
              >
                <option>Pending Review</option>
                <option>Verified</option>
                <option>Disputed</option>
                <option>Needs Review</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="rn" style={{ fontSize: "13px", fontWeight: "500" }}>Catatan reviewer</label>
              <textarea 
                id="rn" 
                rows={3} 
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="Tuliskan alasan penilaian setelah membaca evidence" 
                style={{ padding: "10px 12px", border: "1px solid #B9C1C9", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
            <button 
              type="button" 
              onClick={handleSaveReview}
              style={{ height: "42px", border: "0", borderRadius: "8px", background: "#0E5A63", color: "#fff", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
            >
              Simpan review
            </button>
            <div style={{ fontSize: "12px", color: "#5B6672" }}>Perubahan status dicatat bersama nama reviewer dan waktu.</div>
          </section>

          <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
            <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Riwayat review</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
              {history.map((h, i) => (
                <div key={i} style={{ paddingTop: i > 0 ? "12px" : "0", borderTop: i > 0 ? "1px solid #EEF0EC" : "none" }}>
                  <div>{h.title}</div>
                  <div style={{ fontSize: "12px", color: "#5B6672" }}>{h.time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={{ flex: "2 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "14px 18px", borderRadius: "10px", background: "#E0EFF1", color: "#083C43", fontSize: "14px", lineHeight: "1.5" }}>
            Evidence menampilkan sumber asli. Ringkasan AI tidak menggantikan akses ke sumber: selalu buka konten atau komentar aslinya sebelum memverifikasi.
          </div>
          <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Sumber evidence ({filteredEvidence.length} dari 9)</h2>
              <div role="group" aria-label="Jenis sumber" style={{ display: "flex", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
                {(['Semua', 'Caption', 'Transkrip', 'Komentar'] as const).map((type) => (
                  <button 
                    key={type}
                    type="button" 
                    onClick={() => setFilterType(type)}
                    style={{ 
                      height: "32px", 
                      padding: "0 12px", 
                      border: "0", 
                      borderRadius: "7px", 
                      background: filterType === type ? "#fff" : "transparent", 
                      color: filterType === type ? "#17212B" : "#3B4651", 
                      fontWeight: filterType === type ? "600" : "400", 
                      fontSize: "13px", 
                      fontFamily: "inherit", 
                      cursor: "pointer" 
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredEvidence.map((ev) => (
                <article key={ev.id} style={{ border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", fontSize: "13px", color: "#5B6672" }}>
                    <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>{ev.type}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>{ev.sourceCode}</span>
                    <span>{ev.sourceMeta}</span>
                  </div>
                  <blockquote style={{ margin: "0", padding: "10px 14px", background: "#F4F5F2", borderRadius: "6px", fontSize: "14px", lineHeight: "1.55", color: "#17212B" }}>
                    {ev.quote}
                  </blockquote>
                  <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                    <Link to="/contents/CNT-0001">Buka detail konten</Link>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Buka di platform</a>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", paddingTop: "16px", fontSize: "13px", color: "#5B6672" }}>
              <span>Menampilkan {filteredEvidence.length} sumber</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Sebelumnya</button>
                <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Berikutnya</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default EvidenceViewerPage;
