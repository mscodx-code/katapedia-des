import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [period, setPeriod] = useState<'30 hari' | '90 hari' | '180 hari'>('90 hari');
  const [notification, setNotification] = useState<string | null>(null);

  const candidateId = id || 'CAN-0001';

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
  {notification && (
    <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000, background: '#17212B', color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ color: '#0E5A63', fontWeight: 'bold' }}>✓</span> {notification}
    </div>
  )}

  <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
    <div>
      <div style={{ fontSize: "13px", color: "#5B6672" }}><Link to="/candidates">Daftar Kandidat</Link> › Bakal Caleg 01</div>
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Candidate Digital Profile</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      <button 
        type="button" 
        onClick={() => showNotification('Sedang mengunduh berkas ringkasan profil kandidat (PDF)...')}
        style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
      >
        Export PDF profil
      </button>
    </div>
  </header>

  <section style={{ display: "flex", flexWrap: "wrap", gap: "24px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "22px 24px", alignItems: "center" }}>
    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#DCE5E8", color: "#0E5A63", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "600" }}>BC</div>
    <div style={{ flex: "2 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <span style={{ fontSize: "22px", fontWeight: "600" }}>Bakal Caleg 01</span>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px", color: "#5B6672" }}>{candidateId}</span>
        <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Active</span>
      </div>
      <div style={{ fontSize: "14px", color: "#3B4651" }}>DPR RI · Jawa Barat · Dapil 1</div>
      <div style={{ fontSize: "13px", color: "#5B6672" }}>Primary cohort: DPR RI + Jawa Barat + Dapil 1 (5 kandidat)</div>
    </div>
    <div style={{ flex: "2 1 300px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <Link to="/accounts/ACC-0001" style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 14px", border: "1px solid #DDE1DA", borderRadius: "8px", textDecoration: "none", color: "#17212B", fontSize: "14px" }}><span><b style={{ fontWeight: "600" }}>Instagram</b> <span style={{ color: "#5B6672" }}>@handle_contoh</span></span><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Verified</span></Link>
      <Link to="/accounts/ACC-0001" style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 14px", border: "1px solid #DDE1DA", borderRadius: "8px", textDecoration: "none", color: "#17212B", fontSize: "14px" }}><span><b style={{ fontWeight: "600" }}>TikTok</b> <span style={{ color: "#5B6672" }}>@handle_contoh</span></span><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Verified</span></Link>
    </div>
    <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ fontSize: "12px", color: "#5B6672" }}>Data coverage</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#E3E7E1" }}><div style={{ width: "92%", height: "6px", borderRadius: "3px", background: "#0E5A63" }}></div></div><span style={{ fontSize: "13px", fontWeight: "500" }}>92%</span></div>
      <div style={{ fontSize: "12px", color: "#5B6672" }}>Update terakhir: 13 Okt 2026, 06:00 WIB</div>
    </div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
    <nav aria-label="Bagian profil" style={{ display: "flex", flexWrap: "wrap", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
      <Link to={`/candidates/${candidateId}`} style={{ padding: "8px 14px", borderRadius: "7px", background: "#fff", color: "#17212B", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Ringkasan</Link>
      <Link to="/contents" style={{ padding: "8px 14px", borderRadius: "7px", color: "#3B4651", fontSize: "14px", textDecoration: "none" }}>Konten</Link>
      <Link to="/ai-findings" style={{ padding: "8px 14px", borderRadius: "7px", color: "#3B4651", fontSize: "14px", textDecoration: "none" }}>Temuan AI</Link>
      <Link to="/cohorts" style={{ padding: "8px 14px", borderRadius: "7px", color: "#3B4651", fontSize: "14px", textDecoration: "none" }}>Cohort</Link>
      <Link to="/historical-trend" style={{ padding: "8px 14px", borderRadius: "7px", color: "#3B4651", fontSize: "14px", textDecoration: "none" }}>Tren</Link>
      <Link to="/data-quality" style={{ padding: "8px 14px", borderRadius: "7px", color: "#3B4651", fontSize: "14px", textDecoration: "none" }}>Kualitas data</Link>
    </nav>
    <div role="group" aria-label="Periode" style={{ display: "flex", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
      {(['30 hari', '90 hari', '180 hari'] as const).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => {
            setPeriod(p);
            showNotification(`Menampilkan periode ${p}`);
          }}
          style={{
            height: "34px",
            padding: "0 14px",
            border: "0",
            borderRadius: "7px",
            background: period === p ? "#fff" : "transparent",
            color: period === p ? "#17212B" : "#3B4651",
            fontWeight: period === p ? "600" : "normal",
            fontSize: "14px",
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
          }}
        >
          {p}
        </button>
      ))}
    </div>
  </div>

  <section aria-label="Performa akun dan konten" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Followers</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>48.200</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>IG 31.500 · TikTok 16.700</div></div>
    <div style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Konten dipublikasi</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>62</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>≈ 4–5 konten per minggu</div></div>
    <div style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Median views per konten</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>3.100</div><div style={{ marginTop: "4px" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Above Baseline</span></div></div>
    <div style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Median engagement per konten</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>212</div><div style={{ marginTop: "4px" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Near Baseline</span></div></div>
    <div style={{ flex: "1 1 220px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Reach non-follower</div><div style={{ fontSize: "22px", fontWeight: "600", marginTop: "10px", color: "#5B6672" }}>Not Available</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "6px" }}>Belum tersedia dari sumber data</div></div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
    <section style={{ flex: "1 1 420px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "600" }}>Konten di atas baseline</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Kunjungan ke pasar tradisional (Reels)</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Instagram · 2 Okt 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>11.800 views</div><div style={{ fontSize: "12px", color: "#0B4A52" }}>3,8× median</div></div></Link>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Dialog warga soal layanan kesehatan</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>TikTok · 21 Sep 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>9.400 views</div><div style={{ fontSize: "12px", color: "#0B4A52" }}>3,0× median</div></div></Link>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Cerita singkat perjalanan karier</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Instagram · 9 Sep 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>7.200 views</div><div style={{ fontSize: "12px", color: "#0B4A52" }}>2,3× median</div></div></Link>
      </div>
    </section>
    <section style={{ flex: "1 1 420px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "600" }}>Konten di bawah baseline</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Ucapan hari besar (foto statis)</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Instagram · 28 Sep 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>620 views</div><div style={{ fontSize: "12px", color: "#7A4A00" }}>0,2× median</div></div></Link>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Pengumuman agenda kegiatan</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>TikTok · 17 Sep 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>840 views</div><div style={{ fontSize: "12px", color: "#7A4A00" }}>0,3× median</div></div></Link>
        <Link to="/contents/CNT-0001" style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", textDecoration: "none", color: "#17212B" }}><div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "#E3E7E1", flex: "none" }}></div><div style={{ flex: "1", minWidth: "0" }}><div style={{ fontSize: "14px" }}>Repost liputan media</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Instagram · 5 Sep 2026</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: "14px", fontWeight: "600" }}>1.050 views</div><div style={{ fontSize: "12px", color: "#7A4A00" }}>0,3× median</div></div></Link>
      </div>
    </section>
  </div>

  <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline", marginBottom: "6px" }}>
      <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Temuan AI terbaru</h2>
      <Link to="/ai-findings" style={{ fontSize: "13px" }}>Lihat semua temuan</Link>
    </div>
    <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#5B6672" }}>Temuan adalah sinyal untuk ditinjau manusia, bukan fakta terverifikasi.</p>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", padding: "12px 0", borderTop: "1px solid #EEF0EC" }}><div style={{ flex: "3 1 320px", fontSize: "14px" }}>Isu layanan kesehatan paling sering muncul di konten 90 hari terakhir <span style={{ color: "#5B6672" }}>· D03 Issue Ownership</span></div><span style={{ fontSize: "13px", color: "#3B4651", flex: "1 1 90px" }}>Confidence: Tinggi</span><Link to="/evidence/EVD-0001" style={{ fontSize: "13px", flex: "1 1 90px" }}>18 evidence</Link><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Verified</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", padding: "12px 0", borderTop: "1px solid #EEF0EC" }}><div style={{ flex: "3 1 320px", fontSize: "14px" }}>Pesan utama konsisten pada format cerita personal <span style={{ color: "#5B6672" }}>· D02 Positioning</span></div><span style={{ fontSize: "13px", color: "#3B4651", flex: "1 1 90px" }}>Confidence: Sedang</span><Link to="/evidence/EVD-0001" style={{ fontSize: "13px", flex: "1 1 90px" }}>9 evidence</Link><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Pending Review</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", padding: "12px 0", borderTop: "1px solid #EEF0EC" }}><div style={{ flex: "3 1 320px", fontSize: "14px" }}>Komentar kritik muncul pada topik tertentu <span style={{ color: "#5B6672" }}>· D07 Trust &amp; Reputation</span></div><span style={{ fontSize: "13px", color: "#3B4651", flex: "1 1 90px" }}>Confidence: Rendah</span><Link to="/evidence/EVD-0001" style={{ fontSize: "13px", flex: "1 1 90px" }}>6 evidence</Link><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Needs Review</span></div>
    </div>
  </section>

  <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
    <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Analisis dimensi DES</h2>
    <p style={{ margin: "4px 0 16px", fontSize: "13px", color: "#5B6672" }}>Setiap dimensi menampilkan indikator dan kecukupan data. Tidak ada skor tunggal atau keputusan kelayakan otomatis.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D01 Visibility</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Sufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Aktivitas, konsistensi posting, kelengkapan profil</div><div style={{ fontSize: "13px" }}>4 indikator tersedia</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D02 Positioning</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Sufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>AI: identitas, pesan kunci, pembeda</div><div style={{ fontSize: "13px" }}>3 temuan AI</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D03 Issue Ownership</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Sufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>AI: frekuensi dan konsistensi isu</div><div style={{ fontSize: "13px" }}>5 isu terpetakan</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D04 Winning Narrative</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Partial</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>AI: struktur cerita, tema narasi</div><div style={{ fontSize: "13px" }}>Transkrip video belum lengkap</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D05 Content Power</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Sufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Performa vs baseline, pola konten</div><div style={{ fontSize: "13px" }}>62 konten dianalisis</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D06 Audience Connection</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Sufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Komentar, engagement, tema komentar</div><div style={{ fontSize: "13px" }}>Komentar terbaca</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D07 Trust &amp; Reputation</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Partial</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Sentimen, tema kritik dan apresiasi</div><div style={{ fontSize: "13px" }}>1 temuan perlu review</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D08 Algorithmic Reach</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Insufficient</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Reach dan non-follower bila tersedia</div><div style={{ fontSize: "13px" }}>Metrik Not Available</div></div>
      <div style={{ flex: "1 1 220px", border: "1px dashed #B9C1C9", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px", background: "#FAFAF8" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D09 Electoral Conversion</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Di luar MVP</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Tidak diukur kecuali ada proxy platform yang valid</div></div>
      <div style={{ flex: "1 1 220px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "14px" }}>D10 Intelligence &amp; Engine</b><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Partial</span></div><div style={{ fontSize: "13px", color: "#5B6672" }}>Pola konten menang dan riwayatnya</div><div style={{ fontSize: "13px" }}>Riwayat 90 hari</div></div>
    </div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
    <section style={{ flex: "2 1 520px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Tren historis · median views per konten</h2><Link to="/historical-trend" style={{ fontSize: "13px" }}>Buka tren lengkap</Link></div>
      <svg viewBox="0 0 640 170" style={{ width: "100%", height: "auto", display: "block", marginTop: "10px" }} role="img" aria-label="Grafik tren median views per konten selama 90 hari, naik bertahap">
        <g stroke="#E3E7E1"><line x1="10" y1="20" x2="630" y2="20"></line><line x1="10" y1="70" x2="630" y2="70"></line><line x1="10" y1="120" x2="630" y2="120"></line></g>
        <line x1="10" y1="90" x2="630" y2="90" stroke="#8A97A3" strokeDasharray="4 4"></line>
        <text x="14" y="84" fontSize="11" fill="#5B6672" fontFamily="IBM Plex Sans">Baseline pribadi (median 90 hari)</text>
        <polyline fill="none" stroke="#0E5A63" strokeWidth="2.5" points="10,125 60,118 110,122 160,108 210,110 260,96 310,88 360,92 410,76 460,70 510,74 560,52 630,44"></polyline>
      </svg>
    </section>
    <section style={{ flex: "1 1 300px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Kualitas data</h2><Link to="/data-quality" style={{ fontSize: "13px" }}>Detail</Link></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", paddingBottom: "10px", borderBottom: "1px solid #EEF0EC" }}><span>Instagram</span><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Complete</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", paddingBottom: "10px", borderBottom: "1px solid #EEF0EC" }}><span>TikTok</span><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Partial</span></div>
      <div style={{ fontSize: "13px", color: "#5B6672", lineHeight: "1.5" }}>Metrik yang tidak tersedia dari platform ditandai Not Available dan tidak dihitung sebagai nol. Snapshot historis tidak pernah ditimpa.</div>
    </section>
  </div>
</main>
  );
};

export default CandidateDetailPage;
