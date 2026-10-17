# PRD — Webhook Instagram resmi untuk DED
Versi 1.0 · 17 Oktober 2026 · PT Mscode Inovasi Digital / Katapedia

## 1. Instruksi untuk Antigravity

Implementasikan dokumen ini pada repository Digital Electability Dashboard (DED) yang sudah ada. Frontend menggunakan Vite JS. Baca instruksi repository, struktur frontend/backend, router, autentikasi, database, environment, dan deployment sebelum mengedit.

- Pertahankan stack, tampilan, fitur, dan struktur aplikasi yang sudah berfungsi.
- Gunakan backend yang sudah ada. Jika repository hanya berisi frontend Vite, tambahkan backend Node.js berbahasa JavaScript dengan Express; jangan menaruh secret atau verifikasi webhook di frontend.
- Gunakan database, ORM, logger, dan sistem antrean yang sudah digunakan proyek. Contoh Prisma di dokumen ini adalah kontrak adaptasi jika proyek menggunakan Prisma.
- Jika backend memakai framework selain Express, adaptasikan handler dengan tetap menjaga raw body.
- Gunakan REST API resmi Meta. Tidak memakai API agregator, penyedia data pihak ketiga, scraping, password Instagram, atau penyimpanan kode 2FA.
- Library infrastruktur seperti Express, Prisma, dan driver database diperbolehkan; library ini bukan penyedia data Instagram.
- Implementasikan endpoint, persistence, konfigurasi, dan tes. Jangan hanya menambahkan halaman konfigurasi yang tidak memiliki endpoint nyata.
- Berikan hasil implementasi, instruksi menjalankan, variabel yang harus diisi operator, serta bukti pengujian. Jangan mengklaim deployed atau lolos verifikasi Meta sebelum dibuktikan.
- Jangan mengubah DNS, server produksi, atau pengaturan Meta otomatis. Deployment di infrastruktur pengguna dilakukan setelah implementasi lokal siap.

## 2. Masalah yang diselesaikan

Pada Meta Developer, bagian “3. Konfigurasikan webhook” meminta:
1. URL Callback.
2. Verifikasi token.
3. Opsi sertifikat klien, yang pada implementasi awal tetap nonaktif.

URL harus menuju backend publik HTTPS yang menjawab permintaan verifikasi Meta dengan challenge dalam plain text. URL frontend Vite yang hanya menampilkan index.html tidak memenuhi kontrak ini.

Webhook adalah penerima event yang didukung Meta. Endpoint ini tidak otomatis mengambil views, reach, followers, atau seluruh statistik akun. Pengambilan metrik tersebut merupakan pekerjaan API GET terjadwal setelah OAuth dan permission Insights tersedia.

## 3. Lingkup dan hasil

Termasuk dalam tahap ini:
- Endpoint GET untuk verifikasi webhook.
- Endpoint POST untuk validasi signature dan penerimaan event.
- Inbox database yang tahan restart dengan deduplikasi.
- Konfigurasi reverse proxy agar route menuju backend.
- Status kesiapan integrasi untuk admin yang sudah login.
- Tes otomatis dan panduan pengisian Meta.

Belum menjadi hasil tahap ini:
- OAuth Instagram, pertukaran dan pembaruan access token.
- Pengambilan data profil, media, dan Insights.
- Pemrosesan bisnis event komentar atau pesan.
- Otomatis membalas pesan, menerbitkan konten, atau menambah permission yang tidak diperlukan.

Event valid disimpan sebagai “received” dan harus ditampilkan sebagai belum diproses. Jangan menandainya selesai atau memperbarui angka analytics seolah sudah diproses. Sebelum berlangganan field event untuk fitur bisnis, implementasikan worker/handler fitur tersebut dan idempotensinya.

## 4. Domain dan URL

Asumsi kerja: domain DED adalah **https://katapedia.mscode.id**. Domain ini berasal dari konteks konfigurasi sebelumnya; keterjangkauan dan deployment endpoint belum diverifikasi dalam pekerjaan penyusunan dokumen ini. Ganti konfigurasi origin jika domain DED sebenarnya berbeda.

| Kegunaan | Nilai |
|---|---|
| Origin aplikasi | https://katapedia.mscode.id |
| URL Callback webhook pada screenshot | https://katapedia.mscode.id/api/integrations/instagram/webhook |
| Path backend webhook | /api/integrations/instagram/webhook |
| Endpoint status admin | /api/integrations/instagram/status |
| Contoh OAuth redirect untuk tahap berikutnya | https://katapedia.mscode.id/api/integrations/instagram/oauth/callback |

