import { z } from 'zod';

// ==========================================
// ENUMS & CONSTANTS
// ==========================================

export const ElectionLevelEnum = z.enum(['DPR_RI', 'DPRD_PROVINSI', 'DPRD_KAB_KOTA']);
export type ElectionLevel = z.infer<typeof ElectionLevelEnum>;

export const CandidateStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED_REVIEW']);
export type CandidateStatus = z.infer<typeof CandidateStatusEnum>;

export const SocialPlatformEnum = z.enum(['INSTAGRAM', 'TIKTOK']);
export type SocialPlatform = z.infer<typeof SocialPlatformEnum>;

export const AccountVerificationStatusEnum = z.enum([
  'VERIFIED',
  'PENDING_VERIFICATION',
  'INVALID',
  'INACTIVE',
  'REVIEW'
]);
export type AccountVerificationStatus = z.infer<typeof AccountVerificationStatusEnum>;

export const DataCoverageStatusEnum = z.enum(['COMPLETE', 'PARTIAL', 'INSUFFICIENT', 'STALE']);
export type DataCoverageStatus = z.infer<typeof DataCoverageStatusEnum>;

export const DESDimensionCodeEnum = z.enum([
  'D01',
  'D02',
  'D03',
  'D04',
  'D05',
  'D06',
  'D07',
  'D08',
  'D09',
  'D10'
]);
export type DESDimensionCode = z.infer<typeof DESDimensionCodeEnum>;

export const BaselineCategoryEnum = z.enum(['ABOVE_BASELINE', 'NEAR_BASELINE', 'BELOW_BASELINE']);
export type BaselineCategory = z.infer<typeof BaselineCategoryEnum>;

export const RoadmapQuadrantEnum = z.enum(['PRIORITAS_UTAMA', 'PERTAHANKAN', 'PANTAU', 'TUNDA']);
export type RoadmapQuadrant = z.infer<typeof RoadmapQuadrantEnum>;

export const FindingReviewStatusEnum = z.enum(['PENDING_REVIEW', 'VERIFIED', 'DISPUTED', 'NEEDS_REVIEW']);
export type FindingReviewStatus = z.infer<typeof FindingReviewStatusEnum>;

export const UserRoleEnum = z.enum(['PLATFORM_SUPERADMIN', 'DEPT_ADMIN', 'ANALYST', 'VIEWER']);
export type UserRole = z.infer<typeof UserRoleEnum>;

// ==========================================
// CANDIDATE & GEOGRAPHY SCHEMAS
// ==========================================

export const CandidateSchema = z.object({
  id: z.string(),
  candidateCode: z.string(),
  name: z.string(),
  electionLevel: ElectionLevelEnum,
  province: z.string(),
  regency: z.string().optional().nullable(),
  dapil: z.string(),
  party: z.string().optional().nullable(),
  ballotNumber: z.number().optional().nullable(),
  status: CandidateStatusEnum,
  avatarUrl: z.string().optional().nullable(),
  dataCoverage: DataCoverageStatusEnum.default('PARTIAL'),
  lastSyncAt: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type Candidate = z.infer<typeof CandidateSchema>;

export const CreateCandidateSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  electionLevel: ElectionLevelEnum,
  province: z.string().min(1, 'Provinsi wajib diisi'),
  regency: z.string().optional().nullable(),
  dapil: z.string().min(1, 'Dapil wajib diisi'),
  party: z.string().optional().nullable(),
  ballotNumber: z.number().int().positive().optional().nullable(),
  status: CandidateStatusEnum.default('ACTIVE')
});
export type CreateCandidateInput = z.infer<typeof CreateCandidateSchema>;

// ==========================================
// SOCIAL ACCOUNT & CONTENT
// ==========================================

