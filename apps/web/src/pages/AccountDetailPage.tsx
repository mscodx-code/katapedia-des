import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const AccountDetailPage: React.FC = () => {
  const [status, setStatus] = useState<'Verified' | 'Pending Verification' | 'Invalid' | 'Inactive' | 'Review'>('Verified');
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showNotification('Sinkronisasi akun Instagram @handle_contoh berhasil!');
    }, 1200);
  };

  const handleToggleReview = () => {
    if (status === 'Review') {
      setStatus('Verified');
      showNotification('Status akun dikembalikan ke Verified');
    } else {
      setStatus('Review');
      showNotification('Akun ditandai untuk Review oleh analis');
    }
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
      <span style={{ color: '#0E5A63', fontWeight: 'bold' }}>✓</span> {notification}
    </div>
  )}

  <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
    <div>
      <div style={{ fontSize: "13px", color: "#5B6672" }}><Link to="/candidates">Daftar Kandidat</Link> › <Link to="/candidates/CAN-0001">Bakal Caleg 01</Link> › Instagram</div>
      <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Account Detail</h1>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
      <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
      <button 
        type="button" 
        onClick={handleSync}
        disabled={isSyncing}
        style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: isSyncing ? 'wait' : 'pointer' }}
      >
        {isSyncing ? 'Sedang sinkron...' : 'Sync ulang'}
      </button>
      <button 
        type="button" 
        onClick={handleToggleReview}
        style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #B9C1C9", background: "#fff", color: "#17212B", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
      >
        {status === 'Review' ? 'Selesai Review' : 'Tandai Review'}
      </button>
    </div>
  </header>

  <section style={{ display: "flex", flexWrap: "wrap", gap: "24px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "22px 24px" }}>
    <div style={{ flex: "2 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <span style={{ fontSize: "20px", fontWeight: "600" }}>Instagram</span>
        <span style={{ fontSize: "16px", color: "#3B4651" }}>@handle_contoh</span>
        <span style={{ padding: "2px 9px", borderRadius: "999px", background: statusColors[status].bg, color: statusColors[status].color, fontSize: "12px", fontWeight: "500" }}>
          {status}
        </span>
      </div>
      <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "140px 1fr", gap: "8px 16px", fontSize: "14px" }}>
        <dt style={{ color: "#5B6672" }}>URL</dt><dd style={{ margin: "0" }}><Link to="/accounts/ACC-0001">instagram.com/handle_contoh</Link></dd>
        <dt style={{ color: "#5B6672" }}>Account ID</dt><dd style={{ margin: "0", fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px" }}>1784••••••••201</dd>
        <dt style={{ color: "#5B6672" }}>Kandidat terkait</dt><dd style={{ margin: "0" }}><Link to="/candidates/CAN-0001">Bakal Caleg 01</Link> · CAN-0001</dd>
        <dt style={{ color: "#5B6672" }}>Sumber data</dt><dd style={{ margin: "0" }}>[Sumber akuisisi data, ditetapkan di technical design]</dd>
        <dt style={{ color: "#5B6672" }}>Sync terakhir</dt><dd style={{ margin: "0" }}>13 Okt 2026, 06:00 WIB</dd>
      </dl>
    </div>
    <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ fontSize: "13px", color: "#5B6672" }}>Status akun (klik untuk mengubah)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {(['Verified', 'Pending Verification', 'Invalid', 'Inactive', 'Review'] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => {
              setStatus(st);
              showNotification(`Status akun diubah ke ${st}`);
            }}
            style={{
              padding: "4px 11px",
              borderRadius: "999px",
              background: status === st ? statusColors[st].bg : '#E9ECEF',
              color: status === st ? statusColors[st].color : '#3B4651',
              fontSize: "12px",
              fontWeight: status === st ? "600" : "normal",
              outline: status === st ? `2px solid ${statusColors[st].color}` : 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {st}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderRadius: "8px", background: "#FBEFD6", color: "#5E3900", fontSize: "13px", lineHeight: "1.5" }}>Account ID tidak dapat dikaitkan ke kandidat lain tanpa review. Setiap perubahan pengaitan tercatat di audit log.</div>
    </div>
  </section>

  <section aria-label="Metrik akun" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Followers</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>31.500</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Snapshot 13 Okt 2026</div></div>
    <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Following</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>412</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>Snapshot 13 Okt 2026</div></div>
    <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Total konten</div><div style={{ fontSize: "30px", fontWeight: "600", marginTop: "4px" }}>540</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>62 dalam 90 hari</div></div>
    <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Reach non-follower</div><div style={{ fontSize: "20px", fontWeight: "600", marginTop: "12px", color: "#5B6672" }}>Not Available</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "6px" }}>Bukan nol, belum tersedia</div></div>
    <div style={{ flex: "1 1 180px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "18px 20px" }}><div style={{ fontSize: "13px", color: "#5B6672" }}>Saves</div><div style={{ fontSize: "20px", fontWeight: "600", marginTop: "12px", color: "#5B6672" }}>Not Available</div><div style={{ fontSize: "12px", color: "#5B6672", marginTop: "6px" }}>Divalidasi saat technical design</div></div>
  </section>

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
      <p style={{ margin: "4px 0 10px", fontSize: "13px", color: "#5B6672" }}>Perubahan frekuensi mendadak ditandai sebagai sinyal review.</p>
      <svg viewBox="0 0 560 190" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Diagram batang jumlah posting per minggu selama 13 minggu">
        <g stroke="#E3E7E1"><line x1="10" y1="20" x2="550" y2="20"></line><line x1="10" y1="70" x2="550" y2="70"></line><line x1="10" y1="120" x2="550" y2="120"></line></g>
        <line x1="10" y1="170" x2="550" y2="170" stroke="#8A97A3"></line>
        <g fill="#0E5A63"><rect x="16" y="100" width="28" height="70" rx="3"></rect><rect x="58" y="90" width="28" height="80" rx="3"></rect><rect x="100" y="110" width="28" height="60" rx="3"></rect><rect x="142" y="80" width="28" height="90" rx="3"></rect><rect x="184" y="90" width="28" height="80" rx="3"></rect><rect x="226" y="100" width="28" height="70" rx="3"></rect><rect x="268" y="70" width="28" height="100" rx="3"></rect><rect x="310" y="90" width="28" height="80" rx="3"></rect><rect x="352" y="80" width="28" height="90" rx="3"></rect><rect x="394" y="110" width="28" height="60" rx="3"></rect><rect x="436" y="90" width="28" height="80" rx="3"></rect><rect x="478" y="60" width="28" height="110" rx="3"></rect></g>
        <rect x="520" y="130" width="28" height="40" rx="3" fill="#B8660A"></rect>
        <text x="430" y="186" fontSize="11" fill="#7A4A00" fontFamily="IBM Plex Sans">Minggu berjalan (data belum penuh)</text>
      </svg>
    </section>
  </div>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
    <section style={{ flex: "3 1 560px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}><h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Konten terbaru dari akun ini</h2><Link to="/contents" style={{ fontSize: "13px" }}>Buka Content Explorer</Link></div>
      <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", marginTop: "8px", minWidth: "520px" }}>
        <thead><tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Konten</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Tanggal</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Views</th><th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Posisi vs baseline</th></tr></thead>
        <tbody>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><Link to="/contents/CNT-0001">Kunjungan ke pasar tradisional</Link></td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>2 Okt</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>11.800</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Above Baseline</span></td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><Link to="/contents/CNT-0001">Ucapan hari besar</Link></td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>28 Sep</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>620</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Below Baseline</span></td></tr>
          <tr><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><Link to="/contents/CNT-0001">Cerita singkat perjalanan karier</Link></td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>9 Sep</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>7.200</td><td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E0EFF1", color: "#0B4A52", fontSize: "12px", fontWeight: "500" }}>Above Baseline</span></td></tr>
          <tr><td style={{ padding: "10px" }}><Link to="/contents/CNT-0001">Repost liputan media</Link></td><td style={{ padding: "10px" }}>5 Sep</td><td style={{ padding: "10px" }}>1.050</td><td style={{ padding: "10px" }}><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Below Baseline</span></td></tr>
        </tbody>
      </table>
      </div>
    </section>
    <section style={{ flex: "2 1 360px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
      <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: "600" }}>Log sync</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><div><div>13 Okt, 06:00</div><div style={{ fontSize: "12px", color: "#5B6672" }}>Konten dan metrik akun</div></div><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Berhasil</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><div><div>12 Okt, 06:00</div><div style={{ fontSize: "12px", color: "#5B6672" }}>Konten dan metrik akun</div></div><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Berhasil</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}><div><div>11 Okt, 06:00</div><div style={{ fontSize: "12px", color: "#5B6672" }}>Gagal, percobaan ulang berhasil 06:20</div></div><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Retry</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "10px 0", fontSize: "14px" }}><div><div>10 Okt, 06:00</div><div style={{ fontSize: "12px", color: "#5B6672" }}>Konten dan metrik akun</div></div><span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", height: "fit-content" }}>Berhasil</span></div>
      </div>
    </section>
  </div>
</main>
  );
};

export default AccountDetailPage;
