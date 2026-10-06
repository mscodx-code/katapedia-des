import { FastifyInstance } from 'fastify';
import { prisma } from '@katapedia/database';
import bcrypt from 'bcryptjs';
import { LoginRequestSchema } from '@katapedia/contracts';

export async function authRoutes(app: FastifyInstance) {
  // Login
  app.post('/login', async (request, reply) => {
    const parseResult = LoginRequestSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Format email atau password tidak valid',
          details: parseResult.error.errors
        }
      });
    }

    const { email, password } = parseResult.data;
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tenant: true }
    });

    if (!user) {
      return reply.status(401).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email atau password salah'
        }
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return reply.status(401).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email atau password salah'
        }
      });
    }

    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatarUrl: user.avatarUrl,
          tenantId: user.tenantId
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

  // Get current user profile
  app.get('/me', async (request, reply) => {
    // For MVP local sessions, return default or first active user if not passed
    const defaultUser = await prisma.user.findFirst({
      where: { role: 'DEPT_ADMIN' },
      include: { tenant: true }
    });

    if (!defaultUser) {
      return reply.status(404).send({ error: { message: 'Pengguna tidak ditemukan' } });
    }

    return {
      data: {
        user: {
          id: defaultUser.id,
          email: defaultUser.email,
          name: defaultUser.name,
          role: defaultUser.role,
          avatarUrl: defaultUser.avatarUrl,
          tenantId: defaultUser.tenantId
        },
        tenant: {
          id: defaultUser.tenant.id,
          slug: defaultUser.tenant.slug,
          name: defaultUser.tenant.name,
          mode: defaultUser.tenant.mode,
          planName: defaultUser.tenant.planName
        }
      },
      meta: {
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // List all available tenants
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
  app.post('/logout', async () => {
    return {
      data: { success: true, message: 'Berhasil keluar' },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
  });
}