Webhook callback dan OAuth redirect adalah endpoint berbeda. URL OAuth pada tabel adalah rancangan untuk tahap berikutnya, bukan endpoint yang dianggap sudah dibuat pada tahap ini.

## 5. Variabel konfigurasi

Tempatkan secret pada environment **backend** atau secret manager deployment. Jangan menggunakan awalan VITE_ untuk secret.

```dotenv
# Environment backend; isi nilai nyata ketika deploy.
PUBLIC_APP_ORIGIN=https://katapedia.mscode.id
INSTAGRAM_WEBHOOK_APP_KEY=ded-instagram-production
INSTAGRAM_WEBHOOK_VERIFY_TOKEN=ISI_TOKEN_VERIFIKASI_PILIHAN_OPERATOR
META_WEBHOOK_APP_SECRET=ISI_APP_SECRET_APLIKASI_PEMILIK_WEBHOOK
INSTAGRAM_WEBHOOK_MAX_BODY_BYTES=1048576
INSTAGRAM_WEBHOOK_RETENTION_DAYS=7

# Gunakan konfigurasi database/backend existing.
DATABASE_URL=ISI_KONEKSI_DATABASE_EXISTING_JIKA_DIPERLUKAN_ORM
PORT=ISI_PORT_BACKEND_YANG_TERSEDIA
```

Penjelasan:
- **INSTAGRAM_WEBHOOK_VERIFY_TOKEN:** nilai acak yang dipilih operator. Nilai persis yang sama ditempel ke kolom “Verifikasi token” di Meta. Ini bukan Instagram access token dan bukan App Secret.
- **META_WEBHOOK_APP_SECRET:** App Secret untuk aplikasi yang memiliki subscription webhook. Gunakan secret yang sesuai dengan aplikasi pengirim signature webhook; kredensial produk Instagram untuk OAuth dapat berbeda, sehingga jangan menyamakan keduanya tanpa mencocokkan konfigurasi aplikasi. Secret ini dipakai memeriksa POST, bukan dimasukkan ke kolom verifikasi token.
- **INSTAGRAM_WEBHOOK_APP_KEY:** namespace internal untuk satu aplikasi Meta/environment; bukan kredensial akses API.
- **PUBLIC_APP_ORIGIN:** origin untuk membentuk URL yang ditampilkan kepada admin. Path webhook tetap sama.
- **DATABASE_URL:** gunakan environment database yang sudah digunakan repository; tidak perlu mengganti nama variabel yang sudah menjadi standar proyek.
- **PORT:** gunakan port backend existing. Jangan memindahkan service lain atau memakai port yang sedang digunakan.
- **.env.example** harus berisi placeholder. Secret produksi tidak dimasukkan ke source control, frontend, log, response status, atau bundle Vite.

Jika belum memiliki verify token, buat sekali pada mesin operator:
```bash
openssl rand -hex 32
```

Jika operator sudah menggunakan token yang diberikan dalam percakapan pendamping, pakai nilai tersebut di environment backend dan kolom Meta; jangan membuat ulang nilai yang berbeda saat restart atau deployment.

## 6. Kontrak GET — verifikasi Meta

**GET /api/integrations/instagram/webhook**

| Parameter | Aturan |
|---|---|
| hub.mode | Tepat satu nilai, harus subscribe |
| hub.verify_token | Tepat satu nilai, harus identik dengan verify token backend |
| hub.challenge | Tepat satu string tidak kosong, maksimal 512 karakter |

Perilaku:
- Parameter hilang atau berulang: HTTP 400.
- Mode atau verify token tidak cocok: HTTP 403.
- Semua valid: HTTP 200, Content-Type text/plain, body **hanya challenge**.
- Pertahankan isi challenge termasuk angka nol di depan.
- Jangan membungkus challenge menjadi JSON, HTML, atau response standar aplikasi.
- Cache-Control: no-store.
- Route dapat dipanggil Meta tanpa session/cookie pengguna DED.
- Tidak memakai App Secret sebagai pengganti verify token pada GET.
- Jangan mencatat query string webhook pada access log karena query mengandung verify token.

Contoh request:
```http
GET /api/integrations/instagram/webhook?hub.mode=subscribe&hub.verify_token=TOKEN_YANG_SAMA&hub.challenge=00012345
```

