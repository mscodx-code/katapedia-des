# PRD Teknis — Katapedia DES

## Platform Web untuk Analisis Brand Tokoh dan Produk

| Informasi             | Nilai                                                        |
| --------------------- | ------------------------------------------------------------ |
| Nama kerja platform   | **Katapedia DES**                                            |
| Versi dokumen         | 0.9 — spesifikasi teknis; rujukan PDF belum terverifikasi    |
| Tanggal               | 6 Oktober 2026                                               |
| Jenis produk          | SaaS B2B dengan pemisahan data setiap klien                  |
| Platform              | Web application                                              |
| Frontend              | Vite, React, TypeScript                                      |
| Backend               | Node.js, Fastify, Prisma                                     |
| Database              | PostgreSQL                                                   |
| Repository            | Monorepo                                                     |
| Deployment            | Docker Compose                                               |
| Pengguna utama        | Brand owner, administrator klien, analis, dan owner platform |
| Bahasa antarmuka awal | Bahasa Indonesia                                             |
| Target pengembangan   | Google Antigravity                                           |

---

## 1. Kedudukan dokumen dan rujukan

Dokumen ini menetapkan arsitektur, pengalaman pengguna, struktur modul, keamanan
akses, kontrak API, deployment, dan kriteria penerimaan berdasarkan kebutuhan
pengguna.

Dua dokumen berikut wajib menjadi sumber kebutuhan domain:

1. `FRD_DED_Digital_Electability_Dashboard_PoC.pdf`.
2. `Katapedia's Way #9 - DES.pdf`.

**Isi kedua PDF belum dapat diverifikasi ketika PRD ini disusun.** Oleh karena
itu:

- Nama **Katapedia DES** merupakan nama kerja yang diusulkan.
- Kepanjangan DES, dimensi penilaian, formula, bobot, dan interpretasi skor
  wajib diambil dari PDF.
- Kode warna dan penggunaan logo Katapedia wajib diambil dari PDF.
- Modul analitik dalam PRD ini merupakan rancangan awal yang harus dipetakan
  terhadap FRD.
- Formula contoh, data simulasi, dan rancangan tambahan tidak boleh diklaim
  sebagai metodologi resmi Katapedia.

Instruksi eksplisit pengguna menjadi dasar keputusan teknologi. Kebutuhan domain
mengikuti FRD dan dokumen Katapedia setelah keduanya dibaca.

### 1.1 Langkah awal wajib di Antigravity

Simpan salinan sumber pada:

```text
docs/reference/frd-ded-poc.pdf
docs/reference/katapedia-des.pdf
```

Sebelum mengimplementasikan scoring dan menetapkan identitas visual final,
Antigravity wajib:

1. Membaca seluruh halaman kedua PDF.
2. Memetakan kebutuhan, indikator, formula, batasan PoC, dan contoh perhitungan.
3. Memeriksa halaman secara visual untuk logo, warna, dan hierarki desain.
4. Menghasilkan:
   - `docs/source-map.md`.
   - `docs/methodology.md`.
   - `docs/brand-guidelines.md`.
   - `packages/design-tokens/src/katapedia.ts`.
5. Menyebutkan sumber dan nomor halaman untuk setiap kebutuhan yang berasal dari
   PDF.
6. Membedakan ketentuan eksplisit sumber dengan keputusan implementasi.

Jika formula tidak dijelaskan lengkap, pengembangan autentikasi, tenant, UI,
impor data, API, dan analitik dasar tetap dilanjutkan. Scoring resmi harus
menampilkan status belum tersedia sampai metodologinya jelas.

---

## 2. Visi produk

Membangun platform profesional yang membantu pemilik brand memahami percakapan
digital, perkembangan persepsi, kinerja brand, dan posisi terhadap pembanding
melalui dashboard yang dapat ditelusuri ke data sumber.

Platform digunakan untuk dua jenis brand:

| Jenis                  | Contoh penggunaan                                              |
| ---------------------- | -------------------------------------------------------------- |
| Tokoh                  | Memantau percakapan dan persepsi digital mengenai figur publik |
| Produk atau organisasi | Memantau reputasi, percakapan pelanggan, dan kinerja brand     |

Mode tokoh dan produk berbagi infrastruktur. Terminologi, indikator, dan scoring
mengikuti profil metodologi masing-masing.

Skor digital harus dijelaskan sesuai metodologi sumber. Skor tidak otomatis
berarti persentase suara, pangsa pasar, atau probabilitas kemenangan.

### 2.1 Prinsip produk

- Dashboard mudah dipahami oleh brand owner.
- Analisis dapat ditelusuri ke bukti.
- Data setiap klien terpisah.
- Semua aksi yang ditampilkan memiliki fungsi nyata.
- Data simulasi memiliki penanda yang jelas.
- Kegagalan AI tidak menghentikan dashboard dan analitik dasar.
- Data tidak tersedia ditampilkan sebagai tidak tersedia, bukan angka nol.

---

## 3. Ruang lingkup

### 3.1 MVP komersial

| Area        | Kebutuhan                                                      |
| ----------- | -------------------------------------------------------------- |
| Akses       | Login, logout, pemulihan akun, pengelolaan sesi                |
| Klien       | Tenant, status layanan, paket, kuota                           |
| RBAC        | Role platform dan role dalam tenant                            |
| Brand       | Profil brand utama dan brand pembanding                        |
| Monitoring  | Kata kunci, alias, pengecualian, periode                       |
| Data        | Impor CSV, validasi, deduplikasi, riwayat pemrosesan           |
| Analitik    | Volume percakapan, tren, sentimen, distribusi sumber           |
| Dashboard   | Tampilan ringkas untuk owner dan detail untuk analis           |
| Scoring     | Engine deterministik mengikuti PDF yang telah diverifikasi     |
| AI          | Klasifikasi, ringkasan, dan tanya jawab atas data terotorisasi |
| Laporan     | Laporan tersimpan, ekspor agregat, unduhan                     |
| Operasional | Audit, status pekerjaan, kesehatan konektor                    |
| Deployment  | Docker, migrasi, backup, dokumentasi operasional               |

Daftar ini harus direkonsiliasi dengan FRD pada tahap awal. Fitur yang
diwajibkan FRD masuk backlog MVP dengan pemetaan sumber.

### 3.2 Pengembangan berikutnya

- Integrasi sumber data melalui API resmi atau penyedia data.
- Laporan terjadwal.
- Notifikasi email.
- Peta agregat apabila data lokasi tersedia dan dapat dipertanggungjawabkan.
- SSO.
- MFA untuk seluruh pengguna.
- Penyimpanan berkas berbasis S3.
- Integrasi pembayaran.
- White label yang lebih luas.
- Ekspansi worker sesuai kebutuhan volume data.

### 3.3 Batas awal

MVP menggunakan impor CSV sebagai jalur data yang dapat berjalan tanpa
kredensial eksternal. Integrasi otomatis mengikuti FRD, ketersediaan API,
kredensial, dan hak akses data.

Konektor tanpa kredensial harus berstatus belum terhubung. Aplikasi tidak boleh
membuat data seolah berasal dari konektor aktif.

---

## 4. Arsitektur sistem

Gunakan **modular monolith** untuk backend, dengan frontend dan backend dalam
satu monorepo.

Worker merupakan proses background dari platform backend yang sama. Worker
menggunakan modul dan image backend, bukan menjadi platform bisnis ketiga.

```mermaid
flowchart TB
    User["Pengguna web"] --> Web["Frontend Vite dan React"]
    Web --> API["REST API Fastify"]
    API --> DB["PostgreSQL"]
    API --> Queue["Redis dan antrean"]
    API --> Files["Penyimpanan berkas"]
    Queue --> Worker["Backend worker"]
    Worker --> DB
    Worker --> Files
    Worker --> AI["Adapter AI"]
    AI --> Local["Ollama"]
    AI --> Cloud["OpenAI"]
```

