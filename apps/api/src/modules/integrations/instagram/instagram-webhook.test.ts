import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import fastify, { FastifyInstance } from 'fastify';
import { instagramWebhookRoutes } from './instagram-webhook.routes.js';

const verifyToken = 'ded_ig_58b5bac5ff337238301eb77a4cabe026fc9d284819cc341a';
const appSecret = 'local-test-app-secret-12345';
const path = '/api/integrations/instagram/webhook';
const raw = JSON.stringify({ object: 'instagram', entry: [{ id: '123456789', changes: [] }] });

function signedHeaders(body: string = raw, secret: string = appSecret) {
  return {
    'content-type': 'application/json',
    'x-hub-signature-256': 'sha256=' + createHmac('sha256', secret).update(Buffer.from(body, 'utf8')).digest('hex')
  };
}

async function createTestApp(): Promise<FastifyInstance> {
  process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN = verifyToken;
  process.env.META_WEBHOOK_APP_SECRET = appSecret;
  process.env.INSTAGRAM_WEBHOOK_APP_KEY = 'test-app';
  process.env.PUBLIC_APP_ORIGIN = 'https://katapedia.mscode.id';

  const app = fastify();
  await app.register(instagramWebhookRoutes, { prefix: '/api/integrations/instagram' });
  await app.ready();
  return app;
}

test('1. GET returns exact plain challenge, wrong tokens and duplicate parameters fail', async () => {
  const app = await createTestApp();

  // Valid verification request
  const validRes = await app.inject({
    method: 'GET',
    url: `${path}?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=00012345`
  });

  assert.equal(validRes.statusCode, 200);
  assert.equal(validRes.body, '00012345');
  assert.match(validRes.headers['content-type'] || '', /^text\/plain/);
  assert.equal(validRes.headers['cache-control'], 'no-store');

  // Wrong token returns 403
  const wrongTokenRes = await app.inject({
    method: 'GET',
    url: `${path}?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=00012345`
  });
  assert.equal(wrongTokenRes.statusCode, 403);
  assert.equal(wrongTokenRes.body, 'VERIFICATION_FAILED');

  // Missing parameters return 400
  const missingRes = await app.inject({
    method: 'GET',
    url: path
  });
  assert.equal(missingRes.statusCode, 400);

  // Duplicate parameters return 400
  const dupRes = await app.inject({
    method: 'GET',
    url: `${path}?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.verify_token=${verifyToken}&hub.challenge=00012345`
  });
  assert.equal(dupRes.statusCode, 400);

  await app.close();
});

test('2. POST verifies original bytes and accepts signed event payload', async () => {
  const app = await createTestApp();

  const res = await app.inject({
    method: 'POST',
    url: path,
    headers: signedHeaders(raw),
    payload: Buffer.from(raw, 'utf8')
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, 'EVENT_RECEIVED');

  // Tampered payload with valid signature for previous bytes returns 403
  const tamperedRes = await app.inject({
    method: 'POST',
    url: path,
    headers: signedHeaders(raw),
    payload: Buffer.from(raw + ' ', 'utf8')
  });

  assert.equal(tamperedRes.statusCode, 403);
  assert.equal(tamperedRes.body, 'INVALID_SIGNATURE');

  await app.close();
});

test('3. POST rejects missing and malformed signatures', async () => {
  const app = await createTestApp();

  // Missing signature
  const missingSig = await app.inject({
    method: 'POST',
    url: path,
    headers: { 'content-type': 'application/json' },
    payload: Buffer.from(raw, 'utf8')
  });
  assert.equal(missingSig.statusCode, 403);

  // Malformed signature (sha1 instead of sha256)
  const malformedSig = await app.inject({
    method: 'POST',
    url: path,
    headers: {
      'content-type': 'application/json',
      'x-hub-signature-256': 'sha1=' + 'a'.repeat(40)
    },
    payload: Buffer.from(raw, 'utf8')
  });
  assert.equal(malformedSig.statusCode, 403);

  await app.close();
});

test('4. Signed invalid JSON and schema return 400', async () => {
  const app = await createTestApp();

  for (const invalidBody of ['{', 'null', '{"entry":[]}', '{"object":"instagram","entry":null}']) {
    const res = await app.inject({
      method: 'POST',
      url: path,
      headers: signedHeaders(invalidBody),
      payload: Buffer.from(invalidBody, 'utf8')
    });
    assert.equal(res.statusCode, 400);
  }

  await app.close();
});

test('5. Unsupported signed objects are accepted and marked as ignored', async () => {
  const app = await createTestApp();
  const pageBody = JSON.stringify({ object: 'page', entry: [] });

  const res = await app.inject({
    method: 'POST',
    url: path,
    headers: signedHeaders(pageBody),
    payload: Buffer.from(pageBody, 'utf8')
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, 'EVENT_RECEIVED');

  await app.close();
});

test('6. Content-Type and Content-Encoding restrictions', async () => {
  const app = await createTestApp();

  // Invalid content-type (text/plain)
  const plainRes = await app.inject({
    method: 'POST',
    url: path,
    headers: {
      ...signedHeaders(raw),
      'content-type': 'text/plain'
    },
    payload: Buffer.from(raw, 'utf8')
  });
  assert.equal(plainRes.statusCode, 415);

  // Invalid content-encoding (gzip)
  const gzipRes = await app.inject({
    method: 'POST',
    url: path,
    headers: {
      ...signedHeaders(raw),
      'content-encoding': 'gzip'
    },
    payload: Buffer.from(raw, 'utf8')
  });
  assert.equal(gzipRes.statusCode, 415);

  await app.close();
});

test('7. GET /status returns readiness and public URL without leaking secrets', async () => {
  const app = await createTestApp();

  const res = await app.inject({
    method: 'GET',
    url: '/api/integrations/instagram/status'
  });

  assert.equal(res.statusCode, 200);
  const json = JSON.parse(res.body);

  assert.equal(json.data.configured, true);
  assert.equal(json.data.webhookUrl, 'https://katapedia.mscode.id/api/integrations/instagram/webhook');
  assert.equal(json.data.metaVerificationStatus, 'pending_meta_verification');
  assert.equal(json.data.appKey, 'test-app');
  assert.equal(typeof json.data.totalDeliveries, 'number');

  // Verify secrets are NOT leaked
  assert.equal(json.data.appSecret, undefined);
  assert.equal(json.data.verifyToken, undefined);

  await app.close();
});