Response yang benar:
```text
00012345
```

## 7. Kontrak POST — penerimaan event

**POST /api/integrations/instagram/webhook**

- Menerima application/json dengan ukuran maksimal 1 MiB.
- Akses endpoint menggunakan signature Meta, bukan JWT atau login frontend.
- Baca raw bytes sebelum middleware JSON melakukan parsing.
- Periksa header X-Hub-Signature-256 dengan format sha256=<64 karakter hex>.
- Hitung HMAC-SHA256 atas raw body menggunakan App Secret webhook yang sesuai.
- Bandingkan digest berukuran sama dengan timingSafeEqual.
- Signature hilang, salah format, atau tidak cocok: HTTP 403; jangan simpan payload.
- Content type/encoding tidak didukung: HTTP 415. Contoh handler menolak payload terkompresi agar raw bytes tidak diubah middleware.
- Body melampaui limit: HTTP 413.
- Signature valid tetapi JSON/envelope rusak: HTTP 400.
- Envelope untuk inbox setidaknya memiliki object berupa string dan entry berupa array.
- Simpan delivery ke inbox database melalui operasi atomik idempotent, baru kirim HTTP 200 dengan EVENT_RECEIVED.
- Jika database/inbox gagal menyimpan: HTTP 503; jangan mengirim acknowledgement sukses.
- Object yang sah signature-nya tetapi bukan instagram dicatat sebagai ignored dan di-ack setelah penyimpanan, agar tidak menimbulkan retry tanpa akhir.
- Jangan mengasumsikan semua payload berisi entry[].changes; event messaging mempunyai bentuk berbeda.
- Jangan memproses event sebagai perubahan angka followers/views tanpa endpoint dan semantik resmi yang sesuai.

## 8. Inbox database dan batas tenant

Tambahkan model ekuivalen pada ORM yang sudah digunakan:

```prisma
model InstagramWebhookDelivery {
  id          String   @id @default(cuid())
  deliveryKey String   @unique
  appKey      String
  provider    String   @default("instagram")
  payload     Json
  status      String   @default("received")
  receivedAt  DateTime @default(now())

  @@index([status, receivedAt])
  @@index([receivedAt])
}
```

Aturan persistence:
- deliveryKey adalah SHA-256 dari appKey, pemisah null, dan raw body. Pengiriman ulang body identik pada aplikasi yang sama tidak menambah baris.
- Deduplikasi digest delivery tidak menggantikan idempotensi event bisnis. Worker masa depan perlu memakai event ID/message ID dan semantik update yang sesuai.
- Inbox adalah data internal; satu delivery dapat berisi beberapa entry dan tidak boleh diasumsikan milik satu tenant dari parameter URL.
- Worker masa depan harus memetakan ID akun Instagram ke koneksi aktif di database sebelum menulis data tenant.
- Jangan menerima tenantId yang dikirim klien atau payload sebagai bukti otorisasi.
- Akun yang belum dikenal dicatat sebagai belum terpetakan/ignored; tidak dialokasikan ke tenant default.
- Endpoint status admin tidak mengembalikan payload mentah.
- Akses payload hanya untuk operator yang berwenang sesuai RBAC proyek.
- Jalankan cleanup dengan retensi default 7 hari. Hitung antrian received yang belum selesai sebelum cleanup; beri peringatan operasional jika masih ada yang belum ditangani, jangan mengklaim event itu telah diproses.
- Untuk penyimpanan bisnis jangka panjang gunakan tabel khusus setelah fitur/izin ditetapkan, bukan memperpanjang retensi inbox tanpa batas.

Contoh adapter Prisma:

```javascript
async function enqueueDelivery(delivery) {
  await prisma.instagramWebhookDelivery.upsert({
    where: { deliveryKey: delivery.deliveryKey },
    update: {},
    create: delivery,
  });
}
```

Gunakan transaksi dan operasi idempotent ekuivalen jika ORM berbeda. Jangan memakai array JavaScript, Map, atau queue in-memory sebagai pengganti persistence produksi.

## 9. Integrasi backend dan Vite

Jika backend Express:
1. Buat module referensi pada bagian 15, atau padanannya sesuai pola repository.
2. Pasang handler pada route spesifik **sebelum** express.json(), express.urlencoded(), session/JWT guard global, atau middleware lain yang mengonsumsi body.
3. Auth global untuk route lain tetap berlaku; bypass hanya route webhook ini, dengan validasi token/signature yang dijelaskan.
4. Reuse koneksi ORM existing, jangan membuka koneksi database per request.
5. Baca App Secret dan verify token dari environment backend.
6. Terapkan request timeout/body limit di server dan proxy.
7. Jangan merekonstruksi raw body menggunakan JSON.stringify(req.body). Signature memerlukan bytes asli.