### 4.1 Batas tanggung jawab

| Komponen           | Tanggung jawab                                              |
| ------------------ | ----------------------------------------------------------- |
| Frontend           | Tampilan, navigasi, form, state interaksi, konsumsi API     |
| API                | Autentikasi, RBAC, validasi, logika bisnis, akses data      |
| Worker             | Impor, klasifikasi AI, agregasi, scoring, pembuatan laporan |
| PostgreSQL         | Data bisnis dan histori                                     |
| Redis              | Antrean pekerjaan dan cache yang dapat dibangun ulang       |
| Penyimpanan berkas | Upload sementara dan hasil ekspor                           |
| AI adapter         | Menyamakan kontrak aplikasi dengan provider AI              |

Frontend tidak boleh mengakses database atau provider AI secara langsung.

---

## 5. Stack teknologi

### 5.1 Frontend

| Kebutuhan    | Pilihan                       |
| ------------ | ----------------------------- |
| Build tool   | Vite                          |
| Framework    | React                         |
| Bahasa       | TypeScript dengan strict mode |
| Styling      | Tailwind CSS                  |
| Komponen UI  | shadcn/ui                     |
| Routing      | React Router                  |
| Server state | TanStack Query                |
| Tabel        | TanStack Table                |
| Form         | React Hook Form               |
| Validasi     | Zod                           |
| Grafik       | Apache ECharts                |
| Ikon         | Lucide React                  |
| Pengujian UI | Playwright                    |
| Unit test    | Vitest                        |

Tailwind CSS dan shadcn/ui dipilih sebagai dasar UI yang dapat disesuaikan
dengan identitas Katapedia. Keduanya memiliki panduan integrasi dengan Vite.

Komponen domain yang perlu dibuat:

```text
AppShell
TenantSwitcher
BrandSwitcher
GlobalFilterBar
MetricCard
TrendChart
SentimentDistribution
SourceDistribution
MentionTable
MentionDetailDrawer
ScoreBreakdown
EvidenceList
ProcessingStatus
EmptyState
PermissionGate
```

`PermissionGate` mengatur tampilan. Pemeriksaan otorisasi tetap wajib dilakukan
oleh backend.

### 5.2 Backend

| Kebutuhan         | Pilihan                           |
| ----------------- | --------------------------------- |
| Runtime           | Node.js 24 LTS                    |
| Bahasa            | TypeScript, ESM                   |
| HTTP framework    | Fastify                           |
| ORM               | Prisma                            |
| Driver PostgreSQL | pg dan adapter Prisma yang sesuai |
| Validasi          | Zod dengan integrasi Fastify      |
| Dokumentasi       | OpenAPI dan Swagger               |
| Log               | Pino                              |
| Antrean           | BullMQ                            |
| Database          | PostgreSQL                        |
| Penyimpanan awal  | Volume persisten Docker           |
| Pengujian         | Vitest dan Fastify inject         |

Node.js 24 dipilih sebagai baseline LTS. Versi patch harus dikunci ketika
repository dibuat.

Gunakan satu major Prisma yang dipilih secara eksplisit dan kunci versi CLI,
client, dan adapter agar kompatibel. Jika menggunakan Prisma 7, konfigurasi
koneksi dan adapter PostgreSQL harus mengikuti dokumentasi major tersebut.

### 5.3 Monorepo

Gunakan:

- pnpm workspaces.
- Turborepo untuk menjalankan build dan pemeriksaan dependensi.
- ESLint dan Prettier.
- Lockfile yang dikomit.
- Versi package manager yang dikunci melalui `packageManager`.

Hindari penggunaan tag `latest` untuk deployment yang sudah dirilis.

---

## 6. Struktur repository

| Lokasi                   | Isi                                       |
| ------------------------ | ----------------------------------------- |
| `apps/web`               | Frontend Vite–React                       |
| `apps/api`               | REST API dan entry point worker           |
| `packages/contracts`     | Schema request, response, dan tipe publik |
| `packages/database`      | Prisma schema, migrasi, client, seed      |
| `packages/ui`            | Komponen UI bersama                       |
| `packages/design-tokens` | Identitas visual Katapedia                |
| `packages/config`        | Konfigurasi lint dan TypeScript           |
| `docs/reference`         | Salinan sumber PDF                        |
| `docs`                   | Metodologi, arsitektur, API, runbook      |
| `docker`                 | Dockerfile dan konfigurasi Nginx          |
| `scripts`                | Bootstrap, backup, restore, pemeriksaan   |
| `tests/e2e`              | Pengujian alur pengguna                   |
| `tests/fixtures`         | Data pengujian dan simulasi               |

Berkas root minimum:

```text
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
turbo.json
.env.example
compose.yml
compose.ai.yml
compose.external-db.yml
README.md
```

Frontend hanya boleh mengimpor kontrak publik. Package database, secret, dan
modul backend tidak boleh masuk ke bundle frontend.

---

## 7. Struktur modular backend

Setiap modul memiliki folder utama sendiri.

Contoh:

```text
apps/api/src/modules/brands/
  brands.routes.ts
  brands.controller.ts
  brands.service.ts
  brands.repository.ts
  brands.schema.ts
  brands.permissions.ts
  brands.types.ts
  brands.test.ts
```

Untuk modul dengan proses background:

```text
apps/api/src/modules/imports/
  imports.routes.ts
  imports.controller.ts
  imports.service.ts
  imports.repository.ts
  imports.schema.ts
  imports.processor.ts
  imports.jobs.ts
  imports.types.ts
```

### 7.1 Tanggung jawab lapisan

| Lapisan     | Tanggung jawab                            |
| ----------- | ----------------------------------------- |
| Routes      | Endpoint, schema, autentikasi, permission |
| Controller  | Membaca input HTTP dan membentuk response |
| Service     | Aturan bisnis dan orkestrasi transaksi    |
| Repository  | Query Prisma dengan cakupan tenant        |
| Schema      | Validasi request dan response             |
| Processor   | Eksekusi pekerjaan background             |
| Permissions | Permission yang digunakan modul           |

Controller tidak boleh berisi query Prisma langsung.

### 7.2 Modul minimum

```text
auth
users
tenants
memberships
roles
permissions
brands
monitoring
sources
imports
mentions
annotations
analytics
scoring
ai
reports
exports
jobs
notifications
audit
usage
settings
health
```

Modul saling berkomunikasi melalui service publik. Hindari mengakses repository
internal modul lain langsung dari controller.

---

## 8. Model tenant dan pemisahan data

### 8.1 Hierarki

```text
Platform
  Tenant
    Anggota dan role
    Brand utama dan pembanding
    Konfigurasi monitoring
    Data percakapan
    Analitik
    Skor
    Laporan
```

Satu pengguna dapat menjadi anggota lebih dari satu tenant.

Brand pembanding merupakan objek monitoring di dalam tenant yang sama. Brand
tersebut tidak memberi akses ke data tenant lain yang mungkin merupakan klien
platform.

### 8.2 Aturan wajib

1. Semua data bisnis memiliki `tenantId`.
2. Tenant dari URL atau header harus diverifikasi terhadap membership aktif.
3. Resource diperiksa menggunakan ID dan tenant secara bersamaan.
4. Relasi antarresource harus mempertahankan tenant yang sama.
5. Queue job membawa `tenantId`, resource ID, dan konteks pekerjaan.
6. Cache key memuat tenant, brand, filter, dan versi data.
7. Berkas hasil ekspor memiliki namespace tenant.
8. Unduhan memeriksa kembali akses pengguna.
9. Penggantian tenant membersihkan cache dan state frontend yang terkait tenant
   sebelumnya.
10. Query lintas tenant hanya tersedia pada service platform yang ditentukan.

### 8.3 Pertahanan pada database

Gunakan:

