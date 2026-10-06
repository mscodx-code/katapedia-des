import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth, DEMO_USERS, UserSession } from '../lib/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('pemilu-2029');
  const [error, setError] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Silakan masukkan email dan kata sandi.');
      return;
    }
    // Match demo user or default to Analyst
    const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      loginAs(matched);
    } else {
      loginAs({
        id: 'usr-custom',
        name: email.split('@')[0],
        email,
        role: 'ANALYST',
        roleLabel: 'Data Analyst',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120',
        tenantSlug: selectedTenant,
        tenantName: 'DPP Pemenangan Pemilu 2029'
      });
    }
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = (demoUser: UserSession) => {
    loginAs(demoUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Header */}
        <div className="inline-flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <BarChart3 className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Katapedia
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Digital Electoral System (DES)
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Masuk ke Platform Pemenangan Pemilu
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Sistem analitik cerdas & audit elektoral berbasis metodologi 10 Dimensi DES
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200 rounded-3xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Organisasi / Klien (Tenant)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedTenant}
                  onChange={(e) => setSelectedTenant(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-medium"
                >
                  <option value="pemilu-2029">DPP Pemenangan Pemilu 2029 (Resmi)</option>
                  <option value="dprd-jabar">DPD Pemenangan Jawa Barat</option>
                  <option value="pilkada-pusat">Badan Koordinasi Pilkada Nasional</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@organisasi.id"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <a href="#reset" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all shadow-blue-500/20"
            >
              <span>Masuk ke Akun</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Roles Selector */}
          <div className="pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                Masuk Cepat Sebagai Akun Demo (RBAC)
              </span>
              <span className="text-[11px] text-slate-400">Pilih peran:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => handleQuickDemoLogin(demo)}
                  className="p-3 text-left rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50/60 hover:border-blue-300 transition-all flex items-center space-x-3 group"
                >
                  <img
                    src={demo.avatar}
                    alt={demo.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-700">
                      {demo.name}
                    </p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700">
                      {demo.roleLabel}
                    </span>
                  </div>
                  <UserCheck className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Audit guarantee */}
        <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
          <p className="flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-600">
              Multi-Tenant Data Isolation & Row-Level RBAC Enforcement
            </span>
          </p>
          <p className="text-[11px] text-slate-400">
            Katapedia DES Platform • Metodologi Katapedia #9 oleh Deddy Rahman
          </p>
        </div>
      </div>
    </div>
  );
};
