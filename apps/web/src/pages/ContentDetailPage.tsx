import React from 'react';
import { Link } from 'react-router-dom';

export const ContentDetailPage: React.FC = () => {
  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
  <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
    <div>
      <div style={{ fontSize: "13px", color: "#5B6672" }}><Link to="/contents" style={{ color: "#0E5A63", textDecoration: "none" }}>Content Explorer</Link> › <Link to="/candidates/CAN-0001" style={{ color: "#0E5A63", textDecoration: "none" }}>Bakal Caleg 01</Link> › Konten</div>
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Content Detail &amp; Interaksi Warga</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "5px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1F5E34" }}></span> Live Meta API
      </span>
      <a href="https://www.instagram.com/katapedia.id" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
        Buka di Instagram ↗
      </a>
    </div>
  </header>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
    <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ height: "260px", borderRadius: "8px", background: "#14202B", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "24px", boxSizing: "border-box", color: "#fff", fontSize: "14px", lineHeight: "1.5", position: "relative" }}>
          <span style={{ fontSize: "40px", marginBottom: "8px" }}>📹</span>
          <div style={{ fontWeight: 600 }}>Video Reels: Kunjungan Pasar Tradisional</div>
          <div style={{ fontSize: "12px", color: "#9FB0BF", marginTop: "4px" }}>Resolusi: 1080x1920 · 0:42 detik</div>
          <span style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>0:42</span>
        </div>
        <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px 12px", fontSize: "14px" }}>
          <dt style={{ color: "#5B6672" }}>Platform</dt><dd style={{ margin: "0", fontWeight: 500 }}>Instagram Business</dd>
          <dt style={{ color: "#5B6672" }}>Content ID</dt><dd style={{ margin: "0", fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px" }}>IG-17841405392019481_92</dd>
          <dt style={{ color: "#5B6672" }}>Dipublikasi</dt><dd style={{ margin: "0" }}>2 Okt 2026, 17:30 WIB</dd>
          <dt style={{ color: "#5B6672" }}>Format</dt><dd style={{ margin: "0" }}>Video Reels · 0:42</dd>
          <dt style={{ color: "#5B6672" }}>Akun Aset Bisnis</dt><dd style={{ margin: "0" }}><Link to="/accounts/ACC-IG-01" style={{ color: "#0E5A63", fontWeight: 600, textDecoration: "none" }}>@katapedia.id</Link></dd>
          <dt style={{ color: "#5B6672" }}>Permalink</dt><dd style={{ margin: "0" }}><a href="https://www.instagram.com/katapedia.id" target="_blank" rel="noreferrer" style={{ color: "#0E5A63", textDecoration: "none" }}>instagram.com/p/DB-example1/</a></dd>
        </dl>
      </section>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>Caption Postingan</h2>
        <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.6", color: "#3B4651" }}>
          Berkeliling pasar tradisional pagi ini, mendengar langsung aspirasi para pedagang mengenai stabilisasi harga bahan pokok dan penguatan modal usaha mikro warga. #PasarTradisional #PilkadaDamai #EkonomiWarga
        </p>
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#5B6672" }}>Transkrip video: tersedia · Bahasa: Indonesia (NLP Verified)</div>
      </section>
    </div>

    <div style={{ flex: "2 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Metrik Interaksi &amp; Jangkauan Akun</h2>
          <span style={{ fontSize: "12px", color: "#5B6672" }}>Live Sync Meta Graph API</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "14px" }}>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Tayangan / Views</div><div style={{ fontSize: "22px", fontWeight: "600" }}>11.800</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Likes</div><div style={{ fontSize: "22px", fontWeight: "600" }}>940</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Komentar Publik</div><div style={{ fontSize: "22px", fontWeight: "600" }}>128</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Shares</div><div style={{ fontSize: "22px", fontWeight: "600" }}>76</div></div>
          <div style={{ flex: "1 1 120px", border: "1px solid #DDE1DA", borderRadius: "8px", padding: "12px 14px" }}><div style={{ fontSize: "12px", color: "#5B6672" }}>Saves</div><div style={{ fontSize: "22px", fontWeight: "600" }}>42</div></div>
        </div>
      </section>

      {/* ================== BUSINESS ASSET USER PROFILE ACCESS MODULE ================== */}
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>💬</span>
              <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "600" }}>
                Interaksi Warga pada Aset Bisnis (@katapedia.id)
              </h2>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#5B6672" }}>
              Menampilkan profil publik warga (nama, gambar profil, ID) yang berinteraksi dengan postingan resmi untuk memahami dan merespons aspirasi publik.
            </p>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 600, background: "#E0EFF1", color: "#0B4A52", padding: "3px 10px", borderRadius: "12px" }}>
            Akses Profil Pengguna Aset Bisnis
          </span>
        </div>

        {/* API Endpoint Banner */}
        <div style={{ marginTop: "12px", padding: "8px 12px", background: "#F8F9FA", borderRadius: "6px", border: "1px solid #E9ECEF", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <code style={{ fontFamily: "monospace", color: "#0E5A63" }}>
              GET /{'{comment_id}'}?fields=id,from{'{id,name,picture}'},text,timestamp
            </code>
          </div>
          <span style={{ color: "#28A745", fontWeight: 600 }}>• Kolom Pengguna Terverifikasi</span>
        </div>

        {/* List of citizen interactions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          <div style={{ border: "1px solid #EEF0EC", borderRadius: "8px", padding: "12px 14px", background: "#FAFAFA", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#0E5A63", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "14px", flexShrink: 0 }}>
              BP
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <div>
                  <strong style={{ fontSize: "13px", color: "#17212B" }}>Budi Prasetyo</strong>
                  <span style={{ fontSize: "11px", color: "#8794A2", marginLeft: "6px" }}>ID: usr_biz_8910</span>
                </div>
                <span style={{ fontSize: "11px", color: "#1F5E34", background: "#E2F1E6", padding: "2px 8px", borderRadius: "10px", fontWeight: 500 }}>
                  Aspirasi Harga Pangan
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#3B4651", lineHeight: 1.45 }}>
                "Semoga program stabilitas harga bahan pokok di pasar tradisional segera direalisasikan pak, pedagang kecil sangat butuh kepastian harga pasokan."
              </p>
              <div style={{ fontSize: "11px", color: "#8794A2", marginTop: "6px" }}>2 jam yang lalu · Berinteraksi di Akun Instagram Resmi</div>
            </div>
          </div>

          <div style={{ border: "1px solid #EEF0EC", borderRadius: "8px", padding: "12px 14px", background: "#FAFAFA", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#4C6B8B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "14px", flexShrink: 0 }}>
              SR
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <div>
                  <strong style={{ fontSize: "13px", color: "#17212B" }}>Siti Rahmawati</strong>
                  <span style={{ fontSize: "11px", color: "#8794A2", marginLeft: "6px" }}>ID: usr_biz_8911</span>
                </div>
                <span style={{ fontSize: "11px", color: "#0B4A52", background: "#E0EFF1", padding: "2px 8px", borderRadius: "10px", fontWeight: 500 }}>
                  Apresiasi Lapangan
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#3B4651", lineHeight: 1.45 }}>
                "Terima kasih sudah mau mampir langsung ke los sayur dan mendengar keluh kesah kami. Salam hangat dari paguyuban pedagang."
              </p>
              <div style={{ fontSize: "11px", color: "#8794A2", marginTop: "6px" }}>5 jam yang lalu · Berinteraksi di Akun Instagram Resmi</div>
            </div>
          </div>

          <div style={{ border: "1px solid #EEF0EC", borderRadius: "8px", padding: "12px 14px", background: "#FAFAFA", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7A6B53", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "14px", flexShrink: 0 }}>
              HW
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <div>
                  <strong style={{ fontSize: "13px", color: "#17212B" }}>Hendra Wijaya</strong>
                  <span style={{ fontSize: "11px", color: "#8794A2", marginLeft: "6px" }}>ID: usr_biz_8912</span>
                </div>
                <span style={{ fontSize: "11px", color: "#7A4A00", background: "#FBEFD6", padding: "2px 8px", borderRadius: "10px", fontWeight: 500 }}>
                  Masukan Fasilitas
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#3B4651", lineHeight: 1.45 }}>
                "Mohon diperhatikan saluran drainase di bagian timur pasar pak, kalau musim hujan sering becek sehingga pembeli enggan masuk."
              </p>
              <div style={{ fontSize: "11px", color: "#8794A2", marginTop: "6px" }}>1 hari yang lalu · Berinteraksi di Akun Instagram Resmi</div>
            </div>
          </div>
        </div>

        {/* Policy disclaimer */}
        <div style={{ marginTop: "14px", padding: "8px 12px", background: "#F0F9F5", borderRadius: "6px", border: "1px solid #B8E4D0", fontSize: "12px", color: "#1B5B3A" }}>
          🛡️ <strong>Kepatuhan Meta:</strong> Kolom pengguna (ID, Nama, Gambar Profil) hanya dibaca dalam konteks interaksi resmi pada aset bisnis dan analisis aspirasi warga secara agregat. Tidak digunakan untuk penargetan iklan atau dibagikan ke pihak ketiga.
        </div>
      </section>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <section style={{ flex: "1 1 300px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Tema Komentar Warga (128)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Apresiasi kunjungan lapangan</span><span style={{ color: "#1F5E34", fontWeight: 600 }}>54</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Pertanyaan harga kebutuhan pokok</span><span style={{ color: "#0B4A52", fontWeight: 600 }}>31</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Permintaan program ekonomi</span><span style={{ color: "#3B4651", fontWeight: 600 }}>19</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Masukan perbaikan fasilitas</span><span style={{ color: "#7A4A00", fontWeight: 600 }}>14</span></div>
          </div>
        </section>
        <section style={{ flex: "1 1 300px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Rekomendasi Respons Tim</h2>
          <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#5B6672", lineHeight: "1.5" }}>
            Aspirasi warga menunjukkan urgensi stabilisasi sembako dan perbaikan sanitasi pasar.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
            <span style={{ color: "#0E5A63", fontWeight: 500 }}>✓ Rilis tanggapan resmi mengenai revitalisasi drainase pasar</span>
            <span style={{ color: "#0E5A63", fontWeight: 500 }}>✓ Agendakan temu warga lanjutan dengan dinas perdagangan</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</main>
  );
};

export default ContentDetailPage;