- Composite foreign key yang mencakup tenant untuk relasi kritis.
- Unique constraint yang mempertimbangkan tenant.
- Index yang mendukung query berdasarkan tenant.
- Akun database aplikasi dengan hak minimum.
- Repository yang mensyaratkan `TenantContext`.

Penyaringan frontend dan penggunaan UUID tidak cukup untuk menjamin isolasi.

---

## 9. RBAC

### 9.1 Role standar

| Role                  | Cakupan              | Fungsi                                                    |
| --------------------- | -------------------- | --------------------------------------------------------- |
| `PLATFORM_SUPERADMIN` | Platform             | Mengelola klien, layanan, kuota, dan konfigurasi platform |
| `TENANT_OWNER`        | Tenant               | Pemilik akun klien dan pengendali akses tenant            |
| `TENANT_ADMIN`        | Tenant               | Administrasi anggota, brand, dan konfigurasi              |
| `ANALYST`             | Brand yang diberikan | Impor, peninjauan, analisis, dan laporan                  |
| `VIEWER`              | Brand yang diberikan | Membaca dashboard dan laporan yang diizinkan              |

### 9.2 Matriks akses awal

| Fungsi                           |        Superadmin | Owner | Admin |     Analyst | Viewer |
| -------------------------------- | ----------------: | ----: | ----: | ----------: | -----: |
| Membuat dan mengatur tenant      |                Ya |     — |     — |           — |      — |
| Mengatur paket dan kuota         |                Ya |     — |     — |           — |      — |
| Mengatur profil tenant           | Dukungan tercatat |    Ya |    Ya |           — |      — |
| Mengelola anggota                | Dukungan tercatat |    Ya |    Ya |           — |      — |
| Mengubah kepemilikan tenant      | Dukungan tercatat |    Ya |     — |           — |      — |
| Mengelola brand                  | Dukungan tercatat |    Ya |    Ya | Sesuai izin |      — |
| Impor dan review data            | Dukungan tercatat |    Ya |    Ya |          Ya |      — |
| Membaca dashboard                | Dukungan tercatat |    Ya |    Ya |          Ya |     Ya |
| Membuat laporan                  | Dukungan tercatat |    Ya |    Ya |          Ya |      — |
| Mengunduh laporan terbit         |    Sesuai cakupan |    Ya |    Ya |          Ya |     Ya |
| Mengekspor data mentah           |       Sesuai izin |    Ya |    Ya | Sesuai izin |      — |
| Mengubah konfigurasi AI platform |                Ya |     — |     — |           — |      — |

Akses dukungan superadmin ke data bisnis tenant harus memiliki konteks tenant
yang jelas dan tercatat dalam audit.

### 9.3 Permission

Contoh permission:

```text
platform.tenants.read
platform.tenants.manage
platform.plans.manage
platform.ai.manage
platform.support.access

tenant.settings.manage
tenant.members.manage
tenant.roles.manage
tenant.ownership.transfer

brands.read
brands.manage
monitoring.manage
sources.manage
imports.create
mentions.read
mentions.annotate
analytics.read
scoring.read
scoring.recompute
ai.use
reports.create
reports.publish
reports.read
exports.aggregate
exports.raw
audit.read
```

Permission merupakan dasar pemeriksaan API. Nama role tidak boleh menjadi
satu-satunya aturan.

Role kustom dapat dibuat dalam tenant dengan batas:

- Tidak dapat memberikan permission platform.
- Tidak dapat melampaui hak pengelola role.
- Role owner dan superadmin merupakan role terlindungi.
- Tenant harus tetap memiliki minimal satu owner aktif.
- Pencabutan membership berlaku pada request berikutnya.

---

## 10. Autentikasi

Gunakan sesi server dengan identifier acak dan cookie yang aman.

### 10.1 Ketentuan

- Password disimpan sebagai hash menggunakan algoritme yang sesuai, seperti
  Argon2id.
- Cookie produksi menggunakan `HttpOnly`, `Secure`, dan `SameSite`.
- Identifier sesi disimpan dalam bentuk hash pada database.
- Request yang mengubah data memiliki perlindungan CSRF dan pemeriksaan origin.
- Session expiry, logout, dan pencabutan sesi berlaku di server.
- Role dan membership aktif diperiksa server.
- Login dan pemulihan akun memiliki rate limit.
- Token undangan dan pemulihan akun memiliki expiry serta hanya dapat digunakan
  sekali.
- Token, password, dan secret tidak ditulis ke log.

### 10.2 Alur pengguna

1. Login.
2. Memilih tenant jika memiliki beberapa membership.
3. Memilih brand yang diizinkan.
4. Membuka dashboard sesuai permission.

Undangan anggota menyimpan status dan token. Pengiriman email menggunakan
adapter yang dapat dikonfigurasi. Pada lingkungan lokal, Mailpit dapat digunakan
untuk pengujian email tanpa mengirim ke penerima nyata.

---

## 11. Identitas visual dan UI/UX

### 11.1 Brand platform

Gunakan identitas **Katapedia DES** secara konsisten pada:

- Login.
- Sidebar.
- Header.
- Tampilan laporan.
- Template email.
- Halaman bantuan.

Logo dan palet final harus berasal dari `Katapedia's Way #9 - DES.pdf`.

Brand klien ditampilkan sebagai konteks kerja melalui logo tenant dan profil
brand. Identitas klien tidak menghapus identitas platform pada MVP.

### 11.2 Design tokens

Antigravity harus menghasilkan token berikut setelah membaca PDF:

| Token                     | Penggunaan                 |
| ------------------------- | -------------------------- |
| `brand.primary`           | Aksi utama dan state aktif |
| `brand.primaryForeground` | Teks pada warna utama      |
| `brand.secondary`         | Elemen pendukung           |
| `brand.accent`            | Sorotan terpilih           |
| `surface.page`            | Latar halaman              |
| `surface.card`            | Latar panel                |
| `text.primary`            | Teks utama                 |
| `text.secondary`          | Teks pendukung             |
| `border.default`          | Pemisah                    |
| `chart.series.*`          | Seri grafik                |
| `status.*`                | Status semantik            |

Setiap warna brand memuat:

- Nilai HEX.
- Sumber dokumen.
- Nomor halaman.
- Contoh penerapan.
- Pasangan warna teks yang terbaca.

Palet sementara untuk scaffolding harus ditandai sebagai sementara dalam
dokumentasi pengembangan. Jangan mengklaim palet sementara sebagai warna
Katapedia.

### 11.3 Arah desain

- Dashboard eksekutif yang tenang dan rapi.
- Light theme sebagai default.
- Dark theme melalui token yang konsisten.
- Tipografi sans serif yang mudah dibaca.
- Hierarki angka, judul, dan penjelasan yang jelas.
- Panel dengan padding memadai dan border halus.
- Warna aksen digunakan secara terkendali.
- Hindari dekorasi berlebihan yang mengurangi keterbacaan data.
- Grafik menggunakan label, tooltip, dan legenda yang konsisten.

### 11.4 Layout

| Komponen        | Spesifikasi                            |
| --------------- | -------------------------------------- |
| Sidebar desktop | Sekitar 256 px; dapat diperkecil       |
| Header          | Sekitar 64 px                          |
| Area konten     | Fluid dengan batas lebar yang wajar    |
| Grid            | 12 kolom pada desktop                  |
| Panel utama     | 2–3 kolom sesuai kebutuhan             |
| Detail data     | Drawer atau halaman detail             |
| Mobile          | Sidebar menjadi drawer; panel ditumpuk |

Dashboard owner memprioritaskan ringkasan. Detail teknis ditempatkan pada
halaman analisis atau drawer.

### 11.5 Aksesibilitas dan state

Setiap halaman harus memiliki:

- Loading state.
- Empty state.
- Error state dengan aksi pemulihan.
- State data parsial.
- State tanpa permission.
- State layanan tidak aktif jika relevan.

Interaksi harus mendukung keyboard, focus yang terlihat, label form, dan arti
status yang tidak bergantung pada warna saja.

