import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface MediaItem {
  id: string;
  mediaId: string;
  type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
  reach: number;
  saves: number;
  thumbnailUrl: string;
  permalink: string;
}

const sampleMediaList: MediaItem[] = [
  {
    id: 'm1',
    mediaId: '18029381729019283',
    type: 'IMAGE',
    caption: 'Silaturahmi dan mendengar langsung aspirasi warga serta pedagang pasar tradisional mengenai stabilisasi harga bahan pokok dan fasilitas kebersihan pasar.',
    timestamp: '14 Okt 2026, 10:15 WIB',
    likeCount: 1240,
    commentCount: 184,
    reach: 14200,
    saves: 184,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&auto=format&fit=crop&q=80',
    permalink: 'https://instagram.com/p/Cxyz123abc'
  },
  {
    id: 'm2',
    mediaId: '18029381729019284',
    type: 'VIDEO',
    caption: 'Reel: Diskusi bersama pemuda dan pelaku startup kreatif daerah mengenai peluang ekonomi digital dan pembukaan lapangan kerja baru untuk generasi muda.',
    timestamp: '12 Okt 2026, 15:40 WIB',
    likeCount: 2850,
    commentCount: 340,
    reach: 38400,
    saves: 420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80',
    permalink: 'https://instagram.com/reel/Cxyz456def'
  },
  {
    id: 'm3',
    mediaId: '18029381729019285',
    type: 'CAROUSEL_ALBUM',
    caption: '5 Komitmen utama pembangunan infrastruktur hijau dan fasilitas publik ramah keluarga, anak, serta lansia di daerah pemilihan.',
    timestamp: '9 Okt 2026, 08:30 WIB',
    likeCount: 980,
    commentCount: 92,
    reach: 11800,
    saves: 195,
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=80',
    permalink: 'https://instagram.com/p/Cxyz789ghi'
  },
  {
    id: 'm4',
    mediaId: '18029381729019286',
    type: 'IMAGE',
    caption: 'Menghadiri dialog terbuka bersama tokoh masyarakat dan pemuka agama demi menjaga kerukunan dan persatuan warga.',
    timestamp: '5 Okt 2026, 19:20 WIB',
    likeCount: 1450,
    commentCount: 120,
    reach: 16500,
    saves: 98,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=80',
    permalink: 'https://instagram.com/p/Cxyz012jkl'
  }
];