Contoh wiring:
```javascript
import express from 'express';
import { createInstagramWebhookHandler } from './instagram-webhook.mjs';
// prisma adalah client existing yang sudah diinisialisasi repository.

const app = express();

const instagramWebhook = createInstagramWebhookHandler({
  verifyToken: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN,
  appSecret: process.env.META_WEBHOOK_APP_SECRET,
  appKey: process.env.INSTAGRAM_WEBHOOK_APP_KEY,
  maxBodyBytes: Number(process.env.INSTAGRAM_WEBHOOK_MAX_BODY_BYTES || 1048576),
  enqueueDelivery: async (delivery) => {
    await prisma.instagramWebhookDelivery.upsert({
      where: { deliveryKey: delivery.deliveryKey },
      update: {},
      create: delivery,
    });
  },
  onOperationalError: ({ code }) => {
    console.error('Instagram webhook operational error', { code });
  },
});

// Harus dipasang sebelum body parser dan auth global.
app.all('/api/integrations/instagram/webhook', (req, res) => {
  void instagramWebhook(req, res);
});

app.use(express.json());
// Pasang middleware/router existing lainnya setelah urutan disesuaikan.
```

Frontend Vite:
- Reuse halaman pengaturan/integrasi existing. Jika belum ada, tambahkan panel kecil di area admin.
- Tampilkan URL webhook, status backend terkonfigurasi, dan waktu event terakhir yang sudah tersimpan.
- Status “terkonfigurasi” berarti environment/persistence siap; bukan “telah terverifikasi di Meta”.
- Tampilkan “verifikasi Meta belum dikonfirmasi” sampai ada bukti konfigurasi operator atau API resmi yang sesuai.
- Tampilkan bahwa OAuth/akun Instagram belum tersambung jika tahap tersebut belum dibuat.
- Jangan menampilkan App Secret, access token, atau verify token dalam frontend.
- Jangan membuat grafik dummy yang tampak seperti data Instagram nyata.
- Jika menampilkan jumlah event, jelaskan sebagai jumlah notifikasi tersimpan, bukan views/engagement.
- Batasi endpoint status dengan autentikasi dan RBAC sesuai proyek; informasi lintas tenant hanya untuk operator platform.

## 10. Reverse proxy dan HTTPS

Endpoint publik harus langsung menuju backend, dengan path dan query utuh:
https://katapedia.mscode.id/api/integrations/instagram/webhook

- Route webhook diprioritaskan sebelum fallback SPA/index.html.
- Izinkan metode GET dan POST.
- Pertahankan header X-Hub-Signature-256 dan raw body.
- Jangan memaksa session login atau challenge interaktif Cloudflare pada route tersebut.
- Jangan menambahkan rewrite ke halaman Vite, redirect ke login, atau slash-normalization redirect pada URL yang didaftarkan.
- Gunakan sertifikat HTTPS publik yang valid dan hostname yang sama.
- Terapkan body limit yang konsisten, maksimal 1 MiB pada handler referensi.
- Redaksi query string pada access log, atau nonaktifkan access log spesifik route ini lalu gunakan log metadata dari backend.
- Pada arsitektur Nginx → Apache → backend, semua lapisan harus meneruskan route ini sampai service backend existing.
- Gunakan port/upstream yang benar-benar tersedia di konfigurasi proyek. Jangan menyalin port contoh sebagai fakta infrastruktur.
- Jangan mengubah keseluruhan vhost jika aturan /api existing sudah meneruskan request dengan benar.

Opsi “Lampirkan sertifikat klien ke permintaan Webhook” tetap **nonaktif** pada tahap ini. Opsi tersebut memerlukan konfigurasi mutual TLS tersendiri; berbeda dengan HTTPS biasa.

## 11. Deployment dan pengisian Meta

