import { FastifyInstance } from 'fastify';
import { prisma, ElectionLevel } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';

export async function cohortRoutes(app: FastifyInstance) {
  app.get('/tenants/:tenantId/cohorts', async (request, reply) => {
    const { tenantId } = request.params as { tenantId: string };
    const actualTenantId = await resolveTenantId(tenantId);
    const query = request.query as { level?: string };

    const whereClause: any = { tenantId: actualTenantId };
    if (query.level && query.level !== 'ALL') {
      whereClause.electionLevel = query.level as ElectionLevel;
    }

    const cohorts = await prisma.cohortBenchmark.findMany({
      where: whereClause,
      orderBy: { electionLevel: 'asc' }
    });

    return {
      data: cohorts,
      meta: {
        total: cohorts.length,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });
}