---

## 12. Sitemap

### 12.1 Platform superadmin

```text
/platform/dashboard
/platform/tenants
/platform/tenants/:tenantId
/platform/plans
/platform/usage
/platform/jobs
/platform/integrations
/platform/audit
/platform/settings
```

### 12.2 Tenant

```text
/app/dashboard
/app/brands
/app/brands/:brandId
/app/mentions
/app/analytics
/app/comparison
/app/scoring
/app/ai
/app/reports
/app/imports
/app/monitoring
/app/team
/app/settings
/app/audit
```

Menu ditampilkan berdasarkan permission. Semua menu yang terlihat harus memiliki
route dan fungsi nyata.

Fitur yang belum tersedia harus memiliki penjelasan status dan tidak boleh
menggunakan tombol yang berpura-pura berhasil.

---

## 13. Spesifikasi halaman utama

### 13.1 Dashboard superadmin

**Tujuan:** memahami kondisi layanan platform dan mengelola klien.

Komponen:

- Tenant aktif, trial, dan suspended.
- Penggunaan kuota.
- Jumlah pekerjaan berhasil dan gagal.
- Status API, worker, database, dan AI.
- Tren penggunaan platform.
- Daftar klien terbaru.
- Peringatan operasional.

Aksi:

- Membuat tenant.
- Mengubah status layanan.
- Mengatur paket dan kuota.
- Membuka detail tenant.
- Memeriksa pekerjaan gagal.
- Mengulangi pekerjaan yang aman untuk diulang.

Grafik platform menampilkan data operasional agregat. Percakapan bisnis tenant
ditampilkan melalui konteks dukungan yang tercatat.

### 13.2 Dashboard brand owner

**Tujuan:** mengetahui kondisi brand dengan cepat.

Header:

- Tenant.
- Brand.
- Jenis brand.
- Rentang tanggal.
- Filter sumber.
- Waktu pembaruan data.
- Tombol membuat ringkasan dan laporan.

Panel:

| Panel              | Fungsi                                                 |
| ------------------ | ------------------------------------------------------ |
| Skor utama         | Nilai dan interpretasi sesuai metodologi terverifikasi |
| Volume percakapan  | Jumlah mention dengan perbandingan periode             |
| Sentimen           | Positif, netral, negatif, dan belum diklasifikasi      |
| Tren               | Perubahan metrik dari waktu ke waktu                   |
| Topik utama        | Topik yang memiliki bukti                              |
| Sumber data        | Distribusi mention berdasarkan sumber                  |
| Pembanding         | Posisi terhadap brand dalam cohort yang sama           |
| Ringkasan AI       | Ringkasan dengan referensi                             |
| Percakapan penting | Contoh data yang dapat dibuka                          |
| Kualitas data      | Cakupan sumber, freshness, dan data belum diproses     |

Klik kartu atau grafik membuka data dengan filter yang sesuai.

Perubahan periode harus memperbarui seluruh panel. Jangan membiarkan sebagian
panel menggunakan periode lama.

### 13.3 Manajemen brand

Form:

- Nama.
- Jenis: tokoh, produk, atau organisasi.
- Brand utama atau pembanding.
- Deskripsi.
- Logo.
- Alias.
- Kata kunci.
- Kata pengecualian.
- Akun atau sumber yang relevan.
- Profil metodologi.
- Status aktif.

Aksi:

- Tambah.
- Edit.
- Arsipkan.
- Mengatur akses anggota.
- Membuka riwayat perubahan.

Arsip tidak menghapus histori analisis.

### 13.4 Mention explorer

Fitur:

- Pencarian teks.
- Filter tanggal, brand, sumber, sentimen, topik, dan status review.
- Pagination server.
- Sorting server.
- Pemilihan baris untuk aksi yang diizinkan.
- Drawer detail.

Detail mention:

- Konten.
- Sumber dan URL.
- Waktu publikasi.
- Brand yang terdeteksi.
- Sentimen per brand.
- Asal klasifikasi.
- Status review.
- Riwayat koreksi.
- Referensi import.

Contoh “Produk A bagus, Produk B mengecewakan” harus memungkinkan sentimen
berbeda untuk A dan B.

Koreksi analis disimpan sebagai revisi. Output AI sebelumnya tetap dapat
ditelusuri.

### 13.5 Perbandingan brand

Fitur:

- Memilih brand dalam tenant.
- Memilih cohort pembanding.
- Membandingkan metrik pada periode dan cakupan sumber yang sama.
- Grafik tren bersama.
- Tabel metrik.
- Perbandingan dimensi skor jika metodologi sebanding.

Aplikasi harus menjelaskan ketika brand menggunakan metodologi atau cakupan data
yang berbeda.

### 13.6 Halaman scoring

Komponen:

- Nilai.
- Versi metodologi.
- Dimensi dan kontribusi.
- Periode.
- Cakupan sumber.
- Kelengkapan data.
- Histori perhitungan.
- Penjelasan yang dapat dibaca pengguna.
- Aksi hitung ulang sesuai permission.

State minimum:

```text
NOT_CONFIGURED
INSUFFICIENT_DATA
QUEUED
RUNNING
COMPLETED
STALE
FAILED
```

Nilai tidak tersedia ditampilkan sebagai `—` dengan penjelasan.

### 13.7 AI workspace

Fitur:

- Ringkasan periode.
- Pertanyaan atas data brand aktif.
- Riwayat percakapan dalam tenant.
- Daftar bukti.
- Simpan hasil sebagai draft laporan.

Pertanyaan contoh:

- “Apa perubahan percakapan minggu ini?”
- “Topik negatif apa yang paling sering muncul?”
- “Tunjukkan bukti yang mendukung ringkasan ini.”

Jawaban harus menyebutkan periode, cakupan data, dan referensi. Jika data tidak
cukup, AI harus menyatakan keterbatasannya.

### 13.8 Laporan

Alur:

1. Pilih brand dan periode.
2. Pilih bagian laporan.
3. Backend membuat snapshot data.
4. Worker menghasilkan laporan.
5. Analis meninjau narasi.
6. Pengguna berwenang menerbitkan.
7. Anggota yang diizinkan mengunduh.

Format awal:

- PDF untuk laporan.
- CSV untuk agregat.
- CSV data mentah hanya dengan permission khusus.

Laporan menyimpan filter, versi metodologi, versi data, dan waktu pembuatan.

---

## 14. Sumber data dan impor

### 14.1 Kontrak konektor

```ts
interface SourceAdapter {
    validateConfiguration(): Promise<ConnectionResult>;
    fetchBatch(cursor?: string): Promise<SourceBatch>;
    normalize(item: unknown): NormalizedMention;
}
```

Normalisasi memisahkan karakteristik provider dari model data aplikasi.

### 14.2 Kolom CSV awal

| Kolom          | Keterangan                       |
| -------------- | -------------------------------- |
| `external_id`  | ID dari sumber, jika ada         |
| `source`       | Jenis sumber                     |
| `published_at` | Waktu publikasi                  |
| `text`         | Konten                           |
| `url`          | URL sumber, jika ada             |
| `author_name`  | Opsional                         |
| `likes`        | Opsional                         |
| `comments`     | Opsional                         |
| `shares`       | Opsional                         |
| `views`        | Opsional                         |
| `language`     | Opsional                         |
| `location`     | Opsional dengan provenance       |
| `brand_alias`  | Opsional untuk membantu pemetaan |

Nama dan kelengkapan kolom dapat disesuaikan setelah membaca FRD.

### 14.3 Alur impor

1. Unduh template.
2. Upload.
3. Validasi ukuran, format, dan header.
4. Mapping kolom.
5. Preview.
6. Tampilkan baris valid, tidak valid, dan duplikat.
7. Konfirmasi mode impor.
8. Worker memproses data.
9. Tampilkan hasil dan berkas kesalahan.
10. Perbarui analitik.