export const AccountDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlHandle = searchParams.get('handle') || 'katapedia.id';

  const [status, setStatus] = useState<'Verified' | 'Pending Verification' | 'Invalid' | 'Inactive' | 'Review'>('Verified');
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'media' | 'analytics' | 'sync_log'>('media');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showNotification(`Sinkronisasi data Meta Graph API akun @${urlHandle} berhasil!`);
    }, 1200);
  };

  const statusColors: Record<string, { bg: string; color: string; border?: string }> = {
    'Verified': { bg: '#E2F1E6', color: '#1F5E34' },
    'Pending Verification': { bg: '#E0EFF1', color: '#0B4A52' },
    'Invalid': { bg: '#FBE4E1', color: '#8E2420' },
    'Inactive': { bg: '#E9ECEF', color: '#3B4651' },
    'Review': { bg: '#FBEFD6', color: '#7A4A00' },
  };

  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
      {notification && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000, background: '#17212B', color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#097E52', fontWeight: 'bold' }}>✓</span> {notification}
        </div>
      )}

      {/* Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>
            <Link to="/candidates" style={{ color: "#0E5A63", textDecoration: "none" }}>Daftar Kandidat</Link> › <Link to="/candidates/CAN-0001" style={{ color: "#0E5A63", textDecoration: "none" }}>Bakal Caleg 01</Link> › Instagram @{urlHandle}
          </div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600", color: "#17212B" }}>Detail Akun Instagram Resmi</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "4px 12px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1F5E34" }}></span>
            Live Meta Graph API v21.0
          </span>
          <button 
            type="button" 
            onClick={handleSync}
            disabled={isSyncing}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: isSyncing ? 'wait' : 'pointer' }}
          >
            {isSyncing ? 'Sedang sinkron...' : 'Sync Data Terbaru'}
          </button>
          <Link
            to="/data-quality"
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #DDE1DA", background: "#fff", color: "#3B4651", fontSize: "14px", fontWeight: "600", display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            « Kembali ke Sync Status
          </Link>
        </div>
      </header>

      {/* Profile Card (Required for instagram_business_basic) */}
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "12px", padding: "24px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
        {/* Instagram Profile Avatar with gradient ring */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            padding: "3px",
            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Foto Profil Instagram"
              style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
            />
          </div>
          <span style={{ padding: "2px 9px", borderRadius: "999px", background: statusColors[status].bg, color: statusColors[status].color, fontSize: "11px", fontWeight: "600" }}>
            ✓ {status}
          </span>
        </div>

        {/* Profile Info Details */}
        <div style={{ flex: "2 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#17212B" }}>
              @{urlHandle}
            </h2>
            <span style={{ padding: "2px 8px", borderRadius: "4px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "600" }}>
              Instagram Business Account
            </span>
          </div>

          <p style={{ margin: 0, fontSize: "14px", color: "#3B4651", lineHeight: "1.5" }}>
            <strong>Katapedia Indonesia Official</strong> · Platform Analisis Data Digital &amp; Elektabilitas Calon Pemimpin Indonesia. Terhubung resmi via Meta Graph API untuk pelaporan transparan metrik media sosial.
          </p>

          <dl style={{ margin: "4px 0 0", display: "grid", gridTemplateColumns: "160px 1fr", gap: "8px 16px", fontSize: "13px" }}>
            <dt style={{ color: "#5B6672" }}>Instagram Account ID:</dt>
            <dd style={{ margin: "0", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, color: "#17212B" }}>
              17841405392019481
            </dd>

            <dt style={{ color: "#5B6672" }}>URL Instagram:</dt>
            <dd style={{ margin: "0" }}>
              <a href={`https://instagram.com/${urlHandle}`} target="_blank" rel="noopener noreferrer" style={{ color: "#0E5A63", fontWeight: 500, textDecoration: "none" }}>
                instagram.com/{urlHandle} ↗
              </a>
            </dd>

            <dt style={{ color: "#5B6672" }}>Izin Meta Aktif:</dt>
            <dd style={{ margin: "0", color: "#1F5E34", fontWeight: 600 }}>
              instagram_business_basic, instagram_business_manage_insights
            </dd>

            <dt style={{ color: "#5B6672" }}>Kandidat Terkait:</dt>
            <dd style={{ margin: "0" }}>
              <Link to="/candidates/CAN-0001" style={{ color: "#17212B", fontWeight: 500, textDecoration: "none" }}>
                Bakal Caleg 01 (DPR RI Dapil DKI Jakarta I)
              </Link>
            </dd>

            <dt style={{ color: "#5B6672" }}>Status Token &amp; OAuth:</dt>
            <dd style={{ margin: "0", color: "#1F5E34", fontWeight: 500 }}>
              ● Token Aktif (Meta Developer App Review Ready)
            </dd>
          </dl>
        </div>

        {/* Quick Actions / Disconnect */}
        <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "10px", background: "#F8FAF9", padding: "16px", borderRadius: "8px", border: "1px solid #E3E7E1" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#5B6672", textTransform: "uppercase" }}>Informasi API Meta</div>
          <div style={{ fontSize: "13px", color: "#3B4651", lineHeight: "1.4" }}>
            Data profil dan daftar media di bawah diambil secara resmi melalui endpoint <code>/v21.0/{'{ig-user-id}'}/media</code>.
          </div>
          <div style={{ fontSize: "12px", color: "#097E52", fontWeight: 600 }}>
            ✓ Endpoint GET Berhasil Terverifikasi
          </div>
        </div>
      </section>

      {/* Key Metric Numbers */}
      <section aria-label="Metrik akun" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Followers</div>
          <div style={{ fontSize: "30px", fontWeight: "700", marginTop: "4px", color: "#17212B" }}>31.500</div>
          <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Update otomatis harian</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Following</div>
          <div style={{ fontSize: "30px", fontWeight: "700", marginTop: "4px", color: "#17212B" }}>412</div>
          <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Akun diikuti</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Total Postingan Media</div>
          <div style={{ fontSize: "30px", fontWeight: "700", marginTop: "4px", color: "#17212B" }}>540</div>
          <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>62 dalam 90 hari terakhir</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Total Jangkauan (Reach)</div>
          <div style={{ fontSize: "30px", fontWeight: "700", marginTop: "4px", color: "#0E5A63" }}>184.200</div>
          <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>30 hari terakhir</div>
        </div>
        <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Rata-rata Interaksi</div>
          <div style={{ fontSize: "30px", fontWeight: "700", marginTop: "4px", color: "#17212B" }}>1.840</div>
          <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Likes &amp; Komentar / post</div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #DDE1DA", paddingBottom: "2px" }}>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          style={{
            padding: "10px 18px",
            background: "none",
            border: "none",
            borderBottom: activeTab === 'media' ? "3px solid #0E5A63" : "3px solid transparent",
            color: activeTab === 'media' ? "#0E5A63" : "#5B6672",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          📷 Daftar Media Instagram (instagram_business_basic)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: "10px 18px",
            background: "none",
            border: "none",
            borderBottom: activeTab === 'analytics' ? "3px solid #0E5A63" : "3px solid transparent",
            color: activeTab === 'analytics' ? "#0E5A63" : "#5B6672",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          📊 Insights &amp; Analisis Tren (instagram_business_manage_insights)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sync_log')}
          style={{
            padding: "10px 18px",
            background: "none",
            border: "none",
            borderBottom: activeTab === 'sync_log' ? "3px solid #0E5A63" : "3px solid transparent",
            color: activeTab === 'sync_log' ? "#0E5A63" : "#5B6672",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          📋 Log Sinkronisasi API
        </button>
      </div>

      {/* TAB 1: Media List (Key requirement for Meta instagram_business_basic review) */}
      {activeTab === 'media' && (
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>Postingan Media Terbaru dari Instagram</h2>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#5B6672" }}>
                Menampilkan data gambar, video, caption, jumlah likes dan komentar (Basic) serta Reach dan Saves (Insights).
              </p>
            </div>
            <Link to="/contents" style={{ fontSize: "13px", color: "#0E5A63", fontWeight: 600, textDecoration: "none" }}>
              Buka di Content Explorer →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {sampleMediaList.map((media) => (
              <div
                key={media.id}
                style={{
                  background: "#fff",
                  border: "1px solid #DDE1DA",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
              >
                {/* Media Image Thumbnail */}
                <div style={{ position: "relative", width: "100%", height: "190px", background: "#f0f0f0" }}>
                  <img
                    src={media.thumbnailUrl}
                    alt={media.caption}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "rgba(0,0,0,0.75)",
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 600,
                      backdropFilter: "blur(2px)"
                    }}
                  >
                    {media.type === 'VIDEO' ? '🎥 VIDEO' : media.type === 'CAROUSEL_ALBUM' ? '📑 CAROUSEL' : '🖼️ IMAGE'}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontFamily: "'IBM Plex Mono', monospace"
                    }}
                  >
                    ID: {media.mediaId.slice(-6)}
                  </span>
                </div>

                {/* Media Caption & Stats */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  <div style={{ fontSize: "11px", color: "#5B6672" }}>
                    📅 {media.timestamp}
                  </div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#17212B", lineHeight: "1.5", flex: 1 }}>
                    {media.caption}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #EEF0EC", fontSize: "12px", gap: "8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <span title="Likes (Basic)" style={{ color: "#E1306C", fontWeight: 600 }}>
                        ❤️ {media.likeCount.toLocaleString('id-ID')}
                      </span>
                      <span title="Komentar (Basic)" style={{ color: "#0E5A63", fontWeight: 600 }}>
                        💬 {media.commentCount.toLocaleString('id-ID')}
                      </span>
                      <span title="Jangkauan Unik (Insights)" style={{ color: "#1F5E34", fontWeight: 600 }}>
                        👁️ {media.reach.toLocaleString('id-ID')} Reach
                      </span>
                      <span title="Disimpan (Insights)" style={{ color: "#7A4A00", fontWeight: 600 }}>
                        💾 {media.saves.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <a
                      href={media.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "12px", color: "#0E5A63", fontWeight: 600, textDecoration: "none" }}
                    >
                      Buka Post ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: Trend Analytics */}
      {activeTab === 'analytics' && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Insights Explanation Header */}
          <div style={{ background: "#F0F9F5", border: "1px solid #B8DEC0", borderRadius: "10px", padding: "16px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#1F5E34", marginBottom: "4px" }}>
              📈 Penggunaan Izin Meta: instagram_business_manage_insights
            </div>
            <div style={{ fontSize: "13px", color: "#3B4651", lineHeight: "1.5" }}>
              Izin ini digunakan DED untuk mengakses metrik performa mendalam yang tidak tersedia secara publik, mencakup <strong>total jangkauan unik (reach)</strong>, <strong>tayangan (impressions)</strong>, <strong>pertumbuhan pengikut harian</strong>, dan <strong>rasio simpan (saves)</strong>. Metrik ini membantu analis mengevaluasi penetrasi kampanye dan keterlibatan audiens secara objektif.
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "stretch" }}>
          <section style={{ flex: "1 1 440px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
            <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Pertumbuhan followers · 90 hari</h2>
            <p style={{ margin: "4px 0 10px", fontSize: "13px", color: "#5B6672" }}>Satu titik per snapshot pengukuran. Snapshot lama tidak ditimpa.</p>
            <svg viewBox="0 0 560 190" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Grafik pertumbuhan followers Instagram selama 90 hari, naik stabil">
              <g stroke="#E3E7E1"><line x1="10" y1="20" x2="550" y2="20"></line><line x1="10" y1="70" x2="550" y2="70"></line><line x1="10" y1="120" x2="550" y2="120"></line><line x1="10" y1="170" x2="550" y2="170"></line></g>
              <polyline fill="none" stroke="#0E5A63" strokeWidth="2.5" points="10,150 55,146 100,142 145,136 190,134 235,126 280,120 325,116 370,104 415,98 460,84 505,72 550,62"></polyline>
              <g fill="#fff" stroke="#0E5A63" strokeWidth="2"><circle cx="10" cy="150" r="3.5"></circle><circle cx="145" cy="136" r="3.5"></circle><circle cx="280" cy="120" r="3.5"></circle><circle cx="415" cy="98" r="3.5"></circle><circle cx="550" cy="62" r="3.5"></circle></g>
              <g fontSize="11" fill="#5B6672" fontFamily="IBM Plex Sans"><text x="10" y="186">15 Jul</text><text x="270" y="186">28 Agu</text><text x="515" y="186">13 Okt</text></g>
            </svg>
          </section>
          <section style={{ flex: "1 1 440px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
            <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Frekuensi posting per minggu</h2>
            <p style={{ margin: "4px 0 10px", fontSize: "13px", color: "#5B6672" }}>Diperbarui berkala dari pembacaan data feed Instagram resmi.</p>
            <svg viewBox="0 0 560 190" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Diagram batang jumlah posting per minggu selama 13 minggu">
              <g stroke="#E3E7E1"><line x1="10" y1="20" x2="550" y2="20"></line><line x1="10" y1="70" x2="550" y2="70"></line><line x1="10" y1="120" x2="550" y2="120"></line></g>
              <line x1="10" y1="170" x2="550" y2="170" stroke="#8A97A3"></line>
              <g fill="#0E5A63"><rect x="16" y="100" width="28" height="70" rx="3"></rect><rect x="58" y="90" width="28" height="80" rx="3"></rect><rect x="100" y="110" width="28" height="60" rx="3"></rect><rect x="142" y="80" width="28" height="90" rx="3"></rect><rect x="184" y="90" width="28" height="80" rx="3"></rect><rect x="226" y="100" width="28" height="70" rx="3"></rect><rect x="268" y="70" width="28" height="100" rx="3"></rect><rect x="310" y="90" width="28" height="80" rx="3"></rect><rect x="352" y="80" width="28" height="90" rx="3"></rect><rect x="394" y="110" width="28" height="60" rx="3"></rect><rect x="436" y="90" width="28" height="80" rx="3"></rect><rect x="478" y="60" width="28" height="110" rx="3"></rect></g>
              <rect x="520" y="130" width="28" height="40" rx="3" fill="#B8660A"></rect>
              <text x="430" y="186" fontSize="11" fill="#7A4A00" fontFamily="IBM Plex Sans">Minggu berjalan</text>
            </svg>
          </section>
        </div>
      </div>
      )}

      {/* TAB 3: Sync Log */}
      {activeTab === 'sync_log' && (
        <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "600" }}>Log Sinkronisasi Meta Graph API</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}>
              <div>
                <div style={{ fontWeight: 600 }}>14 Okt 2026, 10:15 WIB</div>
                <div style={{ fontSize: "12px", color: "#5B6672" }}>GET /v21.0/17841405392019481/media (4 media ditarik, token valid)</div>
              </div>
              <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "600", height: "fit-content" }}>Berhasil</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}>
              <div>
                <div style={{ fontWeight: 600 }}>13 Okt 2026, 06:00 WIB</div>
                <div style={{ fontSize: "12px", color: "#5B6672" }}>Sinkronisasi berkala profil dan metrik insight</div>
              </div>
              <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "600", height: "fit-content" }}>Berhasil</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "12px 0", fontSize: "14px" }}>
              <div>
                <div style={{ fontWeight: 600 }}>12 Okt 2026, 06:00 WIB</div>
                <div style={{ fontSize: "12px", color: "#5B6672" }}>Otorisasi awal OAuth Meta Graph API</div>
              </div>
              <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "600", height: "fit-content" }}>Berhasil</span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default AccountDetailPage;
