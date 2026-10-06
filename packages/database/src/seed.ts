import { PrismaClient, TenantMode, UserRole, ElectionLevel, CandidateStatus, SocialPlatform, AccountVerificationStatus, DataCoverageStatus, BaselineCategory, RoadmapQuadrant, FindingReviewStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Katapedia DES Database Seed...');

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.aIEvidence.deleteMany();
  await prisma.dESDimensionScore.deleteMany();
  await prisma.dESAssessment.deleteMany();
  await prisma.roadmapItem.deleteMany();
  await prisma.baseline.deleteMany();
  await prisma.contentMetricSnapshot.deleteMany();
  await prisma.content.deleteMany();
  await prisma.platformAccount.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.cohortBenchmark.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // 2. Create Tenants
  const tenantPemilu = await prisma.tenant.create({
    data: {
      slug: 'pemilu-2029',
      name: 'Departemen Pemenangan Pemilu 2029',
      mode: TenantMode.TOKOH_CALEG,
      electionLevelFocus: ElectionLevel.DPR_RI,
      planName: 'Enterprise Political Monitoring',
      isActive: true
    }
  });

  const tenantBrand = await prisma.tenant.create({
    data: {
      slug: 'brand-intelligence',
      name: 'Katapedia Commercial Brand Monitoring',
      mode: TenantMode.PRODUK_BRAND,
      planName: 'Corporate SaaS',
      isActive: true
    }
  });

  // 3. Create Users
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await prisma.user.createMany({
    data: [
      {
        tenantId: tenantPemilu.id,
        email: 'superadmin@katapedia.id',
        name: 'Super Admin Katapedia',
        passwordHash,
        role: UserRole.PLATFORM_SUPERADMIN
      },
      {
        tenantId: tenantPemilu.id,
        email: 'admin@pemilu2029.id',
        name: 'Budi Santoso (Dept Admin)',
        passwordHash,
        role: UserRole.DEPT_ADMIN
      },
      {
        tenantId: tenantPemilu.id,
        email: 'analyst@pemilu2029.id',
        name: 'Siti Rahma (Senior Analyst)',
        passwordHash,
        role: UserRole.ANALYST
      },
      {
        tenantId: tenantPemilu.id,
        email: 'viewer@pemilu2029.id',
        name: 'Tim Monitoring Dapil (Viewer)',
        passwordHash,
        role: UserRole.VIEWER
      }
    ]
  });

  // 4. Create Candidates
  const candidatesData = [
    {
      candidateCode: 'CAND-001',
      name: 'Rangga Pradipta',
      electionLevel: ElectionLevel.DPRD_KAB_KOTA,
      province: 'Jawa Barat',
      regency: 'Kabupaten Bogor',
      dapil: 'Kab. Bogor 3',
      party: 'Partai Pergerakan Rakyat',
      ballotNumber: 1,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.COMPLETE,
      avatarUrl: '/avatars/rangga.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@rangga.bogor', followers: 10400, following: 420, posts: 145 },
        { platform: SocialPlatform.TIKTOK, handle: '@rangga_umkm', followers: 24500, following: 180, posts: 92 }
      ],
      desScore: 3.9,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 4.1, quad: RoadmapQuadrant.PANTAU, findings: 'Mudah ditemukan di IG dan TikTok; profil kampanye 2029 aktif menggantikan akun lama.', evidence: 'Profil @rangga.bogor mencantumkan link bio resmi dan dapil.', count: 4 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 4.5, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Positioning unik dan tajam: "Caleg Pembela UMKM Digital Pedesaan".', evidence: '90% konten menyuarakan advokasi digitalisasi warung dan pasar tradisional.', count: 6 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 4.8, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Asosiasi topik UMKM sangat kuat di obrolan warga dan warung kopi di Dapil.', evidence: 'Warga secara konsisten menyebut isu UMKM saat merespons video Rangga.', count: 8 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 4.4, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Cerita personal ibunya yang pedagang pasar gugur saat pandemi mengikat emosi audiens.', evidence: 'Video cerita asal-usul ditonton lebih dari 150.000 kali dengan sentimen haru/dukungan.', count: 5 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 4.3, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Menemukan winning formula: durasi 30 detik format wawancara pedagang + hook omzet.', evidence: 'Format video omzet tembus 5x di atas baseline views akun.', count: 7 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 4.0, quad: RoadmapQuadrant.PANTAU, findings: 'Kolom komentar interaktif; pertanyaan teknis seputar pelatihan langsung dijawab.', evidence: 'Rata-rata 120 komentar substantif per video reels.', count: 6 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.6, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Rutin merilis laporan transparansi penyaluran bantuan UMKM; tahan serangan negatif.', evidence: 'Dokumen bukti penyaluran program dipublikasikan berkala di sorotan IG.', count: 4 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 3.6, quad: RoadmapQuadrant.PANTAU, findings: 'Jangkauan non-follower stabil, video sering viral di kalangan pedagang kecil.', evidence: '64% views berasal dari non-followers (Reels explore & FYP).', count: 5 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 2.3, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Perhatian digital belum maksimal dikonversi menjadi data anggota relawan fisik.', evidence: 'Baru 40 relawan terdaftar dari 24.000 follower yang aktif.', count: 2 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 3.0, quad: RoadmapQuadrant.TUNDA, findings: 'Tim memiliki SOP dasar, namun proses analitik mingguan masih bergantung pada calon.', evidence: 'Checklist pembuatan video testimoni sudah didelegasikan ke 2 staf muda.', count: 3 }
      ]
    },
    {
      candidateCode: 'CAND-002',
      name: 'Prof. Ridha Dharmajaya',
      electionLevel: ElectionLevel.DPR_RI,
      province: 'Sumatera Utara',
      regency: null,
      dapil: 'Sumatera Utara I',
      party: 'Partai Kebangsaan Harapan',
      ballotNumber: 1,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.COMPLETE,
      avatarUrl: '/avatars/ridha.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@profridhaddarmajaya', followers: 68000, following: 350, posts: 210 },
        { platform: SocialPlatform.TIKTOK, handle: '@profridhadharma', followers: 135000, following: 120, posts: 180 }
      ],
      desScore: 4.5,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 4.8, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Jejak digital masif di Google dan media sosial dengan profil akademisi-politisi.', evidence: 'Pencarian Google memunculkan liputan medis dan kegiatan dapil teratas.', count: 8 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 4.6, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Positioning sebagai "Profesor Kesehatan dan Edukasi Gadget Ramah Keluarga".', evidence: 'Tagar edukasi kesehatan saraf leher menjadi trademark di Medan dan Deli Serdang.', count: 7 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Pemilik isu kesehatan digital: bahaya gadget dan postur generasi muda.', evidence: 'Dikenal luas di Sumut 1 sebagai pakar bedah saraf yang peduli anak muda.', count: 9 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 4.3, quad: RoadmapQuadrant.PANTAU, findings: 'Membawa pesan pencegahan sakit daripada mengobati demi bonus demografi.', evidence: 'Penyampaian hangat dengan gaya mengajar santai disukai ibu-ibu dan mahasiswa.', count: 6 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Konten video "Beban Hidup vs Beban Leher" tembus 2.1M views, "Rebahan" 3.4M views.', evidence: 'Tiga video edukasi saraf mencapai akumulasi lebih dari 9 juta tayangan.', count: 12 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 4.5, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Ribuan konsultasi di kolom komentar ditanggapi secara edukatif.', evidence: 'Interaksi tanya jawab seputar kesehatan leher dan anak gadget sangat tinggi.', count: 10 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.8, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Kredibilitas profesor medis memperkokoh political trust tanpa cela.', evidence: 'Sentimen positif 94%, minim sentimen negatif di seluruh platform.', count: 9 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 4.8, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Distribusi FYP sangat luas melampaui wilayah dapil Sumut I.', evidence: '82% penonton video edukasi berasal dari jangkauan rekomendasi FYP/Reels.', count: 8 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 3.4, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Sebagian besar penonton berada di luar dapil, perlu geofencing ajakan relawan lokal.', evidence: 'Perlu optimalisasi call to action ke posko pemenangan Sumut I.', count: 4 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 4.0, quad: RoadmapQuadrant.PANTAU, findings: 'Tim produksi konten medis sangat produktif dan memiliki jadwal syuting tetap.', evidence: 'Bank konten mingguan tersusun rapi dengan tim editor profesional.', count: 6 }
      ]
    },
    {
      candidateCode: 'CAND-003',
      name: 'Komjen Pol (Purn) Oegroseno',
      electionLevel: ElectionLevel.DPR_RI,
      province: 'DKI Jakarta',
      regency: null,
      dapil: 'DKI Jakarta II',
      party: 'Partai Perubahan Adil',
      ballotNumber: 1,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.COMPLETE,
      avatarUrl: '/avatars/oegroseno.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@oegroseno', followers: 92000, following: 210, posts: 190 },
        { platform: SocialPlatform.TIKTOK, handle: '@oegroseno_resmi', followers: 160000, following: 85, posts: 140 }
      ],
      desScore: 4.7,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Top of mind di media nasional dan jagat digital untuk isu reformasi kepolisian.', evidence: 'Liputan televisi dan reels viral mendominasi hasil pencarian.', count: 11 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Sosok jenderal berintegritas, berani menolak perintah eksekusi yang melanggar hukum.', evidence: 'Karakter keras melawan ketidakadilan melekat kuat di benak pemilih Jakarta.', count: 12 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 4.8, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Isu penegakan hukum imparsial dan reformasi struktural institusi kepolisian.', evidence: 'Seluruh diskusi publik mengasosiasikan beliau dengan keberanian hukum.', count: 10 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Kisah dicopot jabatan karena menolak eksekusi menjadi simbol kejujuran.', evidence: 'Video pengakuan dicopot jabatan menembus 6.9M views di TikTok & IG.', count: 14 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 5.0, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Rekor kinerja konten tertinggi: 6.9M, 1.8M, dan 909K views pada video berani bersuara.', evidence: 'Rasio share dan save sangat masif di kalangan aktivis dan masyarakat umum.', count: 15 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 4.7, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Puluhan ribu komentar hormat dan dukungan moral dari purnawirawan dan generasi muda.', evidence: 'Tingkat interaksi diskusi hukum di kolom komentar luar biasa tinggi.', count: 12 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Reputasi anti-suap dan rekam jejak bersih terkonfirmasi di media arus utama.', evidence: 'Hampir tidak ditemukan narasi kontra yang mampu menggoyahkan kredibilitas.', count: 10 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 4.9, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Algoritma mendorong konten beliau ke jutaan audiens organik di berbagai provinsi.', evidence: 'Non-follower reach mencapai 88% dengan jutaan impression per bulan.', count: 9 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 3.8, quad: RoadmapQuadrant.PANTAU, findings: 'Kekuatan simpati digital siap dikristalisasi menjadi jaringan saksi dan posko.', evidence: 'Telah terbentuk komunitas Relawan Penegak Integritas di Jakarta Selatan & Pusat.', count: 5 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 3.9, quad: RoadmapQuadrant.PANTAU, findings: 'Didukung tim dokumentasi podcast dan wawancara eksklusif terencana.', evidence: 'Studio podcast mini dan tim clipping video bekerja secara reguler.', count: 7 }
      ]
    },
    {
      candidateCode: 'CAND-004',
      name: 'Dr. Tjatur Saptoedy',
      electionLevel: ElectionLevel.DPR_RI,
      province: 'Jawa Tengah',
      regency: null,
      dapil: 'Jawa Tengah VIII',
      party: 'Partai Amanah Sejahtera',
      ballotNumber: 2,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.COMPLETE,
      avatarUrl: '/avatars/tjatur.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@tjatursaptoedy_', followers: 34000, following: 280, posts: 110 },
        { platform: SocialPlatform.TIKTOK, handle: '@tjatur_saptoedy', followers: 48000, following: 95, posts: 84 }
      ],
      desScore: 3.7,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 4.2, quad: RoadmapQuadrant.PANTAU, findings: 'Kehadiran digital konsisten di Cilacap dan Banyumas.', evidence: 'Pencarian nama caleg memunculkan video pendek motivasi dan pertanian.', count: 5 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 3.8, quad: RoadmapQuadrant.PANTAU, findings: 'Positioning ganda antara pakar ekonomi/sukses dan figur kedaulatan pangan desa.', evidence: 'Perlu penegasan apakah lebih condong ke isu beras/tani atau motivasi sukses.', count: 4 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 3.6, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Isu pertanian lokal ("Beras dalam Bahasa Jawa") mendapat respons baik namun belum dominan.', evidence: 'Video seputar beras mendapat 850K views di IG Reels.', count: 5 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 3.9, quad: RoadmapQuadrant.PANTAU, findings: 'Membawa narasi kemakmuran petani melalui keahlian regulasi anggaran.', evidence: 'Cerita kedekatan dengan kelompok tani di Banyumas.', count: 4 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 4.1, quad: RoadmapQuadrant.PANTAU, findings: 'Video "Mau Lebih Sukses?" tembus 1.2M views, video "Beras Jawa" 850K views.', evidence: 'Format video santai duduk di teras berhasil menarik engagement tinggi.', count: 6 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 3.7, quad: RoadmapQuadrant.PANTAU, findings: 'Interaksi hangat dalam bahasa Banyumasan di kolom komentar.', evidence: 'Banyak warga desa menitipkan aspirasi harga gabah.', count: 5 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.2, quad: RoadmapQuadrant.PANTAU, findings: 'Figur akademisi dan mantan legislator yang dipandang santun dan mengayomi.', evidence: 'Tidak ada catatan negatif atau perdebatan panas di media sosial.', count: 4 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 4.0, quad: RoadmapQuadrant.PANTAU, findings: 'Algoritma FYP Jawa Tengah menjangkau pemilih pemula di Cilacap.', evidence: 'Rasio views terhadap follower mencapai 25x pada konten viral.', count: 5 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 2.7, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Konversi ke kelompok tani belum terdata secara terintegrasi via sistem digital.', evidence: 'Form pendaftaran relawan online masih sangat minim terisi.', count: 2 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 3.1, quad: RoadmapQuadrant.TUNDA, findings: 'Jadwal posting mulai teratur namun belum memiliki dashboard evaluasi mingguan mandiri.', evidence: 'Evaluasi konten masih dilakukan secara ad-hoc tanpa matrik terukur.', count: 3 }
      ]
    },
    {
      candidateCode: 'CAND-005',
      name: 'Anisa Wardani, M.Sc',
      electionLevel: ElectionLevel.DPRD_PROVINSI,
      province: 'Jawa Barat',
      regency: null,
      dapil: 'Jawa Barat I (Bandung - Cimahi)',
      party: 'Partai Generasi Hijau',
      ballotNumber: 3,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.PARTIAL,
      avatarUrl: '/avatars/anisa.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@anisa.wardani', followers: 18500, following: 310, posts: 78 },
        { platform: SocialPlatform.TIKTOK, handle: '@anisawardani_id', followers: 29000, following: 140, posts: 55 }
      ],
      desScore: 3.5,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 3.8, quad: RoadmapQuadrant.PANTAU, findings: 'Aktif di kalangan Gen-Z dan pegiat lingkungan Kota Bandung.', evidence: 'Profil linked di akun kampanye kota hijau.', count: 4 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 4.1, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Dikenal sebagai aktivis transportasi publik dan pengelolaan sampah terpadu.', evidence: 'Konten komparasi trotoar dan angkot di Bandung.', count: 5 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 4.3, quad: RoadmapQuadrant.PERTAHANKAN, findings: 'Ownership tinggi pada isu ramah lingkungan dan ruang terbuka hijau.', evidence: 'Sering diundang podcast pemuda untuk isu krisis iklim lokal.', count: 6 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 3.7, quad: RoadmapQuadrant.PANTAU, findings: 'Pengalaman studi luar negeri kembali untuk membenahi kota kelahiran.', evidence: 'Video perbandingan tata kota ditonton 450K kali.', count: 4 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 3.6, quad: RoadmapQuadrant.PANTAU, findings: 'Format infografis dan reels jalan kaki kota Cimahi mendapat perhatian stabil.', evidence: 'Konsisten di atas baseline akun.', count: 4 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 4.0, quad: RoadmapQuadrant.PANTAU, findings: 'Komunitas pesepeda dan pejalan kaki aktif berdiskusi.', evidence: 'Rata-rata 90 komentar solutif.', count: 5 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.2, quad: RoadmapQuadrant.PANTAU, findings: 'Reputasi bersih sebagai akademisi muda.', evidence: 'Sentimen positif 91%.', count: 4 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 3.2, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Jangkauan masih tersegmentasi di Kota Bandung, belum merata ke Cimahi.', evidence: 'Perlu optimalisasi hashtag dan kolaborasi kreator lokal Cimahi.', count: 3 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 2.2, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Belum ada ajakan partisipasi saksi TPS di platform digital.', evidence: 'Link relawan belum aktif di bio TikTok.', count: 1 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 2.8, quad: RoadmapQuadrant.TUNDA, findings: 'Dikerjakan tim sukarelawan tanpa jam kerja tetap.', evidence: 'Jadwal tayang fluktuatif.', count: 2 }
      ]
    },
    {
      candidateCode: 'CAND-006',
      name: 'Hendro Kusumo, S.E.',
      electionLevel: ElectionLevel.DPRD_KAB_KOTA,
      province: 'Jawa Timur',
      regency: 'Kabupaten Sidoarjo',
      dapil: 'Sidoarjo 1',
      party: 'Partai Karya Bangsa',
      ballotNumber: 4,
      status: CandidateStatus.ACTIVE,
      dataCoverage: DataCoverageStatus.PARTIAL,
      avatarUrl: '/avatars/hendro.jpg',
      accounts: [
        { platform: SocialPlatform.INSTAGRAM, handle: '@hendro_sidoarjo', followers: 8200, following: 400, posts: 45 },
        { platform: SocialPlatform.TIKTOK, handle: '@hendrokusumo', followers: 12000, following: 110, posts: 32 }
      ],
      desScore: 3.1,
      scores: [
        { code: 'D01', name: 'Digital Visibility', step: '01', title: 'Be Seen', score: 3.4, quad: RoadmapQuadrant.PANTAU, findings: 'Ditemukan di platform utama, info bio cukup lengkap.', evidence: 'Link alamat kantor relawan di Sidoarjo tercantum.', count: 3 },
        { code: 'D02', name: 'Political Positioning', step: '02', title: 'Be Known', score: 3.0, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Pesan politik masih standar "Mengabdi untuk Rakyat Sidoarjo" tanpa diferensiasi tajam.', evidence: 'Perlu pemfokusan ke isu spesifik (mis. banjir rob atau lapangan kerja vokasi).', count: 2 },
        { code: 'D03', name: 'Issue Ownership', step: '03', title: 'Be Associated', score: 2.9, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Belum ada isu yang dominan diasosiasikan warga ke calon.', evidence: 'Tema postingan berganti-ganti dari olahraga ke seremonial partai.', count: 2 },
        { code: 'D04', name: 'Winning Narrative', step: '04', title: 'Be Remembered', score: 3.2, quad: RoadmapQuadrant.PANTAU, findings: 'Kisah pengusaha lokal merintis dari nol belum dikemas menjadi video cerita berdaya tarik.', evidence: 'Perlu pembuatan video mini-dokumenter.', count: 3 },
        { code: 'D05', name: 'Content Power & Winning Formula', step: '05', title: 'Be Attention-Worthy', score: 3.3, quad: RoadmapQuadrant.PANTAU, findings: 'Views rata-rata 3K - 5K per video, belum ada yang menembus di atas 50K.', evidence: 'Belum menemukan hook pembuka yang memicu rasa ingin tahu.', count: 3 },
        { code: 'D06', name: 'Audience Connection', step: '06', title: 'Be Connected', score: 3.1, quad: RoadmapQuadrant.PANTAU, findings: 'Komentar didominasi teman dekat dan struktur ranting partai.', evidence: 'Belum merambah masyarakat luas non-kader.', count: 2 },
        { code: 'D07', name: 'Digital Trust & Reputation', step: '07', title: 'Be Trusted', score: 4.0, quad: RoadmapQuadrant.PANTAU, findings: 'Tidak ada rekam jejak negatif, hubungan baik dengan warga perumahan.', evidence: 'Sentimen netral-positif stabil.', count: 3 },
        { code: 'D08', name: 'Algorithmic Reach', step: '08', title: 'Be Discovered by More', score: 2.8, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Sebagian besar penonton adalah pengikut sendiri.', evidence: 'Reach non-follower di bawah 20%.', count: 2 },
        { code: 'D09', name: 'Electoral Conversion', step: '09', title: 'Be Chosen', score: 2.5, quad: RoadmapQuadrant.PRIORITAS_UTAMA, findings: 'Kanal komunikasi relawan masih konvensional (tatap muka saja).', evidence: 'Belum ada QR code grup WhatsApp pemenangan di materi sosial.', count: 1 },
        { code: 'D10', name: 'Digital Intelligence & Winning Content Engine', step: '10', title: 'Be Repeatable', score: 2.4, quad: RoadmapQuadrant.TUNDA, findings: 'Belum memiliki tim media sosial khusus; dikelola staf kantor.', evidence: 'Perlu workshop dasar produksi konten.', count: 1 }
      ]
    }
  ];

  // Insert Candidates, Accounts, Assessments, and Roadmaps
  for (const c of candidatesData) {
    const candidate = await prisma.candidate.create({
      data: {
        tenantId: tenantPemilu.id,
        candidateCode: c.candidateCode,
        name: c.name,
        electionLevel: c.electionLevel,
        province: c.province,
        regency: c.regency,
        dapil: c.dapil,
        party: c.party,
        ballotNumber: c.ballotNumber,
        status: c.status,
        dataCoverage: c.dataCoverage,
        avatarUrl: c.avatarUrl,
        lastSyncAt: new Date()
      }
    });

    // Accounts & Content
    for (const acc of c.accounts) {
      const account = await prisma.platformAccount.create({
        data: {
          tenantId: tenantPemilu.id,
          candidateId: candidate.id,
          platform: acc.platform,
          handle: acc.handle,
          profileUrl: acc.platform === SocialPlatform.INSTAGRAM ? `https://instagram.com/${acc.handle.replace('@', '')}` : `https://tiktok.com/@${acc.handle.replace('@', '')}`,
          verificationStatus: AccountVerificationStatus.VERIFIED,
          followersCount: acc.followers,
          followingCount: acc.following,
          totalPostsCount: acc.posts,
          lastSyncAt: new Date()
        }
      });

      // Sample Contents for this account
      const post1 = await prisma.content.create({
        data: {
          tenantId: tenantPemilu.id,
          candidateId: candidate.id,
          accountId: account.id,
          platform: acc.platform,
          platformPostId: `post-${account.id}-1`,
          permalink: `${account.profileUrl}/p/sample1`,
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          caption: `Semangat pagi warga ${candidate.dapil}! Terus berjuang untuk kemajuan bersama dan perbaikan layanan publik.`,
          mediaType: 'VIDEO_REEL',
          durationSeconds: 32,
          views: Math.round(acc.followers * 0.4),
          likes: Math.round(acc.followers * 0.05),
          comments: Math.round(acc.followers * 0.005),
          shares: Math.round(acc.followers * 0.002),
          saves: Math.round(acc.followers * 0.003),
          reach: Math.round(acc.followers * 0.6),
          baselineCategory: BaselineCategory.NEAR_BASELINE,
          topicsJson: JSON.stringify(['aspirasi warga', 'pelayanan publik']),
          sentiment: 'POSITIVE'
        }
      });

      const post2 = await prisma.content.create({
        data: {
          tenantId: tenantPemilu.id,
          candidateId: candidate.id,
          accountId: account.id,
          platform: acc.platform,
          platformPostId: `post-${account.id}-2`,
          permalink: `${account.profileUrl}/p/sample2`,
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          caption: `BONGKAR RAHASIA: Ini solusi konkret mengatasi kendala lapangan di ${candidate.dapil}. Tonton sampai habis!`,
          mediaType: 'VIDEO_REEL',
          durationSeconds: 45,
          views: Math.round(acc.followers * 1.8),
          likes: Math.round(acc.followers * 0.18),
          comments: Math.round(acc.followers * 0.02),
          shares: Math.round(acc.followers * 0.01),
          saves: Math.round(acc.followers * 0.015),
          reach: Math.round(acc.followers * 2.5),
          baselineCategory: BaselineCategory.ABOVE_BASELINE,
          isWinningFormula: true,
          topicsJson: JSON.stringify(['solusi lapangan', 'program unggulan', 'winning formula']),
          sentiment: 'POSITIVE'
        }
      });

      // Metric snapshots
      await prisma.contentMetricSnapshot.create({
        data: {
          contentId: post2.id,
          views: post2.views,
          likes: post2.likes,
          comments: post2.comments,
          shares: post2.shares,
          saves: post2.saves,
          reach: post2.reach
        }
      });
    }

    // Baseline calculation
    await prisma.baseline.create({
      data: {
        tenantId: tenantPemilu.id,
        candidateId: candidate.id,
        periodDays: 90,
        medianViews: 12500,
        medianEngagementRate: 4.8,
        aboveBaselineCount: 8,
        nearBaselineCount: 18,
        belowBaselineCount: 4,
        winningFormulaJson: JSON.stringify(['Durasi 30-45 detik', 'Hook testimoni warga', 'Penyebutan solusi dapil']),
        calculatedAt: new Date()
      }
    });

    // DES Assessment
    const assessment = await prisma.dESAssessment.create({
      data: {
        tenantId: tenantPemilu.id,
        candidateId: candidate.id,
        periodDays: 90,
        overallScore: c.desScore,
        methodologyVersion: 'DES-2026-V1.0',
        dataCoverage: c.dataCoverage,
        evaluatedAt: new Date()
      }
    });

    // DES Dimension Scores & Evidence & Roadmaps
    for (const s of c.scores) {
      const dimScore = await prisma.dESDimensionScore.create({
        data: {
          assessmentId: assessment.id,
          dimensionCode: s.code,
          dimensionName: s.name,
          journeyStep: s.step,
          journeyTitle: s.title,
          score: s.score,
          confidence: 0.88,
          status: 'SUFFICIENT',
          findingsSummary: s.findings,
          reflectiveQuestion: `Pertanyaan Pemandu ${s.name}: Sejauh mana Anda menguasai langkah ${s.step}?`,
          evidenceCount: s.count
        }
      });

      // Evidence item
      await prisma.aIEvidence.create({
        data: {
          assessmentId: assessment.id,
          dimensionScoreId: dimScore.id,
          platform: SocialPlatform.INSTAGRAM,
          sourceUrl: `https://instagram.com/p/ev-${candidate.id}-${s.code}`,
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          evidenceText: s.evidence,
          excerptSnippet: `"...${s.evidence}..."`,
          findingType: s.name,
          reviewStatus: FindingReviewStatus.VERIFIED,
          reviewerNote: 'Divalidasi oleh Senior Analyst via FRD Quality Protocol',
          reviewedAt: new Date()
        }
      });

      // Roadmap item
      const monthAllocation = s.code === 'D01' || s.code === 'D02' 
        ? 'BULAN_1_FONDASI' 
        : (s.code === 'D03' || s.code === 'D04' || s.code === 'D07' ? 'BULAN_2_KEPERCAYAAN' : 'BULAN_3_PERLUASAN');

      await prisma.roadmapItem.create({
        data: {
          tenantId: tenantPemilu.id,
          candidateId: candidate.id,
          dimensionCode: s.code,
          dimensionName: s.name,
          currentScore: s.score,
          targetScore: Math.min(5.0, Number((s.score + 0.8).toFixed(1))),
          quadrant: s.quad,
          month: monthAllocation,
          actionTitle: `Rencana Aksi ${s.name} (${s.title})`,
          actionDescription: `Eksekusi perbaikan indikator ${s.name} berdasarkan evaluasi 90 hari Katapedia's Way.`,
          pic: 'Tim Media Sosial & Relawan Dapil',
          timelineDays: 30,
          kpiIndicator: `Peningkatan skor ${s.name} dari ${s.score} menuju target minimal ${(s.score + 0.8).toFixed(1)}`,
          isCompleted: false
        }
      });
    }
  }

  // 5. Create Cohort Benchmarks for DPR RI & DPRD
  await prisma.cohortBenchmark.createMany({
    data: [
      {
        tenantId: tenantPemilu.id,
        cohortCode: 'COH-DPR-SUMUT1',
        electionLevel: ElectionLevel.DPR_RI,
        dapil: 'Sumatera Utara I',
        totalCandidates: 8,
        medianDESScore: 3.8,
        q1Score: 3.2,
        q3Score: 4.4,
        topPerformingDimension: 'D05',
        dataCoverageRate: 95.0
      },
      {
        tenantId: tenantPemilu.id,
        cohortCode: 'COH-DPR-DKI2',
        electionLevel: ElectionLevel.DPR_RI,
        dapil: 'DKI Jakarta II',
        totalCandidates: 12,
        medianDESScore: 4.1,
        q1Score: 3.6,
        q3Score: 4.6,
        topPerformingDimension: 'D01',
        dataCoverageRate: 98.0
      },
      {
        tenantId: tenantPemilu.id,
        cohortCode: 'COH-DPRD-BOGOR3',
        electionLevel: ElectionLevel.DPRD_KAB_KOTA,
        dapil: 'Kab. Bogor 3',
        totalCandidates: 10,
        medianDESScore: 3.2,
        q1Score: 2.8,
        q3Score: 3.7,
        topPerformingDimension: 'D03',
        dataCoverageRate: 88.0
      }
    ]
  });

  // 6. Audit Log Initial entry
  await prisma.auditLog.create({
    data: {
      tenantId: tenantPemilu.id,
      action: 'SYSTEM_BOOTSTRAP_SEED',
      entity: 'PlatformInit',
      entityId: 'seed-2026',
      detailsJson: JSON.stringify({ message: 'Database initialized with 6 candidates across DPR RI, DPRD Prov, DPRD Kab/Kota and 10 DES dimensions' })
    }
  });

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