Batas awal yang diusulkan:

- Maksimum 20 MB.
- Maksimum 50.000 baris per berkas.
- Pemrosesan menggunakan chunk.
- Request upload tidak menunggu seluruh proses selesai.

Deduplikasi dilakukan dalam tenant. Retry tidak boleh menggandakan data.

Data yang belum diklasifikasi memiliki status belum diklasifikasi, bukan netral.

---

## 15. Pipeline data dan analitik

### 15.1 Tahap pemrosesan

```text
Ingest
Normalize
Validate
Deduplicate
Match brand
Classify per brand
Review jika diperlukan
Aggregate
Compute score
Generate summary
```

### 15.2 Aturan data

- Simpan timestamp dalam UTC.
- Gunakan timezone tenant untuk bucket harian.
- Gunakan rentang waktu setengah terbuka: mulai termasuk, akhir tidak termasuk.
- Normalisasi URL tanpa mengambil URL arbitrer dari server.
- Pertahankan provenance sumber.
- Konten ambigu masuk antrean review.
- Nilai engagement yang tidak ada tetap `null`.

### 15.3 Metrik awal yang diusulkan

| Metrik                 | Definisi implementasi                               |
| ---------------------- | --------------------------------------------------- |
| Mention count          | Jumlah mention unik yang terkait dengan brand       |
| Sentiment distribution | Distribusi label pada relasi mention–brand          |
| Source distribution    | Distribusi mention berdasarkan sumber               |
| Engagement observed    | Agregat interaksi yang benar-benar tersedia         |
| Trend                  | Agregat dalam bucket waktu                          |
| Share of voice         | Proporsi relasi mention–brand dalam cohort terpilih |

Untuk share of voice, satu mention yang menyebut dua brand dapat membentuk dua
relasi. Denominator harus konsisten dan dijelaskan.

Likes atau followers tidak boleh otomatis diklaim sebagai reach.

Perubahan relatif terhadap periode sebelumnya tidak dihitung ketika denominator
sebelumnya nol. Tampilkan status yang sesuai.

### 15.4 Konsistensi

Gunakan snapshot atau versi data agar:

- Dashboard.
- Skor.
- Ringkasan AI.
- Ekspor.
- Laporan.

mengacu pada dataset dan filter yang sama.

Koreksi label atau masuknya data baru menandai hasil sebelumnya sebagai perlu
diperbarui.

---

## 16. Engine scoring

### 16.1 Ketentuan

Scoring resmi harus deterministik dan mengikuti metodologi PDF.

LLM membantu mengekstrak informasi atau menjelaskan hasil. LLM tidak boleh
menciptakan formula atau nilai skor resmi.

### 16.2 Model metodologi

Simpan:

```text
ScoringProfile
ScoringVersion
ScoringDimension
ScoringRule
ScoreRun
ScoreSnapshot
ScoreComponent
```

Setiap versi memuat:

- Jenis brand.
- Dimensi.
- Definisi input.
- Formula.
- Bobot jika digunakan.
- Normalisasi.
- Ambang minimum data.
- Perlakuan terhadap missing value.
- Interpretasi nilai.
- Sumber dokumen dan halaman.

Versi yang telah digunakan pada laporan tidak boleh diubah langsung. Perubahan
menghasilkan versi baru.

### 16.3 Ketentuan eksekusi

- Jangan menggunakan `eval()` atas formula tersimpan.
- Gunakan fungsi terdaftar atau expression parser dengan operasi terbatas.
- Simpan input, versi data, versi formula, dan hasil komponen.
- Hilangnya data wajib menghasilkan status yang ditentukan metodologi.
- Retry menggunakan identitas perhitungan yang sama.
- Perhitungan lama tetap dapat ditelusuri.

### 16.4 Validasi

Setelah membaca PDF, buat fixture perhitungan yang diperiksa secara manual.

Fixture minimum:

- Contoh normal.
- Nilai minimum dan maksimum.
- Data kosong.
- Input tidak lengkap.
- Denominator nol.
- Perubahan versi metodologi.

Formula simulasi boleh digunakan untuk demo dengan penanda **Simulasi**. Formula
tersebut tidak boleh aktif pada workspace data nyata sebagai metodologi resmi.

---

## 17. Integrasi AI

### 17.1 Provider

| Provider     | Penggunaan                                    |
| ------------ | --------------------------------------------- |
| Ollama       | Default preproduction dengan model lokal      |
| OpenAI       | Opsi cloud berbayar                           |
| Adapter lain | Dapat ditambahkan tanpa mengubah modul bisnis |

Baseline model lokal yang diusulkan adalah `qwen3:8b`. Model Qwen3-8B memiliki
lisensi Apache 2.0. Biaya inferensi per token dapat dihindari dengan menjalankan
model sendiri, tetapi kapasitas dan biaya server tetap harus diperhitungkan.

### 17.2 Kontrak aplikasi

```ts
interface AiProvider {
    classifyMentions(
        input: ClassificationInput,
    ): Promise<ClassificationResult>;

    summarizeAnalytics(
        input: SummaryInput,
    ): Promise<SummaryResult>;

    answerQuestion(
        input: GroundedQuestionInput,
    ): Promise<GroundedAnswer>;

    health(): Promise<AiHealth>;
}
```

Adapter Ollama dan OpenAI boleh menggunakan mekanisme request yang berbeda.
Kompatibilitas API tidak boleh diasumsikan mencakup seluruh fitur provider.

Ollama mendukung keluaran terstruktur berdasarkan JSON Schema. Tetap validasi
hasil di backend sebelum disimpan.

### 17.3 Output klasifikasi

```ts
type BrandSentiment = {
    mentionId: string;
    brandId: string;
    sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE" | "UNKNOWN";
    topics: string[];
    evidenceExcerpt: string | null;
    needsReview: boolean;
};
```

Nilai harus mengikuti schema dan hanya merujuk input yang diberikan.

### 17.4 Output ringkasan

```ts
type AnalyticsSummary = {
    summary: string;
    findings: Array<{
        statement: string;
        mentionIds: string[];
        metricKeys: string[];
    }>;
    limitations: string[];
};
```

Referensi harus diverifikasi terhadap tenant, brand, periode, dan dataset yang
digunakan.

### 17.5 Akses data AI

- Backend memilih konteks berdasarkan permission pengguna.
- AI hanya menerima data yang relevan.
- AI tidak menerima secret.
- Konten sumber diperlakukan sebagai data.
- AI tidak mengeksekusi SQL yang dibuat bebas.
- Akses database menggunakan tool atau fungsi baca yang diizinkan secara
  eksplisit.
- Jawaban tidak boleh mengambil data tenant lain.
- Provider cloud digunakan melalui konfigurasi server.

### 17.6 Pemrosesan dan kapasitas

- Klasifikasi dan ringkasan dijalankan melalui worker.
- Concurrency awal lokal: satu pekerjaan inferensi, lalu dinaikkan setelah
  benchmark.
- Batas panjang input dan output dapat dikonfigurasi.
- Retry terbatas untuk kegagalan sementara.
- Output invalid masuk status review atau gagal.
- Timeout tidak menghentikan dashboard.
- Cache mempertimbangkan tenant, filter, versi data, model, dan prompt.
- Penggunaan AI memiliki kuota tenant.
- Pemanggilan tidak dipicu ulang setiap dashboard dibuka.

Sediakan `ai:doctor` untuk memeriksa:

- Provider dapat diakses.
- Model tersedia.
- Inferensi berhasil.
- Output sesuai schema.
- Latensi pengujian.

---

## 18. Model data