1. Implementasikan endpoint dan migrasi inbox.
2. Isi environment backend; lakukan migrasi sesuai prosedur proyek.
3. Jalankan tes lokal dan build frontend/backend.
4. Deploy/restart backend dan pastikan reverse proxy benar.
5. Uji URL publik dengan challenge. Jangan langsung menempel URL yang masih mengembalikan index.html.
6. Setelah respons publik benar, isi Meta:
   - URL Callback: https://katapedia.mscode.id/api/integrations/instagram/webhook
   - Verifikasi token: nilai persis INSTAGRAM_WEBHOOK_VERIFY_TOKEN pada runtime backend.
   - Sertifikat klien: nonaktif.
7. Klik “Verifikasi dan simpan”.
8. Screenshot menyatakan aplikasi harus diterbitkan untuk menerima webhook; penuhi persyaratan mode aplikasi, izin, serta subscription yang berlaku sebelum mengharapkan event akun nyata.
9. Verifikasi endpoint tidak otomatis menerbitkan aplikasi atau memberikan Advanced Access.
10. Pilih field subscription hanya ketika event tersebut dibutuhkan dan handler bisnisnya telah dibuat. Jangan mengaktifkan DM/publishing semata-mata untuk membaca followers atau Insights.
11. Otorisasi akun/subscription per akun yang diperlukan merupakan tahap terpisah dari verifikasi URL aplikasi.

## 12. Uji manual

Gunakan verify token dari environment shell operator. Jangan memasukkan token nyata ke source control.

```bash
curl --get --fail-with-body \
  'https://katapedia.mscode.id/api/integrations/instagram/webhook' \
  --data-urlencode 'hub.mode=subscribe' \
  --data-urlencode "hub.verify_token=$INSTAGRAM_WEBHOOK_VERIFY_TOKEN" \
  --data-urlencode 'hub.challenge=00012345'
```

Harus memperoleh HTTP 200 dengan body persis 00012345 dan Content-Type text/plain.

Tes berikutnya:
- Token salah → 403.
- Parameter challenge hilang → 400.
- POST tanpa signature → 403.
- POST dengan signature valid atas raw bytes → 200 setelah baris inbox tersimpan.
- POST duplikat → 200, baris inbox tetap satu.
- Ubah satu byte pada body tetapi pertahankan signature → 403.
- Inbox/database tidak tersedia → 503.
- Konten lebih dari limit, termasuk chunked transfer → 413.
- GET webhook dari internet tidak mengembalikan HTML frontend.

Endpoint GET biasa tanpa parameter mengembalikan 400 adalah perilaku yang benar, bukan berarti endpoint mati.

## 13. Kriteria penerimaan

| ID | Kriteria |
|---|---|
| AC-01 | Challenge dikembalikan plain text persis, termasuk nol di depan |
| AC-02 | Mode/token salah ditolak 403; parameter hilang/berulang ditolak 400 |
| AC-03 | Secret tidak berada pada environment VITE_, bundle, UI, log, atau repository |
| AC-04 | POST memeriksa HMAC-SHA256 atas raw bytes dengan App Secret yang sesuai |
| AC-05 | Signature tidak sah tidak menambah data inbox |
| AC-06 | Valid delivery disimpan atomik sebelum 200 |
| AC-07 | Pengiriman ulang identik tidak menambah baris |
| AC-08 | Kegagalan storage menghasilkan 503 |
| AC-09 | Route publik melewati proxy sampai backend, bukan SPA/login |
| AC-10 | Status admin tidak menyatakan akun tersambung/Meta verified tanpa bukti |
| AC-11 | Tidak ada perubahan angka analytics dari event yang belum ditangani |
| AC-12 | Retensi dan akses inbox mengikuti batas yang dijelaskan |
| AC-13 | Field subscription yang belum punya handler bisnis tidak diaktifkan |

## 14. Hasil pengujian referensi dan batas validasi

Module pada bagian 15 telah diuji lokal menggunakan Node.js v24.19.0 dengan 9 tes HTTP pada bagian 16: challenge dan parameter, signature/raw bytes, deduplikasi melalui adapter uji, JSON/envelope, object tidak didukung, kegagalan storage, body limit termasuk chunked, pembatasan metode/content type, serta konfigurasi yang tidak lengkap.

Adapter persistence pada tes adalah Map untuk membuktikan kontrak handler, **hanya untuk tes**. Adapter database produksi, migrasi, wiring Express proyek, URL publik, serta verifikasi Meta belum diuji karena repository DED, akses deployment, dan kredensial Meta tidak diberikan dalam permintaan ini. Antigravity harus menjalankan pengujian integrasi tambahan terhadap database dan reverse proxy yang benar-benar digunakan.

## 15. Module backend referensi

