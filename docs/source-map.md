# Source Map — Katapedia DES

Dokumen ini memetakan seluruh modul, kebutuhan domain, metrik, dan aturan bisnis dari dua dokumen rujukan resmi:
1. **[FRD]** `FRD_DED_Digital_Electability_Dashboard_PoC.pdf` (V1.0 – PoC/MVP) — Disimpan di `docs/reference/frd-ded-poc.pdf`
2. **[DES-KW]** `Katapedia's Way #9 - DES.pdf` (Strategi & Roadmap Membangun Kekuatan Caleg Menuju 2029) oleh Deddy Rahman — Disimpan di `docs/reference/katapedia-des.pdf`

---

## 1. Terminologi & Konsep Dasar

| Terminologi | Definisi Resmi Dokumen | Sumber & Halaman | Ketentuan vs Keputusan |
| :--- | :--- | :--- | :--- |
| **DED** | *Digital Electability Dashboard* — platform/aplikasi monitoring internal Departemen Pemenangan Pemilu. | [FRD] Hal. 1, 3 | Ketentuan Eksplisit Sumber |
| **DES** | *Digital Electability Score* — kerangka/metodologi pengukuran 10 dimensi berjenjang perjalanan digital kandidat caleg. | [FRD] Hal. 1, 3, 4; [DES-KW] Hal. 5, 6, 7 | Ketentuan Eksplisit Sumber |
| **Katapedia DES** | Nama integrasi produk B2B SaaS komersial berbasis metodologi DES Katapedia yang mendukung Mode Tokoh (Caleg) & Mode Produk. | PRD Bagian 1, 2 | Keputusan Implementasi Arsitektur |
| **Primary Cohort** | Kelompok pembanding paling relevan: `Election Level + Electoral Area + Dapil`. Lintas level dilarang digabung tanpa konteks! | [FRD] Hal. 5, 7, 8 | Ketentuan Eksplisit Sumber |
| **Self-Baseline** | Perbandingan kinerja kandidat terhadap kinerja historis dirinya sendiri (median views & median engagement). | [FRD] Hal. 4, 6, 8 | Ketentuan Eksplisit Sumber |
| **Evidence-based AI** | Setiap temuan AI wajib menautkan kutipan/ID konten sumber, skor keyakinan, dan model version; tidak mengubah data mentah. | [FRD] Hal. 4, 6, 7, 8 | Ketentuan Eksplisit Sumber |

---

## 2. Pemetaan 10 Dimensi DES (*Digital Electoral Journey*)

Metodologi DES memetakan perjalanan bertahap calon legislatif dari terlihat hingga menjadi sistem pemenangan:

| Kode | Nama Dimensi | Langkah Perjalanan | Pertanyaan Pemandu (*Core Question*) | Indikator Penilaian MVP | Sumber & Halaman |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D01** | **Digital Visibility** | *Be Seen* (Terlihat) | "Apakah orang bisa menemukan saya?" / "Apakah pemilih dapat menemukan Anda?" | Aktivitas, presence di platform utama, konsistensi posting, kelengkapan jejak digital publik. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 11, 22 |
| **D02** | **Political Positioning** | *Be Known* (Dikenal) | "Apakah orang tahu siapa saya & apa yang membedakan saya?" | AI-Assessed: kejelasan identitas, diferensiasi pesan pembeda, konsistensi asosiasi publik. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 12, 22 |
| **D03** | **Issue Ownership** | *Be Associated* (Memiliki Isu) | "Isu apa yang menjadi milik Anda? Apakah orang mengingat saya karena isu tertentu?" | AI-Assessed: frekuensi topik/isu terfokus, konsistensi advokasi, otoritas isu di mata publik. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 13, 22 |
| **D04** | **Winning Narrative** | *Be Remembered* (Memiliki Cerita) | "Apakah saya punya cerita yang layak diingat dan membuat orang ingin mengikuti?" | AI-Assessed: struktur storytelling "mengapa saya maju", keterkaitan pengalaman pribadi, resonansi emosional. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 14, 22 |
| **D05** | **Content Power** | *Be Attention-Worthy* (Menghasilkan Perhatian) | "Apakah saya bisa membuat konten yang berkinerja tinggi (winning formula)?" | Auto-Measured vs Baseline: rasio views/engagement di atas baseline, identifikasi pola konten viral/berulang. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 15, 22 |
| **D06** | **Audience Connection** | *Be Connected* (Terhubung dg Audiens) | "Apakah audiens hanya menonton atau mulai terhubung dan berbicara dua arah?" | Kualitas interaksi komentar, respons balik kandidat, percakapan dua arah, terbentuknya basis komunitas. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 17, 22 |
| **D07** | **Digital Trust & Reputation** | *Be Trusted* (Dipercaya) | "Apakah semakin sering orang melihat saya, semakin mereka percaya?" | Analisis sentimen, rasio pujian vs kritik, bukti atas klaim/transparansi, deteksi serangan/isu negatif. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 18, 22 |
| **D08** | **Algorithmic Reach** | *Be Discovered by More* (Menjangkau Lebih Luas) | "Apakah saya mampu keluar dari lingkaran orang yang sudah mengenal saya (non-follower)?" | Distribusi jangkauan non-follower, performa FYP/Explore, kemampuan konten "travel" di luar basis. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 19, 22 |
| **D09** | **Electoral Conversion** | *Be Chosen* (Menghasilkan Dukungan) | "Apakah perhatian digital mulai berubah menjadi dukungan dan tindakan nyata?" | Corong konversi (Views -> Follower -> Engaged -> Community -> Relawan/Advocate). *(Proxy/Survey bila tersedia)* | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 20, 22 |
| **D10** | **Intelligence & Engine** | *Be Repeatable* (Menjadi Sistem) | "Apakah saya punya sistem untuk tahu apa yang berhasil dan mengulanginya?" | Dashboard analitik rutin, SOP tim kreatif/konten, alur eksperimentasi terstruktur, scaling mesin pemenangan. | [FRD] Hal. 4; [DES-KW] Hal. 7, 10, 21, 22 |

