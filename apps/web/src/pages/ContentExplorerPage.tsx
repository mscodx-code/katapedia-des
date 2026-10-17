import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  format: string;
  candidate: string;
  candidateId: string;
  platform: 'Instagram' | 'TikTok';
  date: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  baseline: 'Above' | 'Below' | 'Near';
  topic: string;
  aiStatus: 'Selesai' | 'Dalam antrean' | 'Belum ada transkrip';
}

const initialContents: ContentItem[] = [
  {
    id: 'CNT-0001',
    title: 'Kunjungan ke pasar tradisional',
    format: 'Video · 0:42',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram',
    date: '2 Okt',
    views: '11.800',
    likes: '940',
    comments: '128',
    shares: '76',
    saves: 'N/A',
    baseline: 'Above',
    topic: 'Ekonomi warga',
    aiStatus: 'Selesai'
  },
  {
    id: 'CNT-0002',
    title: 'Ucapan hari besar',
    format: 'Foto',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram',
    date: '28 Sep',
    views: '620',
    likes: '74',
    comments: '5',
    shares: '2',
    saves: 'N/A',
    baseline: 'Below',
    topic: 'Ucapan / seremonial',
    aiStatus: 'Selesai'
  },
  {
    id: 'CNT-0003',
    title: 'Dialog warga soal layanan kesehatan',
    format: 'Video · 1:05',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'TikTok',
    date: '21 Sep',
    views: '9.400',
    likes: '810',
    comments: '203',
    shares: '95',
    saves: '41',
    baseline: 'Above',
    topic: 'Layanan kesehatan',
    aiStatus: 'Selesai'
  },
  {
    id: 'CNT-0004',
    title: 'Pengumuman agenda kegiatan',
    format: 'Video · 0:15',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'TikTok',
    date: '17 Sep',
    views: '840',
    likes: '52',
    comments: '9',
    shares: '3',
    saves: '1',
    baseline: 'Below',
    topic: 'Agenda / informasi',
    aiStatus: 'Selesai'
  },
  {
    id: 'CNT-0005',
    title: 'Cerita singkat perjalanan karier',
    format: 'Carousel · 8 slide',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram',
    date: '9 Sep',
    views: '7.200',
    likes: '620',
    comments: '87',
    shares: '44',
    saves: 'N/A',
    baseline: 'Above',
    topic: 'Narasi personal',
    aiStatus: 'Selesai'
  },
  {
    id: 'CNT-0006',
    title: 'Tanya jawab program kerja',
    format: 'Video · 2:10',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'TikTok',
    date: '3 Sep',
    views: '3.050',
    likes: '240',
    comments: '58',
    shares: '12',
    saves: '9',
    baseline: 'Near',
    topic: 'Program kerja',
    aiStatus: 'Belum ada transkrip'
  },
  {
    id: 'CNT-0007',
    title: 'Repost liputan media',
    format: 'Foto',
    candidate: 'Bakal Caleg 01',
    candidateId: 'CAN-0001',
    platform: 'Instagram',
    date: '5 Sep',
    views: '1.050',
    likes: '88',
    comments: '11',
    shares: '4',
    saves: 'N/A',
    baseline: 'Below',
    topic: 'Pemberitaan',
    aiStatus: 'Dalam antrean'
  }
];