Simpan sebagai module JavaScript ESM pada backend, misalnya integrations/instagram/instagram-webhook.mjs. Handler ini tidak memerlukan SDK Instagram atau layanan data pihak ketiga; dependensinya adalah modul bawaan Node.js. Gunakan Node.js 22 atau lebih baru yang didukung lingkungan proyek dan cocokkan runtime saat pengujian.

```javascript
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const WEBHOOK_PATH = '/api/integrations/instagram/webhook';

function equalSecret(left, right) {
  const a = Buffer.from(left, 'utf8');
  const b = Buffer.from(right, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

function respond(res, status, text) {
  if (res.destroyed || res.writableEnded) return;
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Length': Buffer.byteLength(text),
  });
  res.end(text);
}

class BodyLimitError extends Error {}

async function readRawBody(req, limit) {
  const chunks = [];
  let bytes = 0;
  // Keep the socket usable so an oversized request can receive HTTP 413.
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    bytes += chunk.length;
    if (bytes > limit) {
      req.resume();
      throw new BodyLimitError();
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks, bytes);
}

export function createInstagramWebhookHandler({
  verifyToken,
  appSecret,
  appKey,
  enqueueDelivery,
  maxBodyBytes = 1024 * 1024,
  onOperationalError = () => {},
}) {
  for (const [name, value] of Object.entries({ verifyToken, appSecret, appKey })) {
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error(`Missing webhook configuration: ${name}`);
    }
  }
  if (typeof enqueueDelivery !== 'function') {
    throw new Error('A durable enqueueDelivery adapter is required');
  }
  if (!Number.isSafeInteger(maxBodyBytes) || maxBodyBytes <= 0) {
    throw new Error('Invalid webhook body limit');
  }
  const report = (code) => {
    // Emit only a stable error code, never URLs, tokens, payloads or DB errors.
    try { onOperationalError({ code }); } catch {}
  };

  return async function instagramWebhook(req, res) {
    try {
      const url = new URL(req.originalUrl ?? req.url, 'http://localhost');
      if (url.pathname !== WEBHOOK_PATH) {
        req.resume();
        return respond(res, 404, 'NOT_FOUND');
      }

      if (req.method === 'GET') {
        const keys = ['hub.mode', 'hub.verify_token', 'hub.challenge'];
        if (keys.some((key) => url.searchParams.getAll(key).length !== 1)) {
          return respond(res, 400, 'INVALID_VERIFICATION_PARAMETERS');
        }
        const mode = url.searchParams.get('hub.mode');
        const suppliedToken = url.searchParams.get('hub.verify_token');
        const challenge = url.searchParams.get('hub.challenge');
        if (suppliedToken.length > 1024 || challenge.length === 0 || challenge.length > 512) {
          return respond(res, 400, 'INVALID_VERIFICATION_PARAMETERS');
        }
        if (mode !== 'subscribe' || !equalSecret(suppliedToken, verifyToken)) {
          return respond(res, 403, 'VERIFICATION_FAILED');
        }
        // Preserve the challenge exactly, including any leading zeroes.
        return respond(res, 200, challenge);
      }

      if (req.method !== 'POST') {
        req.resume();
        res.setHeader('Allow', 'GET, POST');
        return respond(res, 405, 'METHOD_NOT_ALLOWED');
      }

      const signature = req.headers['x-hub-signature-256'];
      if (typeof signature !== 'string' || !/^sha256=[a-fA-F0-9]{64}$/.test(signature)) {
        req.resume();
        return respond(res, 403, 'INVALID_SIGNATURE');
      }
      const contentType = String(req.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
      const contentEncoding = String(req.headers['content-encoding'] ?? 'identity').toLowerCase();
      if (contentType !== 'application/json' || contentEncoding !== 'identity') {
        req.resume();
        return respond(res, 415, 'UNSUPPORTED_CONTENT_TYPE_OR_ENCODING');
      }
      if (Number(req.headers['content-length'] ?? 0) > maxBodyBytes) {
        req.resume();
        return respond(res, 413, 'PAYLOAD_TOO_LARGE');
      }
      // Mount before any middleware that consumes or parses the request stream.
      if (req.body !== undefined || req.readableEnded) {
        report('RAW_BODY_UNAVAILABLE');
        return respond(res, 500, 'WEBHOOK_BODY_CONFIGURATION_ERROR');
      }

      let rawBody;
      try {
        rawBody = await readRawBody(req, maxBodyBytes);
      } catch (error) {
        if (error instanceof BodyLimitError) return respond(res, 413, 'PAYLOAD_TOO_LARGE');
        return respond(res, 400, 'BODY_READ_FAILED');
      }
      const expected = createHmac('sha256', appSecret).update(rawBody).digest();
      const supplied = Buffer.from(signature.slice(7), 'hex');
      if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
        return respond(res, 403, 'INVALID_SIGNATURE');
      }

      let payload;
      try {
        payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(rawBody));
      } catch {
        return respond(res, 400, 'INVALID_JSON');
      }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)
          || typeof payload.object !== 'string' || !Array.isArray(payload.entry)) {
        return respond(res, 400, 'INVALID_PAYLOAD');
      }
      const deliveryKey = createHash('sha256').update(appKey).update('\0').update(rawBody).digest('hex');
      try {
        await enqueueDelivery({
          deliveryKey,
          appKey,
          provider: 'instagram',
          payload,
          status: payload.object === 'instagram' ? 'received' : 'ignored',
          receivedAt: new Date(),
        });
      } catch {
        report('WEBHOOK_INBOX_UNAVAILABLE');
        return respond(res, 503, 'DELIVERY_STORE_UNAVAILABLE');
      }
      // Acknowledge only after durable storage (or an existing duplicate) succeeds.
      return respond(res, 200, 'EVENT_RECEIVED');
    } catch {
      report('WEBHOOK_UNEXPECTED_ERROR');
      return respond(res, 500, 'WEBHOOK_INTERNAL_ERROR');
    }
  };
}
```