| Entitas              | Fungsi                          |
| -------------------- | ------------------------------- |
| `User`               | Identitas pengguna              |
| `Session`            | Sesi aktif                      |
| `Tenant`             | Klien                           |
| `Membership`         | Hubungan pengguna–tenant        |
| `Role`               | Role platform atau tenant       |
| `Permission`         | Permission                      |
| `RolePermission`     | Permission pada role            |
| `MembershipRole`     | Role anggota                    |
| `Brand`              | Objek monitoring                |
| `BrandAccess`        | Cakupan brand anggota           |
| `MonitoringQuery`    | Kata kunci dan pengecualian     |
| `SourceConnection`   | Konfigurasi sumber              |
| `ImportBatch`        | Pekerjaan impor                 |
| `ImportRowError`     | Kesalahan baris                 |
| `Mention`            | Data percakapan                 |
| `MentionBrand`       | Hubungan mention dengan brand   |
| `AnnotationRevision` | Histori klasifikasi dan koreksi |
| `Topic`              | Topik dalam tenant              |
| `AnalyticsSnapshot`  | Agregat dengan versi data       |
| `ScoringProfile`     | Profil metodologi               |
| `ScoringVersion`     | Versi metodologi                |
| `ScoreRun`           | Eksekusi perhitungan            |
| `ScoreSnapshot`      | Hasil perhitungan               |
| `AiRun`              | Eksekusi AI                     |
| `AiConversation`     | Percakapan AI                   |
| `Report`             | Laporan tersimpan               |
| `ExportJob`          | Pekerjaan ekspor                |
| `FileArtifact`       | Metadata berkas                 |
| `JobRecord`          | Status pekerjaan                |
| `AuditLog`           | Aktivitas penting               |
| `Plan`               | Paket layanan                   |
| `TenantEntitlement`  | Hak layanan tenant              |
| `UsageCounter`       | Penggunaan kuota                |

Field umum:

```text
id
tenantId pada data bisnis
createdAt
updatedAt
createdBy jika relevan
version jika diperlukan
```

### 18.1 Index dan constraint

Minimum:

- Membership unik per tenant dan pengguna.
- Brand dengan composite identity untuk relasi tenant.
- Deduplikasi mention berdasarkan tenant dan identitas sumber.
- Index mention berdasarkan tenant dan waktu.
- Relasi mention–brand unik per tenant.
- Index analitik berdasarkan tenant, brand, periode, dan versi.
- Index pekerjaan berdasarkan tenant, status, dan waktu.
- Index audit berdasarkan tenant dan waktu.

Penghapusan atau pengarsipan harus mempertahankan referensi laporan yang telah
diterbitkan.

---

## 19. Kontrak REST API

### 19.1 Konvensi

Base path:

```text
/api/v1
```

Resource bisnis menggunakan tenant eksplisit:

```text
/api/v1/tenants/:tenantId/...
```

Tenant tersebut tetap diverifikasi terhadap session dan membership.

Gunakan:

- Pagination server.
- Allowlist sorting.
- Filter tervalidasi.
- OpenAPI yang sesuai implementasi.
- `requestId`.
- Status HTTP standar.
- `Idempotency-Key` pada aksi berat atau berisiko terduplikasi.

### 19.2 Response sukses

```json
{
    "data": {},
    "meta": {
        "requestId": "request-id",
        "dataMode": "LIVE"
    }
}
```

### 19.3 Response list

```json
{
    "data": [],
    "meta": {
        "page": 1,
        "pageSize": 25,
        "total": 0,
        "requestId": "request-id"
    }
}
```

### 19.4 Response error

```json
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Periksa kembali data yang diisi.",
        "details": []
    },
    "meta": {
        "requestId": "request-id"
    }
}
```

Pesan pengguna tidak menampilkan stack trace atau detail database.

### 19.5 Endpoint minimum

Prefix tenant pada tabel berikut adalah:

```text
/api/v1/tenants/:tenantId
```

| Area            | Endpoint                                   |
| --------------- | ------------------------------------------ |
| Auth            | `POST /auth/login`                         |
| Auth            | `POST /auth/logout`                        |
| Auth            | `GET /auth/me`                             |
| Auth            | `GET /auth/csrf`                           |
| Auth            | `POST /auth/forgot-password`               |
| Auth            | `POST /auth/reset-password`                |
| Tenant pengguna | `GET /me/tenants`                          |
| Platform        | `GET, POST /platform/tenants`              |
| Platform        | `GET, PATCH /platform/tenants/:id`         |
| Platform        | `PATCH /platform/tenants/:id/entitlements` |
| Platform        | `GET /platform/usage`                      |
| Brand           | `GET, POST {prefix}/brands`                |
| Brand           | `GET, PATCH {prefix}/brands/:brandId`      |
| Monitoring      | `GET, POST {prefix}/monitoring-queries`    |
| Sources         | `GET, POST {prefix}/sources`               |
| Sources         | `POST {prefix}/sources/:id/test`           |
| Imports         | `POST {prefix}/imports`                    |
| Imports         | `GET {prefix}/imports/:id/preview`         |
| Imports         | `POST {prefix}/imports/:id/commit`         |
| Mentions        | `GET {prefix}/mentions`                    |
| Mentions        | `GET {prefix}/mentions/:id`                |
| Review          | `POST {prefix}/mentions/:id/annotations`   |
| Dashboard       | `GET {prefix}/brands/:brandId/dashboard`   |
| Analytics       | `GET {prefix}/brands/:brandId/analytics`   |
| Comparison      | `GET {prefix}/comparison`                  |
| Scoring         | `GET {prefix}/brands/:brandId/scores`      |
| Scoring         | `POST {prefix}/brands/:brandId/score-runs` |
| AI              | `POST {prefix}/ai/summaries`               |
| AI              | `POST {prefix}/ai/questions`               |
| Reports         | `GET, POST {prefix}/reports`               |
| Reports         | `POST {prefix}/reports/:id/publish`        |
| Exports         | `POST {prefix}/exports`                    |
| Jobs            | `GET {prefix}/jobs/:jobId`                 |
| Files           | `GET {prefix}/files/:fileId/download`      |
| Team            | `GET {prefix}/members`                     |
| Team            | `POST {prefix}/invitations`                |
| Roles           | `GET, POST {prefix}/roles`                 |
| Audit           | `GET {prefix}/audit-logs`                  |

Endpoint `/auth`, `/me`, dan `/platform` pada tabel menggunakan base path
`/api/v1`.

### 19.6 Pekerjaan asynchronous

Response:

```http
HTTP/1.1 202 Accepted
```

```json
{
    "data": {
        "jobId": "job-id",
        "status": "QUEUED"
    },
    "meta": {
        "requestId": "request-id"
    }
}
```

Frontend memeriksa status melalui polling dengan interval yang meningkat.
Polling berhenti ketika pekerjaan selesai, gagal, atau halaman ditutup.

---

## 20. Antrean dan keandalan

Jenis pekerjaan:

```text
import.process
mention.classify
analytics.aggregate
score.compute
ai.summarize
report.generate
export.generate
notification.deliver
```

Setiap pekerjaan memiliki:

- Tenant.
- Resource.
- Versi data jika relevan.
- Identitas idempotensi.
- Status.
- Percobaan.
- Error yang aman ditampilkan.
- Waktu mulai dan selesai.

Gunakan transaksi database dan outbox ketika pencatatan perubahan bisnis harus
diikuti pengiriman pekerjaan.

Retry harus aman terhadap duplikasi. Jika worker restart, pekerjaan dapat
dilanjutkan atau diulang secara idempoten.

---

## 21. Docker dan deployment

### 21.1 Layanan

| Service      | Fungsi                                 |
| ------------ | -------------------------------------- |
| `web`        | Nginx untuk frontend dan reverse proxy |
| `api`        | REST API                               |
| `worker`     | Background jobs                        |
| `migrate`    | Migrasi database satu kali             |
| `postgres`   | Database lokal atau preproduction      |
| `redis`      | Antrean                                |
| `ollama`     | Opsional pada overlay AI               |
| `model-init` | Mengunduh model pada overlay AI        |

### 21.2 Berkas deployment