export const PlatformAccountSchema = z.object({
  id: z.string(),
  candidateId: z.string(),
  platform: SocialPlatformEnum,
  handle: z.string(),
  profileUrl: z.string().url(),
  verificationStatus: AccountVerificationStatusEnum,
  followersCount: z.number().int().nonnegative().optional().nullable(),
  followingCount: z.number().int().nonnegative().optional().nullable(),
  totalPostsCount: z.number().int().nonnegative().optional().nullable(),
  lastSyncAt: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type PlatformAccount = z.infer<typeof PlatformAccountSchema>;

export const ContentItemSchema = z.object({
  id: z.string(),
  candidateId: z.string(),
  accountId: z.string(),
  platform: SocialPlatformEnum,
  platformPostId: z.string(),
  permalink: z.string().url(),
  publishedAt: z.string(),
  caption: z.string(),
  mediaType: z.enum(['VIDEO_REEL', 'CAROUSEL', 'IMAGE', 'TIKTOK_VIDEO']),
  durationSeconds: z.number().optional().nullable(),
  views: z.number().int().nonnegative().optional().nullable(),
  likes: z.number().int().nonnegative().optional().nullable(),
  comments: z.number().int().nonnegative().optional().nullable(),
  shares: z.number().int().nonnegative().optional().nullable(),
  saves: z.number().int().nonnegative().optional().nullable(),
  baselineCategory: BaselineCategoryEnum.optional().nullable(),
  isWinningFormula: z.boolean().default(false),
  topics: z.array(z.string()).default([]),
  sentiment: z.enum(['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'UNKNOWN']).default('UNKNOWN')
});
export type ContentItem = z.infer<typeof ContentItemSchema>;

// ==========================================
// DES SCORE & 10 DIMENSIONS
// ==========================================

export const DimensionScoreSchema = z.object({
  dimensionCode: DESDimensionCodeEnum,
  dimensionName: z.string(),
  journeyStep: z.string(),
  journeyTitle: z.string(),
  score: z.number().min(1).max(5), // Skala 1 - 5
  confidence: z.number().min(0).max(1),
  status: z.enum(['SUFFICIENT', 'PARTIAL', 'INSUFFICIENT']),
  indicators: z.record(z.any()),
  findingsSummary: z.string(),
  reflectiveQuestion: z.string(),
  evidenceCount: z.number().int().nonnegative()
});
export type DimensionScore = z.infer<typeof DimensionScoreSchema>;

export const DESAssessmentSchema = z.object({
  candidateId: z.string(),
  periodDays: z.number().int(), // 30, 90, 180
  overallScore: z.number().min(1).max(5),
  methodologyVersion: z.string().default('DES-2026-V1.0'),
  evaluatedAt: z.string(),
  dimensions: z.array(DimensionScoreSchema),
  dataCoverage: DataCoverageStatusEnum
});
export type DESAssessment = z.infer<typeof DESAssessmentSchema>;

// ==========================================
// PERSONAL BASELINE & COHORT
// ==========================================

export const BaselineMetricsSchema = z.object({
  candidateId: z.string(),
  periodDays: z.number().int(),
  medianViews: z.number().nullable(),
  medianEngagementRate: z.number().nullable(),
  aboveBaselineCount: z.number().int(),
  nearBaselineCount: z.number().int(),
  belowBaselineCount: z.number().int(),
  totalAnalyzedPosts: z.number().int(),
  winningFormulaDetected: z.array(z.string()).default([])
});
export type BaselineMetrics = z.infer<typeof BaselineMetricsSchema>;

export const CohortBenchmarkSchema = z.object({
  cohortId: z.string(),
  electionLevel: ElectionLevelEnum,
  dapil: z.string(),
  totalCandidates: z.number().int(),
  medianDESScore: z.number(),
  q1Score: z.number(),
  q3Score: z.number(),
  topPerformingDimension: DESDimensionCodeEnum,
  dataCoverageRate: z.number() // 0 - 100%
});
export type CohortBenchmark = z.infer<typeof CohortBenchmarkSchema>;

// ==========================================
// 90-DAY ROADMAP & PRIORITY MATRIX
// ==========================================

export const RoadmapActionItemSchema = z.object({
  id: z.string(),
  dimensionCode: DESDimensionCodeEnum,
  dimensionName: z.string(),
  currentScore: z.number().min(1).max(5),
  targetScore: z.number().min(1).max(5),
  quadrant: RoadmapQuadrantEnum,
  month: z.enum(['BULAN_1_FONDASI', 'BULAN_2_KEPERCAYAAN', 'BULAN_3_PERLUASAN']),
  actionTitle: z.string(),
  actionDescription: z.string(),
  pic: z.string(),
  timelineDays: z.number().int(),
  kpiIndicator: z.string(),
  isCompleted: z.boolean().default(false)
});
export type RoadmapActionItem = z.infer<typeof RoadmapActionItemSchema>;

export const CandidateRoadmapSchema = z.object({
  candidateId: z.string(),
  generatedAt: z.string(),
  priorityDimensions: z.array(DESDimensionCodeEnum),
  actions: z.array(RoadmapActionItemSchema),
  summary: z.string()
});
export type CandidateRoadmap = z.infer<typeof CandidateRoadmapSchema>;

// ==========================================
// EVIDENCE & AI FINDINGS
// ==========================================

export const AIEvidenceSchema = z.object({
  id: z.string(),
  assessmentId: z.string(),
  contentId: z.string().optional().nullable(),
  platform: SocialPlatformEnum,
  sourceUrl: z.string().url(),
  publishedAt: z.string(),
  evidenceText: z.string(),
  excerptSnippet: z.string(),
  findingType: z.string(),
  reviewStatus: FindingReviewStatusEnum.default('PENDING_REVIEW'),
  reviewerNote: z.string().optional().nullable()
});
export type AIEvidence = z.infer<typeof AIEvidenceSchema>;

// ==========================================
// AUTH & TENANT SCHEMAS
// ==========================================

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleEnum,
  tenantId: z.string(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.string()
});
export type User = z.infer<typeof UserSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter')
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const TenantSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  mode: z.enum(['TOKOH_CALEG', 'PRODUK_BRAND']),
  electionLevelFocus: ElectionLevelEnum.optional().nullable(),
  planName: z.string(),
  isActive: z.boolean(),
  createdAt: z.string()
});
export type Tenant = z.infer<typeof TenantSchema>;

// ==========================
// API STANDARD RESPONSE
// ==========================

export interface ApiResponse<T> {
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
    dataMode: 'LIVE' | 'DEMO_SIMULATION';
  };
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    requestId: string;
    timestamp: string;
    dataMode: 'LIVE' | 'DEMO_SIMULATION';
  };
}
