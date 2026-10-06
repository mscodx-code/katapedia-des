import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  Key, 
  CheckCircle2, 
  Sparkles,
  Save
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [tenantName, setTenantName] = useState('DPP Pemenangan Pemilu 2029');
  const [domain, setDomain] = useState('DES.katapedia.id');
  const [retentionDays, setRetentionDays] = useState('365');
  const [aiModel, setAiModel] = useState('Katapedia DES Engine v1.0 (Hybrid GPT-4o & Gemini Flash)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Konfigurasi Platform</span>
            <span>•</span>
            <span>PRD §12.2 Tenant Settings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Pengaturan Tenant & Sistem
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Konfigurasi organisasi, parameter kuota data, dan integrasi kecerdasan buatan (AI).
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan tenant berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Quota & Usage Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Penggunaan Kuota Mention</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-heading">124.500 <span className="text-xs font-normal text-slate-400">/ 500.000</span></p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '25%' }}></div>
          </div>
          <p className="text-[11px] text-slate-400">24.9% terpakai (Paket Enterprise)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Slot Kandidat / Caleg</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-heading">6 <span className="text-xs font-normal text-slate-400">/ 50 Terpakai</span></p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '12%' }}></div>
          </div>
          <p className="text-[11px] text-slate-400">Tersisa 44 slot kandidat aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Status Enkripsi & Audit</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-base font-extrabold text-emerald-700 font-heading">Row-Level Secured</p>
          <p className="text-xs text-slate-500">Isolasi tenant terverifikasi aman & terenskripsi penuh.</p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Informasi Tenant & Domain Resmi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Organisasi / Klien
            </label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Custom Domain / Subdomain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Retensi Data Mentah (Hari)
            </label>
            <input
              type="number"
              value={retentionDays}
              onChange={(e) => setRetentionDays(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Model Ekstraksi & AI Intelligence
            </label>
            <input
              type="text"
              readOnly
              value={aiModel}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