---

## 3. Pemetaan Modul Fungsional FRD ke Arsitektur Monorepo

| ID Modul | Nama Modul FRD | Kebutuhan Utama & Spesifikasi | Modul Kode Monorepo | Sumber & Halaman |
| :--- | :--- | :--- | :--- | :--- |
| **M01** | **Candidate Registry** | Candidate ID unik, level pemilu (DPR RI, DPRD Prov, DPRD Kab/Kota), wilayah, dapil, status (Active, Inactive, Suspended). | `packages/database` (Candidate model), `apps/api/src/modules/candidates` | [FRD] Hal. 3, 5, 10 |
| **M02** | **Electoral Geography** | Hierarki Provinsi → Kabupaten/Kota → Dapil. Filter level & dapil. Pembentukan Primary Cohort. | `packages/database` (ElectoralDistrict, Cohort), `apps/api/src/modules/geography` | [FRD] Hal. 3, 5, 7, 10 |
| **M03** | **Social Account Mgmt** | Akun Instagram & TikTok, handle, URL, verifikasi status (Verified, Pending, Invalid, Inactive), last sync. | `packages/database` (PlatformAccount), `apps/api/src/modules/accounts` | [FRD] Hal. 3, 5, 10 |
| **M04** | **Data Acquisition & Content** | Konten terhubung ke Candidate & Account. Caption, timestamp, media metadata, raw metrics (views, likes, comments, shares, saves). Nilai kosong = *Not Available* (`—`), bukan 0. | `packages/database` (Content, ContentMetricSnapshot), `apps/api/src/modules/contents` & `imports` | [FRD] Hal. 3, 6, 10 |
| **M05** | **Auto-Measured Analytics & Baseline Engine** | Derived metrics terversi. Median views/konten & median engagement/konten. Rolling 30/90/180 hari. Klasifikasi: Above, Near, Below Baseline. | `apps/api/src/modules/analytics`, `apps/api/src/modules/baseline` | [FRD] Hal. 3, 6, 8 |
| **M06** | **AI Content Intelligence** | Ingest caption/transcript/komentar, ekstraksi topik/isu, narasi, positioning, sentimen. Record terpisah dari data mentah. Simpan model version, confidence, evidence IDs. | `apps/api/src/modules/ai`, `packages/database` (AIAssessment, AIEvidence) | [FRD] Hal. 4, 6, 8, 10 |
| **M07** | **DES Analytics** | Pemetaan indikator Auto-Measured + AI-Assessed ke 10 dimensi DES. Status data coverage: *Complete*, *Partial*, *Insufficient*. | `apps/api/src/modules/scoring`, `packages/database` (DESAssessment) | [FRD] Hal. 4, 6, 7, 10 |
| **M08** | **Cohort & Monitoring Dashboard** | Central Monitoring (ringkasan kandidat, anomali, pending review), Candidate Profile (kinerja, radar 10 dimensi, evidence drawer, roadmap 90 hari). | `apps/web/src/pages/dashboard`, `apps/web/src/pages/candidates`, `apps/web/src/pages/roadmap` | [FRD] Hal. 4, 7, 8, 9, 12 |

---

## 4. Matriks Peran dan Hak Akses (RBAC)

Sesuai **FRD Hal. 5 (Tabel Peran dan Hak Akses)**:

| Fitur / Modul | Super Admin | Dept Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: | :---: |
| **Candidate Registry** | CRUD | CRUD | R | R |
| **Account Management** | CRUD | CRUD | R | R |
| **Raw Data** | Full | Full | R | R |
| **AI Findings** | Full | Review / Edit Status | Review | R |
| **Evidence** | Full | Full | Full | R |
| **User Management** | Full | No | No | No |
| **Reports** | Full | Full | Full | R |
| **Audit Log** | Full | R | R | No |

---

## 5. Roadmap 90 Hari & Matriks Prioritas

Sesuai **Katapedia's Way #9 - DES Hal. 26–31**:
1. **Matriks Kuadran Prioritas**:
   - *Skor Rendah, Dampak Tinggi* → **PRIORITAS UTAMA** (mis. Visibility, Trust, Conversion)
   - *Skor Tinggi, Dampak Tinggi* → **PERTAHANKAN** (mis. Issue Ownership)
   - *Skor Tinggi, Dampak Rendah* → **PANTAU** (mis. Winning Narrative)
   - *Skor Rendah, Dampak Rendah* → **TUNDA** (mis. Intelligence Engine tahap awal)
2. **Tahapan 90 Hari**:
   - **Bulan 1 (Fondasi)**: Fokus pada D01 Visibility & D02 Positioning (rapikan profil, satu kalimat positioning).
   - **Bulan 2 (Kepercayaan)**: Fokus pada D03 Issue Ownership, D04 Narrative & D07 Trust (konten isu UMKM/rakyat konsisten, transparansi).
   - **Bulan 3 (Perluasan)**: Fokus pada D06 Audience Connection, D08 Algorithmic Reach & D09 Conversion (komunitas aktif, jangkau non-follower, konversi relawan).
