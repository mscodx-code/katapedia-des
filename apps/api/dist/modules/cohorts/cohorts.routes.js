import { prisma } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';
export async function cohortRoutes(app) {
    app.get('/tenants/:tenantId/cohorts', async (request, reply) => {
        const { tenantId } = request.params;
        const actualTenantId = await resolveTenantId(tenantId);
        const query = request.query;
        const whereClause = { tenantId: actualTenantId };
        if (query.level && query.level !== 'ALL') {
            whereClause.electionLevel = query.level;
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
//# sourceMappingURL=cohorts.routes.js.map