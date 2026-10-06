# Katapedia DES — Digital Electability Dashboard

> **Platform Web Analisis Kinerja Caleg & Elektabilitas Digital Berbasis 10 Dimensi DES Katapedia**  
> *Sesuai FRD DED PoC/MVP V1.0 dan Katapedia's Way #9 oleh Deddy Rahman*

---

## 🏛️ Gambaran Umum

**Katapedia DES** adalah platform arsitektur monorepo SaaS B2B yang dirancang khusus untuk memantau, menganalisis, dan memetakan kinerja digital calon legislatif (DPR RI, DPRD Provinsi, DPRD Kabupaten/Kota) melalui akun media sosial (Instagram & TikTok).

Platform menggabungkan 2 lapisan pengukuran:
1. **Auto-Measured Analytics:** Metrik data deterministik platform (tayangan, likes, komentar, shares, saves, personal baseline).
2. **AI-Assessed Intelligence:** Analisis isi konten, tema, positioning, narasi, respons audiens, dan reputasi dengan penelusuran bukti (*Evidence-based AI*).

---

## 🧭 10 Dimensi Digital Electability Score (DES)

Perjalanan digital kandidat dipetakan ke dalam 10 langkah (*Digital Electoral Journey*):

| Kode | Dimensi | Langkah | Pertanyaan Pemandu (*Core Question*) |
| :--- | :--- | :--- | :--- |
| **D01** | **Digital Visibility** | *Be Seen* | "Apakah orang bisa menemukan saya saat dicari?" |
| **D02** | **Political Positioning** | *Be Known* | "Apakah orang tahu siapa saya dan apa pembeda utama saya?" |
| **D03** | **Issue Ownership** | *Be Associated* | "Isu apa yang melekat dan menjadi milik saya di dapil?" |
| **D04** | **Winning Narrative** | *Be Remembered* | "Apakah saya memiliki cerita perjuangan yang layak diingat?" |
| **D05** | **Content Power** | *Be Attention-Worthy* | "Apakah saya bisa membuat konten berkinerja tinggi (*winning formula*)?" |
| **D06** | **Audience Connection** | *Be Connected* | "Apakah audiens terhubung dan berbicara dua arah dengan saya?" |
| **D07** | **Digital Trust & Reputation**| *Be Trusted* | "Apakah semakin sering melihat saya, pemilih semakin percaya?" |
| **D08** | **Algorithmic Reach** | *Be Discovered by More* | "Apakah konten saya mampu menjangkau orang di luar follower (FYP/Explore)?" |
| **D09** | **Electoral Conversion** | *Be Chosen* | "Apakah perhatian digital mulai berubah menjadi dukungan dan tindakan nyata?" |
| **D10** | **Intelligence & Engine** | *Be Repeatable* | "Apakah saya punya sistem tim untuk mengulang kemenangan konten?" |

---

## 📁 Struktur Monorepo

```text
katapedia/
├── apps/
│   ├── web/                    # Frontend SPA (Vite, React 18, TypeScript, Tailwind CSS, ECharts)
│   └── api/                    # REST API Backend (Node.js 24 LTS, Fastify, TypeScript, Zod, OpenAPI)
├── packages/
│   ├── contracts/              # Skema Zod, DTO, & Type Definition bersama
│   ├── database/               # Prisma ORM, Skema PostgreSQL, Migrasi, & Seeder Caleg
│   ├── design-tokens/          # Token warna resmi Katapedia, hierarki visual, & metadata 10 Dimensi
│   ├── ui/                     # Komponen UI helper, badges, & formatter metrik
│   └── config/                 # Konfigurasi bersama TypeScript & Lint
├── docker/
│   ├── api.Dockerfile          # Multi-stage Dockerfile untuk API, Worker, dan Migrasi
│   ├── web.Dockerfile          # Nginx reverse proxy & Frontend SPA
│   └── nginx.conf              # Konfigurasi routing Nginx
├── docs/
│   ├── reference/              # Salinan PDF resmi (FRD DED & Katapedia's Way)
│   ├── source-map.md           # Pemetaan PRD & FRD terhadap halaman sumber PDF
│   ├── methodology.md          # Penjelasan metodologi lengkap 10 Dimensi DES & Baseline
│   └── brand-guidelines.md     # Panduan identitas visual & palet warna Katapedia
├── compose.yml                 # Stack lengkap Docker Compose (Postgres, Redis, API, Web, Migrate)
├── compose.ai.yml              # Overlay Docker untuk Ollama AI lokal (Qwen3:8b)
├── compose.external-db.yml     # Overlay Docker untuk database PostgreSQL eksternal
├── pnpm-workspace.yaml         # Konfigurasi workspace pnpm
└── turbo.json                  # Konfigurasi Turborepo build pipeline
```

---

## 🚀 Panduan Menjalankan Sistem

### Persyaratan:
- **Node.js:** v24 LTS (direkomendasikan v24.14+)
- **pnpm:** v12+
- **PostgreSQL:** v16+ (atau via Docker Compose)

### 1. Menjalankan Secara Lokal (Development)

1. Salin konfigurasi environment:
   ```bash
   cp .env.example .env
   ```
2. Pasang dependensi monorepo:
   ```bash
   pnpm install
   pnpm approve-builds --all
   ```
3. Sinkronkan database & lakukan seeding data caleg simulasi:
   ```bash
   pnpm --filter @katapedia/database exec prisma db push
   pnpm --filter @katapedia/database seed
   ```
4. Jalankan backend REST API:
   ```bash
   pnpm --filter @katapedia/api dev
   ```
   *API berjalan pada `http://localhost:4100`. Dokumentasi OpenAPI Swagger tersedia di `http://localhost:4100/documentation`.*
5. Di terminal lain, jalankan frontend web:
   ```bash
   pnpm --filter @katapedia/web dev
   ```
   *Frontend web berjalan pada `http://localhost:5180`.*

---

### 2. Menjalankan dengan Docker Compose (Produksi)

Stack dasar lengkap (PostgreSQL, Redis, Migrate, API, Nginx Web):
```bash
docker compose up -d --build
```
Aplikasi web siap diakses di `http://localhost:8080`.

Dengan overlay AI lokal (Ollama Qwen3:8B):
```bash
docker compose -f compose.yml -f compose.ai.yml up -d --build
```

---

## 👤 Akun Pengguna Bawaan (Seed Demo)

| Email | Peran (*Role*) | Kata Sandi | Cakupan |
| :--- | :--- | :--- | :--- |
| `superadmin@katapedia.id` | `PLATFORM_SUPERADMIN` | `Password123!` | Akses platform, tenant, dan tata kelola |
| `admin@pemilu2029.id` | `DEPT_ADMIN` | `Password123!` | Manajemen caleg, akun sosmed, dan monitoring |
| `analyst@pemilu2029.id` | `ANALYST` | `Password123!` | Analisis dashboard, review temuan AI, & roadmap |
| `viewer@pemilu2029.id` | `VIEWER` | `Password123!` | Akses baca dashboard |
