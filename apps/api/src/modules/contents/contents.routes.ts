import { FastifyInstance } from 'fastify';
import { prisma, SocialPlatform, BaselineCategory } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';

export async function contentRoutes(app: FastifyInstance) {
  // Get contents for a candidate
  app.get('/tenants/:tenantId/candidates/:candidateId/contents', async (request, reply) => {
    const { tenantId, candidateId } = request.params as { tenantId: string; candidateId: string };
    const actualTenantId = await resolveTenantId(tenantId);
    const query = request.query as {
      platform?: string;
      baselineCategory?: string;
      winningFormula?: string;
    };

    const whereClause: any = { tenantId: actualTenantId, candidateId };

    if (query.platform && query.platform !== 'ALL') {
      whereClause.platform = query.platform as SocialPlatform;
    }

    if (query.baselineCategory && query.baselineCategory !== 'ALL') {
      whereClause.baselineCategory = query.baselineCategory as BaselineCategory;
    }

    if (query.winningFormula === 'true') {
      whereClause.isWinningFormula = true;
    }

    const contents = await prisma.content.findMany({
      where: whereClause,
      include: {
        account: true,
        evidences: true
      },
      orderBy: { publishedAt: 'desc' }
    });

    const parsed = contents.map((c) => ({
      ...c,
      topics: JSON.parse(c.topicsJson || '[]')
    }));

    return {
      data: parsed,
      meta: {
        total: parsed.length,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });
}
