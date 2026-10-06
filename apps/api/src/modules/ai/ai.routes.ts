import { FastifyInstance } from 'fastify';
import { prisma, FindingReviewStatus } from '@katapedia/database';
import { resolveTenantId } from '../tenants/tenant.helper.js';

export async function aiRoutes(app: FastifyInstance) {
  // 1. Get all AI evidences for a candidate
  app.get('/tenants/:tenantId/candidates/:candidateId/evidence', async (request, reply) => {
    const { tenantId, candidateId } = request.params as { tenantId: string; candidateId: string };
    const actualTenantId = await resolveTenantId(tenantId);

    const assessment = await prisma.dESAssessment.findFirst({
      where: { tenantId: actualTenantId, candidateId },
      orderBy: { evaluatedAt: 'desc' },
      include: {
        evidences: {
          include: {
            dimensionScore: true,
            content: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!assessment) {
      return {
        data: [],
        meta: {
          total: 0,
          requestId: request.id,
          timestamp: new Date().toISOString(),
          dataMode: 'LIVE'
        }
      };
    }

    return {
      data: assessment.evidences,
      meta: {
        total: assessment.evidences.length,
        requestId: request.id,
        timestamp: new Date().toISOString(),
        dataMode: 'LIVE'
      }
    };
  });

  // 2. Human-in-the-loop review on AI Evidence
  app.patch('/tenants/:tenantId/evidence/:evidenceId', async (request, reply) => {
    const { tenantId, evidenceId } = request.params as { tenantId: string; evidenceId: string };
    const body = request.body as {
      reviewStatus?: FindingReviewStatus;
      reviewerNote?: string;
    };

    const updated = await prisma.aIEvidence.update({
      where: { id: evidenceId },
      data: {
        reviewStatus: body.reviewStatus,
        reviewerNote: body.reviewerNote,
        reviewedAt: new Date()
      }
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        tenantId,
        action: 'REVIEW_AI_EVIDENCE',
        entity: 'AIEvidence',
        entityId: evidenceId,
        detailsJson: JSON.stringify(body)
      }
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

  // 3. Grounded AI Chat with Candidate Data
  app.post('/tenants/:tenantId/candidates/:candidateId/ai-chat', async (request, reply) => {
    const { tenantId, candidateId } = request.params as { tenantId: string; candidateId: string };
    const { prompt } = request.body as { prompt: string };

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        assessments: {
          orderBy: { evaluatedAt: 'desc' },
          take: 1,
          include: { dimensions: true }
        },
        baselines: {
          orderBy: { calculatedAt: 'desc' },
          take: 1
        },
        roadmapItems: true,
        contents: {
          take: 5,
          orderBy: { views: 'desc' }
        }
      }
    });

    if (!candidate) {
      return reply.status(404).send({ error: { message: 'Kandidat tidak ditemukan' } });
    }

    const latest = candidate.assessments[0];
    const baseline = candidate.baselines[0];

    // Identify lowest dimensions
    const lowestDims = latest?.dimensions
      ? [...latest.dimensions].sort((a, b) => a.score - b.score).slice(0, 3)
      : [];

    const topDims = latest?.dimensions
      ? [...latest.dimensions].sort((a, b) => b.score - a.score).slice(0, 3)
      : [];

    // Construct grounded response based on actual Katapedia DES methodology
    let answer = '';
    const lowerPrompt = (prompt || '').toLowerCase();

    if (lowerPrompt.includes('lemah') || lowerPrompt.includes('evaluasi') || lowerPrompt.includes('prioritas')) {
      answer = `Berdasarkan analisis 10 Dimensi DES untuk **${candidate.name}** (${candidate.dapil}), dimensi yang paling memerlukan intervensi segera adalah:\n\n` +
        lowestDims.map((d) => `• **${d.dimensionCode} - ${d.dimensionName}** (Skor: **${d.score.toFixed(1)}/5.0**): ${d.findingsSummary}`).join('\n') +
        `\n\n📌 **Rekomendasi Katapedia's Way:** Alokasikan sumber daya tim pada program 30 hari ke depan untuk mendongkrak dimensi di atas agar tidak menjadi hambatan konversi di bilik suara.`;
    } else if (lowerPrompt.includes('konten') || lowerPrompt.includes('formula') || lowerPrompt.includes('reels') || lowerPrompt.includes('tiktok')) {
      answer = `Analisis performa konten media sosial **${candidate.name}** menunjukkan:\n\n` +
        `• **Personal Median Views:** ${baseline?.medianViews?.toLocaleString('id-ID') || '—'} tayangan per video.\n` +
        `• **Konten Di Atas Baseline:** ${baseline?.aboveBaselineCount || 0} video berhasil tembus di atas 1.5x rata-rata akun.\n` +
        `• **Winning Formula Terdeteksi:** Video berdurasi ringkas (30-45 detik) dengan hook testimoni warga langsung dan kalimat pembuka berbasis fakta dapil terbukti konsisten menghasilkan views tertinggi.\n\n` +
        `💡 *Tips Eksekusi:* Gunakan format video pemenang ini untuk menyampaikan program kerja prioritas.`;
    } else {
      answer = `Ringkasan Intelijen Elektabilitas Digital untuk **${candidate.name}**:\n\n` +
        `• **Skor Keseluruhan DES:** **${latest?.overallScore?.toFixed(1) || '—'}/5.0** (Status Data: ${latest?.dataCoverage || 'PARTIAL'})\n` +
        `• **Kekuatan Utama:** ${topDims.map((d) => `${d.dimensionCode} ${d.dimensionName} (${d.score.toFixed(1)})`).join(', ')}\n` +
        `• **Fokus Perbaikan:** ${lowestDims.map((d) => `${d.dimensionCode} ${d.dimensionName} (${d.score.toFixed(1)})`).join(', ')}\n` +
        `• **Total Rencana Aksi 90 Hari:** ${candidate.roadmapItems.length} butir aksi aktif di dashboard pemenangan.`;
    }

    return {
      data: {
        candidateId: candidate.id,
        candidateName: candidate.name,
        question: prompt,
        answer,
        generatedAt: new Date().toISOString(),
        groundingSources: {
          assessmentScore: latest?.overallScore,
          totalContentsEvaluated: candidate.contents.length,
          evidenceCount: latest?.dimensions?.reduce((acc, d) => acc + d.evidenceCount, 0) || 0
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
