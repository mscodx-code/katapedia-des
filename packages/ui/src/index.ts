import { DESDimensionCode, RoadmapQuadrant, BaselineCategory, DataCoverageStatus } from '@katapedia/contracts';
import { katapediaColors, desDimensionsMeta } from '@katapedia/design-tokens';

/**
 * Format angka ribuan / jutaan singkat (misal: 1.2M, 850K)
 */
export function formatMetricNumber(val: number | null | undefined): string {
  if (val === null || val === undefined) return '—';
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1)}M`;
  }
  if (val >= 1_000) {
    return `${(val / 1_000).toFixed(1)}K`;
  }
  return val.toLocaleString('id-ID');
}

/**
 * Format score DES (skala 1 - 5)
 */
export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return '—';
  return score.toFixed(1);
}

/**
 * Metadata helper untuk dimensi DES
 */
export function getDimensionMeta(code: string) {
  return desDimensionsMeta.find((d) => d.code === code) || {
    code,
    name: code,
    step: '--',
    journeyTitle: 'Unknown',
    journeySub: 'Tidak diketahui',
    question: '',
    sourcePage: 0,
    color: '#64748B'
  };
}

/**
 * Helper badge status kuadran roadmap
 */
export function getQuadrantBadge(quadrant: RoadmapQuadrant) {
  switch (quadrant) {
    case 'PRIORITAS_UTAMA':
      return {
        label: 'Prioritas Utama',
        bgColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        dotColor: 'bg-amber-500',
        description: 'Skor Rendah, Dampak Tinggi — Fokus eksekusi 30-60 hari'
      };
    case 'PERTAHANKAN':
      return {
        label: 'Pertahankan',
        bgColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        dotColor: 'bg-emerald-500',
        description: 'Skor Tinggi, Dampak Tinggi — Kekuatan utama, jaga konsistensi'
      };
    case 'PANTAU':
      return {
        label: 'Pantau',
        bgColor: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
        dotColor: 'bg-sky-500',
        description: 'Skor Tinggi, Dampak Rendah — Tetap diawasi secara berkala'
      };
    case 'TUNDA':
      return {
        label: 'Tunda',
        bgColor: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
        dotColor: 'bg-slate-500',
        description: 'Skor Rendah, Dampak Rendah — Kerjakan setelah fondasi siap'
      };
  }
}

/**
 * Helper badge baseline kinerja konten
 */
export function getBaselineBadge(cat: BaselineCategory | null | undefined) {
  switch (cat) {
    case 'ABOVE_BASELINE':
      return {
        label: 'Above Baseline (>1.5x)',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      };
    case 'NEAR_BASELINE':
      return {
        label: 'Near Baseline (0.8x-1.5x)',
        color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
      };
    case 'BELOW_BASELINE':
      return {
        label: 'Below Baseline (<0.8x)',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      };
    default:
      return {
        label: 'Uncategorized',
        color: 'text-slate-400 bg-slate-500/10 border-slate-500/30'
      };
  }
}

/**
 * Helper status data coverage
 */
export function getDataCoverageBadge(status: DataCoverageStatus) {
  switch (status) {
    case 'COMPLETE':
      return {
        label: 'Complete Data',
        badgeClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
      };
    case 'PARTIAL':
      return {
        label: 'Partial Data',
        badgeClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      };
    case 'INSUFFICIENT':
      return {
        label: 'Insufficient Data',
        badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      };
    case 'STALE':
      return {
        label: 'Stale (>7 Hari)',
        badgeClass: 'bg-slate-500/10 border-slate-500/30 text-slate-400'
      };
  }
}
