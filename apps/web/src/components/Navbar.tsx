import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShieldCheck, 
  Building2, 
  LogOut, 
  ChevronDown, 
  Users, 
  Settings, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../lib/auth';

interface NavbarProps {
  currentTenant: string;
  onTenantChange?: (tenant: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTenant }) => {
  const navigate = useNavigate();
  const { user, logout, loginAs } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Brand Identity: Katapedia ONLY (No 's Way) */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1">
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                Katapedia
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-0.5">
              DES Analytics Platform
            </span>
          </div>
        </Link>

        {/* Live Badge Domain from PDF */}
        <div className="hidden md:flex items-center space-x-2 ml-4 pl-4 border-l border-slate-200">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse mr-1.5"></span>
            DES.katapedia.id
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Pemilu 2029 Readiness
          </span>
        </div>
      </div>

      {/* Right controls: Tenant, User Profile */}
      <div className="flex items-center space-x-3">
        {/* Tenant selector indicator */}
        <div className="hidden sm:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
          <Building2 className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-slate-500">Tenant:</span>
          <span className="font-bold text-slate-800">DPP Pemenangan Pemilu 2029</span>
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2.5 pl-2 py-1 pr-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full ring-2 ring-slate-200 overflow-hidden shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'}
                alt={user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || 'Siti Rahma'}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold flex items-center">
                <ShieldCheck className="w-3 h-3 mr-0.5" />
                {user?.roleLabel || 'Dept Analyst'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1">
              <div className="p-3 border-b border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{user?.name}</p>
                <p className="text-[11px] text-slate-500">{user?.email}</p>
                <span className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {user?.roleLabel}
                </span>
              </div>

              {/* Navigation links */}
              <Link
                to="/team"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
              >
                <KeyRound className="w-4 h-4 text-slate-500" />
                <span>Pengaturan RBAC & Tim</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Pengaturan Tenant</span>
              </Link>

              {/* Quick Switch Role Selector */}
              <div className="pt-2 border-t border-slate-100">
                <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Ganti Peran Akun (Demo RBAC)
                </p>
                {DEMO_USERS.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => {
                      loginAs(demo);
                      setProfileDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                      user?.email === demo.email
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{demo.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-medium">
                      {demo.role.split('_')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Logout button */}
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
