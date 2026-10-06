import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Sparkles, 
  TrendingUp,
  FileText, 
  Video,
  KeyRound,
  Settings,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const primaryNavItems = [
    {
      to: '/dashboard',
      label: 'Monitoring Pusat',
      subtitle: 'Central Dashboard',
      icon: LayoutDashboard
    },
    {
      to: '/candidates',
      label: 'Kandidat & Dapil',
      subtitle: 'Candidate Registry',
      icon: Users
    },
    {
      to: '/analytics',
      label: 'Analisis & Tren',
      subtitle: 'Cross-Channel Analytics',
      icon: TrendingUp
    },
    {
      to: '/contents',
      label: 'Content Explorer',
      subtitle: 'Transkrip & Bukti',
      icon: Video
    },
    {
      to: '/cohorts',
      label: 'Benchmark Cohort',
      subtitle: 'DPR & DPRD Analysis',
      icon: Award
    },
    {
      to: '/ai-workspace',
      label: 'AI Intelligence Studio',
      subtitle: 'Tanya Data & Evidence',
      icon: Sparkles
    },
    {
      to: '/reports',
      label: 'Laporan Eksekutif',
      subtitle: 'Executive Briefs & PDF',
      icon: FileText
    }
  ];

  const adminNavItems = [
    {
      to: '/team',
      label: 'Manajemen Tim & RBAC',
      subtitle: 'Hak Akses Per Klien',
      icon: KeyRound
    },
    {
      to: '/settings',
      label: 'Pengaturan Sistem',
      subtitle: 'Tenant & Kuota Data',
      icon: Settings
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] shadow-sm">
      <div className="p-4 space-y-6">
        {/* Navigation Section 1: Operasional Pemenangan */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Modul Analitik Pemenangan
          </p>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="leading-snug">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal leading-tight">
                    {item.subtitle}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Navigation Section 2: Administrasi & RBAC */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Tata Kelola & Klien
          </p>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="leading-snug">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal leading-tight">
                    {item.subtitle}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* 10 Dimensi Quick Reference Badge */}
        <div className="mx-1 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>10 Dimensi DES</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-snug">
            Dari <strong>Terlihat</strong> (D01), <strong>Dikenal</strong> (D02), hingga <strong>Menjadi Sistem</strong> (D10).
          </p>
          <div className="flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold pt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>FRD V1.0 & PRD Compliant</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Katapedia DES v1.0</span>
          <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 text-[10px]">
            Enterprise
          </span>
        </div>
      </div>
    </aside>
  );
};