export const ContentExplorerPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [platformFilter, setPlatformFilter] = useState('Semua platform');
  const [formatFilter, setFormatFilter] = useState('Semua format');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredContents = initialContents.filter(item => {
    const matchPlat = platformFilter === 'Semua platform' || platformFilter === 'Instagram & TikTok' || item.platform === platformFilter;
    const matchFormat = formatFilter === 'Semua format' || item.format.toLowerCase().includes(formatFilter.toLowerCase().replace('video / reels', 'video'));
    return matchPlat && matchFormat;
  });

  return (
    <main style={{ flex: "999 1 560px", minWidth: 0, padding: "28px 36px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
      {toastMessage && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0E5A63', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontSize: '14px', fontWeight: 500 }}>
          {toastMessage}
        </div>
      )}

      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Pemantauan</div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Content Explorer</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E9ECEF", color: "#3B4651", fontSize: "12px", fontWeight: "500" }}>Data ilustrasi PoC</span>
          <button 
            type="button" 
            onClick={() => showToast('Ekspor CSV konten berhasil diunduh.')}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
          >
            Export CSV
          </button>
        </div>
      </header>

      <section aria-label="Filter konten" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end", background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "16px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 170px" }}>
          <label htmlFor="c1" style={{ fontSize: "12px", color: "#5B6672" }}>Kandidat</label>
          <select id="c1" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Bakal Caleg 01</option>
            <option>Semua kandidat</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="c2" style={{ fontSize: "12px", color: "#5B6672" }}>Platform</label>
          <select 
            id="c2" 
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua platform</option>
            <option>Instagram &amp; TikTok</option>
            <option>Instagram</option>
            <option>TikTok</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="c3" style={{ fontSize: "12px", color: "#5B6672" }}>Periode</label>
          <select id="c3" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>90 hari terakhir</option>
            <option>30 hari terakhir</option>
            <option>180 hari terakhir</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 140px" }}>
          <label htmlFor="c4" style={{ fontSize: "12px", color: "#5B6672" }}>Format</label>
          <select 
            id="c4" 
            value={formatFilter}
            onChange={e => setFormatFilter(e.target.value)}
            style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}
          >
            <option>Semua format</option>
            <option>Video / Reels</option>
            <option>Foto</option>
            <option>Carousel</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="c5" style={{ fontSize: "12px", color: "#5B6672" }}>Posisi vs baseline</label>
          <select id="c5" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua</option>
            <option>Above Baseline</option>
            <option>Near Baseline</option>
            <option>Below Baseline</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="c6" style={{ fontSize: "12px", color: "#5B6672" }}>Topik / isu (AI)</label>
          <select id="c6" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua topik</option>
            <option>Layanan kesehatan</option>
            <option>Ekonomi warga</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
          <label htmlFor="c7" style={{ fontSize: "12px", color: "#5B6672" }}>Status analisis AI</label>
          <select id="c7" style={{ height: "38px", padding: "0 10px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "14px", fontFamily: "inherit" }}>
            <option>Semua</option>
            <option>Sudah dianalisis</option>
            <option>Dalam antrean</option>
            <option>Belum ada transkrip</option>
          </select>
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #DDE1DA", borderRadius: "10px", padding: "8px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px", padding: "14px 0 8px" }}>
          <div style={{ fontSize: "14px", color: "#3B4651" }}>{filteredContents.length} konten · Bakal Caleg 01 · 90 hari terakhir</div>
          <div role="group" aria-label="Tampilan" style={{ display: "flex", gap: "4px", background: "#E9ECEF", padding: "4px", borderRadius: "10px" }}>
            <button 
              type="button" 
              onClick={() => setViewMode('table')}
              style={{ 
                height: "32px", 
                padding: "0 14px", 
                border: "0", 
                borderRadius: "7px", 
                background: viewMode === 'table' ? "#fff" : "transparent", 
                color: viewMode === 'table' ? "#17212B" : "#3B4651", 
                fontWeight: viewMode === 'table' ? "600" : "400", 
                fontSize: "13px", 
                fontFamily: "inherit", 
                cursor: "pointer" 
              }}
            >
              Tabel
            </button>
            <button 
              type="button" 
              onClick={() => setViewMode('card')}
              style={{ 
                height: "32px", 
                padding: "0 14px", 
                border: "0", 
                borderRadius: "7px", 
                background: viewMode === 'card' ? "#fff" : "transparent", 
                color: viewMode === 'card' ? "#17212B" : "#3B4651", 
                fontWeight: viewMode === 'card' ? "600" : "400", 
                fontSize: "13px", 
                fontFamily: "inherit", 
                cursor: "pointer" 
              }}
            >
              Kartu
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "1040px" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#5B6672", fontSize: "12px", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Konten</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Platform</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Dipublikasi</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Views</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Likes</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Komentar</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Shares</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA", textAlign: "right" }}>Saves</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>vs baseline</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Topik (AI)</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #DDE1DA" }}>Analisis AI</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map(c => (
                  <tr key={c.id}>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>
                      <Link to={`/contents/${c.id}`} style={{ display: "flex", gap: "10px", alignItems: "center", textDecoration: "none", color: "#17212B" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#E3E7E1", flex: "none", display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                          {c.platform === 'Instagram' ? '📸' : '🎵'}
                        </div>
                        <div>
                          <div style={{ fontWeight: "500", color: "#0E5A63" }}>{c.title}</div>
                          <div style={{ fontSize: "12px", color: "#5B6672" }}>{c.format}</div>
                        </div>
                      </Link>
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>{c.platform}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>{c.date}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right", fontWeight: 500 }}>{c.views}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>{c.likes}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>{c.comments}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right" }}>{c.shares}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC", textAlign: "right", color: "#5B6672" }}>{c.saves}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "2px 9px",
                        borderRadius: "999px",
                        background: c.baseline === 'Above' ? "#E0EFF1" : c.baseline === 'Near' ? "#E9ECEF" : "#FBEFD6",
                        color: c.baseline === 'Above' ? "#0B4A52" : c.baseline === 'Near' ? "#3B4651" : "#7A4A00",
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {c.baseline}
                      </span>
                    </td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>{c.topic}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #EEF0EC" }}>
                      <span style={{
                        padding: "2px 9px",
                        borderRadius: "999px",
                        background: c.aiStatus === 'Selesai' ? "#E2F1E6" : c.aiStatus === 'Dalam antrean' ? "#E0EFF1" : "#FBEFD6",
                        color: c.aiStatus === 'Selesai' ? "#1F5E34" : c.aiStatus === 'Dalam antrean' ? "#0B4A52" : "#7A4A00",
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {c.aiStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginTop: '8px' }}>
            {filteredContents.map(c => (
              <div key={c.id} style={{ border: '1px solid #DDE1DA', borderRadius: '10px', padding: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#E3E7E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      {c.platform === 'Instagram' ? '📸' : '🎵'}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#5B6672' }}>{c.platform} · {c.date}</div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#3B4651' }}>{c.format}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: c.baseline === 'Above' ? '#E0EFF1' : c.baseline === 'Near' ? '#E9ECEF' : '#FBEFD6',
                    color: c.baseline === 'Above' ? '#0B4A52' : c.baseline === 'Near' ? '#3B4651' : '#7A4A00',
                    fontSize: '11px',
                    fontWeight: 500
                  }}>
                    {c.baseline}
                  </span>
                </div>
                <Link to={`/contents/${c.id}`} style={{ fontSize: '15px', fontWeight: 600, color: '#17212B', textDecoration: 'none' }}>
                  {c.title}
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #EEF0EC', paddingTop: '10px', fontSize: '13px' }}>
                  <div>Views: <b>{c.views}</b></div>
                  <div>Likes: <b>{c.likes}</b></div>
                  <div>Komentar: <b>{c.comments}</b></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ color: '#5B6672' }}>{c.topic}</span>
                  <Link to={`/contents/${c.id}`} style={{ color: '#0E5A63', fontWeight: 500 }}>
                    Buka detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", paddingTop: "16px", fontSize: "13px", color: "#5B6672" }}>
          <span>Menampilkan 1–{filteredContents.length} dari {filteredContents.length} konten</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Sebelumnya</button>
            <button type="button" style={{ height: "36px", padding: "0 14px", border: "1px solid #B9C1C9", borderRadius: "8px", background: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Berikutnya</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContentExplorerPage;
