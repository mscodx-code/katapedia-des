# Panduan Identitas Visual & Desain — Katapedia DES

Dokumen ini mendokumentasikan panduan identitas visual resmi, kode warna, tipografi, dan hierarki antarmuka aplikasi **Katapedia DES** yang diekstraksi langsung dari dokumen presentasi dan functional requirements:
1. `Katapedia's Way #9 - DES: Cara Meningkatkan Elektabilitas Digital Menuju 2029` ([DES-KW])
2. `FRD DED — Digital Electability Dashboard PoC/MVP` ([FRD])

---

## 1. Identitas Brand & Logo Katapedia

- **Nama Brand:** **Katapedia DES** (*Digital Electability Score*)
- **Sub-tagline:** *"Katapedia's Way — Strategi & Roadmap Membangun Kekuatan Caleg"*
- **Slogan Inti:** *"Kemenangan di Social Media adalah Refleksi Kemenangan di Bilik Suara"* ([DES-KW] Hal. 33)
- **Komposisi Logo & Header:**
  - Kata **Katapedia**: Tipografi sans-serif modern, tegas, bold (warna putih pada tema gelap, navy pada tema terang).
  - Kata **'s Way**: Tipografi aksen skrip/kursif mengalir dengan warna Katapedia Gold/Amber (`#F59E0B` / `#E5A93C`).
  - Badge Domain: `DES.katapedia.id` dengan aksen cyan digital (`#38BDF8`) atau gold.

---

## 2. Palet Warna Resmi (*Color Palette*)

### 2.1 Warna Utama (*Brand Primary & Accents*)

| Token | Warna HEX | Teks Kontras | Deskripsi & Penggunaan | Halaman Sumber |
| :--- | :--- | :--- | :--- | :--- |
| `brand.navyDark` | `#0A1128` / `#0F172A` | `#F8FAFC` (Putih) | Latar belakang tema gelap eksekutif, navbar, header dokumen. | [DES-KW] Hal. 1, 7, 9, 33 |
| `brand.navySurface` | `#162036` / `#1E293B` | `#F1F5F9` | Kartu panel, container metrik, sidebar tema gelap. | [DES-KW] Hal. 10, 11, 29 |
| `brand.primaryBlue` | `#1E3A8A` / `#2563EB` | `#FFFFFF` | Tombol utama, filter aktif, highlight dimensi aktif. | [DES-KW] Hal. 1, 5, 29 |
| `brand.gold` | `#F59E0B` / `#E5A93C` | `#0F172A` | Aksen "'s Way", highlight Dimensi 10 (*Intelligence*), kuadran *Prioritas Utama*, badge MVP. | [DES-KW] Hal. 1, 7, 22, 29 |
| `brand.creamLight` | `#FDFBF7` / `#F8F6F0` | `#0F172A` | Latar belakang kartu kontras slide, panel edukasi & refleksi, mode terang. | [DES-KW] Hal. 6, 11, 25 |
| `brand.cyanDigital` | `#0284C7` / `#38BDF8` | `#FFFFFF` | Aksen tautan `DES.katapedia.id`, panah alur perjalanan digital, indikator online. | [DES-KW] Hal. 5, 6, 25, 33 |

### 2.2 Warna Semantik & Kualitas Data

| Status | HEX | Penggunaan dalam Sistem |
| :--- | :--- | :--- |
| `status.success` | `#10B981` (Emerald) | Status *Verified*, *Complete Data*, kuadran *Pertahankan*, *Above Baseline*. |
| `status.warning` | `#F59E0B` (Amber) | Status *Partial Data*, kuadran *Pantau*, *Near Baseline*, status *Pending Review*. |
| `status.critical` | `#EF4444` (Rose) | Status *Insufficient Data*, kuadran *Prioritas Utama*, *Below Baseline*, sinyal *Anomaly*. |
| `status.neutral` | `#64748B` (Slate) | Kuadran *Tunda*, nilai tidak tersedia (*Not Available* / `—`), log audit. |

---

## 3. Tipografi

Sesuai kebutuhan estetika modern dan keterbacaan data eksekutif:
- **Font Utama (Interface & Angka):** `Inter` atau `Plus Jakarta Sans`
  - Memberikan keterbacaan tinggi pada angka-angka metrik, tabel kandidat, dan grafik.
- **Font Aksen Brand:** `Outfit` (untuk heading) dan font kursif anggun untuk elemen skrip `'s Way`.
- **Hierarki Skala Tipografi:**
  - `Hero / Score Big Number`: 40px – 48px, SemiBold / Bold.
  - `H1 / Page Title`: 24px – 28px, Bold.
  - `H2 / Section Title`: 18px – 20px, SemiBold.
  - `H3 / Card Header`: 14px – 16px, SemiBold.
  - `Body / Data Cell`: 13px – 14px, Regular.
  - `Caption / Metadata`: 11px – 12px, Regular (Slate 400).

---

## 4. Prinsip Desain UI/UX

1. **Executive Clarity & Calm:** Tampilan dashboard dibuat rapi dan tidak bising. Visual berorientasi data-first dengan angka-angka metrik yang mudah ditafsirkan para pengambil keputusan politik.
2. **Platform-Aware Transparency:** Data yang tidak tersedia ditampilkan sebagai tanda strip (`—`) atau badge *Not Available*, **bukan angka 0**.
3. **Evidence-Linked Findings:** Setiap skor AI dilengkapi tombol inspeksi *Lihat Bukti* (*View Evidence*) yang memunculkan drawer berisi postingan asli, tautan permalink Instagram/TikTok, dan timestamp.
4. **Cohort Contextualization:** Dashboard memisahkan dengan jelas perbandingan kandidat terhadap dirinya sendiri (*Self-Baseline*) vs perbandingan dengan sesama caleg di satu dapil (*Primary Cohort*).
5. **Interactive 10-Dimension Radar & Cards:** Skor 10 dimensi DES dapat divisualisasikan dalam bentuk radar chart komparatif dan kartu rincian per langkah perjalanan (D01 s/d D10).
