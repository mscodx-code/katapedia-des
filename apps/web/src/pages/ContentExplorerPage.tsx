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

interface PublicHashtagMedia {
  id: string;
  caption: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  likeCount: number;
  commentCount: number;
  sentiment: 'Positif' | 'Netral' | 'Kritis';
  sentimentScore: number;
  timestamp: string;
  permalink: string;
  thumbnailUrl: string;
}

const mockHashtagData: Record<string, {
  hashtagId: string;
  totalPosts: string;
  sentimentSummary: { positive: number; neutral: number; negative: number };
  aiInsight: string;
  posts: PublicHashtagMedia[];
}> = {
  'PasarTradisional': {
    hashtagId: '1784382910291044',
    totalPosts: '14.280 postingan publik',
    sentimentSummary: { positive: 68, neutral: 24, negative: 8 },
    aiInsight: 'Sentimen publik didominasi aspirasi positif terkait pemulihan ekonomi lokal, stabilisasi harga komoditas pangan, dan revitalisasi fasilitas pasar rakyat.',
    posts: [
      {
        id: 'IG-PUB-9821',
        caption: 'Suasana pagi di pasar tradisional, warga antusias menyambut dialog program stabilitas pangan dan bantuan modal pedagang kecil. #PasarTradisional #PilkadaDamai #EkonomiWarga',
        mediaType: 'VIDEO',
        likeCount: 1420,
        commentCount: 185,
        sentiment: 'Positif',
        sentimentScore: 0.88,
        timestamp: '3 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example1/',
        thumbnailUrl: '🏪'
      },
      {
        id: 'IG-PUB-9822',
        caption: 'Bazar sembako murah dan produk olahan UMKM lokal ramai dikunjungi ibu-ibu hari ini. Akses modal dan tempat bersih jadi harapan utama. #PasarTradisional #UMKMBisa',
        mediaType: 'IMAGE',
        likeCount: 2150,
        commentCount: 320,
        sentiment: 'Positif',
        sentimentScore: 0.94,
        timestamp: '6 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example2/',
        thumbnailUrl: '🛒'
      },
      {
        id: 'IG-PUB-9823',
        caption: 'Diskusi bersama paguyuban pedagang mengenai sistem retribusi kebersihan dan pemilahan sampah di los buah. Semoga ditindaklanjuti. #PasarTradisional',
        mediaType: 'CAROUSEL_ALBUM',
        likeCount: 890,
        commentCount: 94,
        sentiment: 'Netral',
        sentimentScore: 0.52,
        timestamp: '12 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example3/',
        thumbnailUrl: '🍎'
      },
      {
        id: 'IG-PUB-9824',
        caption: 'Masukan dari pengunjung soal becek saat hujan di area timur pasar. Perlu perbaikan saluran drainase segera agar nyaman berbelanja. #PasarTradisional',
        mediaType: 'IMAGE',
        likeCount: 640,
        commentCount: 112,
        sentiment: 'Kritis',
        sentimentScore: 0.21,
        timestamp: '1 hari yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example4/',
        thumbnailUrl: '🌧️'
      }
    ]
  },
  'PilkadaDamai': {
    hashtagId: '1784159023481029',
    totalPosts: '28.940 postingan publik',
    sentimentSummary: { positive: 76, neutral: 19, negative: 5 },
    aiInsight: 'Antusiasme publik sangat tinggi menyuarakan komitmen kampanye santun, edukatif, dan menghindari provokasi demi persatuan daerah.',
    posts: [
      {
        id: 'IG-PUB-7711',
        caption: 'Deklarasi bersama pemilih muda untuk pesta demokrasi yang rukun dan adil. Mari jaga ruang digital tetap sehat! #PilkadaDamai #SuaraPemuda',
        mediaType: 'VIDEO',
        likeCount: 3410,
        commentCount: 412,
        sentiment: 'Positif',
        sentimentScore: 0.92,
        timestamp: '4 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example5/',
        thumbnailUrl: '🤝'
      },
      {
        id: 'IG-PUB-7712',
        caption: 'Sosialisasi tata cara pengecekan DPT online di balai warga agar tidak kehilangan hak pilih. #PilkadaDamai #EdukasiWarga',
        mediaType: 'CAROUSEL_ALBUM',
        likeCount: 1250,
        commentCount: 98,
        sentiment: 'Positif',
        sentimentScore: 0.85,
        timestamp: '10 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example6/',
        thumbnailUrl: '🗳️'
      }
    ]
  },
  'UMKMBisa': {
    hashtagId: '1784910284729110',
    totalPosts: '9.820 postingan publik',
    sentimentSummary: { positive: 72, neutral: 22, negative: 6 },
    aiInsight: 'Pelaku usaha mikro merespons positif program pelatihan digital marketing, kemudahan sertifikasi halal, dan akses pameran daerah.',
    posts: [
      {
        id: 'IG-PUB-4401',
        caption: 'Workshop digitalisasi kemasan produk lokal desa binaan bersama mentor wirausaha muda. #UMKMBisa #EkonomiKreatif',
        mediaType: 'IMAGE',
        likeCount: 1890,
        commentCount: 145,
        sentiment: 'Positif',
        sentimentScore: 0.89,
        timestamp: '5 jam yang lalu',
        permalink: 'https://www.instagram.com/p/DB-example7/',
        thumbnailUrl: '📦'
      }
    ]
  }
};

