import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AuthProvider, useAuth } from './lib/auth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateProfilePage } from './pages/CandidateProfilePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ContentExplorerPage } from './pages/ContentExplorerPage';
import { CohortsPage } from './pages/CohortsPage';
import { AIWorkspacePage } from './pages/AIWorkspacePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ReportsPage } from './pages/ReportsPage';
import { TeamManagementPage } from './pages/TeamManagementPage';
import { SettingsPage } from './pages/SettingsPage';

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

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar currentTenant="pemilu-2029" />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)] bg-slate-50">
          {children}
        </main>
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
              <Route path="/candidates/:id" element={<CandidateProfilePage />} />
              <Route path="/candidates/:id/roadmap" element={<RoadmapPage />} />
              <Route path="/candidates/:id/contents" element={<ContentExplorerPage />} />
              <Route path="/contents" element={<ContentExplorerPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/cohorts" element={<CohortsPage />} />
              <Route path="/ai-workspace" element={<AIWorkspacePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/team" element={<TeamManagementPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
