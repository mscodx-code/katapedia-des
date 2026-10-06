import { prisma, RoadmapQuadrant } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';
export async function roadmapRoutes(app) {
    // Get 90-Day Roadmap for candidate
    app.get('/tenants/:tenantId/candidates/:candidateId/roadmap', async (request, reply) => {
        const { tenantId, candidateId } = request.params;
        const actualTenantId = await resolveTenantId(tenantId);
        const items = await prisma.roadmapItem.findMany({
            where: { tenantId: actualTenantId, candidateId },
            orderBy: [{ month: 'asc' }, { dimensionCode: 'asc' }]
        });
        const quadrants = {
            PRIORITAS_UTAMA: items.filter((i) => i.quadrant === RoadmapQuadrant.PRIORITAS_UTAMA),
            PERTAHANKAN: items.filter((i) => i.quadrant === RoadmapQuadrant.PERTAHANKAN),
            PANTAU: items.filter((i) => i.quadrant === RoadmapQuadrant.PANTAU),
            TUNDA: items.filter((i) => i.quadrant === RoadmapQuadrant.TUNDA)
        };
        const months = {
            BULAN_1_FONDASI: items.filter((i) => i.month === 'BULAN_1_FONDASI'),
            BULAN_2_KEPERCAYAAN: items.filter((i) => i.month === 'BULAN_2_KEPERCAYAAN'),
            BULAN_3_PERLUASAN: items.filter((i) => i.month === 'BULAN_3_PERLUASAN')
        };
        return {
            data: {
                totalItems: items.length,
                completedCount: items.filter((i) => i.isCompleted).length,
                items,
                quadrants,
                months
            },
            meta: {
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        };
    });
    // Toggle completion or update roadmap action
    app.patch('/tenants/:tenantId/roadmap-items/:itemId', async (request, reply) => {
        const { tenantId, itemId } = request.params;
        const body = request.body;
        const updated = await prisma.roadmapItem.update({
            where: { id: itemId, tenantId },
            data: body
        });
        return {
            data: updated,
            meta: {
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        };
    });
}
//# sourceMappingURL=roadmap.routes.js.map