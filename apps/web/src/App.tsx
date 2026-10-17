import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import { AuthProvider, useAuth } from './lib/auth';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';
import { AccountDetailPage } from './pages/AccountDetailPage';
import { ContentExplorerPage } from './pages/ContentExplorerPage';
import { ContentDetailPage } from './pages/ContentDetailPage';
import { AIFindingsPage } from './pages/AIFindingsPage';
import { EvidenceViewerPage } from './pages/EvidenceViewerPage';
import { CohortContextPage } from './pages/CohortContextPage';
import { CohortComparisonPage } from './pages/CohortComparisonPage';
import { HistoricalTrendPage } from './pages/HistoricalTrendPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { AdminMasterDataPage } from './pages/AdminMasterDataPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000
    }
  }
});

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (
    location.pathname === '/login' ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/privacy-policy.html'
  ) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'IBM Plex Sans', system-ui, -apple-system, sans-serif",
        color: '#17212B',
        background: '#F4F5F2',
        boxSizing: 'border-box',
      }}
    >
      <Sidebar />
      <div style={{ flex: '999 1 560px', minWidth: 0, overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/candidates/:id" element={<CandidateDetailPage />} />
              <Route path="/accounts/:id" element={<AccountDetailPage />} />
              <Route path="/contents" element={<ContentExplorerPage />} />
              <Route path="/contents/:id" element={<ContentDetailPage />} />
              <Route path="/ai-findings" element={<AIFindingsPage />} />
              <Route path="/evidence" element={<EvidenceViewerPage />} />
              <Route path="/evidence/:id" element={<EvidenceViewerPage />} />
              <Route path="/cohorts" element={<CohortContextPage />} />
              <Route path="/cohort-comparison" element={<CohortComparisonPage />} />
              <Route path="/cohorts/comparison" element={<CohortComparisonPage />} />
              <Route path="/historical-trend" element={<HistoricalTrendPage />} />
              <Route path="/data-quality" element={<DataQualityPage />} />
              <Route path="/admin" element={<AdminMasterDataPage />} />
              <Route
                path="/privacy-policy"
                element={
                  <div style={{ padding: '32px', textAlign: 'center', background: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                    <p style={{ fontSize: '16px', color: '#333' }}>Membuka Kebijakan Privasi...</p>
                    <a href="/privacy-policy.html" style={{ color: '#2155d6', textDecoration: 'underline' }}>
                      Klik di sini untuk membaca Kebijakan Privasi DED
                    </a>
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
