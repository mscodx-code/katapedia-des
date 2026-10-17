import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

interface AccountSyncItem {
  id: string;
  name: string;
  platform: 'INSTAGRAM' | 'TIKTOK';
  candidate: string;
  lastSync: string;
  syncStatus: 'Berhasil' | 'Gagal' | 'Retry terjadwal' | 'Syncing...';
  quality: 'Complete' | 'Partial' | 'Insufficient' | 'Stale';
  notes: string;
  isLoggedIn: boolean;
  connectedAt?: string;
}

interface AnomalyItem {
  id: string;
  title: string;
  desc: string;
  reviewed: boolean;
  reviewedBy?: string;
  link?: { text: string; to: string };
}

// Icons
const InstagramIcon: React.FC<{ size?: number; white?: boolean }> = ({ size = 15, white = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    {white ? (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </>
    ) : (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#dq-ig-grad)" />
        <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
        <defs>
          <linearGradient id="dq-ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FED576" />
            <stop offset="0.25" stopColor="#F47133" />
            <stop offset="0.5" stopColor="#BC3081" />
            <stop offset="0.75" stopColor="#4C63D2" />
          </linearGradient>
        </defs>
      </>
    )}
  </svg>
);

const TikTokIcon: React.FC<{ size?: number; white?: boolean }> = ({ size = 15, white = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path
      d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.89 2.897 2.897 0 0 1-2.892-2.89 2.896 2.896 0 0 1 2.892-2.891c.33 0 .647.054.945.153V9.45a6.31 6.31 0 0 0-.945-.072 6.335 6.335 0 0 0-6.337 6.336 6.336 6.336 0 0 0 6.337 6.336 6.336 6.336 0 0 0 6.336-6.336V8.406a8.21 8.21 0 0 0 4.77 1.516V6.686z"
      fill={white ? '#fff' : '#000'}
    />
  </svg>
);

export const DataQualityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);
  const [isRetryingAll, setIsRetryingAll] = useState(false);

  // Modal states for OAuth login & account details
  const [authModalAccount, setAuthModalAccount] = useState<AccountSyncItem | null>(null);
  const [connectedInfoAccount, setConnectedInfoAccount] = useState<AccountSyncItem | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [metaAppId, setMetaAppId] = useState('112849021839210');
  const [oauthSuccessAccount, setOauthSuccessAccount] = useState<string | null>(null);

  const [accounts, setAccounts] = useState<AccountSyncItem[]>([
    {
      id: '1',
      name: 'IG @katapedia.id',
      platform: 'INSTAGRAM',
      candidate: 'Bakal Caleg 01',
      lastSync: '13 Okt, 06:00',
      syncStatus: 'Berhasil',
      quality: 'Complete',
      notes: 'Terhubung resmi via Meta Graph API v21.0',
      isLoggedIn: true,
      connectedAt: '13 Okt 2026, 05:45'
    },
    {
      id: '2',
      name: 'TikTok @katapedia.id',
      platform: 'TIKTOK',
      candidate: 'Bakal Caleg 01',
      lastSync: '13 Okt, 06:00',
      syncStatus: 'Berhasil',
      quality: 'Complete',
      notes: 'Terhubung resmi via TikTok Open API',
      isLoggedIn: true,
      connectedAt: '13 Okt 2026, 05:50'
    },
    {
      id: '3',
      name: 'IG @caleg_dki1_official',
      platform: 'INSTAGRAM',
      candidate: 'Bakal Caleg 07',
      lastSync: '13 Okt, 06:00',
      syncStatus: 'Berhasil',
      quality: 'Complete',
      notes: 'Perlu otorisasi Meta OAuth untuk sync data',
      isLoggedIn: false
    },
    {
      id: '4',
      name: 'IG @relawan_jakarta',
      platform: 'INSTAGRAM',
      candidate: 'Bakal Caleg 12',
      lastSync: '10 Okt, 06:00',
      syncStatus: 'Gagal',
      quality: 'Stale',
      notes: 'Perlu login ulang Instagram untuk akses data',
      isLoggedIn: false
    },
    {
      id: '5',
      name: 'TikTok @relawan_pemuda',
      platform: 'TIKTOK',
      candidate: 'Bakal Caleg 08',
      lastSync: '10 Okt, 06:00',
      syncStatus: 'Retry terjadwal',
      quality: 'Stale',
      notes: 'Akun berstatus Invalid, perlu verifikasi login',
      isLoggedIn: false
    },
    {
      id: '6',
      name: 'TikTok @tim_sukses_caleg',
      platform: 'TIKTOK',
      candidate: 'Bakal Caleg 06',
      lastSync: '13 Okt, 06:00',
      syncStatus: 'Berhasil',
      quality: 'Complete',
      notes: 'Sinkronisasi aktif',
      isLoggedIn: true,
      connectedAt: '12 Okt 2026, 14:20'
    },
  ]);

  useEffect(() => {
    if (searchParams.get('connected') === 'true' || searchParams.get('code')) {
      const handle = searchParams.get('handle') || 'katapedia.id';
      setOauthSuccessAccount(handle);
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === '1' || acc.name.includes(handle)
            ? {
                ...acc,
                isLoggedIn: true,
                syncStatus: 'Berhasil',
                quality: 'Complete',
                lastSync: 'Baru saja',
                notes: 'Terhubung resmi via Meta Graph API v21.0',
                connectedAt: 'Baru saja'
              }
            : acc
        )
      );
      showNotification(`✓ Akun Instagram @${handle} berhasil diotorisasi via Meta OAuth!`);
    }
  }, [searchParams]);

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
    setTimeout(() => setNotification(null), 3500);
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
            ? { ...acc, syncStatus: 'Berhasil', quality: 'Complete', lastSync: 'Baru saja', notes: 'Sinkronisasi data terbaru berhasil' }
            : acc
        )
      );
      showNotification('Data akun berhasil disinkronkan!');
    }, 1000);
  };

  const handleOpenAuthModal = (acc: AccountSyncItem) => {
    setAuthModalAccount(acc);
  };

  const handleConfirmAuth = () => {
    if (!authModalAccount) return;
    setIsAuthorizing(true);

    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === authModalAccount.id
            ? {
                ...acc,
                isLoggedIn: true,
                syncStatus: 'Berhasil',
                quality: 'Complete',
                lastSync: 'Baru saja',
                notes: authModalAccount.platform === 'INSTAGRAM'
                  ? 'Terhubung resmi via Meta Graph API'
                  : 'Terhubung resmi via TikTok Open API',
                connectedAt: 'Baru saja'
              }
            : acc
        )
      );
      setIsAuthorizing(false);
      const accName = authModalAccount.name;
      const isIg = authModalAccount.platform === 'INSTAGRAM';
      setAuthModalAccount(null);
      if (isIg) {
        setOauthSuccessAccount(accName.replace('IG @', ''));
      }
      showNotification(`✓ Berhasil login ${isIg ? 'Instagram' : 'TikTok'}! Akun ${accName} terhubung & sinkronisasi data aktif.`);
    }, 1200);
  };

  const handleDisconnect = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              isLoggedIn: false,
              syncStatus: 'Gagal',
              quality: 'Stale',
              notes: 'Koneksi akun diputus, perlu login kembali'
            }
          : acc
      )
    );
    setConnectedInfoAccount(null);
    showNotification('Koneksi akun telah diputuskan.');
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
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 10000, background: '#17212B', color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#097E52', fontWeight: 'bold' }}>✓</span> {notification}
        </div>
      )}

      {/* MODAL 1: Meta/Instagram & TikTok Authorization Dialog */}
      {authModalAccount && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
            }}
          >
            {/* Branded Header */}
            <div
              style={{
                background: authModalAccount.platform === 'INSTAGRAM'
                  ? 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)'
                  : '#111827',
                color: '#fff',
                padding: '24px 28px',
                textAlign: 'center'
              }}
            >
              <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '14px', marginBottom: '10px' }}>
                {authModalAccount.platform === 'INSTAGRAM' ? (
                  <InstagramIcon size={34} white />
                ) : (
                  <TikTokIcon size={34} white />
                )}
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 700 }}>
                {authModalAccount.platform === 'INSTAGRAM'
                  ? 'Masuk dengan Akun Instagram'
                  : 'Masuk dengan Akun TikTok'}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
                Otorisasi akses resmi untuk Digital Electability Dashboard (DED)
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Account target info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  background: '#F8FAF9',
                  border: '1px solid #E3E7E1',
                  borderRadius: '10px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#0E5A63',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px'
                  }}
                >
                  {authModalAccount.name.charAt(authModalAccount.name.indexOf('@') + 1 || 0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#17212B' }}>
                    {authModalAccount.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>
                    Kandidat: {authModalAccount.candidate} · Akun Profesional
                  </div>
                </div>
              </div>

              {/* Permissions explanation */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#5B6672', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '8px' }}>
                  Izin Akses API yang Diminta ({authModalAccount.platform === 'INSTAGRAM' ? 'Meta' : 'TikTok'}):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#097E52', fontWeight: 700 }}>✓</span>
                    <div>
                      <strong style={{ color: '#17212B' }}>
                        {authModalAccount.platform === 'INSTAGRAM' ? 'instagram_business_basic' : 'user.info.basic'}
                      </strong>
                      <div style={{ fontSize: '12px', color: '#5B6672' }}>
                        Membaca informasi profil, username, foto profil, dan postingan media.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#097E52', fontWeight: 700 }}>✓</span>
                    <div>
                      <strong style={{ color: '#17212B' }}>
                        {authModalAccount.platform === 'INSTAGRAM' ? 'instagram_business_manage_insights' : 'video.list'}
                      </strong>
                      <div style={{ fontSize: '12px', color: '#5B6672' }}>
                        Mengakses metrik tayangan, interaksi (likes, komentar, shares, saves), dan jangkauan audiens.
                      </div>
                    </div>
                  </div>

                  {authModalAccount.platform === 'INSTAGRAM' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#097E52', fontWeight: 700 }}>✓</span>
                        <div>
                          <strong style={{ color: '#17212B' }}>pages_show_list</strong>
                          <div style={{ fontSize: '12px', color: '#5B6672' }}>
                            Mengakses daftar Halaman Facebook yang Anda kelola (endpoint <code>GET /me/accounts</code>) untuk memverifikasi peran Admin dan menampilkan pilihan Halaman yang ingin dihubungkan.
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#097E52', fontWeight: 700 }}>✓</span>
                        <div>
                          <strong style={{ color: '#17212B' }}>pages_read_engagement</strong>
                          <div style={{ fontSize: '12px', color: '#5B6672' }}>
                            Membaca data Halaman Facebook terhubung, jumlah pengikut, dan interaksi postingan resmi untuk membantu Admin mengelola Halaman.
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Managed Pages List via pages_show_list */}
              {authModalAccount.platform === 'INSTAGRAM' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#17212B' }}>
                      Pilih Halaman Facebook yang Dikelola (<code>pages_show_list</code>):
                    </label>
                    <span style={{ fontSize: '11px', color: '#28A745', fontWeight: 600 }}>GET /me/accounts</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ border: '2px solid #0E5A63', borderRadius: '8px', padding: '10px 12px', background: '#F0F9F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#0E5A63' }}>Katapedia Indonesia (Halaman Resmi)</div>
                        <div style={{ fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>
                          ID: 108412891902847 · Terhubung ke Instagram <strong>@katapedia.id</strong> · Peran: Admin
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', background: '#0E5A63', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>Dipilih ✓</span>
                    </div>

                    <div style={{ border: '1px solid #DDE1DA', borderRadius: '8px', padding: '10px 12px', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#3B4651' }}>Caleg DKI 1 Official</div>
                        <div style={{ fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>
                          ID: 109283719283712 · Terhubung ke Instagram <strong>@caleg_dki1_official</strong> · Peran: Admin
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', border: '1px solid #B9C1C9', color: '#5B6672', padding: '2px 8px', borderRadius: '10px' }}>Pilih</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security reassurance */}
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#F0F9F5',
                  border: '1px solid #C6EAD8',
                  color: '#135436',
                  fontSize: '12px',
                  lineHeight: '1.5'
                }}
              >
                🔒 <strong>Aman &amp; Terenkripsi:</strong> DED tidak pernah meminta kata sandi akun Anda. Otorisasi berjalan aman sesuai protokol OAuth resmi.
              </div>

              {/* Official Meta URL block (for recording address bar requirement) */}
              {authModalAccount.platform === 'INSTAGRAM' && (
                <div style={{ padding: '12px', borderRadius: '8px', background: '#F8FAF9', border: '1px solid #E3E7E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#17212B' }}>
                    🌐 Alur Otorisasi Resmi Meta (Bilah Alamat Browser):
                  </div>
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>
                    Meta mensyaratkan saat record layar, browser membuka domain resmi <code>instagram.com</code> / <code>facebook.com</code> dengan bilah URL terlihat:
                  </div>
                  <a
                    href={`https://www.facebook.com/v21.0/dialog/oauth?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(window.location.origin + '/data-quality?connected=true&handle=' + authModalAccount.name.replace(/^(IG|TikTok) @/, ''))}&response_type=code&scope=pages_show_list%2Cpages_read_engagement%2Cinstagram_basic%2Cinstagram_business_basic%2Cinstagram_business_manage_insights`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: '#1877F2',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    Buka Halaman Otorisasi Facebook / Meta ↗
                  </a>
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setAuthModalAccount(null)}
                  disabled={isAuthorizing}
                  style={{
                    flex: '1',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid #DDE1DA',
                    background: '#fff',
                    color: '#3B4651',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAuth}
                  disabled={isAuthorizing}
                  style={{
                    flex: '2',
                    height: '42px',
                    borderRadius: '8px',
                    border: 'none',
                    background: authModalAccount.platform === 'INSTAGRAM'
                      ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                      : '#000',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: isAuthorizing ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  {isAuthorizing ? (
                    <span>Menghubungkan ke API...</span>
                  ) : (
                    <>
                      {authModalAccount.platform === 'INSTAGRAM' ? <InstagramIcon size={16} white /> : <TikTokIcon size={16} white />}
                      <span>Otorisasi &amp; Mulai Sync</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Connected Account Details & Option to Disconnect */}
      {connectedInfoAccount && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEF0EC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {connectedInfoAccount.platform === 'INSTAGRAM' ? <InstagramIcon size={20} /> : <TikTokIcon size={20} />}
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                  Detail Status Akun Terhubung
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConnectedInfoAccount(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#5B6672', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                <span style={{ color: '#5B6672' }}>Nama Akun:</span>
                <strong style={{ color: '#17212B' }}>{connectedInfoAccount.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                <span style={{ color: '#5B6672' }}>Status Autentikasi:</span>
                <span style={{ color: '#1F5E34', fontWeight: 600, background: '#E2F1E6', padding: '2px 8px', borderRadius: '4px' }}>
                  ✓ Sudah Login (Token Aktif)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                <span style={{ color: '#5B6672' }}>Kandidat Terkait:</span>
                <span>{connectedInfoAccount.candidate}</span>
              </div>
              {connectedInfoAccount.platform === 'INSTAGRAM' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                    <span style={{ color: '#5B6672' }}>Halaman FB Terhubung:</span>
                    <strong style={{ color: '#1877F2' }}>Katapedia Indonesia (Halaman Resmi)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                    <span style={{ color: '#5B6672' }}>Pengikut Halaman FB:</span>
                    <span>48.500 pengikut · Jangkauan Aktif</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                    <span style={{ color: '#5B6672' }}>ID Halaman FB:</span>
                    <span style={{ fontFamily: 'monospace', color: '#17212B' }}>108412891902847</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                    <span style={{ color: '#5B6672' }}>Verifikasi Pengelola:</span>
                    <span style={{ color: '#1F5E34', fontWeight: 600, fontSize: '12px' }}>
                      ✓ Terverifikasi Admin via pages_show_list
                    </span>
                  </div>
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F4F6F3', paddingBottom: '8px' }}>
                <span style={{ color: '#5B6672' }}>Izin Meta Aktif:</span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#0E5A63', fontWeight: 600 }}>
                  {connectedInfoAccount.platform === 'INSTAGRAM' ? 'pages_show_list, pages_read_engagement, instagram_basic, insights' : 'user.info.basic, video.list'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                <span style={{ color: '#5B6672' }}>Sinkronisasi Terakhir:</span>
                <span>{connectedInfoAccount.lastSync}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const accId = connectedInfoAccount.id;
                    setConnectedInfoAccount(null);
                    handleRetrySingle(accId);
                  }}
                  style={{
                    flex: 1,
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid #0E5A63',
                    background: '#0E5A63',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sync Ulang Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => handleDisconnect(connectedInfoAccount.id)}
                  style={{
                    height: '38px',
                    padding: '0 14px',
                    borderRadius: '8px',
                    border: '1px solid #FBE4E1',
                    background: '#FFF5F5',
                    color: '#8E2420',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Putuskan Sambungan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Pemantauan</div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Data Quality &amp; Sync Status</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "5px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1F5E34" }}></span> Live Data</span>
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

      {/* OAuth Success Alert Banner */}
      {oauthSuccessAccount && (
        <section
          style={{
            background: "#F0F9F5",
            border: "1px solid #B8DEC0",
            borderRadius: "10px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            boxShadow: "0 2px 8px rgba(14, 90, 99, 0.06)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <InstagramIcon size={28} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#1F5E34" }}>
                ✓ Akun Instagram @{oauthSuccessAccount} Berhasil Diotorisasi via Meta OAuth!
              </div>
              <div style={{ fontSize: "13px", color: "#3B4651", marginTop: "2px" }}>
                Izin <code>instagram_business_basic</code> aktif. Data profil, bio, dan daftar postingan media telah disinkronkan.
              </div>
            </div>
          </div>
          <Link
            to={`/accounts/ACC-0001?handle=${oauthSuccessAccount}`}
            style={{
              background: "#0E5A63",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            Buka Profil &amp; Daftar Media Akun (Sesuai Izin Meta) »
          </Link>
        </section>
      )}

      {/* Metric Summary Cards */}
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

      {/* Main Table: Status sync per akun */}
      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "8px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", padding: "14px 0 10px", alignItems: "baseline" }}>
          <div>
            <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>Status sync per akun</h2>
            <div style={{ fontSize: "12px", color: "#5B6672", marginTop: "2px" }}>
              Otorisasi akun Instagram &amp; TikTok diperlukan sebelum data analitik disinkronkan dari platform resmi.
            </div>
          </div>
          <span style={{ fontSize: "13px", color: "#5B6672" }}>Kegagalan sync tercatat dan dapat dicoba ulang</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "980px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Akun</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Kandidat</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Sync terakhir</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Status sync</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Kualitas data</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA" }}>Catatan</th>
                <th style={{ padding: "12px 10px", borderBottom: "1px solid #DDE1DA", textAlign: "left" }}>Aksi Otorisasi &amp; Sync</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => {
                const isLast = idx === accounts.length - 1;
                const isInstagram = acc.platform === 'INSTAGRAM';
                const canRetry = acc.syncStatus === 'Gagal' || acc.syncStatus === 'Retry terjadwal';

                return (
                  <tr key={acc.id}>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {isInstagram ? <InstagramIcon size={16} /> : <TikTokIcon size={16} />}
                        <Link to={`/accounts/ACC-0001?handle=${acc.name.replace(/^(IG|TikTok) @/, '')}`} style={{ fontWeight: 500, color: '#17212B', textDecoration: 'none' }}>
                          {acc.name}
                        </Link>
                      </div>
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      {acc.candidate}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC", fontSize: "13px" }}>
                      {acc.lastSync}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: acc.syncStatus === 'Berhasil' ? '#E2F1E6' : acc.syncStatus === 'Syncing...' ? '#E0EFF1' : acc.syncStatus === 'Gagal' ? '#FBE4E1' : '#FBEFD6',
                        color: acc.syncStatus === 'Berhasil' ? '#1F5E34' : acc.syncStatus === 'Syncing...' ? '#0B4A52' : acc.syncStatus === 'Gagal' ? '#8E2420' : '#7A4A00',
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {acc.syncStatus}
                      </span>
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        background: acc.quality === 'Complete' ? '#E2F1E6' : acc.quality === 'Partial' ? '#FBEFD6' : acc.quality === 'Insufficient' ? '#E9ECEF' : '#FBE4E1',
                        color: acc.quality === 'Complete' ? '#1F5E34' : acc.quality === 'Partial' ? '#7A4A00' : acc.quality === 'Insufficient' ? '#3B4651' : '#8E2420',
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {acc.quality}
                      </span>
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC", color: "#5B6672", fontSize: "13px" }}>
                      {acc.notes}
                    </td>
                    <td style={{ padding: "12px 10px", borderBottom: isLast ? "none" : "1px solid #EEF0EC", whiteSpace: "nowrap" }}>
                      {acc.isLoggedIn ? (
                        /* ALREADY LOGGED IN: Displays "Sudah Login" badge button + Sync action + View Profile */
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setConnectedInfoAccount(acc)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              height: '32px',
                              padding: '0 12px',
                              borderRadius: '6px',
                              background: '#E2F1E6',
                              border: '1px solid #B8DEC0',
                              color: '#1F5E34',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontFamily: 'inherit'
                            }}
                            title="Klik untuk melihat detail koneksi akun"
                          >
                            {isInstagram ? <InstagramIcon size={14} /> : <TikTokIcon size={14} />}
                            <span>✓ Sudah Login</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRetrySingle(acc.id)}
                            disabled={acc.syncStatus === 'Syncing...'}
                            style={{
                              height: '32px',
                              padding: '0 12px',
                              borderRadius: '6px',
                              border: '1px solid #0E5A63',
                              background: '#fff',
                              color: '#0E5A63',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: acc.syncStatus === 'Syncing...' ? 'wait' : 'pointer',
                              fontFamily: 'inherit'
                            }}
                            title="Sinkronkan data terbaru dari platform"
                          >
                            {acc.syncStatus === 'Syncing...' ? 'Syncing...' : 'Sync'}
                          </button>

                          <Link
                            to={`/accounts/ACC-0001?handle=${acc.name.replace(/^(IG|TikTok) @/, '')}`}
                            style={{
                              height: '32px',
                              padding: '0 10px',
                              borderRadius: '6px',
                              border: '1px solid #0E5A63',
                              background: '#0E5A63',
                              color: '#fff',
                              fontSize: '12px',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              textDecoration: 'none'
                            }}
                            title="Buka profil dan daftar media akun"
                          >
                            Profil &amp; Media »
                          </Link>
                        </div>
                      ) : (
                        /* NOT LOGGED IN: Displays Login button with Instagram or TikTok icon */
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenAuthModal(acc)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              height: '32px',
                              padding: '0 12px',
                              borderRadius: '6px',
                              background: isInstagram
                                ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                                : '#000',
                              border: 'none',
                              color: '#fff',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              fontFamily: 'inherit',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.18)'
                            }}
                            title={isInstagram ? "Login dan otorisasi akun Instagram" : "Login dan otorisasi akun TikTok"}
                          >
                            {isInstagram ? <InstagramIcon size={14} white /> : <TikTokIcon size={14} white />}
                            <span>{isInstagram ? 'Login Instagram' : 'Login TikTok'}</span>
                          </button>

                          {canRetry && (
                            <button
                              type="button"
                              onClick={() => handleRetrySingle(acc.id)}
                              style={{
                                height: '32px',
                                padding: '0 10px',
                                border: '1px solid #DDE1DA',
                                borderRadius: '6px',
                                background: '#fff',
                                color: '#5B6672',
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer'
                              }}
                            >
                              Retry
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Anomaly & AI Review Sections */}
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
                  background: anom.reviewed ? "#E2F1E6" : "#FBEFD6",
                  color: anom.reviewed ? "#1F5E34" : "#7A4A00",
                  fontSize: "12px",
                  fontWeight: "500"
                }}>
                  {anom.reviewed ? "Ditinjau" : "Perlu ditinjau"}
                </span>
                {anom.reviewedBy && (
                  <span style={{ fontSize: "12px", color: "#5B6672" }}>{anom.reviewedBy}</span>
                )}
                {anom.link && (
                  <Link to={anom.link.to} style={{ fontSize: "13px", color: "#0E5A63", fontWeight: "500", textDecoration: "none" }}>
                    {anom.link.text} ›
                  </Link>
                )}
                {!anom.reviewed && (
                  <button
                    type="button"
                    onClick={() => handleReviewAnomaly(anom.id)}
                    style={{ height: "30px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "6px", background: "#fff", color: "#17212B", fontSize: "12px", fontWeight: "500", fontFamily: "inherit", cursor: "pointer" }}
                  >
                    Tandai selesai
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: "1 1 320px", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: "600" }}>Antrean analisis AI</h2>
          <div style={{ fontSize: "13px", color: "#5B6672", lineHeight: "1.5" }}>
            Analisis berjalan asinkron, tidak menghambat tampilan dashboard.
          </div>
          <div style={{ margin: "14px 0", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#5B6672" }}>Dalam antrean</span>
              <span style={{ fontWeight: "600" }}>3</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#5B6672" }}>Sedang diproses</span>
              <span style={{ fontWeight: "600" }}>1</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#5B6672" }}>Selesai (24 jam)</span>
              <span style={{ fontWeight: "600" }}>48</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#5B6672" }}>Gagal (perlu retry)</span>
              <span style={{ fontWeight: "600", color: aiQueueFailed > 0 ? "#8E2420" : "#17212B" }}>{aiQueueFailed}</span>
            </div>
          </div>
          {aiQueueFailed > 0 && (
            <button
              type="button"
              onClick={handleRetryAi}
              style={{ width: "100%", height: "36px", border: "1px solid #8E2420", borderRadius: "8px", background: "#fff", color: "#8E2420", fontSize: "13px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
            >
              Retry antrean gagal
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default DataQualityPage;