## 16. Tes referensi

Simpan sebagai instagram-webhook.test.mjs di sebelah module referensi:
```bash
node --test path/ke/instagram-webhook.test.mjs
```

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { createServer, request as httpRequest } from 'node:http';
import { createInstagramWebhookHandler } from './instagram-webhook.mjs';

const verifyToken = 'local-test-verification-token';
const appSecret = 'local-test-app-secret';
const path = '/api/integrations/instagram/webhook';
const raw = '{ "object": "instagram", "entry": [{"id":"123", "changes":[]}] }';

async function fixture(t, options = {}) {
  const deliveries = new Map();
  const handler = createInstagramWebhookHandler({
    verifyToken, appSecret, appKey: 'test-app',
    enqueueDelivery: async (delivery) => {
      if (!deliveries.has(delivery.deliveryKey)) deliveries.set(delivery.deliveryKey, delivery);
    },
    ...options,
  });
  const server = createServer(handler);
  server.requestTimeout = 10000;
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return { url: `http://127.0.0.1:${server.address().port}`, deliveries };
}

function signedHeaders(body = raw, secret = appSecret) {
  return {
    'Content-Type': 'application/json',
    'X-Hub-Signature-256': 'sha256=' + createHmac('sha256', secret).update(body).digest('hex'),
  };
}

test('GET returns exact plain challenge, wrong tokens and duplicate parameters fail', async (t) => {
  const { url } = await fixture(t);
  const params = new URLSearchParams({ 'hub.mode': 'subscribe', 'hub.verify_token': verifyToken, 'hub.challenge': '000123' });
  const good = await fetch(url + path + '?' + params);
  assert.equal(good.status, 200);
  assert.equal(await good.text(), '000123');
  assert.match(good.headers.get('content-type'), /^text\/plain/);
  assert.equal(good.headers.get('cache-control'), 'no-store');
  params.set('hub.verify_token', 'wrong');
  assert.equal((await fetch(url + path + '?' + params)).status, 403);
  params.append('hub.verify_token', verifyToken);
  assert.equal((await fetch(url + path + '?' + params)).status, 400);
  assert.equal((await fetch(url + path)).status, 400);
});

test('POST verifies original bytes and produces a stable deduplication key', async (t) => {
  const { url, deliveries } = await fixture(t);
  for (let n = 0; n < 2; n++) {
    const response = await fetch(url + path, { method: 'POST', headers: signedHeaders(), body: raw });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'EVENT_RECEIVED');
  }
  assert.equal(deliveries.size, 1);
  assert.equal([...deliveries.values()][0].status, 'received');
  const tampered = await fetch(url + path, { method: 'POST', headers: signedHeaders(), body: raw + ' ' });
  assert.equal(tampered.status, 403);
  assert.equal(deliveries.size, 1);
});