| Berkas                    | Fungsi                                        |
| ------------------------- | --------------------------------------------- |
| `compose.yml`             | Stack dasar dengan database lokal             |
| `compose.ai.yml`          | Overlay Ollama dan bootstrap model            |
| `compose.external-db.yml` | Manifest deployment dengan database eksternal |
| `docker/web.Dockerfile`   | Build frontend dan Nginx                      |
| `docker/api.Dockerfile`   | Build API, worker, dan target migrasi         |
| `docker/nginx.conf`       | Routing SPA dan proxy API                     |

Manifest external database harus dapat berjalan tanpa memulai service PostgreSQL
lokal.

### 21.3 Ketentuan image

- Multi-stage build.
- Instalasi menggunakan lockfile.
- Prisma Client dihasilkan ketika build.
- Package internal dibangun sesuai dependency graph.
- Runtime hanya membawa kebutuhan eksekusi.
- Target migrasi membawa Prisma CLI.
- API dan worker menggunakan sumber serta versi image yang sama.
- Proses backend berjalan sebagai non-root.
- Shutdown menangani request dan pekerjaan aktif.

### 21.4 Routing Nginx

- `/api/` diarahkan ke API.
- Route frontend menggunakan fallback `index.html`.
- Asset hashed dapat menggunakan cache panjang.
- Dokumen `index.html` tidak memakai cache panjang.
- Batas upload sesuai konfigurasi API.
- Cookie diteruskan dengan benar.
- Timeout normal dan pekerjaan asynchronous dibedakan.

Vite dev server dan `vite preview` tidak digunakan sebagai server produksi.

### 21.5 Startup

Urutan:

1. PostgreSQL sehat.
2. Migrasi berhasil.
3. API dan worker dimulai.
4. Frontend siap menerima akses.

Compose harus menggunakan healthcheck dan kondisi dependency yang tepat. Urutan
pembuatan container saja tidak menjamin database siap menerima koneksi.

Kegagalan migrasi harus menghentikan startup layanan yang bergantung pada schema
baru.

### 21.6 Perintah yang wajib didukung

Stack dasar:

```bash
cp .env.example .env
docker compose up -d --build
```

Dengan model lokal:

```bash
docker compose -f compose.yml -f compose.ai.yml up -d --build
```

Database eksternal:

```bash
docker compose -f compose.external-db.yml up -d --build
```

Model-init harus memiliki volume model persisten agar unduhan tidak diulang
setiap restart.

Pada Mac, deployment AI dapat menggunakan Ollama pada host jika itu lebih sesuai
dengan perangkat. Worker tetap menggunakan adapter dan alamat private yang
dikonfigurasi.

### 21.7 Jaringan dan persistensi

- Hanya web atau reverse proxy yang diekspos publik.
- PostgreSQL, Redis, dan Ollama berada pada jaringan private.
- Database dan model menggunakan volume persisten.
- API dan worker berbagi storage berkas yang diperlukan.
- Secret tersedia melalui konfigurasi server.
- TLS ditangani reverse proxy deployment.

---

## 22. Environment variables

### 22.1 Frontend

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_APP_NAME=Katapedia DES
```

Seluruh nilai `VITE_*` dianggap publik.

### 22.2 Backend

```dotenv
APP_ENV=preproduction
NODE_ENV=production
PORT=4000
PUBLIC_APP_URL=http://localhost:8080

DATABASE_URL=postgresql://USER:PASSWORD@postgres:5432/katapedia
REDIS_URL=redis://redis:6379

SESSION_SECRET=REPLACE_WITH_RANDOM_SECRET
STORAGE_PATH=/app/storage

AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=qwen3:8b

OPENAI_API_KEY=
OPENAI_MODEL=

AI_CONCURRENCY=1
AI_TIMEOUT_MS=120000

MAX_UPLOAD_MB=20
DEFAULT_TIMEZONE=Asia/Jakarta
LOG_LEVEL=info

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

Nilai di atas merupakan contoh konfigurasi, bukan secret yang layak digunakan.

Validasi environment dilakukan saat startup sesuai service. Service migrasi
tidak perlu memvalidasi konfigurasi AI.

Model OpenAI dipilih dari model yang tersedia pada akun dan mendukung kebutuhan
adapter. Jangan menaruh API key pada frontend.

---

## 23. Keamanan dan audit

Minimum implementasi:

- RBAC server.
- Tenant scoping.
- Proteksi CSRF.
- Validasi request.
- Rate limit.
- Batas upload.
- Validasi jenis berkas.
- Query parameter yang dibatasi.
- Sanitasi konten yang dirender.
- Secret masking.
- Pemeriksaan akses unduhan.
- Pencegahan formula spreadsheet pada ekspor CSV.
- Pencegahan SSRF pada konektor dan proses laporan.

Audit mencatat:

- Perubahan tenant dan status layanan.
- Perubahan role dan membership.
- Perubahan konfigurasi monitoring.
- Impor.
- Koreksi label.
- Pergantian versi metodologi.
- Ekspor data.
- Publikasi laporan.
- Akses dukungan superadmin.

Audit tidak menyimpan password, token, atau API key.

---

## 24. Observability dan operasional

### 24.1 Endpoint kesehatan

```text
GET /health/live
GET /health/ready
```

Liveness menunjukkan proses hidup.

Readiness memeriksa dependency inti yang diperlukan layanan. AI yang tidak
tersedia dapat menghasilkan status degraded tanpa menghentikan pembacaan
dashboard.

### 24.2 Log dan metrik

Log memuat:

```text
requestId
service
module
tenantId jika relevan
jobId jika relevan
duration
status
errorCode
```

Pantau:

- Latensi API.
- Error rate.
- Database pool.
- Panjang antrean.
- Pekerjaan gagal.
- Durasi impor.
- Latensi AI.
- Output AI invalid.
- Penggunaan kuota.
- Freshness data.

### 24.3 Backup

- Backup database otomatis.
- Backup berkas yang perlu dipertahankan.
- Retensi dapat dikonfigurasi.
- Backup disimpan di lokasi terpisah dari volume utama.
- Restore diuji pada lingkungan terpisah.

Target awal yang diusulkan:

- RPO maksimal 24 jam.
- RTO maksimal 4 jam.

Target tersebut harus diuji terhadap deployment yang dipilih.

---

## 25. Target kapasitas awal

Target ini merupakan sasaran engineering awal, bukan hasil benchmark yang telah
terbukti.

| Parameter                         | Sasaran                                  |
| --------------------------------- | ---------------------------------------- |
| Tenant preproduction              | 20 tenant                                |
| Total mention pengujian           | 500.000                                  |
| Pengguna aktif bersamaan          | 30                                       |
| API baca umum                     | p95 di bawah 800 ms pada beban pengujian |
| Dashboard dengan agregat tersedia | p95 di bawah 1,5 detik untuk API         |
| Impor                             | Berjalan asynchronous                    |
| Pekerjaan AI                      | Memiliki concurrency dan kuota           |
| Data tabel                        | Pagination server                        |

Dokumentasikan hardware, dataset, cache, dan konfigurasi ketika melakukan
benchmark.

Inference lokal memiliki kapasitas terpisah dari API. Kapasitas AI harus
dinaikkan berdasarkan pengukuran, bukan jumlah pengguna dashboard semata.

---

## 26. Data demo

Sediakan seed dengan:

- Tenant simulasi untuk mode tokoh.
- Tenant simulasi untuk mode produk.
- Tenant lain untuk pengujian isolasi.
- Brand utama dan pembanding.
- Pengguna untuk setiap role.
- Data beberapa periode.
- Sentimen beragam.
- Data ambigu dan belum diproses.
- Pekerjaan berhasil dan gagal.
- Laporan contoh.

Gunakan nama fiktif.

Data demo disimpan di database dan diakses melalui API. Jangan menaruh metrik
demo sebagai konstanta dalam komponen React.

