import { FastifyInstance } from 'fastify';
import { prisma } from '@katapedia/database';
import bcrypt from 'bcryptjs';
import { LoginRequestSchema } from '@katapedia/contracts';
import {
  generateToken,
  verifyCaptcha,
  authenticate,
  RECAPTCHA_SITE_KEY
} from '../../plugins/auth.js';

export async function authRoutes(app: FastifyInstance) {
  // Public auth configuration (e.g. captcha site key)
  app.get('/config', async () => {
    return {
      data: {
        captchaSiteKey: RECAPTCHA_SITE_KEY,
        authMethod: 'JWT'
      }
    };
  });

  // Login with Password & Google reCAPTCHA v3
  app.post('/login', async (request, reply) => {
    const parseResult = LoginRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Format email atau kata sandi tidak valid',
          details: parseResult.error.errors
        }
      });
    }

    const { email, password, captchaToken } = parseResult.data;

    // 1. Verify Google reCAPTCHA v3
    const captchaResult = await verifyCaptcha(captchaToken);
    if (!captchaResult.success) {
      return reply.status(400).send({
        error: {
          code: 'CAPTCHA_VERIFICATION_FAILED',
          message: captchaResult.message || 'Verifikasi reCAPTCHA v3 gagal. Silakan coba lagi.'
        }
      });
    }

    // 2. Fetch User & Tenant
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tenant: true }
    });

    if (!user) {
      return reply.status(401).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email atau kata sandi yang Anda masukkan salah.'
        }
      });
    }

    // 3. Verify Account Status
    if (!user.isActive) {
      return reply.status(403).send({
        error: {
          code: 'ACCOUNT_INACTIVE',
          message: 'Akun Anda dinonaktifkan oleh administrator. Hubungi Super Admin.'
        }
      });
    }

    // 4. Verify Password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return reply.status(401).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email atau kata sandi yang Anda masukkan salah.'
        }
      });
    }

    // 5. Update lastLoginAt
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // 6. Sign JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      name: user.name
    });

    // 7. Write Audit Log
    try {
      await prisma.auditLog.create({
        data: {
          tenantId: user.tenantId,
          userId: user.id,
          action: 'LOGIN',
          entity: 'User',
          entityId: user.id,
          detailsJson: JSON.stringify({
            ip: request.ip,
            userAgent: request.headers['user-agent'] || '',
            captchaScore: captchaResult.score
          })
        }
      });
    } catch (auditErr) {
      app.log.warn({ err: auditErr }, 'Failed to write login audit log');
    }

    // 8. Set Cookie
    reply.setCookie('katapedia_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return {
      data: {
        token,
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          avatarUrl: updatedUser.avatarUrl,
          tenantId: updatedUser.tenantId,
          isActive: updatedUser.isActive,
          lastLoginAt: updatedUser.lastLoginAt ? updatedUser.lastLoginAt.toISOString() : null,
          createdAt: updatedUser.createdAt.toISOString()
        },
        tenant: {
          id: user.tenant.id,
          slug: user.tenant.slug,
          name: user.tenant.name,
          mode: user.tenant.mode,
          planName: user.tenant.planName
        }
      },
      meta: {
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // Get current user profile (JWT protected)
  app.get('/me', { preHandler: [authenticate] }, async (request) => {
    const user = (request as any).user;

    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatarUrl: user.avatarUrl,
          tenantId: user.tenantId,
          isActive: user.isActive,
          lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : null,
          createdAt: user.createdAt.toISOString()
        },
        tenant: {
          id: user.tenant.id,
          slug: user.tenant.slug,
          name: user.tenant.name,
          mode: user.tenant.mode,
          planName: user.tenant.planName
        }
      },
      meta: {
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // List all available tenants (public or for selector)
  app.get('/tenants', async (request) => {
    const tenants = await prisma.tenant.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' }
    });

    return {
      data: tenants,
      meta: {
        total: tenants.length,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // Logout
  app.post('/logout', async (request, reply) => {
    reply.clearCookie('katapedia_token', { path: '/' });

    // Optional audit log if token present
    let token = request.headers.authorization?.replace('Bearer ', '') || request.cookies?.katapedia_token;
    if (token) {
      try {
        const decoded = (await import('jsonwebtoken')).default.decode(token) as any;
        if (decoded?.id && decoded?.tenantId) {
          await prisma.auditLog.create({
            data: {
              tenantId: decoded.tenantId,
              userId: decoded.id,
              action: 'LOGOUT',
              entity: 'User',
              entityId: decoded.id,
              detailsJson: JSON.stringify({ ip: request.ip })
            }
          });
        }
      } catch {
        // ignore
      }
    }

    return {
      data: { success: true, message: 'Berhasil keluar' },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  });
}