test('POST rejects missing and malformed signatures without enqueueing', async (t) => {
  const { url, deliveries } = await fixture(t);
  for (const signature of [undefined, 'sha256=x', 'sha1=' + 'a'.repeat(40)]) {
    const headers = { 'Content-Type': 'application/json' };
    if (signature) headers['X-Hub-Signature-256'] = signature;
    assert.equal((await fetch(url + path, { method: 'POST', headers, body: raw })).status, 403);
  }
  assert.equal(deliveries.size, 0);
});

test('signed invalid JSON and schema return 400', async (t) => {
  const { url, deliveries } = await fixture(t);
  for (const body of ['{', 'null', '{"entry":[]}', '{"object":"instagram","entry":null}']) {
    assert.equal((await fetch(url + path, { method: 'POST', headers: signedHeaders(body), body })).status, 400);
  }
  assert.equal(deliveries.size, 0);
});

test('unsupported signed objects are durably recorded as ignored', async (t) => {
  const { url, deliveries } = await fixture(t);
  const body = '{"object":"page","entry":[]}';
  assert.equal((await fetch(url + path, { method: 'POST', headers: signedHeaders(body), body })).status, 200);
  assert.equal([...deliveries.values()][0].status, 'ignored');
});

test('POST does not acknowledge a failed durable write', async (t) => {
  const { url } = await fixture(t, { enqueueDelivery: async () => { throw new Error('test failure'); } });
  const response = await fetch(url + path, { method: 'POST', headers: signedHeaders(), body: raw });
  assert.equal(response.status, 503);
  assert.equal(await response.text(), 'DELIVERY_STORE_UNAVAILABLE');
});

test('body limits apply with content length and chunked transfer', async (t) => {
  const { url, deliveries } = await fixture(t, { maxBodyBytes: 16 });
  assert.equal((await fetch(url + path, { method: 'POST', headers: signedHeaders(), body: raw })).status, 413);
  const target = new URL(url + path);
  const status = await new Promise((resolve, reject) => {
    const request = httpRequest(target, { method: 'POST', headers: signedHeaders() }, (response) => {
      response.resume();
      response.once('end', () => resolve(response.statusCode));
    });
    request.once('error', reject);
    request.write(raw.slice(0, 20));
    request.end(raw.slice(20));
  });
  assert.equal(status, 413);
  assert.equal(deliveries.size, 0);
});

test('HTTP methods, paths, media type and encoding are restricted', async (t) => {
  const { url } = await fixture(t);
  assert.equal((await fetch(url + path, { method: 'PUT' })).status, 405);
  assert.equal((await fetch(url + '/not-the-webhook')).status, 404);
  assert.equal((await fetch(url + path, { method: 'POST', headers: { ...signedHeaders(), 'Content-Type': 'text/plain' }, body: raw })).status, 415);
  assert.equal((await fetch(url + path, { method: 'POST', headers: { ...signedHeaders(), 'Content-Encoding': 'gzip' }, body: raw })).status, 415);
});

test('configuration fails closed for missing secrets or durable adapter', () => {
  const base = { verifyToken, appSecret, appKey: 'test-app', enqueueDelivery: async () => {} };
  for (const key of ['verifyToken', 'appSecret', 'appKey', 'enqueueDelivery']) {
    assert.throws(() => createInstagramWebhookHandler({ ...base, [key]: undefined }));
  }
});
```

Tambahkan tes integrasi ORM yang membuktikan upsert/deduplikasi pada database sesungguhnya, isolasi akses status admin, serta smoke test reverse proxy publik.

## 17. Rujukan

- [Meta — Webhooks Getting Started](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/)
- [Meta — Instagram Platform Webhooks](https://developers.facebook.com/docs/instagram-platform/webhooks)
- [Meta — Instagram Login Get Started](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started)
- [Meta sample app — signature webhook dan secret server](https://github.com/fbsamples/business-messaging-sample-tech-provider-app/blob/main/CONTRIBUTING.md)
- [Meta sample — verification challenge](https://github.com/fbsamples/whatsapp-api-examples/blob/main/signature-validation-with-webhooks-payloads/app.py)

Rujukan sample lintas produk digunakan hanya untuk pola verifikasi webhook Meta. Payload, permission, subscription, dan fitur Instagram tetap harus mengikuti dokumentasi Instagram yang berlaku. Sebagian halaman dokumentasi Meta menolak pembacaan otomatis saat penyusunan; cocokkan label menu dan ketentuan akses terbaru melalui dashboard Meta sebelum mengaktifkan subscription.

