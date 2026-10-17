import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const HistoricalTrendPage: React.FC = () => {
  const [period, setPeriod] = useState<'30 hari' | '90 hari' | '180 hari'>('90 hari');
  const [modelVersion, setModelVersion] = useState<'Model v1.2' | 'Model v1.1'>('Model v1.2');
  const [candidate, setCandidate] = useState('CAN-0001');
  const [platform, setPlatform] = useState('Instagram');
  const [metric, setMetric] = useState('Median views per konten');
  const [notification, setNotification] = useState<string | null>(null);

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
      <div style={{ fontSize: "13px", color: "#5B6672" }}>Pemantauan</div>
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Historical Trend</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      <button 
        type="button" 
        onClick={() => showNotification('Data snapshot CSV berhasil diunduh')}
        style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
      >
        Export CSV snapshot
      </button>
    </div>
  </header>

  <section aria-label="Pilihan tren" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 200px" }}>
      <label htmlFor="t1" style={{ fontSize: "12px", color: "#5B6672" }}>Kandidat</label>
      <select 
        id="t1" 
        value={candidate} 
        onChange={(e) => setCandidate(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option value="CAN-0001">Bakal Caleg 01 · CAN-0001</option>
        <option value="CAN-0002">Bakal Caleg 02 · CAN-0002</option>
        <option value="CAN-0003">Bakal Caleg 03 · CAN-0003</option>
      </select>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 150px" }}>
      <label htmlFor="t2" style={{ fontSize: "12px", color: "#5B6672" }}>Platform</label>
      <select 
        id="t2" 
        value={platform} 
        onChange={(e) => setPlatform(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option>Instagram</option>
        <option>TikTok</option>
      </select>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 220px" }}>
      <label htmlFor="t3" style={{ fontSize: "12px", color: "#5B6672" }}>Metrik</label>
      <select 
        id="t3" 
        value={metric} 
        onChange={(e) => setMetric(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option>Median views per konten</option>
        <option>Median engagement per konten</option>
        <option>Followers</option>
        <option>Frekuensi posting</option>
      </select>
    </div>
    <div role="group" aria-label="Periode" style={{ display: "flex", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
      {(['30 hari', '90 hari', '180 hari'] as const).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPeriod(p)}
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
  </section>

  <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
      <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Median views per konten · Instagram · 90 hari</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "12px", color: "#3B4651" }}><span><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#0E5A63", marginRight: "6px" }}></span>Snapshot</span><span><span style={{ display: "inline-block", width: "14px", borderTop: "2px dashed #8A97A3", marginRight: "6px", verticalAlign: "middle" }}></span>Baseline pribadi</span><span><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#fff", border: "2px solid #B8660A", marginRight: "6px" }}></span>Ditandai review</span></div>
    </div>
    <svg viewBox="0 0 1100 280" style={{ width: "100%", height: "auto", display: "block", marginTop: "12px" }} role="img" aria-label="Grafik tren median views per konten Instagram selama 90 hari dengan snapshot mingguan, satu titik ditandai review dan satu penanda pergantian versi model AI">
      <g stroke="#E3E7E1"><line x1="60" y1="30" x2="1080" y2="30"></line><line x1="60" y1="90" x2="1080" y2="90"></line><line x1="60" y1="150" x2="1080" y2="150"></line><line x1="60" y1="210" x2="1080" y2="210"></line></g>
      <g fontSize="11" fill="#5B6672" fontFamily="IBM Plex Sans"><text x="52" y="34" textAnchor="end">4.000</text><text x="52" y="94" textAnchor="end">3.000</text><text x="52" y="154" textAnchor="end">2.000</text><text x="52" y="214" textAnchor="end">1.000</text><text x="60" y="240">15 Jul</text><text x="340" y="240">12 Agu</text><text x="640" y="240">9 Sep</text><text x="940" y="240">13 Okt</text></g>
      <line x1="60" y1="120" x2="1080" y2="120" stroke="#8A97A3" strokeDasharray="6 5"></line>
      <line x1="560" y1="20" x2="560" y2="215" stroke="#B9C1C9"></line>
      <text x="566" y="34" fontSize="11" fill="#3B4651" fontFamily="IBM Plex Sans">Model AI v1.1 → v1.2</text>
      <polyline fill="none" stroke="#0E5A63" strokeWidth="2.5" points="60,168 138,160 216,164 294,150 372,148 450,136 528,130 606,138 684,118 762,104 840,108 918,82 996,66 1080,56"></polyline>
      <g fill="#0E5A63"><circle cx="60" cy="168" r="4"></circle><circle cx="216" cy="164" r="4"></circle><circle cx="372" cy="148" r="4"></circle><circle cx="528" cy="130" r="4"></circle><circle cx="684" cy="118" r="4"></circle><circle cx="840" cy="108" r="4"></circle><circle cx="996" cy="66" r="4"></circle></g>
      <circle cx="918" cy="82" r="6" fill="#fff" stroke="#B8660A" strokeWidth="2.5"></circle>
      <text x="780" y="70" fontSize="11" fill="#7A4A00" fontFamily="IBM Plex Sans">Lonjakan views (sinyal review)</text>
    </svg>
    <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "6px" }}>Setiap titik adalah snapshot pengukuran dengan timestamp sendiri. Data mentah tidak ditimpa oleh pembaruan terbaru.</div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
    <section style={{ flex: "1 1 440px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
        <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Pergeseran topik per bulan</h2>
        <div role="group" aria-label="Versi model" style={{ display: "flex", gap: "4px", background: "#E9ECEF", padding: "3px", borderRadius: "9px" }}>
          {(['Model v1.2', 'Model v1.1'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setModelVersion(m);
                showNotification(`Beralih ke tampilan ${m}`);
              }}
              style={{
                height: "28px",
                padding: "0 10px",
                border: "0",
                borderRadius: "6px",
                background: modelVersion === m ? "#fff" : "transparent",
                color: modelVersion === m ? "#17212B" : "#3B4651",
                fontWeight: modelVersion === m ? "600" : "normal",
                fontSize: "12px",
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: modelVersion === m ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 520 230" style={{ width: "100%", height: "auto", display: "block", marginTop: "12px" }} role="img" aria-label="Diagram batang bertumpuk proporsi topik konten per bulan dari Juli sampai Oktober">
        <line x1="20" y1="190" x2="500" y2="190" stroke="#8A97A3"></line>
        <g>
          <rect x="40" y="30" width="80" height="60" fill="#0E5A63"></rect><rect x="40" y="90" width="80" height="45" fill="#7FB4BC"></rect><rect x="40" y="135" width="80" height="30" fill="#B8660A"></rect><rect x="40" y="165" width="80" height="25" fill="#C9CFD6"></rect>
          <rect x="165" y="30" width="80" height="75" fill="#0E5A63"></rect><rect x="165" y="105" width="80" height="40" fill="#7FB4BC"></rect><rect x="165" y="145" width="80" height="28" fill="#B8660A"></rect><rect x="165" y="173" width="80" height="17" fill="#C9CFD6"></rect>
          <rect x="290" y="30" width="80" height="88" fill="#0E5A63"></rect><rect x="290" y="118" width="80" height="32" fill="#7FB4BC"></rect><rect x="290" y="150" width="80" height="26" fill="#B8660A"></rect><rect x="290" y="176" width="80" height="14" fill="#C9CFD6"></rect>
          <rect x="415" y="30" width="80" height="96" fill="#0E5A63"></rect><rect x="415" y="126" width="80" height="28" fill="#7FB4BC"></rect><rect x="415" y="154" width="80" height="22" fill="#B8660A"></rect><rect x="415" y="176" width="80" height="14" fill="#C9CFD6"></rect>
        </g>
        <g fontSize="12" fill="#5B6672" fontFamily="IBM Plex Sans" textAnchor="middle"><text x="80" y="210">Jul</text><text x="205" y="210">Agu</text><text x="330" y="210">Sep</text><text x="455" y="210">Okt (s.d. 13)</text></g>
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontSize: "12px", color: "#3B4651", marginTop: "6px" }}><span><span style={{ display: "inline-block", width: "10px", height: "10px", background: "#0E5A63", marginRight: "6px" }}></span>Layanan kesehatan</span><span><span style={{ display: "inline-block", width: "10px", height: "10px", background: "#7FB4BC", marginRight: "6px" }}></span>Ekonomi warga</span><span><span style={{ display: "inline-block", width: "10px", height: "10px", background: "#B8660A", marginRight: "6px" }}></span>Narasi personal</span><span><span style={{ display: "inline-block", width: "10px", height: "10px", background: "#C9CFD6", marginRight: "6px" }}></span>Lainnya</span></div>
      <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "10px", lineHeight: "1.5" }}>Perubahan versi model tidak menghapus hasil versi sebelumnya; keduanya dapat dibandingkan.</div>
    </section>
    <section style={{ flex: "1 1 440px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>Daftar snapshot</h2>
      <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "460px" }}>
        <thead><tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Waktu ukur</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Followers</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Median views</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Model AI</th></tr></thead>
        <tbody>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>13 Okt, 06:00</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>31.500</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>3.100</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>v1.2</td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>6 Okt, 06:00</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>30.800</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>2.700</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>v1.1</td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>29 Sep, 06:00</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>30.100</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>2.600</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>v1.1</td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>22 Sep, 06:00</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>29.600</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>2.400</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>v1.1</td></tr>
          <tr><td style={{ padding: "10px" }}>15 Sep, 06:00</td><td style={{ padding: "10px", textAlign: "right" }}>29.000</td><td style={{ padding: "10px", textAlign: "right" }}>2.300</td><td style={{ padding: "10px" }}>v1.1</td></tr>
        </tbody>
      </table>
      </div>
    </section>
  </div>
</main>
  );
};

export default HistoricalTrendPage;
