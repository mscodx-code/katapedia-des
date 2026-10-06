import { prisma } from '@katapedia/database';
import { CreateCandidateSchema } from '@katapedia/contracts';
import { resolveTenantId } from '../tenants/tenant.helper.js';
export async function candidateRoutes(app) {
    // 1. List candidates with filters
    app.get('/tenants/:tenantId/candidates', async (request, reply) => {
        const { tenantId } = request.params;
        const actualTenantId = await resolveTenantId(tenantId);
        const query = request.query;
        const whereClause = { tenantId: actualTenantId };
        if (query.level && query.level !== 'ALL') {
            whereClause.electionLevel = query.level;
        }
        if (query.dapil && query.dapil !== 'ALL') {
            whereClause.dapil = { contains: query.dapil, mode: 'insensitive' };
        }
        if (query.status && query.status !== 'ALL') {
            whereClause.status = query.status;
        }
        if (query.search) {
            whereClause.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { party: { contains: query.search, mode: 'insensitive' } },
                { candidateCode: { contains: query.search, mode: 'insensitive' } }
            ];
        }
        const candidates = await prisma.candidate.findMany({
            where: whereClause,
            include: {
                accounts: true,
                assessments: {
                    orderBy: { evaluatedAt: 'desc' },
                    take: 1,
                    include: {
                        dimensions: true
                    }
                },
                baselines: {
                    orderBy: { calculatedAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { name: 'asc' }
        });
        const formatted = candidates.map((c) => {
            const latestAssessment = c.assessments[0];
            const baseline = c.baselines[0];
            return {
                id: c.id,
                candidateCode: c.candidateCode,
                name: c.name,
                electionLevel: c.electionLevel,
                province: c.province,
                regency: c.regency,
                dapil: c.dapil,
                party: c.party,
                ballotNumber: c.ballotNumber,
                status: c.status,
                avatarUrl: c.avatarUrl,
                dataCoverage: c.dataCoverage,
                lastSyncAt: c.lastSyncAt,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                accountsCount: c.accounts.length,
                accounts: c.accounts.map((a) => ({
                    platform: a.platform,
                    handle: a.handle,
                    followers: a.followersCount
                })),
                desScore: latestAssessment ? latestAssessment.overallScore : null,
                dimensions: latestAssessment ? latestAssessment.dimensions : [],
                baselineViews: baseline ? baseline.medianViews : null
            };
        });
        return {
            data: formatted,
            meta: {
                total: formatted.length,
                page: 1,
                pageSize: formatted.length,
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        };
    });
    // 2. Candidate Detail
    app.get('/tenants/:tenantId/candidates/:candidateId', async (request, reply) => {
        const { tenantId, candidateId } = request.params;
        const actualTenantId = await resolveTenantId(tenantId);
        const candidate = await prisma.candidate.findFirst({
            where: { id: candidateId, tenantId: actualTenantId },
            include: {
                accounts: {
                    include: {
                        contents: {
                            orderBy: { publishedAt: 'desc' },
                            take: 10
                        }
                    }
                },
                assessments: {
                    orderBy: { evaluatedAt: 'desc' },
                    take: 1,
                    include: {
                        dimensions: {
                            orderBy: { dimensionCode: 'asc' },
                            include: {
                                evidences: true
                            }
                        }
                    }
                },
                baselines: {
                    orderBy: { calculatedAt: 'desc' },
                    take: 1
                },
                roadmapItems: {
                    orderBy: { month: 'asc' }
                }
            }
        });
        if (!candidate) {
            return reply.status(404).send({
                error: { code: 'NOT_FOUND', message: 'Kandidat tidak ditemukan' }
            });
        }
        const latestAssessment = candidate.assessments[0];
        const baseline = candidate.baselines[0];
        return {
            data: {
                ...candidate,
                latestAssessment,
                baseline,
                roadmapItems: candidate.roadmapItems
            },
            meta: {
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        };
    });
    // 3. Create candidate
    app.post('/tenants/:tenantId/candidates', async (request, reply) => {
        const { tenantId } = request.params;
        const parse = CreateCandidateSchema.safeParse(request.body);
        if (!parse.success) {
            return reply.status(400).send({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Data calon tidak lengkap',
                    details: parse.error.errors
                }
            });
        }
        const input = parse.data;
        const count = await prisma.candidate.count({ where: { tenantId } });
        const candidateCode = `CAND-${String(count + 1).padStart(3, '0')}`;
        const newCandidate = await prisma.candidate.create({
            data: {
                tenantId,
                candidateCode,
                name: input.name,
                electionLevel: input.electionLevel,
                province: input.province,
                regency: input.regency,
                dapil: input.dapil,
                party: input.party,
                ballotNumber: input.ballotNumber,
                status: input.status
            }
        });
        // Audit log
        await prisma.auditLog.create({
            data: {
                tenantId,
                action: 'CREATE_CANDIDATE',
                entity: 'Candidate',
                entityId: newCandidate.id,
                detailsJson: JSON.stringify(newCandidate)
            }
        });
        return reply.status(201).send({
            data: newCandidate,
            meta: {
                requestId: request.id,
                timestamp: new Date().toISOString(),
                dataMode: 'LIVE'
            }
        });
    });
}
//# sourceMappingURL=candidates.routes.js.map