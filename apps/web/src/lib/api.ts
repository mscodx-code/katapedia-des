const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!res.ok) {
    let errorData: any = {};
    try {
      errorData = await res.json();
    } catch {
      // ignore
    }
    throw new Error(errorData?.error?.message || `API request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export const api = {
  // Overview Dashboard
  getOverview: (tenantSlug: string, level?: string, dapil?: string) => {
    const q = new URLSearchParams();
    if (level && level !== 'ALL') q.set('level', level);
    if (dapil && dapil !== 'ALL') q.set('dapil', dapil);
    return apiRequest<any>(`/tenants/${tenantSlug}/dashboard/overview?${q.toString()}`);
  },

  // Candidates
  getCandidates: (tenantSlug: string, filters?: { level?: string; dapil?: string; search?: string; status?: string }) => {
    const q = new URLSearchParams();
    if (filters?.level && filters.level !== 'ALL') q.set('level', filters.level);
    if (filters?.dapil && filters.dapil !== 'ALL') q.set('dapil', filters.dapil);
    if (filters?.search) q.set('search', filters.search);
    if (filters?.status && filters.status !== 'ALL') q.set('status', filters.status);
    return apiRequest<any[]>(`/tenants/${tenantSlug}/candidates?${q.toString()}`);
  },

  getCandidateDetail: (tenantSlug: string, candidateId: string) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/candidates/${candidateId}`);
  },

  // Scores
  getCandidateScores: (tenantSlug: string, candidateId: string) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/candidates/${candidateId}/scores`);
  },

  recomputeScore: (tenantSlug: string, candidateId: string) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/candidates/${candidateId}/recompute-score`, {
      method: 'POST'
    });
  },

  // Contents
  getCandidateContents: (tenantSlug: string, candidateId: string, params?: { platform?: string; baselineCategory?: string; winningFormula?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.platform && params.platform !== 'ALL') q.set('platform', params.platform);
    if (params?.baselineCategory && params.baselineCategory !== 'ALL') q.set('baselineCategory', params.baselineCategory);
    if (params?.winningFormula) q.set('winningFormula', 'true');
    return apiRequest<any[]>(`/tenants/${tenantSlug}/candidates/${candidateId}/contents?${q.toString()}`);
  },

  // 90-Day Roadmap
  getRoadmap: (tenantSlug: string, candidateId: string) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/candidates/${candidateId}/roadmap`);
  },

  updateRoadmapItem: (tenantSlug: string, itemId: string, data: { isCompleted?: boolean; pic?: string }) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/roadmap-items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  // AI & Evidence
  getEvidence: (tenantSlug: string, candidateId: string) => {
    return apiRequest<any[]>(`/tenants/${tenantSlug}/candidates/${candidateId}/evidence`);
  },

  updateEvidenceStatus: (tenantSlug: string, evidenceId: string, data: { reviewStatus: string; reviewerNote?: string }) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/evidence/${evidenceId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  askAIChat: (tenantSlug: string, candidateId: string, prompt: string) => {
    return apiRequest<any>(`/tenants/${tenantSlug}/candidates/${candidateId}/ai-chat`, {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
  },

  // Cohorts
  getCohorts: (tenantSlug: string, level?: string) => {
    const q = new URLSearchParams();
    if (level && level !== 'ALL') q.set('level', level);
    return apiRequest<any[]>(`/tenants/${tenantSlug}/cohorts?${q.toString()}`);
  }
};
