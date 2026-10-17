const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export function getStoredToken(): string | null {
  return localStorage.getItem('katapedia_jwt_token');
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem('katapedia_jwt_token', token);
  } else {
    localStorage.removeItem('katapedia_jwt_token');
  }
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const token = getStoredToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {})
  };

  const res = await fetch(url, {
    ...options,
    headers
  });

  if (!res.ok) {
    let errorData: any = {};
    try {
      errorData = await res.json();
    } catch {
      // ignore
    }

    if (res.status === 401 && !endpoint.includes('/auth/login')) {
      // Token expired or invalid
      setStoredToken(null);
      localStorage.removeItem('katapedia_auth_session');
      window.dispatchEvent(new Event('katapedia_unauthorized'));
    }

    throw new Error(errorData?.error?.message || `API request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

export const api = {
  // Auth & Session
  getAuthConfig: () => {
    return apiRequest<{ captchaSiteKey: string; authMethod: string }>('/auth/config');
  },

  login: (credentials: { email: string; password: string; captchaToken?: string | null }) => {
    return apiRequest<{ token: string; user: any; tenant: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  getMe: () => {
    return apiRequest<{ user: any; tenant: any }>('/auth/me');
  },

  logout: () => {
    return apiRequest<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST'
    });
  },

  // User & Role Management
  getUsers: (params?: { search?: string; role?: string; isActive?: boolean; page?: number; pageSize?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    if (params?.role && params.role !== 'ALL') q.set('role', params.role);
    if (typeof params?.isActive === 'boolean') q.set('isActive', String(params.isActive));
    if (params?.page) q.set('page', String(params.page));
    if (params?.pageSize) q.set('pageSize', String(params.pageSize));
    return apiRequest<any[]>(`/users?${q.toString()}`);
  },

  createUser: (data: { email: string; name: string; password: string; role: string; tenantId?: string }) => {
    return apiRequest<any>('/users', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateUser: (id: string, data: { name?: string; role?: string; isActive?: boolean; password?: string }) => {
    return apiRequest<any>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  deleteUser: (id: string) => {
    return apiRequest<any>(`/users/${id}`, {
      method: 'DELETE'
    });
  },

  getUserRoles: () => {
    return apiRequest<any[]>('/users/roles');
  },

  getAuditLogs: (limit = 50) => {
    return apiRequest<any[]>(`/users/audit-logs?limit=${limit}`);
  },

  // Integrations & Webhook
  getInstagramWebhookStatus: () => {
    return apiRequest<any>('/integrations/instagram/status');
  },

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
