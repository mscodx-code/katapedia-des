import { FastifyInstance } from 'fastify';
import { prisma } from '@katapedia/database';
import bcrypt from 'bcryptjs';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserQuerySchema
} from '@katapedia/contracts';
import { authenticate, requireRoles } from '../../plugins/auth.js';

export async function usersRoutes(app: FastifyInstance) {
  // 1. List users with search, role, status filtering and pagination
  app.get('/users', { preHandler: [authenticate] }, async (request, reply) => {
    const currentUser = (request as any).user;
    const parseResult = UserQuerySchema.safeParse(request.query);

    const query = parseResult.success ? parseResult.data : { page: 1, pageSize: 20 };
    const { search, role, isActive, page = 1, pageSize = 20 } = query;

    const where: any = {};

    // Scope to tenant unless superadmin
    if (currentUser.role !== 'PLATFORM_SUPERADMIN') {
      where.tenantId = currentUser.tenantId;
    }

    if (role) {
      where.role = role;
    }

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const skip = (page - 1) * pageSize;
    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          tenant: {
            select: { id: true, name: true, slug: true }
          }
        }
      })
    ]);

    return {
      data: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        isActive: u.isActive,
        avatarUrl: u.avatarUrl,
        lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        createdAt: u.createdAt.toISOString(),
        tenant: u.tenant
      })),
      meta: {
        page,
        pageSize,
        total,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // 2. Create new user
  app.post(
    '/users',
    { preHandler: [authenticate, requireRoles(['PLATFORM_SUPERADMIN', 'DEPT_ADMIN'])] },
    async (request, reply) => {
      const currentUser = (request as any).user;
      const parseResult = CreateUserSchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Data pengguna baru tidak valid',
            details: parseResult.error.errors
          }
        });
      }

      const { email, name, password, role, tenantId } = parseResult.data;

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return reply.status(409).send({
          error: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: `Email ${email} sudah terdaftar dalam sistem.`
          }
        });
      }

      // Assign tenantId
      const targetTenantId =
        currentUser.role === 'PLATFORM_SUPERADMIN' && tenantId
          ? tenantId
          : currentUser.tenantId;

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          role,
          tenantId: targetTenantId,
          isActive: true
        },
        include: {
          tenant: { select: { id: true, name: true, slug: true } }
        }
      });

      // Write Audit Log
      try {
        await prisma.auditLog.create({
          data: {
            tenantId: targetTenantId,
            userId: currentUser.id,
            action: 'CREATE_USER',
            entity: 'User',
            entityId: newUser.id,
            detailsJson: JSON.stringify({
              createdBy: currentUser.email,
              newUserEmail: newUser.email,
              newUserName: newUser.name,
              role: newUser.role
            })
          }
        });
      } catch (e) {
        app.log.warn({ err: e }, 'Failed to write audit log for create user');
      }

      return reply.status(201).send({
        data: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          isActive: newUser.isActive,
          createdAt: newUser.createdAt.toISOString(),
          tenant: newUser.tenant
        },
        meta: {
          requestId: request.id,
          timestamp: new Date().toISOString(),
          dataMode: 'LIVE'
        }
      });
    }
  );

  // 3. Update user (Role, Status, Name, Password)
  app.patch(
    '/users/:id',
    { preHandler: [authenticate, requireRoles(['PLATFORM_SUPERADMIN', 'DEPT_ADMIN'])] },
    async (request, reply) => {
      const currentUser = (request as any).user;
      const { id } = request.params as { id: string };

      const parseResult = UpdateUserSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Data pembaruan tidak valid',
            details: parseResult.error.errors
          }
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return reply.status(404).send({
          error: { code: 'USER_NOT_FOUND', message: 'Pengguna tidak ditemukan.' }
        });
      }

      // Dept admin cannot edit superadmin or users in another tenant
      if (
        currentUser.role !== 'PLATFORM_SUPERADMIN' &&
        existingUser.tenantId !== currentUser.tenantId
      ) {
        return reply.status(403).send({
          error: { code: 'FORBIDDEN', message: 'Anda tidak memiliki hak untuk mengubah pengguna ini.' }
        });
      }

      const updateData: any = {};
      if (parseResult.data.name !== undefined) updateData.name = parseResult.data.name;
      if (parseResult.data.role !== undefined) updateData.role = parseResult.data.role;
      if (parseResult.data.isActive !== undefined) updateData.isActive = parseResult.data.isActive;
      if (parseResult.data.password) {
        updateData.passwordHash = await bcrypt.hash(parseResult.data.password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          tenant: { select: { id: true, name: true, slug: true } }
        }
      });

      // Write Audit Log
      try {
        await prisma.auditLog.create({
          data: {
            tenantId: updatedUser.tenantId,
            userId: currentUser.id,
            action: 'UPDATE_USER',
            entity: 'User',
            entityId: updatedUser.id,
            detailsJson: JSON.stringify({
              updatedBy: currentUser.email,
              targetUser: updatedUser.email,
              changes: parseResult.data
            })
          }
        });
      } catch (e) {
        app.log.warn({ err: e }, 'Failed to write audit log for update user');
      }

      return {
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          isActive: updatedUser.isActive,
          lastLoginAt: updatedUser.lastLoginAt ? updatedUser.lastLoginAt.toISOString() : null,
          createdAt: updatedUser.createdAt.toISOString(),
          tenant: updatedUser.tenant
        },
        meta: {
          requestId: request.id,
          timestamp: new Date().toISOString(),
          dataMode: 'LIVE'
        }
      };
    }
  );

  // 4. Delete user (Superadmin only)
  app.delete(
    '/users/:id',
    { preHandler: [authenticate, requireRoles(['PLATFORM_SUPERADMIN'])] },
    async (request, reply) => {
      const currentUser = (request as any).user;
      const { id } = request.params as { id: string };

      if (id === currentUser.id) {
        return reply.status(400).send({
          error: { code: 'CANNOT_DELETE_SELF', message: 'Anda tidak dapat menghapus akun Anda sendiri.' }
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return reply.status(404).send({
          error: { code: 'USER_NOT_FOUND', message: 'Pengguna tidak ditemukan.' }
        });
      }

      await prisma.user.delete({
        where: { id }
      });

      // Write Audit Log
      try {
        await prisma.auditLog.create({
          data: {
            tenantId: existingUser.tenantId,
            userId: currentUser.id,
            action: 'DELETE_USER',
            entity: 'User',
            entityId: id,
            detailsJson: JSON.stringify({
              deletedBy: currentUser.email,
              deletedUser: existingUser.email
            })
          }
        });
      } catch (e) {
        app.log.warn({ err: e }, 'Failed to write audit log for delete user');
      }

      return {
        data: { success: true, message: `Pengguna ${existingUser.email} berhasil dihapus.` },
        meta: {
          requestId: request.id,
          timestamp: new Date().toISOString(),
          dataMode: 'LIVE'
        }
      };
    }
  );

  // 5. Get Role & Permission Matrix
  app.get('/users/roles', { preHandler: [authenticate] }, async (request) => {
    const roles = [
      {
        id: 'PLATFORM_SUPERADMIN',
        name: 'Platform Superadmin',
        description: 'Akses penuh ke seluruh sistem, multi-tenant, dan konfigurasi platform',
        permissions: {
          candidateRegistry: 'CRUD',
          accountManagement: 'CRUD',
          rawData: 'FULL',
          aiFindings: 'FULL',
          evidence: 'FULL',
          userManagement: 'FULL',
          reports: 'FULL',
          auditLog: 'FULL'
        }
      },
      {
        id: 'DEPT_ADMIN',
        name: 'Department Admin',
        description: 'Kelola tim departemen, caleg, dapil, dan konfigurasi organisasi',
        permissions: {
          candidateRegistry: 'CRUD',
          accountManagement: 'CRUD',
          rawData: 'FULL',
          aiFindings: 'REVIEW_EDIT',
          evidence: 'FULL',
          userManagement: 'CRUD',
          reports: 'FULL',
          auditLog: 'READ'
        }
      },
      {
        id: 'ANALYST',
        name: 'Senior / Dept Analyst',
        description: 'Analisis elektabilitas digital, review temuan AI, dan kurasi evidence',
        permissions: {
          candidateRegistry: 'READ',
          accountManagement: 'READ',
          rawData: 'READ',
          aiFindings: 'REVIEW',
          evidence: 'FULL',
          userManagement: 'NONE',
          reports: 'FULL',
          auditLog: 'READ'
        }
      },
      {
        id: 'VIEWER',
        name: 'Viewer / Bakal Caleg',
        description: 'Melihat ringkasan eksekutif, skor DES caleg, dan roadmap personal',
        permissions: {
          candidateRegistry: 'READ',
          accountManagement: 'READ',
          rawData: 'READ',
          aiFindings: 'READ',
          evidence: 'READ',
          userManagement: 'NONE',
          reports: 'READ',
          auditLog: 'NONE'
        }
      }
    ];

    return {
      data: roles,
      meta: {
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // 6. Get Audit Logs
  app.get('/users/audit-logs', { preHandler: [authenticate] }, async (request) => {
    const currentUser = (request as any).user;
    const { limit = '50' } = request.query as { limit?: string };

    const where: any = {};
    if (currentUser.role !== 'PLATFORM_SUPERADMIN') {
      where.tenantId = currentUser.tenantId;
    }

    const logs = await prisma.auditLog.findMany({
      where,
      take: Math.min(Number(limit) || 50, 100),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true }
        }
      }
    });

    return {
      data: logs.map((log) => {
        let details = {};
        try {
          details = JSON.parse(log.detailsJson);
        } catch {
          // ignore
        }

        return {
          id: log.id,
          action: log.action,
          entity: log.entity,
          entityId: log.entityId,
          details,
          createdAt: log.createdAt.toISOString(),
          user: log.user
            ? {
                id: log.user.id,
                name: log.user.name,
                email: log.user.email,
                role: log.user.role
              }
            : null
        };
      }),
      meta: {
        total: logs.length,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });
}
