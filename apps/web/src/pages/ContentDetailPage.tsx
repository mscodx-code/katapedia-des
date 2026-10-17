import React from 'react';
import { Link } from 'react-router-dom';

export const ContentDetailPage: React.FC = () => {
  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
  <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
    <div>
      <div style={{ fontSize: "13px", color: "#5B6672" }}><Link to="/contents">Content Explorer</Link> › <Link to="/candidates/CAN-0001">Bakal Caleg 01</Link> › Konten</div>
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Content Detail</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      <Link to="/contents/CNT-0001" style={{ display: "flex", alignItems: "center", height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>Buka di Instagram</Link>
    </div>
  </header>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
    <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ height: "360px", borderRadius: "8px", background: "#E3E7E1", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px", boxSizing: "border-box", color: "#5B6672", fontSize: "13px", lineHeight: "1.5" }}>Pratinjau media. Tampil bila tersedia secara sah; jika tidak, gunakan permalink ke platform.</div>
        <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px 12px", fontSize: "14px" }}>
          <dt style={{ color: "#5B6672" }}>Platform</dt><dd style={{ margin: "0" }}>Instagram</dd>
          <dt style={{ color: "#5B6672" }}>Content ID</dt><dd style={{ margin: "0", fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px" }}>IG-1784••••92</dd>
          <dt style={{ color: "#5B6672" }}>Dipublikasi</dt><dd style={{ margin: "0" }}>2 Okt 2026, 17:30 WIB</dd>
          <dt style={{ color: "#5B6672" }}>Format</dt><dd style={{ margin: "0" }}>Video · 0:42</dd>
          <dt style={{ color: "#5B6672" }}>Akun</dt><dd style={{ margin: "0" }}><Link to="/accounts/ACC-0001">@handle_contoh</Link></dd>
          <dt style={{ color: "#5B6672" }}>Permalink</dt><dd style={{ margin: "0" }}><Link to="/contents/CNT-0001">instagram.com/p/…</Link></dd>
        </dl>
      </section>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>Caption</h2>
        <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#3B4651" }}>[Contoh caption] Berkeliling pasar pagi ini, mendengar langsung cerita para pedagang tentang harga dan kebutuhan harian. #ContohTagar</p>
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#5B6672" }}>Transkrip video: tersedia · bahasa terdeteksi: Indonesia</div>
      </section>
    </div>

    <div style={{ flex: "2 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Metrik mentah</h2><span style={{ fontSize: "12px", color: "#5B6672" }}>Diambil 13 Okt 2026, 06:00 WIB · sumber: [metode akuisisi]</span></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "14px" }}>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Views</div><div style={{ fontSize: "22px", fontWeight: "600" }}>11.800</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Likes</div><div style={{ fontSize: "22px", fontWeight: "600" }}>940</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Komentar</div><div style={{ fontSize: "22px", fontWeight: "600" }}>128</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Shares</div><div style={{ fontSize: "22px", fontWeight: "600" }}>76</div></div>
          <div style={{ flex: "1 1 120px", border: "1px dashed #B9C1C9", borderRadius: "8px", padding: "12px 14px", background: "#FAFAF8" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Saves</div><div style={{ fontSize: "16px", fontWeight: "600", color: "#5B6672", marginTop: "4px" }}>Not Available</div></div>
          <div style={{ flex: "1 1 120px", border: "1px dashed #B9C1C9", borderRadius: "8px", padding: "12px 14px", background: "#FAFAF8" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Reach / watch time</div><div style={{ fontSize: "16px", fontWeight: "600", color: "#5B6672", marginTop: "4px" }}>Not Available</div></div>
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Perbandingan dengan baseline pribadi (90 hari)</h2><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Above Baseline</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
          <div><div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}><span>Views konten ini</span><span style={{ color: "#5B6672" }}>11.800 · median akun 3.100</span></div><div style={{ position: "relative", height: "10px", borderRadius: "5px", background: "#E3E7E1" }}><div style={{ width: "100%", height: "10px", borderRadius: "5px", background: "#0E5A63" }}></div><div style={{ position: "absolute", left: "26%", top: "-4px", width: "2px", height: "18px", background: "#17212B" }}></div></div></div>
          <div><div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}><span>Engagement konten ini</span><span style={{ color: "#5B6672" }}>1.144 · median akun 212</span></div><div style={{ position: "relative", height: "10px", borderRadius: "5px", background: "#E3E7E1" }}><div style={{ width: "100%", height: "10px", borderRadius: "5px", background: "#0E5A63" }}></div><div style={{ position: "absolute", left: "19%", top: "-4px", width: "2px", height: "18px", background: "#17212B" }}></div></div></div>
        </div>
        <div style={{ marginTop: "14px", fontSize: "12px", color: "#5B6672" }}>Garis hitam = median baseline. Formula: engagement_formula v1.0 (likes + komentar + shares).</div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Analisis AI atas konten ini</h2><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Pending Review</span></div>
        <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", marginTop: "8px", minWidth: "480px" }}>
          <thead><tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Klasifikasi</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Hasil</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Confidence</th></tr></thead>
          <tbody>
            <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Topik / isu (D03)</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Ekonomi warga</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Tinggi</td></tr>
            <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Tipe konten</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Kunjungan lapangan</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Tinggi</td></tr>
            <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Sinyal positioning (D02)</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Kedekatan dengan warga</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>Sedang</td></tr>
            <tr><td style={{ padding: "10px" }}>Sinyal narasi (D04)</td><td style={{ padding: "10px" }}>Cerita lapangan, sudut pandang orang pertama</td><td style={{ padding: "10px" }}>Sedang</td></tr>
          </tbody>
        </table>
        </div>
        <div style={{ marginTop: "12px", fontSize: "12px", color: "#5B6672", display: "flex", flexWrap: "wrap", gap: "16px" }}><span>Model/versi: [nama-model] v1.2</span><span>Dianalisis: 13 Okt 2026, 06:40 WIB</span><span>Disimpan terpisah dari data mentah</span></div>
      </section>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <section style={{ flex: "1 1 300px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Tema komentar (128)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Apresiasi kunjungan</span><span style={{ color: "#5B6672" }}>54</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Pertanyaan soal harga kebutuhan pokok</span><span style={{ color: "#5B6672" }}>31</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Permintaan program</span><span style={{ color: "#5B6672" }}>19</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Kritik</span><span style={{ color: "#5B6672" }}>7</span></div>
          </div>
        </section>
        <section style={{ flex: "1 1 300px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Dipakai sebagai evidence</h2>
          <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#5B6672", lineHeight: "1.5" }}>Konten ini menjadi dasar 2 temuan AI.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <Link to="/evidence/EVD-0001">Isu ekonomi warga konsisten di konten 90 hari</Link>
            <Link to="/evidence/EVD-0001">Pesan utama konsisten pada format cerita personal</Link>
          </div>
        </section>
      </div>
    </div>
  </div>
</main>
  );
};

export default ContentDetailPage;