export const ContentExplorerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hashtag_public' | 'internal'>('hashtag_public');
  const [selectedHashtag, setSelectedHashtag] = useState('PasarTradisional');
  const [hashtagInput, setHashtagInput] = useState('PasarTradisional');
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [platformFilter, setPlatformFilter] = useState('Semua platform');
  const [formatFilter, setFormatFilter] = useState('Semua format');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Content Publishing Modal States
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishMediaType, setPublishMediaType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [publishCaption, setPublishCaption] = useState(
    'Kunjungan dialog bersama paguyuban pedagang pasar tradisional pagi ini. Program stabilisasi harga kebutuhan pokok dan revitalisasi fasilitas menjadi prioritas bersama! #PasarTradisional #PilkadaDamai #EkonomiWarga'
  );
  const [publishMediaUrl, setPublishMediaUrl] = useState('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'creating_container' | 'publishing' | 'success'>('idle');
  const [publishedMediaId, setPublishedMediaId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublishContent = () => {
    setPublishStatus('creating_container');
    setTimeout(() => {
      setPublishStatus('publishing');
      setTimeout(() => {
        setPublishStatus('success');
        setPublishedMediaId('18049281092830192');
        showToast('✓ Postingan berhasil dipublikasikan ke Instagram @katapedia.id!');
      }, 1200);
    }, 1000);
  };

  const handleResetPublishModal = () => {
    setIsPublishModalOpen(false);
    setPublishStatus('idle');
    setPublishedMediaId(null);
  };

  const handleSearchHashtag = (tag: string) => {
    const cleanTag = tag.replace(/^#/, '').trim();
    setIsSearching(true);
    setHashtagInput(cleanTag);
    setTimeout(() => {
      setSelectedHashtag(cleanTag);
      setIsSearching(false);
      showToast(`Berhasil mengambil data publik Instagram untuk #${cleanTag}`);
    }, 400);
  };

  const currentHashtagInfo = mockHashtagData[selectedHashtag] || {
    hashtagId: '1784000000000000',
    totalPosts: '3.420 postingan publik',
    sentimentSummary: { positive: 60, neutral: 30, negative: 10 },
    aiInsight: `Analisis agregat sentimen publik terhadap topik #${selectedHashtag} menunjukkan respons aktif dari masyarakat luas.`,
    posts: [
      {
        id: 'IG-PUB-CUSTOM',
        caption: `Konten publik terbaru terkait agenda dan topik #${selectedHashtag}. Membahas aspirasi publik dan interaksi komunitas warga.`,
        mediaType: 'IMAGE' as const,
        likeCount: 520,
        commentCount: 42,
        sentiment: 'Positif' as const,
        sentimentScore: 0.75,
        timestamp: '1 jam yang lalu',
        permalink: 'https://www.instagram.com/',
        thumbnailUrl: '📌'
      }
    ]
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

      {/* MODAL: INSTAGRAM CONTENT PUBLISHING */}
      {isPublishModalOpen && (
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
              maxWidth: '560px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEF0EC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>📸</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#17212B' }}>
                    Publikasikan Postingan ke Instagram
                  </h3>
                  <div style={{ fontSize: '12px', color: '#5B6672' }}>
                    Akun: <strong style={{ color: '#0E5A63' }}>@katapedia.id</strong> · Izin: <code>instagram_business_content_publish</code>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetPublishModal}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#5B6672', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {publishStatus === 'success' ? (
                /* Success View */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#E2F1E6', color: '#1F5E34', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1F5E34' }}>
                      Postingan Berhasil Dipublikasikan ke Instagram!
                    </h4>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#5B6672', lineHeight: 1.5 }}>
                      Konten telah tayang di feed akun resmi <strong>@katapedia.id</strong> melalui endpoint resmi Meta Graph API.
                    </p>
                  </div>

                  <div style={{ background: '#F8F9FA', border: '1px solid #E9ECEF', borderRadius: '8px', padding: '12px', fontSize: '12px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div><strong>Media ID Instagram:</strong> <code style={{ color: '#0E5A63' }}>{publishedMediaId}</code></div>
                    <div><strong>Status API:</strong> <span style={{ color: '#28A745', fontWeight: 600 }}>200 OK (PUBLISHED)</span></div>
                    <div><strong>Tipe Konten:</strong> {publishMediaType === 'IMAGE' ? 'Foto Feed' : 'Video Reels'}</div>
                    <div><strong>Waktu Rilis:</strong> Baru saja (Live)</div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <a
                      href="https://www.instagram.com/katapedia.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        height: '42px',
                        borderRadius: '8px',
                        background: '#0E5A63',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      Buka di Instagram ↗
                    </a>
                    <button
                      type="button"
                      onClick={handleResetPublishModal}
                      style={{
                        flex: 1,
                        height: '42px',
                        borderRadius: '8px',
                        border: '1px solid #B9C1C9',
                        background: '#fff',
                        color: '#17212B',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <>
                  {/* Endpoint Explanation */}
                  <div style={{ background: '#F0F9F5', border: '1px solid #C6EAD8', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#135436' }}>
                    <strong>Alur Meta Content Publishing API:</strong><br />
                    1. <code>POST /17841405392019481/media</code> (Membuat Container Media)<br />
                    2. <code>POST /17841405392019481/media_publish</code> (Mempublikasikan Container ke Feed)
                  </div>

                  {/* Format Selector */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#17212B' }}>Format Konten:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => setPublishMediaType('IMAGE')}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: publishMediaType === 'IMAGE' ? '2px solid #0E5A63' : '1px solid #DDE1DA',
                          background: publishMediaType === 'IMAGE' ? '#E0EFF1' : '#fff',
                          color: publishMediaType === 'IMAGE' ? '#0B4A52' : '#3B4651',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        🖼️ Foto Feed (Single Image)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPublishMediaType('VIDEO')}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: publishMediaType === 'VIDEO' ? '2px solid #0E5A63' : '1px solid #DDE1DA',
                          background: publishMediaType === 'VIDEO' ? '#E0EFF1' : '#fff',
                          color: publishMediaType === 'VIDEO' ? '#0B4A52' : '#3B4651',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        🎬 Video Reels (Vertical)
                      </button>
                    </div>
                  </div>

                  {/* Media URL */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#17212B' }}>
                      {publishMediaType === 'IMAGE' ? 'URL Gambar Publik (image_url):' : 'URL Video Publik (video_url):'}
                    </label>
                    <input
                      type="text"
                      value={publishMediaUrl}
                      onChange={(e) => setPublishMediaUrl(e.target.value)}
                      style={{
                        height: '38px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: '1px solid #B9C1C9',
                        fontSize: '13px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  {/* Caption Field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#17212B' }}>Caption Postingan (caption):</label>
                      <span style={{ fontSize: '11px', color: '#5B6672' }}>{publishCaption.length} / 2200 karakter</span>
                    </div>
                    <textarea
                      rows={4}
                      value={publishCaption}
                      onChange={(e) => setPublishCaption(e.target.value)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #B9C1C9',
                        fontSize: '13px',
                        fontFamily: 'inherit',
                        lineHeight: 1.45,
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Publishing Status Progress Bar */}
                  {publishStatus !== 'idle' && (
                    <div style={{ padding: '12px', background: '#F8FAF9', borderRadius: '8px', border: '1px solid #E3E7E1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#0E5A63', fontWeight: 500 }}>
                      <span style={{ fontSize: '16px' }}>⏳</span>
                      {publishStatus === 'creating_container' && 'Tahap 1/2: Membuat Media Container di Instagram...'}
                      {publishStatus === 'publishing' && 'Tahap 2/2: Mempublikasikan Container ke Feed @katapedia.id...'}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={handleResetPublishModal}
                      disabled={publishStatus !== 'idle'}
                      style={{
                        flex: 1,
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
                      onClick={handlePublishContent}
                      disabled={publishStatus !== 'idle' || !publishCaption.trim()}
                      style={{
                        flex: 2,
                        height: '42px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: publishStatus !== 'idle' ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(188, 24, 136, 0.25)'
                      }}
                    >
                      {publishStatus === 'idle' ? 'Publikasikan ke Instagram Feed' : 'Memproses Publikasi API...'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "13px", color: "#5B6672" }}>Pemantauan &amp; Analisis Konten</div>
          <h1 style={{ margin: "2px 0 0", fontSize: "28px", fontWeight: "600" }}>Content Explorer &amp; Public Hashtags</h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#E2F1E6", color: "#1F5E34", fontSize: "12px", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1F5E34" }}></span> Live Data
          </span>
          <button 
            type="button" 
            onClick={() => setIsPublishModalOpen(true)}
            style={{ 
              height: "38px", 
              padding: "0 16px", 
              borderRadius: "8px", 
              border: "none", 
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", 
              color: "#fff", 
              fontSize: "13px", 
              fontWeight: "600", 
              fontFamily: "inherit", 
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 8px rgba(188, 24, 136, 0.2)"
            }}
          >
            <span>+ Buat &amp; Publikasikan Postingan</span>
            <span style={{ fontSize: "11px", background: "rgba(255,255,255,0.25)", padding: "1px 6px", borderRadius: "10px" }}>IG API</span>
          </button>
          <button 
            type="button" 
            onClick={() => showToast('Ekspor data berhasil diunduh.')}
            style={{ height: "38px", padding: "0 16px", borderRadius: "8px", border: "1px solid #0E5A63", background: "#fff", color: "#0E5A63", fontSize: "14px", fontWeight: "600", fontFamily: "inherit", cursor: "pointer" }}
          >
            Export CSV
          </button>
        </div>
      </header>

      {/* Mode / Feature Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #DDE1DA', paddingBottom: '0px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('hashtag_public')}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'hashtag_public' ? '3px solid #0E5A63' : '3px solid transparent',
            color: activeTab === 'hashtag_public' ? '#0E5A63' : '#5B6672',
            fontWeight: activeTab === 'hashtag_public' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '-2px'
          }}
        >
          <span>🏷️ Tagar Publik Instagram</span>
          <span style={{ fontSize: '11px', background: activeTab === 'hashtag_public' ? '#E0EFF1' : '#E9ECEF', color: activeTab === 'hashtag_public' ? '#0B4A52' : '#5B6672', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
            Public Content Access
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('internal')}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'internal' ? '3px solid #0E5A63' : '3px solid transparent',
            color: activeTab === 'internal' ? '#0E5A63' : '#5B6672',
            fontWeight: activeTab === 'internal' ? 700 : 500,
            fontSize: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '-2px'
          }}
        >
          <span>👤 Konten Akun Resmi</span>
          <span style={{ fontSize: '11px', background: '#E9ECEF', color: '#5B6672', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
            Media Terhubung
          </span>
        </button>
      </div>

      {activeTab === 'hashtag_public' ? (
        /* ================== TAB 1: INSTAGRAM PUBLIC CONTENT ACCESS ================== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Card with Policy Compliance */}
          <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '12px', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>📊</span>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#14202B' }}>
                    Pencarian Tagar &amp; Analisis Sentimen Publik Instagram
                  </h2>
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#5B6672', maxWidth: '820px', lineHeight: 1.5 }}>
                  Memantau tagar kampanye publik melalui endpoint resmi <strong>Instagram Graph API (/ig_hashtag_search &amp; /top_media)</strong> untuk memahami respon warga, mengukur sentimen publik secara agregat, dan mendeteksi aspirasi komunitas tanpa melanggar privasi pengguna.
                </p>
              </div>
              <div style={{ background: '#F0F9F5', border: '1px solid #B8E4D0', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#1B5B3A', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: 600 }}>🛡️ Kepatuhan Ketentuan Meta:</span>
                <span>• Hanya data agregat &amp; anonim</span>
                <span>• Tidak ada profiling data pribadi (PII)</span>
                <span>• Sesuai kebijakan Instagram Public Content</span>
              </div>
            </div>

            {/* Search Box & Pre-set Hashtags */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EEF0EC', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 320px', position: 'relative' }}>
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearchHashtag(hashtagInput); }}
                  placeholder="Ketik tagar kampanye (contoh: PasarTradisional, PilkadaDamai)..."
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 16px 0 40px',
                    borderRadius: '8px',
                    border: '1px solid #B9C1C9',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ position: 'absolute', left: '14px', top: '12px', fontSize: '16px', color: '#8794A2' }}>#</span>
              </div>
              <button
                type="button"
                onClick={() => handleSearchHashtag(hashtagInput)}
                disabled={isSearching}
                style={{
                  height: '44px',
                  padding: '0 24px',
                  borderRadius: '8px',
                  background: '#0E5A63',
                  color: '#fff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isSearching ? 'Mengambil Data...' : 'Cari Tagar Publik'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginLeft: 'auto' }}>
                <span style={{ fontSize: '12px', color: '#5B6672', fontWeight: 500 }}>Tagar Rekomendasi:</span>
                {['PasarTradisional', 'PilkadaDamai', 'UMKMBisa'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSearchHashtag(tag)}
                    style={{
                      height: '32px',
                      padding: '0 12px',
                      borderRadius: '16px',
                      border: selectedHashtag === tag ? '1px solid #0E5A63' : '1px solid #DDE1DA',
                      background: selectedHashtag === tag ? '#E0EFF1' : '#fff',
                      color: selectedHashtag === tag ? '#0B4A52' : '#3B4651',
                      fontSize: '12px',
                      fontWeight: selectedHashtag === tag ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* API Request & Hashtag ID Info */}
            <div style={{ marginTop: '16px', padding: '10px 14px', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '12px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#28A745', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, fontSize: '10px' }}>GET</span>
                <code style={{ color: '#2B3B4C', fontFamily: 'monospace' }}>
                  /v19.0/ig_hashtag_search?q={selectedHashtag} &amp; /{currentHashtagInfo.hashtagId}/top_media
                </code>
              </div>
              <div style={{ color: '#5B6672' }}>
                Hashtag ID: <strong style={{ color: '#14202B' }}>{currentHashtagInfo.hashtagId}</strong> · Status: <span style={{ color: '#28A745', fontWeight: 600 }}>200 OK (Live Meta API)</span>
              </div>
            </div>
          </div>

          {/* Aggregated Analytics & AI Sentiment Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '18px 20px' }}>
              <div style={{ fontSize: '13px', color: '#5B6672' }}>Total Postingan Publik Terpantau</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color: '#14202B', margin: '6px 0 2px' }}>
                {currentHashtagInfo.totalPosts}
              </div>
              <div style={{ fontSize: '12px', color: '#1B5B3A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>↑ 18.4%</span> dalam 7 hari terakhir
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '18px 20px' }}>
              <div style={{ fontSize: '13px', color: '#5B6672' }}>Distribusi Sentimen Publik (AI Analysis)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
                <div style={{ flex: 1, height: '10px', background: '#E9ECEF', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${currentHashtagInfo.sentimentSummary.positive}%`, background: '#28A745' }} title="Positif"></div>
                  <div style={{ width: `${currentHashtagInfo.sentimentSummary.neutral}%`, background: '#6C757D' }} title="Netral"></div>
                  <div style={{ width: `${currentHashtagInfo.sentimentSummary.negative}%`, background: '#DC3545' }} title="Kritis"></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5B6672' }}>
                <span style={{ color: '#1F5E34', fontWeight: 600 }}>Positif: {currentHashtagInfo.sentimentSummary.positive}%</span>
                <span>Netral: {currentHashtagInfo.sentimentSummary.neutral}%</span>
                <span style={{ color: '#A02020', fontWeight: 600 }}>Kritis: {currentHashtagInfo.sentimentSummary.negative}%</span>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '10px', padding: '18px 20px', gridColumn: 'span 1' }}>
              <div style={{ fontSize: '13px', color: '#5B6672' }}>Ringkasan Aspirasi Publik (NLP Insight)</div>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#3B4651', lineHeight: 1.45 }}>
                {currentHashtagInfo.aiInsight}
              </p>
            </div>
          </div>

          {/* Public Media Feed Grid */}
          <div style={{ background: '#fff', border: '1px solid #DDE1DA', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                  Postingan Publik Terpopuler (#{selectedHashtag})
                </h3>
                <div style={{ fontSize: '13px', color: '#5B6672', marginTop: '2px' }}>
                  Konten publik terdeteksi dari endpoint <code>/{currentHashtagInfo.hashtagId}/top_media</code>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => showToast('Memperbarui data postingan publik...')}
                  style={{ height: '34px', padding: '0 14px', borderRadius: '6px', border: '1px solid #B9C1C9', background: '#fff', fontSize: '13px', cursor: 'pointer' }}
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {currentHashtagInfo.posts.map((post) => (
                <div key={post.id} style={{ border: '1px solid #DDE1DA', borderRadius: '10px', padding: '16px', background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{post.thumbnailUrl}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, background: '#E0EFF1', color: '#0B4A52', padding: '2px 8px', borderRadius: '4px' }}>
                        {post.mediaType}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: post.sentiment === 'Positif' ? '#E2F1E6' : post.sentiment === 'Netral' ? '#E9ECEF' : '#FBEFD6',
                      color: post.sentiment === 'Positif' ? '#1F5E34' : post.sentiment === 'Netral' ? '#3B4651' : '#7A4A00'
                    }}>
                      {post.sentiment} ({(post.sentimentScore * 100).toFixed(0)}%)
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '13px', color: '#17212B', lineHeight: 1.5, flex: 1 }}>
                    {post.caption}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #E9ECEF', fontSize: '12px', color: '#5B6672' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span>❤️ <strong>{post.likeCount.toLocaleString()}</strong></span>
                      <span>💬 <strong>{post.commentCount.toLocaleString()}</strong></span>
                    </div>
                    <span>{post.timestamp}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#8794A2' }}>ID: {post.id}</span>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { e.preventDefault(); showToast('Membuka tautan publik Instagram di tab baru...'); }}
                      style={{ fontSize: '12px', color: '#0E5A63', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Buka di Instagram ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================== TAB 2: INTERNAL CANDIDATE CONTENTS ================== */
        <>
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
        </>
      )}
    </main>
  );
};

export default ContentExplorerPage;
