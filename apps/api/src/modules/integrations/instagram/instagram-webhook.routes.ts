import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { prisma } from '@katapedia/database';

export const DEFAULT_WEBHOOK_PATH = '/api/integrations/instagram/webhook';

function equalSecret(left: string, right: string): boolean {
  const a = Buffer.from(left, 'utf8');
  const b = Buffer.from(right, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface InstagramWebhookConfig {
  verifyToken: string;
  appSecret: string;
  appKey: string;
  publicAppOrigin: string;
  maxBodyBytes: number;
  retentionDays: number;
}

export function getInstagramWebhookConfig(): InstagramWebhookConfig {
  return {
    verifyToken: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'ded_ig_58b5bac5ff337238301eb77a4cabe026fc9d284819cc341a',
    appSecret: process.env.META_WEBHOOK_APP_SECRET || 'ISI_APP_SECRET_APLIKASI_PEMILIK_WEBHOOK',
    appKey: process.env.INSTAGRAM_WEBHOOK_APP_KEY || 'ded-instagram-production',
    publicAppOrigin: process.env.PUBLIC_APP_ORIGIN || 'https://katapedia.mscode.id',
    maxBodyBytes: Number(process.env.INSTAGRAM_WEBHOOK_MAX_BODY_BYTES) || 1048576, // 1 MiB
    retentionDays: Number(process.env.INSTAGRAM_WEBHOOK_RETENTION_DAYS) || 7
  };
}

export async function instagramWebhookRoutes(app: FastifyInstance) {
  const config = getInstagramWebhookConfig();

  // Scoped content type parser for application/json within this plugin:
  // Preserves raw bytes as Buffer to ensure exact HMAC-SHA256 signature verification.
  app.addContentTypeParser('application/json', { parseAs: 'buffer' }, (req, body, done) => {
    (req.raw as any).rawBody = body;
    (req as any).rawBody = body;
    done(null, body);
  });

  // Also support any other content type so we can return custom HTTP 415 instead of fastify default
  app.addContentTypeParser('*', { parseAs: 'buffer' }, (req, body, done) => {
    (req.raw as any).rawBody = body;
    (req as any).rawBody = body;
    done(null, body);
  });

  /**
   * 1. GET /webhook — Verification handshake by Meta
   * Contract as defined in PRD Section 6:
   * Returns exact plain text challenge (no JSON wrapping, no quotes, preserves leading zeroes).
   */
  app.get('/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    const rawUrl = request.raw.url || request.url;
    const url = new URL(rawUrl, 'http://localhost');

    const keys = ['hub.mode', 'hub.verify_token', 'hub.challenge'];
    if (keys.some((key) => url.searchParams.getAll(key).length !== 1)) {
      return reply
        .status(400)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .header('X-Content-Type-Options', 'nosniff')
        .send('INVALID_VERIFICATION_PARAMETERS');
    }

    const mode = url.searchParams.get('hub.mode') || '';
    const suppliedToken = url.searchParams.get('hub.verify_token') || '';
    const challenge = url.searchParams.get('hub.challenge') || '';

    if (suppliedToken.length > 1024 || challenge.length === 0 || challenge.length > 512) {
      return reply
        .status(400)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .header('X-Content-Type-Options', 'nosniff')
        .send('INVALID_VERIFICATION_PARAMETERS');
    }

    if (mode !== 'subscribe' || !equalSecret(suppliedToken, config.verifyToken)) {
      return reply
        .status(403)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .header('X-Content-Type-Options', 'nosniff')
        .send('VERIFICATION_FAILED');
    }

    // Preserve challenge verbatim including any leading zeroes
    return reply
      .status(200)
      .type('text/plain; charset=utf-8')
      .header('Cache-Control', 'no-store')
      .header('X-Content-Type-Options', 'nosniff')
      .send(challenge);
  });

  /**
   * 2. POST /webhook — Event Delivery by Meta
   * Contract as defined in PRD Section 7:
   * Validates X-Hub-Signature-256 against raw body bytes.
   * Performs deduplication and durable storage into InstagramWebhookDelivery inbox.
   */
  app.post('/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Check Content-Type & Content-Encoding
    const contentType = String(request.headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
    const contentEncoding = String(request.headers['content-encoding'] ?? 'identity').toLowerCase();

    if (contentType !== 'application/json' || contentEncoding !== 'identity') {
      return reply
        .status(415)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('UNSUPPORTED_CONTENT_TYPE_OR_ENCODING');
    }

    // 2. Check Content-Length limit
    const contentLength = Number(request.headers['content-length'] ?? 0);
    if (contentLength > config.maxBodyBytes) {
      return reply
        .status(413)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('PAYLOAD_TOO_LARGE');
    }

    // 3. Check Signature Header
    const signature = request.headers['x-hub-signature-256'];
    if (typeof signature !== 'string' || !/^sha256=[a-fA-F0-9]{64}$/.test(signature)) {
      return reply
        .status(403)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('INVALID_SIGNATURE');
    }

    // 4. Retrieve Raw Body Buffer
    const rawBody: Buffer = (request as any).rawBody || (request.raw as any).rawBody || (request.body as Buffer);
    if (!Buffer.isBuffer(rawBody)) {
      app.log.error('Raw body buffer unavailable for signature verification');
      return reply
        .status(500)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('WEBHOOK_BODY_CONFIGURATION_ERROR');
    }

    if (rawBody.length > config.maxBodyBytes) {
      return reply
        .status(413)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('PAYLOAD_TOO_LARGE');
    }

    // 5. Verify HMAC-SHA256 signature
    const expected = createHmac('sha256', config.appSecret).update(rawBody).digest();
    const supplied = Buffer.from(signature.slice(7), 'hex');

    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
      return reply
        .status(403)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('INVALID_SIGNATURE');
    }

    // 6. Parse and validate JSON envelope
    let payload: any;
    try {
      payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(rawBody));
    } catch {
      return reply
        .status(400)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('INVALID_JSON');
    }

    if (
      !payload ||
      typeof payload !== 'object' ||
      Array.isArray(payload) ||
      typeof payload.object !== 'string' ||
      !Array.isArray(payload.entry)
    ) {
      return reply
        .status(400)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('INVALID_PAYLOAD');
    }

    // 7. Atomic Idempotent Persistence into Database Inbox
    const deliveryKey = createHash('sha256')
      .update(config.appKey)
      .update('\0')
      .update(rawBody)
      .digest('hex');

    try {
      await prisma.instagramWebhookDelivery.upsert({
        where: { deliveryKey },
        update: {},
        create: {
          deliveryKey,
          appKey: config.appKey,
          provider: 'instagram',
          payload,
          status: payload.object === 'instagram' ? 'received' : 'ignored',
          receivedAt: new Date()
        }
      });
    } catch (err: any) {
      app.log.error({ err }, 'Failed to persist Instagram webhook delivery');
      return reply
        .status(503)
        .type('text/plain; charset=utf-8')
        .header('Cache-Control', 'no-store')
        .send('DELIVERY_STORE_UNAVAILABLE');
    }

    // 8. Reply 200 EVENT_RECEIVED plain text after durable storage
    return reply
      .status(200)
      .type('text/plain; charset=utf-8')
      .header('Cache-Control', 'no-store')
      .header('X-Content-Type-Options', 'nosniff')
      .send('EVENT_RECEIVED');
  });

  /**
   * 3. GET /status — Status endpoint for Admin Dashboard
   * As defined in PRD Section 9:
   * Returns readiness state, callback URL, and delivery statistics.
   * Does NOT leak secret keys or tokens.
   */
  app.get('/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const isConfigured = Boolean(
      config.verifyToken &&
      config.appSecret &&
      config.appSecret !== 'ISI_APP_SECRET_APLIKASI_PEMILIK_WEBHOOK'
    );

    const [totalDeliveries, receivedCount, ignoredCount, latestDelivery] = await Promise.all([
      prisma.instagramWebhookDelivery.count(),
      prisma.instagramWebhookDelivery.count({ where: { status: 'received' } }),
      prisma.instagramWebhookDelivery.count({ where: { status: 'ignored' } }),
      prisma.instagramWebhookDelivery.findFirst({
        orderBy: { receivedAt: 'desc' },
        select: { receivedAt: true, status: true }
      })
    ]);

    return {
      data: {
        configured: isConfigured,
        webhookUrl: `${config.publicAppOrigin}/api/integrations/instagram/webhook`,
        appKey: config.appKey,
        provider: 'instagram',
        metaVerificationStatus: 'pending_meta_verification',
        oauthConnectionStatus: 'not_connected_next_phase',
        totalDeliveries,
        receivedCount,
        ignoredCount,
        lastReceivedAt: latestDelivery?.receivedAt ? latestDelivery.receivedAt.toISOString() : null,
        retentionDays: config.retentionDays,
        instructions: {
          callbackUrl: `${config.publicAppOrigin}/api/integrations/instagram/webhook`,
          clientCertificate: 'DISABLED',
          note: 'Verifikasi endpoint di Meta Developer menggunakan Callback URL dan Verifikasi Token yang sama.'
        }
      },
      meta: {
        requestId: request.id,
        timestamp: new Date().toISOString()
      }
    };
  });
}
