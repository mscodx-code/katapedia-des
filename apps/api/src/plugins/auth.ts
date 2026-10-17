import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { prisma } from '@katapedia/database';

export const JWT_SECRET = process.env.JWT_SECRET || 'katapedia-jwt-secret-key-32-chars-minimum!';
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LcTIfMtAAAAANLLTRffGhVRGv4Yzhe5CJJE532Q';
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || '6LcTIfMtAAAAAKps21ndaNRQ5sbKTGadtV24-T7z';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  name: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Verify Google reCAPTCHA v3 token
 */
export async function verifyCaptcha(token?: string | null): Promise<{ success: boolean; score?: number; message?: string }> {
  // Allow explicit bypass token for automated testing/CI environments
  if (token === 'BYPASS_TEST_TOKEN' || token === 'test-captcha-token') {
    return { success: true, score: 1.0 };
  }

  if (!token) {
    // If no captcha token is provided in production
    return {
      success: false,
      message: 'Token reCAPTCHA v3 wajib disertakan untuk alasan keamanan.'
    };
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', RECAPTCHA_SECRET_KEY);
    params.append('response', token);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!res.ok) {
      console.warn(`[reCAPTCHA] HTTP error ${res.status} from Google verification endpoint`);
      // Fallback in dev if network error occurs
      if (process.env.NODE_ENV !== 'production') {
        return { success: true, score: 0.9 };
      }
      return { success: false, message: 'Gagal menghubungi server verifikasi Google reCAPTCHA' };
    }

    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      'error-codes'?: string[];
    };

    if (!data.success) {
      console.warn('[reCAPTCHA] Verification failed:', data['error-codes']);
      return {
        success: false,
        message: `Verifikasi reCAPTCHA gagal: ${(data['error-codes'] || ['invalid-input-response']).join(', ')}`
      };
    }

    // Check score threshold (Google recommends 0.5)
    if (typeof data.score === 'number' && data.score < 0.5) {
      return {
        success: false,
        score: data.score,
        message: 'Aktivitas mencurigakan terdeteksi oleh Google reCAPTCHA v3. Skor terlalu rendah.'
      };
    }

    return { success: true, score: data.score };
  } catch (error: any) {
    console.error('[reCAPTCHA] Verification error:', error.message);
    if (process.env.NODE_ENV !== 'production') {
      return { success: true, score: 0.9 };
    }
    return { success: false, message: 'Terjadi kesalahan sistem saat memvalidasi reCAPTCHA.' };
  }
}

/**
 * Fastify preHandler hook to authenticate user via JWT
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  let token: string | undefined;

  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (request.cookies?.katapedia_token) {
    token = request.cookies.katapedia_token;
  }

  if (!token) {
    return reply.status(401).send({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Akses ditolak: Token autentikasi tidak ditemukan.'
      }
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return reply.status(401).send({
      error: {
        code: 'TOKEN_INVALID_OR_EXPIRED',
        message: 'Token sesi kedaluwarsa atau tidak valid. Silakan masuk kembali.'
      }
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: { tenant: true }
  });

  if (!user || !user.isActive) {
    return reply.status(401).send({
      error: {
        code: 'USER_INACTIVE_OR_NOT_FOUND',
        message: 'Akun Anda telah dinonaktifkan atau tidak ditemukan.'
      }
    });
  }

  // Attach verified user to request
  (request as any).user = user;
}

/**
 * Fastify preHandler hook to verify user roles
 */
export function requireRoles(roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user;
    if (!user) {
      return reply.status(401).send({
        error: { code: 'UNAUTHORIZED', message: 'Silakan masuk terlebih dahulu' }
      });
    }

    if (!roles.includes(user.role)) {
      return reply.status(403).send({
        error: {
          code: 'FORBIDDEN',
          message: `Peran Anda (${user.role}) tidak memiliki izin untuk melakukan aksi ini.`
        }
      });
    }
  };
}
