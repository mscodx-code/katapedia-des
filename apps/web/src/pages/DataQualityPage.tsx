import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AccountSyncItem {
  id: string;
  name: string;
  candidate: string;
  lastSync: string;
  syncStatus: 'Berhasil' | 'Gagal' | 'Retry terjadwal' | 'Syncing...';
  quality: 'Complete' | 'Partial' | 'Insufficient' | 'Stale';
  notes: string;
}

interface AnomalyItem {
  id: string;
  title: string;
  desc: string;
  reviewed: boolean;
  reviewedBy?: string;
  link?: { text: string; to: string };
}

export const DataQualityPage: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [isRetryingAll, setIsRetryingAll] = useState(false);

  const [accounts, setAccounts] = useState<AccountSyncItem[]>([
    { id: '1', name: 'IG @handle_contoh', candidate: 'Bakal Caleg 01', lastSync: '13 Okt, 06:00', syncStatus: 'Berhasil', quality: 'Complete', notes: '—' },
    { id: '2', name: 'TikTok @handle_contoh', candidate: 'Bakal Caleg 01', lastSync: '13 Okt, 06:00', syncStatus: 'Berhasil', quality: 'Partial', notes: 'Saves dan reach Not Available' },
    { id: '3', name: 'IG @handle_contoh_07', candidate: 'Bakal Caleg 07', lastSync: '13 Okt, 06:00', syncStatus: 'Berhasil', quality: 'Complete', notes: '—' },
    { id: '4', name: 'IG @handle_contoh_12', candidate: 'Bakal Caleg 12', lastSync: '10 Okt, 06:00', syncStatus: 'Gagal', quality: 'Stale', notes: 'Akses ditolak platform, 3 percobaan' },
    { id: '5', name: 'TikTok @handle_contoh_08', candidate: 'Bakal Caleg 08', lastSync: '10 Okt, 06:00', syncStatus: 'Retry terjadwal', quality: 'Stale', notes: 'Akun berstatus Invalid, perlu verifikasi' },
    { id: '6', name: 'TikTok @handle_contoh_06', candidate: 'Bakal Caleg 06', lastSync: '13 Okt, 06:00', syncStatus: 'Berhasil', quality: 'Insufficient', notes: 'Baru 11 hari data, baseline belum dihitung' },
  ]);

  const [anomalies, setAnomalies] = useState<AnomalyItem[]>([
    { id: 'a1', title: 'View spike', desc: 'Bakal Caleg 07 · TikTok · terdeteksi 12 Okt', reviewed: false },
    { id: 'a2', title: 'Follower spike', desc: 'Bakal Caleg 04 · Instagram · terdeteksi 11 Okt', reviewed: false },
    { id: 'a3', title: 'Sudden sentiment shift', desc: 'Bakal Caleg 03 · Instagram · terdeteksi 11 Okt', reviewed: false, link: { text: 'Lihat evidence', to: '/evidence/EVD-0001' } },
    { id: 'a4', title: 'Sudden posting frequency change', desc: 'Bakal Caleg 05 · TikTok · terdeteksi 9 Okt', reviewed: true, reviewedBy: 'oleh Analyst, 10 Okt' },
    { id: 'a5', title: 'Account status change', desc: 'Bakal Caleg 08 · TikTok · terdeteksi 8 Okt', reviewed: false, link: { text: 'Buka akun', to: '/accounts/ACC-0001' } },
  ]);

  const [aiQueueFailed, setAiQueueFailed] = useState(1);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRetryAll = () => {
    setIsRetryingAll(true);
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.syncStatus === 'Gagal' || acc.syncStatus === 'Retry terjadwal'
          ? { ...acc, syncStatus: 'Syncing...' }
          : acc
      )
    );

    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.syncStatus === 'Syncing...'
            ? { ...acc, syncStatus: 'Berhasil', quality: 'Complete', lastSync: 'Baru saja', notes: 'Berhasil disinkronkan kembali' }
            : acc
        )
      );
      setIsRetryingAll(false);
      showNotification('Semua sync yang gagal berhasil diulang!');
    }, 1200);
  };

  const handleRetrySingle = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, syncStatus: 'Syncing...' } : acc))
    );

    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === id
            ? { ...acc, syncStatus: 'Berhasil', quality: 'Complete', lastSync: 'Baru saja', notes: 'Sync ulang sukses' }
            : acc
        )
      );
      showNotification('Sync akun berhasil diperbarui!');
    }, 1000);
  };

  const handleReviewAnomaly = (id: string) => {
    setAnomalies((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, reviewed: true, reviewedBy: 'oleh Analyst, Baru saja' }
          : item
      )
    );
    showNotification('Anomali telah ditandai sebagai ditinjau');
  };

  const handleRetryAi = () => {
    setAiQueueFailed(0);
    showNotification('Antrean analisis AI berhasil dicoba ulang!');
  };

  const unreviewedCount = anomalies.filter((a) => !a.reviewed).length;

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
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Data Quality &amp; Sync Status</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
          <button 
            type="button" 
            onClick={handleRetryAll}
            disabled={isRetryingAll}
            style={{ 
              height: "38px", 
              padding: "0 16px", 
              borderRadius: "8px", 
              border: "1px solid #0E5A63", 
              background: "#fff", 
              color: "#0E5A63", 
              fontSize: "14px", 
              fontWeight: "600", 
              fontFamily: "inherit",
              cursor: isRetryingAll ? "wait" : "pointer",
              opacity: isRetryingAll ? 0.7 : 1
            }}
          >
            {isRetryingAll ? 'Sedang mengulang...' : 'Retry semua yang gagal'}
          </button>
        </div>
      </header>

      <section aria-label="Ringkasan kualitas data" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ flex: "1 1 200px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#5B6672" }}>Akun</span>
            <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500" }}>Complete</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "6px" }}>21</div>
          <div style={{ fontSize: "12px", color: "#5B6672" }}>Data utama tersedia</div>
        </div>
        <div style={{ flex: "1 1 200px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#5B6672" }}>Akun</span>
            <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBEFD6", color: "#7A4A00", fontSize: "12px", fontWeight: "500" }}>Partial</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "6px" }}>6</div>
          <div style={{ fontSize: "12px", color: "#5B6672" }}>Sebagian metrik/periode tidak tersedia</div>
        </div>
        <div style={{ flex: "1 1 200px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#5B6672" }}>Akun</span>
            <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Insufficient</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "6px" }}>2</div>
          <div style={{ fontSize: "12px", color: "#5B6672" }}>Data belum cukup</div>
        </div>
        <div style={{ flex: "1 1 200px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#5B6672" }}>Akun</span>
            <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#FBE4E1", color: "#8E2420", fontSize: "12px", fontWeight: "500" }}>Stale</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "600", marginTop: "6px" }}>
            {accounts.filter((a) => a.quality === 'Stale').length}
          </div>
          <div style={{ fontSize: "12px", color: "#5B6672" }}>Melewati batas freshness</div>
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "8px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", padding: "14px 0 6px", alignItems: "baseline" }}>
          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Status sync per akun</h2>
          <span style={{ fontSize: "13px", color: "#5B6672" }}>Kegagalan sync tercatat dan dapat dicoba ulang</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "900px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Akun</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Kandidat</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Sync terakhir</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Status sync</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Kualitas data</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Catatan</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => {
                const isLast = idx === accounts.length - 1;
                const canRetry = acc.syncStatus === 'Gagal' || acc.syncStatus === 'Retry terjadwal';
                return (
                  <tr key={acc.id}>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <Link to="/accounts/ACC-0001">{acc.name}</Link>
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      {acc.candidate}
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      {acc.lastSync}
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "2px 9px",
                        borderRadius: "999px",
                        background: acc.syncStatus === 'Berhasil' ? '#E2F1E6' : acc.syncStatus === 'Syncing...' ? '#E0EFF1' : acc.syncStatus === 'Gagal' ? '#FBE4E1' : '#FBEFD6',
                        color: acc.syncStatus === 'Berhasil' ? '#1F5E34' : acc.syncStatus === 'Syncing...' ? '#0B4A52' : acc.syncStatus === 'Gagal' ? '#8E2420' : '#7A4A00',
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {acc.syncStatus}
                      </span>
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "2px 9px",
                        borderRadius: "999px",
                        background: acc.quality === 'Complete' ? '#E2F1E6' : acc.quality === 'Partial' ? '#FBEFD6' : acc.quality === 'Insufficient' ? '#E9ECEF' : '#FBE4E1',
                        color: acc.quality === 'Complete' ? '#1F5E34' : acc.quality === 'Partial' ? '#7A4A00' : acc.quality === 'Insufficient' ? '#3B4651' : '#8E2420',
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {acc.quality}
                      </span>
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC", color: "#5B6672" }}>
                      {acc.notes}
                    </td>
                    <td style={{ padding: "10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      {canRetry && (
                        <button
                          type="button"
                          onClick={() => handleRetrySingle(acc.id)}
                          style={{ height: "32px", padding: "0 12px", border: "1px solid #0E5A63", borderRadius: "8px", background: "#fff", color: "#0E5A63", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
                        >
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
        <section style={{ flex: "2 1 560px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
            <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Anomali untuk ditinjau</h2>
            <span style={{ fontSize: "13px", color: "#5B6672" }}>{unreviewedCount} belum ditinjau</span>
          </div>
          <div style={{ margin: "10px 0 6px", padding: "12px 14px", borderRadius: "8px", background: "#FBEFD6", color: "#5E3900", fontSize: "13px", lineHeight: "1.5" }}>
            Anomali adalah sinyal untuk review, bukan kesimpulan pelanggaran atau manipulasi.
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {anomalies.map((anom) => (
              <div key={anom.id} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", padding: "14px 0", borderTop: "1px solid #EEF0EC" }}>
                <div style={{ flex: "3 1 300px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>{anom.title}</div>
                  <div style={{ fontSize: "13px", color: "#5B6672", marginTop: "2px" }}>{anom.desc}</div>
                </div>
                <span style={{
                  padding: "2px 9px",
                  borderRadius: "999px",
                  background: anom.reviewed ? '#E2F1E6' : '#FBEFD6',
                  color: anom.reviewed ? '#1F5E34' : '#7A4A00',
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  {anom.reviewed ? 'Ditinjau' : 'Belum ditinjau'}
                </span>
                {anom.reviewed ? (
                  <span style={{ fontSize: "13px", color: "#5B6672" }}>{anom.reviewedBy}</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {anom.link && (
                      <Link to={anom.link.to} style={{ fontSize: "13px" }}>{anom.link.text}</Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleReviewAnomaly(anom.id)}
                      style={{ height: "34px", padding: "0 12px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}
                    >
                      Tandai ditinjau
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: "1 1 320px", minWidth: "0", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Antrean analisis AI</h2>
          <div style={{ fontSize: "13px", color: "#5B6672", lineHeight: "1.5" }}>Analisis berjalan asinkron, tidak menghambat tampilan dashboard.</div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}>
            <span>Dalam antrean</span>
            <b style={{ fontWeight: "600" }}>14</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}>
            <span>Sedang berjalan</span>
            <b style={{ fontWeight: "600" }}>2</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEF0EC", fontSize: "14px" }}>
            <span>Selesai hari ini</span>
            <b style={{ fontWeight: "600" }}>61</b>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: "14px" }}>
            <span>Gagal</span>
            <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <b style={{ fontWeight: "600" }}>{aiQueueFailed}</b>
              {aiQueueFailed > 0 && (
                <button
                  type="button"
                  onClick={handleRetryAi}
                  style={{ height: "30px", padding: "0 12px", border: "1px solid #0E5A63", borderRadius: "8px", background: "#fff", color: "#0E5A63", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
                >
                  Retry
                </button>
              )}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DataQualityPage;
