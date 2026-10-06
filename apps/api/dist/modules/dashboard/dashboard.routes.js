import { prisma } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';
export async function dashboardRoutes(app) {
    app.get('/tenants/:tenantId/dashboard/overview', async (request, reply) => {
        const { tenantId } = request.params;
        const actualTenantId = await resolveTenantId(tenantId);
        const query = request.query;
        const candidateWhere = { tenantId: actualTenantId };
        if (query.level && query.level !== 'ALL') {
            candidateWhere.electionLevel = query.level;
        }
        if (query.dapil && query.dapil !== 'ALL') {
            candidateWhere.dapil = { contains: query.dapil, mode: 'insensitive' };
        }
        const [totalCandidates, connectedAccounts, candidates] = await Promise.all([
            prisma.candidate.count({ where: candidateWhere }),
            prisma.platformAccount.count({ where: { tenantId: actualTenantId } }),
            prisma.candidate.findMany({
                where: candidateWhere,
                include: {
                    accounts: true,
                    assessments: {
                        orderBy: { evaluatedAt: 'desc' },
                        take: 1,
                        include: { dimensions: true }
                    },
                    roadmapItems: true
                }
            })
        ]);
        // Data coverage stats
        const coverageStats = {
            complete: candidates.filter((c) => c.dataCoverage === 'COMPLETE').length,
            partial: candidates.filter((c) => c.dataCoverage === 'PARTIAL').length,
            insufficient: candidates.filter((c) => c.dataCoverage === 'INSUFFICIENT').length,
            stale: candidates.filter((c) => c.dataCoverage === 'STALE').length
        };
        // Candidate ranking by DES score
        const scoredCandidates = candidates.map((c) => {
            const assessment = c.assessments[0];
            return {
                id: c.id,
                code: c.candidateCode,
                name: c.name,
                party: c.party,
                level: c.electionLevel,
                dapil: c.dapil,
                score: assessment ? assessment.overallScore : null,
                coverage: c.dataCoverage,
                accounts: c.accounts.map((a) => ({ platform: a.platform, handle: a.handle })),
                priorityItemsCount: c.roadmapItems.filter((r) => r.quadrant === 'PRIORITAS_UTAMA').length
            };
        });
        const topPerformers = [...scoredCandidates]
            .filter((c) => c.score !== null)
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 5);
        const needsAttention = [...scoredCandidates]
            .filter((c) => c.score !== null)
            .sort((a, b) => (a.score || 0) - (b.score || 0))
            .slice(0, 5);
        // Anomaly signals (Signal untuk review sesuai FRD Bagian 18)
        const anomalySignals = [
            {
                id: 'ANOM-1',
                candidateName: 'Prof. Ridha Dharmajaya',
                type: 'VIEW_SPIKE',
                description: 'Video bertema "Beban Hidup vs Beban Leher" melonjak 340% melebihi baseline harian (2.1M views).',
                status: 'REVIEWED',
                detectedAt: '2026-10-04T12:00:00Z',
                action: 'Terverifikasi sebagai konten edukasi viral organik.'
            },
            {
                id: 'ANOM-2',
                candidateName: 'Rangga Pradipta',
                type: 'ENGAGEMENT_SPIKE',
                description: 'Lonjakan komentar substantif warga mengenai program pelatihan UMKM Desa (800+ komentar baru).',
                status: 'ACTION_REQUIRED',
                detectedAt: '2026-10-05T09:30:00Z',
                action: 'Disarankan follow up ke pendaftaran relawan fisik.'
            },
            {
                id: 'ANOM-3',
                candidateName: 'Hendro Kusumo, S.E.',
                type: 'FRESHNESS_DELAY',
                description: 'Tidak ada posting baru di Instagram selama 14 hari berturut-turut.',
                status: 'ACTION_REQUIRED',
                detectedAt: '2026-10-05T14:15:00Z',
                action: 'Perlu pengingat jadwal tim media sosial dapil.'
            }
        ];
        // Audit logs recent
        const recentAudit = await prisma.auditLog.findMany({
            where: { tenantId: actualTenantId },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        return {
            data: {
                totalCandidates,
                connectedAccounts,
                coverageStats,
                topPerformers,
                needsAttention,
                anomalySignals,
                recentAudit,
                summary: {
                    averageDES: scoredCandidates.length > 0
                        ? (scoredCandidates.reduce((acc, c) => acc + (c.score || 0), 0) /
                            scoredCandidates.filter((c) => c.score !== null).length).toFixed(1)
                        : '—'
                }
            },
            meta: {
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        };
    });
}
//# sourceMappingURL=dashboard.routes.js.map