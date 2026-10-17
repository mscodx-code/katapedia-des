import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CohortContextPage: React.FC = () => {
  const [cohortType, setCohortType] = useState<'Primary cohort' | 'Secondary cohort' | 'Konteks lintas level'>('Primary cohort');
  const [candidate, setCandidate] = useState('CAN-0001');
  const [platform, setPlatform] = useState('Instagram');
  const [period, setPeriod] = useState('90 hari terakhir');
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
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Cohort Context</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      <Link 
        to="/cohort-comparison"
        style={{ display: "inline-flex", alignItems: "center", height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #B9C1C9", background: "#fff", color: "#17212B", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}
      >
        Perbandingan Kandidat ›
      </Link>
      <button 
        type="button" 
        onClick={() => showNotification('Laporan cohort sedang disiapkan untuk diekspor')}
        style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
      >
        Export laporan cohort
      </button>
    </div>
  </header>

  <section aria-label="Pilihan" style={{ display: "flex", flexWrap: "wrap", gap: "12px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 200px" }}>
      <label htmlFor="h1" style={{ fontSize: "12px", color: "#5B6672" }}>Kandidat</label>
      <select 
        id="h1" 
        value={candidate} 
        onChange={(e) => setCandidate(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option value="CAN-0001">Bakal Caleg 01 · CAN-0001</option>
        <option value="CAN-0002">Bakal Caleg 02 · CAN-0002</option>
        <option value="CAN-0003">Bakal Caleg 03 · CAN-0003</option>
      </select>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
      <label htmlFor="h2" style={{ fontSize: "12px", color: "#5B6672" }}>Platform</label>
      <select 
        id="h2" 
        value={platform} 
        onChange={(e) => setPlatform(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option>Instagram</option>
        <option>TikTok</option>
      </select>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
      <label htmlFor="h3" style={{ fontSize: "12px", color: "#5B6672" }}>Periode</label>
      <select 
        id="h3" 
        value={period} 
        onChange={(e) => setPeriod(e.target.value)} 
        style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
      >
        <option>90 hari terakhir</option>
        <option>30 hari terakhir</option>
        <option>180 hari terakhir</option>
      </select>
    </div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
    <div role="group" aria-label="Jenis cohort" style={{ display: "flex", flexWrap: "wrap", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
      {(['Primary cohort', 'Secondary cohort', 'Konteks lintas level'] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => {
            setCohortType(c);
            showNotification(`Menampilkan ${c}`);
          }}
          style={{
            height: "36px",
            padding: "0 14px",
            border: "0",
            borderRadius: "7px",
            background: cohortType === c ? "#fff" : "transparent",
            color: cohortType === c ? "#17212B" : "#3B4651",
            fontWeight: cohortType === c ? "600" : "normal",
            fontSize: "14px",
            fontFamily: "inherit",
            cursor: "pointer",
            boxShadow: cohortType === c ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
          }}
        >
          {c}
        </button>
      ))}
    </div>
    <div style={{ fontSize: "14px", color: "#3B4651" }}>
      <b style={{ fontWeight: "600" }}>
        {cohortType === 'Primary cohort' ? 'DPR RI · Jawa Barat · Dapil 1' : cohortType === 'Secondary cohort' ? 'DPR RI · Jawa Barat (Seluruh Dapil)' : 'Lintas Level (DPR RI, DPRD Prov, DPRD Kab/Kota)'}
      </b> · 5 kandidat · data coverage 92%
    </div>
  </div>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
    <section style={{ flex: "1 1 360px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Personal baseline</h2><div style={{ fontSize: "13px", color: "#5B6672", marginTop: "2px" }}>Kandidat dibandingkan dengan dirinya sendiri</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><span>Median views per konten</span><span><b style={{ fontWeight: "600" }}>3.100</b> <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500", marginLeft: "6px" }}>Above Baseline</span></span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><span>Median engagement per konten</span><span><b style={{ fontWeight: "600" }}>212</b> <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500", marginLeft: "6px" }}>Near Baseline</span></span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", fontSize: "14px" }}><span>Posting per minggu</span><span><b style={{ fontWeight: "600" }}>4,7</b> <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500", marginLeft: "6px" }}>Near Baseline</span></span></div>
      <div style={{ fontSize: "12px", color: "#5B6672" }}>Baseline dihitung dari 30/90/180 hari bila data cukup.</div>
    </section>
    <section style={{ flex: "1 1 360px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Cohort context</h2><div style={{ fontSize: "13px", color: "#5B6672", marginTop: "2px" }}>Statistik kandidat pada level, wilayah, dan dapil yang sama</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><span>Median cohort · views</span><b style={{ fontWeight: "600" }}>2.600</b></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><span>Median cohort · engagement</span><b style={{ fontWeight: "600" }}>180</b></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: "14px" }}><span>Median cohort · posting per minggu</span><b style={{ fontWeight: "600" }}>3,5</b></div>
      <div style={{ fontSize: "12px", color: "#5B6672" }}>Ukuran cohort: 5 kandidat. Statistik ditampilkan karena data cukup.</div>
    </section>
  </div>

  <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
      <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Posisi kandidat dalam rentang cohort</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "12px", color: "#3B4651" }}><span><span style={{ display: "inline-block", width: "14px", height: "8px", borderRadius: "2px", background: "#C9DADD", marginRight: "6px" }}></span>Rentang Q1–Q3</span><span><span style={{ display: "inline-block", width: "2px", height: "12px", background: "#17212B", marginRight: "6px", verticalAlign: "middle" }}></span>Median cohort</span><span><span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", background: "#0E5A63", marginRight: "6px" }}></span>Bakal Caleg 01</span></div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "26px", marginTop: "22px" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}><span>Median views per konten</span><span style={{ color: "#5B6672" }}>Q1 1.800 · median 2.600 · Q3 3.900 · kandidat 3.100</span></div>
        <div style={{ position: "relative", height: "12px", background: "#EEF0EC", borderRadius: "6px" }}><div style={{ position: "absolute", left: "30%", width: "35%", top: "0", height: "12px", background: "#C9DADD", borderRadius: "6px" }}></div><div style={{ position: "absolute", left: "43.3%", top: "-4px", width: "2px", height: "20px", background: "#17212B" }}></div><div style={{ position: "absolute", left: "51.7%", top: "-3px", width: "18px", height: "18px", marginLeft: "-9px", borderRadius: "50%", background: "#0E5A63", border: "2px solid #fff" }}></div></div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}><span>Median engagement per konten</span><span style={{ color: "#5B6672" }}>Q1 120 · median 180 · Q3 260 · kandidat 212</span></div>
        <div style={{ position: "relative", height: "12px", background: "#EEF0EC", borderRadius: "6px" }}><div style={{ position: "absolute", left: "30%", width: "35%", top: "0", height: "12px", background: "#C9DADD", borderRadius: "6px" }}></div><div style={{ position: "absolute", left: "45%", top: "-4px", width: "2px", height: "20px", background: "#17212B" }}></div><div style={{ position: "absolute", left: "53%", top: "-3px", width: "18px", height: "18px", marginLeft: "-9px", borderRadius: "50%", background: "#0E5A63", border: "2px solid #fff" }}></div></div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "10px" }}><span>Posting per minggu</span><span style={{ color: "#5B6672" }}>Q1 2,0 · median 3,5 · Q3 5,0 · kandidat 4,7</span></div>
        <div style={{ position: "relative", height: "12px", background: "#EEF0EC", borderRadius: "6px" }}><div style={{ position: "absolute", left: "20%", width: "30%", top: "0", height: "12px", background: "#C9DADD", borderRadius: "6px" }}></div><div style={{ position: "absolute", left: "35%", top: "-4px", width: "2px", height: "20px", background: "#17212B" }}></div><div style={{ position: "absolute", left: "47%", top: "-3px", width: "18px", height: "18px", marginLeft: "-9px", borderRadius: "50%", background: "#0E5A63", border: "2px solid #fff" }}></div></div>
      </div>
    </div>
  </section>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
    <section style={{ flex: "2 1 520px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>Statistik cohort</h2>
      <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "480px" }}>
        <thead><tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Metrik</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Median</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Q1–Q3</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Kandidat (n)</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Coverage</th></tr></thead>
        <tbody>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Median views per konten</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>2.600</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>1.800–3.900</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>5</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>92%</td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Median engagement per konten</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>180</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>120–260</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>5</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>92%</td></tr>
          <tr><td style={{ padding: "10px" }}>Posting per minggu</td><td style={{ padding: "10px" }}>3,5</td><td style={{ padding: "10px" }}>2,0–5,0</td><td style={{ padding: "10px" }}>5</td><td style={{ padding: "10px" }}>100%</td></tr>
        </tbody>
      </table>
      </div>
    </section>
    <section style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ padding: "16px 18px", borderRadius: "10px", background: "#FBEFD6", color: "#5E3900", fontSize: "14px", lineHeight: "1.5" }}>Tampilan ini memberi konteks, bukan peringkat. Posisi dalam cohort tidak menentukan kelayakan kandidat, dan tidak ada benchmark lintas level tanpa konteks eksplisit.</div>
      <div style={{ padding: "16px 18px", borderRadius: "10px", border: "1px dashed #B9C1C9", background: "#FAFAF8", fontSize: "13px", color: "#3B4651", lineHeight: "1.5" }}><b style={{ fontWeight: "600" }}>Konteks lintas level (deskriptif).</b> Pilih tab Konteks lintas level untuk melihat gambaran umum DPR RI, DPRD Provinsi, dan DPRD Kab/Kota secara terpisah.</div>
    </section>
  </div>
</main>
  );
};

export default CohortContextPage;