Mode demo memiliki penanda pada dashboard dan laporan.

Pembuatan demo pada deployment produksi tidak aktif secara default.

---

## 27. Pengujian dan kriteria penerimaan

### 27.1 Autentikasi dan RBAC

- Semua role dapat login sesuai konfigurasi.
- Logout mencabut sesi.
- Membership nonaktif tidak dapat mengakses tenant.
- Viewer tidak dapat memanggil endpoint tulis.
- Role kustom tidak dapat memperoleh permission platform.
- Owner terakhir tidak dapat dihapus.

### 27.2 Isolasi tenant

Gunakan minimal tiga tenant dalam pengujian.

Periksa:

- Detail resource.
- List dan filter.
- Nested relation.
- Impor.
- Aksi batch.
- Worker.
- Cache.
- AI.
- Ekspor.
- Unduhan.

Mengganti ID resource atau tenant pada URL tidak boleh memberikan data tenant
lain.

### 27.3 Impor

- Berkas valid dapat diproses sampai selesai.
- Berkas invalid menghasilkan penjelasan.
- Mapping kolom disimpan.
- Duplikat tidak menambah data.
- Retry tidak menggandakan baris.
- Worker restart tidak merusak status.
- Error baris dapat diunduh oleh anggota yang diizinkan.

### 27.4 Analitik

- Filter seluruh panel konsisten.
- Batas tanggal dan timezone benar.
- Missing data berbeda dari nol.
- Sentimen per brand didukung.
- Periode sebelumnya dihitung konsisten.
- Ekspor sama dengan data yang dipilih.

### 27.5 Scoring

- Formula memiliki sumber halaman.
- Fixture manual lulus.
- Missing value mengikuti metodologi.
- Versi tersimpan.
- Hasil lama dapat ditelusuri.
- Formula demo tidak digunakan sebagai formula resmi.

### 27.6 AI

- Provider nyata dapat diuji.
- Output tervalidasi.
- Referensi hanya berasal dari konteks yang diizinkan.
- Tidak ada kebocoran tenant.
- Timeout dan kegagalan menghasilkan status yang jelas.
- Data tidak cukup tidak menghasilkan kesimpulan palsu.
- Koreksi manusia tetap dipertahankan.

Kualitas klasifikasi dievaluasi dengan dataset berlabel manusia yang mencakup
contoh ambigu dan beberapa brand dalam satu teks.

### 27.7 UI dan deployment

- Semua menu yang terlihat berfungsi.
- Form terhubung ke API.
- State loading, kosong, error, dan permission tersedia.
- Tampilan dapat digunakan pada desktop, tablet, dan mobile.
- Refresh route frontend tidak menghasilkan 404.
- Tidak ada secret dalam bundle.
- Stack dapat dimulai dari dokumentasi.
- Migrasi gagal tidak diabaikan.
- Data persisten setelah restart.
- Backup dapat direstore.

---

## 28. Urutan implementasi Antigravity

| Tahap | Pekerjaan                           | Keluaran                           |
| ----- | ----------------------------------- | ---------------------------------- |
| 0     | Membaca PDF dan memetakan sumber    | Metodologi dan palet terverifikasi |
| 1     | Monorepo, database, Docker, kontrak | Fondasi yang dapat dijalankan      |
| 2     | Auth, tenant, RBAC                  | Isolasi dan akses berfungsi        |
| 3     | App shell dan brand                 | UI inti terhubung API              |
| 4     | CSV, mention, review                | Pipeline data berfungsi            |
| 5     | Agregasi dan dashboard              | Analitik konsisten                 |
| 6     | Scoring                             | Formula sumber terimplementasi     |
| 7     | Adapter AI dan worker               | Inferensi nyata dengan referensi   |
| 8     | Laporan dan ekspor                  | Hasil dapat diunduh                |
| 9     | Uji integrasi dan deployment        | MVP tervalidasi                    |

Setiap tahap harus menghasilkan alur yang dapat dijalankan. Jangan menyelesaikan
seluruh UI menggunakan data palsu lalu menunda koneksi backend.

---

## 29. Instruksi utama untuk Antigravity

> Implementasikan Katapedia DES berdasarkan PRD ini menggunakan monorepo pnpm,
> frontend Vite–React–TypeScript, backend Node.js–Fastify modular, Prisma,
> PostgreSQL, dan Docker Compose.
>
> Mulai dengan membaca kedua PDF dalam `docs/reference`. Ekstrak kebutuhan,
> formula, dimensi DES, contoh perhitungan, logo, dan warna Katapedia. Buat
> pemetaan sumber dengan nomor halaman. Jangan mengarang formula atau kode warna
> dan mengklaimnya berasal dari dokumen.
>
> Gunakan Tailwind CSS dan shadcn/ui sebagai dasar UI profesional. Buat
> dashboard brand owner, area analis, dan dashboard superadmin sesuai
> permission.
>
> Implementasikan autentikasi, tenant isolation, dan RBAC pada backend. Semua
> menu yang terlihat harus memiliki route dan fungsi nyata.
>
> Buat modul backend dengan routes, controller, service, repository, schema, dan
> processor jika diperlukan. Controller tidak melakukan query database langsung.
>
> Gunakan CSV sebagai jalur data yang dapat diuji end-to-end. Implementasikan
> integrasi otomatis sesuai FRD dan kredensial yang tersedia.
>
> Jalankan proses berat melalui worker. Buat adapter Ollama dan OpenAI. Gunakan
> inferensi nyata, validasi output, dan referensi yang berasal dari data tenant
> terkait.
>
> Hitung skor secara deterministik berdasarkan metodologi sumber. Jangan
> menyerahkan formula skor resmi kepada LLM.
>
> Sediakan data demo fiktif dalam database, penanda simulasi, dokumentasi API,
> `.env.example`, seed, Dockerfile, Compose, serta runbook backup dan restore.
>
> Kerjakan secara bertahap sampai build, pemeriksaan tipe, pengujian kritis, dan
> alur pengguna utama berhasil. Catat kebutuhan sumber yang masih ambigu tanpa
> menghentikan pekerjaan lain yang dapat dilakukan.

---

## 30. Definition of Done

MVP dinyatakan selesai ketika:

- [ ] Kebutuhan domain telah dipetakan ke PDF.
- [ ] Nama, logo, dan warna mengikuti sumber yang terverifikasi.
- [ ] Monorepo dapat dibangun dari checkout bersih.
- [ ] Frontend menggunakan REST API.
- [ ] Backend modular sesuai struktur.
- [ ] PostgreSQL dan migrasi tersedia.
- [ ] Auth, tenant, dan RBAC berfungsi.
- [ ] Pengujian isolasi tenant lulus.
- [ ] Impor dan review data berfungsi.
- [ ] Dashboard dan filter konsisten.
- [ ] Formula scoring tervalidasi.
- [ ] AI menggunakan provider nyata.
- [ ] Laporan dan ekspor dapat diunduh.
- [ ] Semua menu yang terlihat berfungsi.
- [ ] Tidak ada secret pada frontend.
- [ ] Docker Compose dapat menjalankan sistem.
- [ ] Backup dan restore diuji.
- [ ] Dokumentasi operasional lengkap.

---

## 31. Referensi teknologi

Dokumentasi resmi yang digunakan untuk keputusan teknis:

- [Vite](https://vite.dev/guide/)
- [Tailwind CSS dengan Vite](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui dengan Vite](https://ui.shadcn.com/docs/installation/vite)
- [Fastify](https://fastify.dev/docs/latest/Guides/Getting-Started/)
- [Prisma PostgreSQL](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/postgresql)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
- [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs)
- [Ollama OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)
- [Qwen3-8B model card](https://huggingface.co/Qwen/Qwen3-8B)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Docker Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/)

Versi package dan image harus dikunci ketika implementasi dimulai. Perubahan
major dicatat dalam keputusan arsitektur.
