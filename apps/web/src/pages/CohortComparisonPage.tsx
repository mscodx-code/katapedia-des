import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CohortComparisonPage: React.FC = () => {
  const [cohort, setCohort] = useState('DPR RI · Jawa Barat · Dapil 1');
  const [platform, setPlatform] = useState('Instagram');
  const [period, setPeriod] = useState('90 hari terakhir');
  const [notification, setNotification] = useState<string | null>(null);
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <main style={{ flex: '999 1 560px', minWidth: 0, padding: '28px 36px 48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000, background: '#17212B', color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#0E5A63', fontWeight: 'bold' }}>✓</span> {notification}
        </div>
      )}

      {/* Methodology Modal */}
      {showMethodologyModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 32, 43, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '20px'
          }}
          onClick={() => setShowMethodologyModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              maxWidth: '640px',
              width: '100%',
              padding: '28px 32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#E0EFF1', color: '#0B4A52', fontSize: '12px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>
                  comparison_method v0.1
                </span>
                <h3 style={{ margin: '8px 0 0', fontSize: '20px', fontWeight: 600 }}>Catatan Metodologi Perbandingan Cohort</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMethodologyModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#5B6672' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#3B4651', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#FBEFD6', color: '#5E3900', fontSize: '13px' }}>
                <b>Status: DRAFT (Belum Disetujui Panitia).</b> Hasil perbandingan hanya sebagai bahan pendukung objektif, bukan ranking mutlak atau penentu kelayakan otomatis.
              </div>
              <p style={{ margin: 0 }}>
                Metodologi <b>Cohort Comparison (FR-DES-005)</b> membandingkan performa digital antar caleg pada kelompok setara (level pemilihan, wilayah, dan dapil yang sama) dengan aturan baku:
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><b>Hanya Data Sufficient:</b> Kandidat dengan data kurang dari threshold hari (misal 14 hari) ditampilkan "—" agar tidak merusak perbandingan cohort.</li>
                <li><b>Bebas Ukuran Akun:</b> Mengutamakan rasio efisiensi (views per follower, engagement rate) dan momentum pertumbuhan dibandingkan sekadar jumlah follower mentah.</li>
                <li><b>Tidak Ada Benchmark Lintas Level:</b> Kandidat DPR RI tidak diperbandingkan dengan DPRD Provinsi/Kabupaten karena dinamika audiens berbeda.</li>
                <li><b>Integrasi Data Non-Digital:</b> Panitia wajib memadukan dengan data eksternal seperti survei elektabilitas terverifikasi, struktur jaringan partai, dan integritas caleg.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setShowMethodologyModal(false)}
                style={{ height: '38px', padding: '0 20px', borderRadius: '8px', background: '#0E5A63', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Mengerti &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#5B6672' }}>
            <Link to="/cohorts" style={{ textDecoration: 'none', color: '#0E5A63' }}>Konteks Cohort</Link> › Perbandingan kandidat
          </div>
          <h1 style={{ margin: '2px 0 0', fontSize: '28px', fontWeight: '600' }}>Cohort Comparison</h1>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          <span style={{ padding: '3px 10px', borderRadius: '999px', background: '#E9ECEF', color: '#3B4651', fontSize: '12px', fontWeight: '500' }}>
            Data ilustrasi PoC
          </span>
          <button
            type="button"
            onClick={() => setShowMethodologyModal(true)}
            style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: '1px solid #B9C1C9', background: '#fff', color: '#17212B', fontSize: '14px', fontWeight: '600', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Catatan metodologi
          </button>
          <button
            type="button"
            onClick={() => showNotification('Laporan perbandingan cohort sedang disiapkan untuk diekspor (PDF/Excel)...')}
            style={{ height: '38px', padding: '0 16px', borderRadius: '8px', border: '1px solid #0E5A63', background: '#fff', color: '#0E5A63', fontSize: '14px', fontWeight: '600', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Export laporan perbandingan
          </button>
        </div>
      </header>

      {/* Filters */}
      <section aria-label="Pilihan perbandingan" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '2 1 260px' }}>
          <label htmlFor="m1" style={{ fontSize: '12px', color: '#5B6672' }}>Cohort (level + wilayah + dapil)</label>
          <select
            id="m1"
            value={cohort}
            onChange={(e) => {
              setCohort(e.target.value);
              showNotification(`Memuat cohort: ${e.target.value}`);
            }}
            style={{ height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', background: '#fff', fontSize: '14px', fontFamily: 'inherit' }}
          >
            <option>DPR RI · Jawa Barat · Dapil 1</option>
            <option>DPR RI · Jawa Barat · Dapil 2</option>
            <option>DPRD Provinsi · Jawa Barat · Dapil 1</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 150px' }}>
          <label htmlFor="m2" style={{ fontSize: '12px', color: '#5B6672' }}>Platform</label>
          <select
            id="m2"
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              showNotification(`Beralih ke platform: ${e.target.value}`);
            }}
            style={{ height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', background: '#fff', fontSize: '14px', fontFamily: 'inherit' }}
          >
            <option>Instagram</option>
            <option>TikTok</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1 1 150px' }}>
          <label htmlFor="m3" style={{ fontSize: '12px', color: '#5B6672' }}>Periode (sama untuk semua)</label>
          <select
            id="m3"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              showNotification(`Beralih ke rentang waktu: ${e.target.value}`);
            }}
            style={{ height: '38px', padding: '0 10px', border: '1px solid #B9C1C9', borderRadius: '8px', background: '#fff', fontSize: '14px', fontFamily: 'inherit' }}
          >
            <option>90 hari terakhir</option>
            <option>30 hari terakhir</option>
            <option>180 hari terakhir</option>
          </select>
        </div>
        <div style={{ flex: '2 1 280px', fontSize: '13px', color: '#3B4651', lineHeight: '1.5' }}>
          5 kandidat di cohort ini · <b style={{ fontWeight: '600' }}>4 dapat dibandingkan</b> (Data Sufficient) · 1 belum cukup data
        </div>
      </section>

      {/* Advisory Alert Banner */}
      <div style={{ padding: '14px 18px', borderRadius: '10px', background: '#FBEFD6', color: '#5E3900', fontSize: '14px', lineHeight: '1.55' }}>
        Perbandingan ini adalah bahan pertimbangan, bukan peringkat dan bukan keputusan. Penetapan caleg dan nomor urut tetap oleh panitia, dengan memadukan data non-digital seperti survei elektabilitas, kekuatan struktur, dan penilaian internal. Metodologi: <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '13px' }}>comparison_method v0.1 (draft, belum disetujui)</span>.
      </div>

      {/* Main Comparison Table */}
      <section style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Profil perbandingan · {platform} · {period}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#3B4651' }}>
            <span>
              <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', background: '#0E5A63', marginRight: '6px', verticalAlign: 'middle' }}></span>
              Kandidat (nomor)
            </span>
            <span>
              <span style={{ display: 'inline-block', width: '2px', height: '14px', background: '#17212B', marginRight: '6px', verticalAlign: 'middle' }}></span>
              Median cohort (n=4)
            </span>
          </div>
        </div>
        <p style={{ margin: '4px 0 12px', fontSize: '13px', color: '#5B6672', lineHeight: '1.5' }}>
          Metrik dipilih agar tidak bergantung ukuran akun. Urutan kolom mengikuti Candidate ID, bukan nilai.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '1120px' }}>
            <thead>
              <tr style={{ textAlign: 'left', verticalAlign: 'bottom' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', width: '260px', fontSize: '12px', color: '#5B6672', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Metrik
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right' }}>
                  <Link to="/candidates/CAN-0001" style={{ fontWeight: '600', textDecoration: 'none', color: '#0E5A63' }}>Bakal Caleg 01</Link>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>CAN-0001</div>
                  <span style={{ display: 'inline-block', margin: '4px 0 0', padding: '2px 8px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '11px', fontWeight: '500' }}>Sufficient</span>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right' }}>
                  <Link to="/candidates/CAN-0002" style={{ fontWeight: '600', textDecoration: 'none', color: '#0E5A63' }}>Bakal Caleg 02</Link>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>CAN-0002</div>
                  <span style={{ display: 'inline-block', margin: '4px 0 0', padding: '2px 8px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '11px', fontWeight: '500' }}>Sufficient</span>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right' }}>
                  <Link to="/candidates/CAN-0003" style={{ fontWeight: '600', textDecoration: 'none', color: '#0E5A63' }}>Bakal Caleg 03</Link>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>CAN-0003</div>
                  <span style={{ display: 'inline-block', margin: '4px 0 0', padding: '2px 8px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '11px', fontWeight: '500' }}>Sufficient</span>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right' }}>
                  <Link to="/candidates/CAN-0009" style={{ fontWeight: '600', textDecoration: 'none', color: '#0E5A63' }}>Bakal Caleg 09</Link>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>CAN-0009</div>
                  <span style={{ display: 'inline-block', margin: '4px 0 0', padding: '2px 8px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '11px', fontWeight: '500' }}>Sufficient</span>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', textAlign: 'right', background: '#FAFAF8' }}>
                  <Link to="/candidates/CAN-0010" style={{ fontWeight: '600', textDecoration: 'none', color: '#0E5A63' }}>Bakal Caleg 10</Link>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: '#5B6672', marginTop: '2px' }}>CAN-0010</div>
                  <span style={{ display: 'inline-block', margin: '4px 0 0', padding: '2px 8px', borderRadius: '999px', background: '#E9ECEF', color: '#3B4651', fontSize: '11px', fontWeight: '500' }}>Insufficient</span>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA', width: '260px', fontSize: '12px', color: '#5B6672', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Sebaran cohort
                </th>
              </tr>
            </thead>
            <tbody>
              {/* SKALA */}
              <tr>
                <td colSpan={7} style={{ padding: '12px 10px 6px', fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: '#0E5A63', background: '#F4F8F8' }}>
                  Skala
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Followers</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>31.500</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>22.800</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>12.400</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>41.000</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran followers: kandidat 03 terendah, kandidat 09 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="123" y1="6" x2="123" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="156" cy="17" r="8" />
                      <circle cx="90" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                      <circle cx="228" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="156" y="20">01</text>
                      <text x="90" y="20">02</text>
                      <text x="12" y="20">03</text>
                      <text x="228" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Median views per konten</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>3.100</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>2.400</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>1.250</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>2.600</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran median views: kandidat 03 terendah, kandidat 01 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="158" y1="6" x2="158" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="228" cy="17" r="8" />
                      <circle cx="146" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                      <circle cx="170" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="228" y="20">01</text>
                      <text x="146" y="20">02</text>
                      <text x="12" y="20">03</text>
                      <text x="170" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>

              {/* EFISIENSI */}
              <tr>
                <td colSpan={7} style={{ padding: '12px 10px 6px', fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: '#0E5A63', background: '#F4F8F8' }}>
                  Efisiensi (bebas skala)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  Views per follower
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>median views ÷ followers</div>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>9,8%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>10,5%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>10,1%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>6,3%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran views per follower: kandidat 09 terendah, kandidat 02 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="200" y1="6" x2="200" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="192" cy="17" r="8" />
                      <circle cx="228" cy="17" r="8" />
                      <circle cx="208" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="192" y="20">01</text>
                      <text x="228" y="20">02</text>
                      <text x="208" y="20">03</text>
                      <text x="12" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  Engagement rate
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>engagement ÷ views</div>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>6,8%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>7,1%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>5,2%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>4,4%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran engagement rate: kandidat 09 terendah, kandidat 02 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="140" y1="6" x2="140" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="204" cy="17" r="8" />
                      <circle cx="228" cy="17" r="8" />
                      <circle cx="76" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="204" y="20">01</text>
                      <text x="228" y="20">02</text>
                      <text x="76" y="20">03</text>
                      <text x="12" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>

              {/* MOMENTUM */}
              <tr>
                <td colSpan={7} style={{ padding: '12px 10px 6px', fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: '#0E5A63', background: '#F4F8F8' }}>
                  Momentum
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  Pertumbuhan followers
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>90 hari, dalam persen</div>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>+9,1%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>+6,3%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>+2,1%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>+1,0%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran pertumbuhan followers: kandidat 09 terendah, kandidat 01 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="97" y1="6" x2="97" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="228" cy="17" r="8" />
                      <circle cx="153" cy="17" r="8" />
                      <circle cx="41" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="228" y="20">01</text>
                      <text x="153" y="20">02</text>
                      <text x="41" y="20">03</text>
                      <text x="12" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  Konten Above Baseline
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>terhadap baseline akun sendiri</div>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>34%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>28%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>18%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>22%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran persentase konten Above Baseline: kandidat 03 terendah, kandidat 01 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="106" y1="6" x2="106" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="228" cy="17" r="8" />
                      <circle cx="147" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                      <circle cx="66" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="228" y="20">01</text>
                      <text x="147" y="20">02</text>
                      <text x="12" y="20">03</text>
                      <text x="66" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>

              {/* KONSISTENSI */}
              <tr>
                <td colSpan={7} style={{ padding: '12px 10px 6px', fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: '#0E5A63', background: '#F4F8F8' }}>
                  Konsistensi
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Posting per minggu</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>4,7</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>3,2</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>2,8</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>5,5</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #EEF0EC' }}>
                  <svg viewBox="0 0 240 34" style={{ width: '100%', height: '34px', display: 'block' }} role="img" aria-label="Sebaran posting per minggu: kandidat 03 terendah, kandidat 09 tertinggi">
                    <line x1="12" y1="17" x2="228" y2="17" stroke="#DDE1DA" strokeWidth="2" />
                    <line x1="104" y1="6" x2="104" y2="28" stroke="#17212B" strokeWidth="2" />
                    <g fill="#0E5A63" stroke="#fff" strokeWidth="1.5">
                      <circle cx="164" cy="17" r="8" />
                      <circle cx="44" cy="17" r="8" />
                      <circle cx="12" cy="17" r="8" />
                      <circle cx="228" cy="17" r="8" />
                    </g>
                    <g fontSize="9" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Sans" fontWeight="600">
                      <text x="164" y="20">01</text>
                      <text x="44" y="20">02</text>
                      <text x="12" y="20">03</text>
                      <text x="228" y="20">09</text>
                    </g>
                  </svg>
                </td>
              </tr>

              {/* ISU & REPUTASI */}
              <tr>
                <td colSpan={7} style={{ padding: '12px 10px 6px', fontSize: '12px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: '#0E5A63', background: '#F4F8F8' }}>
                  Isu &amp; reputasi (AI, setelah review manusia)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Temuan Verified</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>2</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right' }}>0</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', fontSize: '13px' }}>
                  <Link to="/ai-findings" style={{ color: '#0E5A63', textDecoration: 'none' }}>Lihat temuan</Link>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>Temuan perlu review / Disputed</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>1</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>0</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>1</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>0</td>
                <td style={{ padding: '10px', textAlign: 'right', color: '#5B6672', background: '#FAFAF8' }}>—</td>
                <td style={{ padding: '10px', fontSize: '13px' }}>
                  <Link to="/ai-findings" style={{ color: '#0E5A63', textDecoration: 'none' }}>Lihat temuan</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '12px', fontSize: '13px', color: '#5B6672', lineHeight: '1.5' }}>
          Bakal Caleg 10 baru memiliki 14 hari data sehingga belum bisa dibandingkan; ditampilkan sebagai "—", bukan nilai rendah. Dengan hanya 4 kandidat yang dapat dibandingkan, selisih kecil tidak bermakna.
        </div>
      </section>

      {/* Candidate Profile Summaries & Guidelines */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
        <section style={{ flex: '3 1 560px', minWidth: 0, background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Ringkasan profil per kandidat</h2>
          <p style={{ margin: '4px 0 14px', fontSize: '13px', color: '#5B6672', lineHeight: '1.5' }}>Dirangkum otomatis dari tabel di atas. Bukan rekomendasi.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <article style={{ flex: '1 1 300px', border: '1px solid #DDE1DA', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/candidates/CAN-0001" style={{ fontWeight: '600', color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 01</Link>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#5B6672' }}>CAN-0001</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
                Pertumbuhan followers dan persentase konten Above Baseline tertinggi dari 4 kandidat yang dapat dibandingkan, dengan ritme posting di atas median.
              </div>
              <div style={{ fontSize: '13px', color: '#7A4A00' }}>Catatan: 1 temuan reputasi menunggu review.</div>
            </article>

            <article style={{ flex: '1 1 300px', border: '1px solid #DDE1DA', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/candidates/CAN-0002" style={{ fontWeight: '600', color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 02</Link>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#5B6672' }}>CAN-0002</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
                Views per follower dan engagement rate tertinggi dengan skala menengah.
              </div>
              <div style={{ fontSize: '13px', color: '#7A4A00' }}>Catatan: frekuensi posting di bawah median cohort.</div>
            </article>

            <article style={{ flex: '1 1 300px', border: '1px solid #DDE1DA', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/candidates/CAN-0003" style={{ fontWeight: '600', color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 03</Link>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#5B6672' }}>CAN-0003</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
                Skala terkecil, tetapi views per follower termasuk tinggi.
              </div>
              <div style={{ fontSize: '13px', color: '#7A4A00' }}>Catatan: engagement rate dan frekuensi posting di bawah median; 1 temuan reputasi perlu review.</div>
            </article>

            <article style={{ flex: '1 1 300px', border: '1px solid #DDE1DA', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/candidates/CAN-0009" style={{ fontWeight: '600', color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 09</Link>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#5B6672' }}>CAN-0009</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
                Skala terbesar dan frekuensi posting tertinggi.
              </div>
              <div style={{ fontSize: '13px', color: '#7A4A00' }}>Catatan: views per follower, engagement rate, dan pertumbuhan followers terendah di cohort.</div>
            </article>

            <article style={{ flex: '1 1 300px', border: '1px dashed #B9C1C9', borderRadius: '8px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#FAFAF8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/candidates/CAN-0010" style={{ fontWeight: '600', color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 10</Link>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', color: '#5B6672' }}>CAN-0010</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
                Belum bisa dibandingkan: baru 14 hari data.
              </div>
              <div style={{ fontSize: '13px', color: '#5B6672' }}>Dapat dibandingkan sekitar 27 Okt 2026 bila sync berjalan normal.</div>
            </article>
          </div>
        </section>

        <section style={{ flex: '2 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '600' }}>Aturan perbandingan</h2>
            <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', lineHeight: '1.5', color: '#3B4651' }}>
              <li>Hanya kandidat Data Sufficient pada platform dan periode yang sama.</li>
              <li>Metrik dipilih agar tidak bergantung ukuran akun.</li>
              <li>Tidak ada benchmark lintas level atau lintas dapil.</li>
              <li>Performa digital bukan elektabilitas dan tidak mencakup survei, struktur, atau sumber daya.</li>
              <li>Setiap ekspor perbandingan tercatat di audit log.</li>
            </ul>
          </div>
          <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '600' }}>Bahan non-digital</h2>
            <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#5B6672', lineHeight: '1.5' }}>Belum terhubung ke DED; dipadukan oleh panitia di luar sistem.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #EEF0EC' }}>
                <span>[Survei elektabilitas dapil]</span>
                <span style={{ color: '#5B6672', fontSize: '13px' }}>belum ada</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #EEF0EC' }}>
                <span>[Kekuatan struktur / jaringan]</span>
                <span style={{ color: '#5B6672', fontSize: '13px' }}>belum ada</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>[Penilaian internal panitia]</span>
                <span style={{ color: '#5B6672', fontSize: '13px' }}>belum ada</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sensitivity Testing / Composite Score */}
      <section style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Skor gabungan (opsional) · uji sensitivitas bobot</h2>
          <span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E9ECEF', color: '#3B4651', fontSize: '12px', fontWeight: '500' }}>Belum aktif</span>
        </div>
        <p style={{ margin: '6px 0 12px', fontSize: '14px', lineHeight: '1.55', color: '#3B4651' }}>
          Skor gabungan baru boleh diaktifkan Super Admin setelah bobot dan ambang ditetapkan dalam dokumen metodologi yang terversi (FR-DES-005). Pratinjau di bawah hanya ilustrasi: tier tiap kandidat di tiga skenario bobot. Kandidat yang tier-nya berubah antar skenario tidak boleh dibedakan secara tegas.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '720px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#5B6672', fontSize: '12px', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Kandidat</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>
                  Skenario A
                  <div style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>skala berbobot besar</div>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>
                  Skenario B
                  <div style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>seimbang</div>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>
                  Skenario C
                  <div style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>efisiensi berbobot besar</div>
                </th>
                <th style={{ padding: '10px', borderBottom: '1px solid #DDE1DA' }}>Stabil di semua skenario?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', fontWeight: 500 }}>
                  <Link to="/candidates/CAN-0001" style={{ color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 01</Link>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Kuat</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Kuat</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Kuat</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  <span style={{ padding: '2px 9px', borderRadius: '999px', background: '#E2F1E6', color: '#1F5E34', fontSize: '12px', fontWeight: 500 }}>Stabil</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', fontWeight: 500 }}>
                  <Link to="/candidates/CAN-0002" style={{ color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 02</Link>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Menengah</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Kuat</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Kuat</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  <span style={{ padding: '2px 9px', borderRadius: '999px', background: '#FBEFD6', color: '#7A4A00', fontSize: '12px', fontWeight: 500 }}>Berubah</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC', fontWeight: 500 }}>
                  <Link to="/candidates/CAN-0003" style={{ color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 03</Link>
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Perlu penguatan</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Menengah</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>Menengah</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #EEF0EC' }}>
                  <span style={{ padding: '2px 9px', borderRadius: '999px', background: '#FBEFD6', color: '#7A4A00', fontSize: '12px', fontWeight: 500 }}>Berubah</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', fontWeight: 500 }}>
                  <Link to="/candidates/CAN-0009" style={{ color: '#0E5A63', textDecoration: 'none' }}>Bakal Caleg 09</Link>
                </td>
                <td style={{ padding: '10px' }}>Kuat</td>
                <td style={{ padding: '10px' }}>Menengah</td>
                <td style={{ padding: '10px' }}>Perlu penguatan</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ padding: '2px 9px', borderRadius: '999px', background: '#FBEFD6', color: '#7A4A00', fontSize: '12px', fontWeight: 500 }}>Berubah</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default CohortComparisonPage;
