import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Building2, 
  Sparkles,
  KeyRound,
  FileText,
  AlertCircle,
  MoreVertical,
  Check,
  X
} from 'lucide-react';
import { useAuth, DEMO_USERS, UserSession } from '../lib/auth';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_SUPERADMIN' | 'TENANT_ADMIN' | 'ANALYST' | 'VIEWER';
  scope: string;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
  lastActive: string;
  avatar: string;
}

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'usr-1',
    name: 'Budi Santoso, M.Si',
    email: 'admin@katapedia.id',
    role: 'PLATFORM_SUPERADMIN',
    scope: 'Seluruh Tenant & Platform',
    status: 'ACTIVE',
    lastActive: '5 menit lalu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  },
  {
    id: 'usr-2',
    name: 'H. Ahmad Fauzi',
    email: 'dpp@pemilu2029.id',
    role: 'TENANT_ADMIN',
    scope: 'DPP Pemenangan Pemilu 2029 (Semua Dapil)',
    status: 'ACTIVE',
    lastActive: '1 jam lalu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  },
  {
    id: 'usr-3',
    name: 'Siti Rahma',
    email: 'siti.rahma@katapedia.id',
    role: 'ANALYST',
    scope: 'Analisis Dapil DPR RI & Jabar',
    status: 'ACTIVE',
    lastActive: 'Sekarang',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
  },
  {
    id: 'usr-4',
    name: 'Rangga Pradipta',
    email: 'rangga@caleg.id',
    role: 'VIEWER',
    scope: 'Terbatas: Caleg Kab. Bogor 3',
    status: 'ACTIVE',
    lastActive: 'Kemarin',
    avatar: '/avatars/rangga.jpg'
  },
  {
    id: 'usr-5',
    name: 'Dr. Tjatur Saptoedy',
    email: 'tjatur@caleg.id',
    role: 'VIEWER',
    scope: 'Terbatas: Caleg Jateng VIII',
    status: 'ACTIVE',
    lastActive: '3 hari lalu',
    avatar: '/avatars/tjatur.jpg'
  },
  {
    id: 'usr-6',
    name: 'Dimas Wicaksono',
    email: 'dimas.analyst@timses.org',
    role: 'ANALYST',
    scope: 'Data Ingestion & Media Crawling',
    status: 'INVITED',
    lastActive: 'Belum login',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100'
  }
];

// RBAC matrix based on PRD §9.2
const RBAC_PERMISSIONS = [
  {
    category: 'Manajemen Tenant & Platform',
    features: [
      { id: 'p_tenant_create', label: 'Membuat dan mengatur tenant/klien', superadmin: true, admin: false, analyst: false, viewer: false },
      { id: 'p_quota_manage', label: 'Mengatur paket kuota dan batasan data', superadmin: true, admin: false, analyst: false, viewer: false },
      { id: 'p_profile_manage', label: 'Mengatur profil tenant klien', superadmin: true, admin: true, analyst: false, viewer: false },
      { id: 'p_member_manage', label: 'Mengelola anggota dan hak akses (RBAC)', superadmin: true, admin: true, analyst: false, viewer: false },
    ]
  },
  {
    category: 'Manajemen Data Kandidat & Elektoral',
    features: [
      { id: 'p_brand_manage', label: 'Mengelola master caleg, dapil, dan nomor urut', superadmin: true, admin: true, analyst: true, viewer: false },
      { id: 'p_import_data', label: 'Impor & review data mentah (raw mention)', superadmin: true, admin: true, analyst: true, viewer: false },
      { id: 'p_view_dash', label: 'Membaca dashboard analitik & tren', superadmin: true, admin: true, analyst: true, viewer: true },
      { id: 'p_scoring_recompute', label: 'Menghitung ulang skor 10 Dimensi DES', superadmin: true, admin: true, analyst: true, viewer: false },
    ]
  },
  {
    category: 'Intelijen AI & Pelaporan Eksekutif',
    features: [
      { id: 'p_ai_use', label: 'Menggunakan AI Intelligence Studio & Tanya Data', superadmin: true, admin: true, analyst: true, viewer: false },
      { id: 'p_report_create', label: 'Menyusun laporan strategi pemenangan', superadmin: true, admin: true, analyst: true, viewer: false },
      { id: 'p_report_download', label: 'Mengunduh laporan PDF eksekutif', superadmin: true, admin: true, analyst: true, viewer: true },
      { id: 'p_export_raw', label: 'Ekspor data mentah (CSV / Audit Evidence)', superadmin: true, admin: true, analyst: true, viewer: false },
    ]
  }
];

export const TeamManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'RBAC'>('MEMBERS');
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'ANALYST' as any,
    scope: 'DPP Pemenangan Pemilu 2029'
  });
  const [savedNotification, setSavedNotification] = useState('');

  const filteredMembers = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.scope.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'ALL' || m.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const added: Member = {
      id: `usr-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      scope: newMember.scope,
      status: 'INVITED',
      lastActive: 'Baru saja diundang',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
    };

    setMembers([added, ...members]);
    setShowInviteModal(false);
    setNewMember({ name: '', email: '', role: 'ANALYST', scope: 'DPP Pemenangan Pemilu 2029' });
    setSavedNotification(`Undangan berhasil dikirim ke ${added.email}`);
    setTimeout(() => setSavedNotification(''), 4000);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'PLATFORM_SUPERADMIN':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">Superadmin</span>;
      case 'TENANT_ADMIN':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 border border-blue-200">Tenant Admin</span>;
      case 'ANALYST':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">Analyst</span>;
      case 'VIEWER':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Viewer</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Akses & Tata Kelola Pengguna</span>
            <span>•</span>
            <span>PRD §9 & FRD V1.0 Compliant</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Manajemen Pengguna & RBAC
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur hierarki akses per klien, batasan peran (Roles), dan izin fitur platform pemenangan pemilu.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Undang Anggota Tim</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab('MEMBERS')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'MEMBERS'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Daftar Pengguna ({members.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('RBAC')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'RBAC'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Matriks Hak Akses (RBAC)</span>
        </button>
      </div>

      {/* TAB 1: MEMBERS */}
      {activeTab === 'MEMBERS' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, email, atau dapil..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Peran</option>
                <option value="PLATFORM_SUPERADMIN">Superadmin</option>
                <option value="TENANT_ADMIN">Tenant Admin</option>
                <option value="ANALYST">Analyst</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Pengguna</th>
                    <th className="py-3 px-4">Peran (Role)</th>
                    <th className="py-3 px-4">Cakupan Akses (Scope)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Aktivitas Terakhir</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{m.name}</p>
                            <p className="text-[11px] text-slate-400">{m.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">{getRoleBadge(m.role)}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700">{m.scope}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {m.status === 'ACTIVE' ? (
                          <span className="inline-flex items-center text-emerald-600 font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-amber-600 font-semibold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                            Menunggu Konfirmasi
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{m.lastActive}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="text-slate-400 hover:text-slate-700 p-1">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC MATRIX */}
      {activeTab === 'RBAC' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-bold">Standar Keamanan RBAC Katapedia</p>
              <p className="text-amber-700 mt-0.5">
                Hak akses dievaluasi ketat di level API Gateway dan Database PostgreSQL (Row-Level Security & Tenant Isolation).
                Pengguna dengan role <strong>Viewer</strong> tidak dapat memicu komputasi AI atau mengubah master data caleg.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Matriks Otorisasi Fitur</h3>
                <p className="text-[11px] text-slate-500">Berdasarkan PRD Proyek DES Katapedia Tabel §9.2</p>
              </div>
              <span className="text-[11px] font-semibold text-blue-600">Sistem RBAC Aktif</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 w-2/5">Fungsi & Modul Platform</th>
                    <th className="py-3 px-3 text-center">Superadmin</th>
                    <th className="py-3 px-3 text-center">Tenant Admin</th>
                    <th className="py-3 px-3 text-center">Analyst</th>
                    <th className="py-3 px-3 text-center">Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RBAC_PERMISSIONS.map((group, gIdx) => (
                    <React.Fragment key={gIdx}>
                      <tr className="bg-slate-50/50">
                        <td colSpan={5} className="py-2 px-4 font-bold text-slate-800 text-[11px] uppercase tracking-wider bg-slate-50">
                          {group.category}
                        </td>
                      </tr>
                      {group.features.map((feat) => (
                        <tr key={feat.id} className="hover:bg-slate-50/40">
                          <td className="py-3 px-4 font-medium text-slate-700">
                            {feat.label}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {feat.superadmin ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs">✓</span>
                            ) : (
                              <span className="text-slate-300 font-bold">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {feat.admin ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">✓</span>
                            ) : (
                              <span className="text-slate-300 font-bold">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {feat.analyst ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">✓</span>
                            ) : (
                              <span className="text-slate-300 font-bold">—</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {feat.viewer ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">✓</span>
                            ) : (
                              <span className="text-slate-300 font-bold">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Undang Anggota Tim Baru</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Mis: Dr. Andi Wijaya"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Akun
                </label>
                <input
                  type="email"
                  required
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="andi@timses.org"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Peran / Role (RBAC)
                </label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="TENANT_ADMIN">Tenant Admin (Pengelola Klien & Hak Akses)</option>
                  <option value="ANALYST">Analyst (Scoring 10 Dimensi & AI Studio)</option>
                  <option value="VIEWER">Viewer (Caleg / Tokoh - Read Only)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cakupan Wilayah / Dapil
                </label>
                <input
                  type="text"
                  value={newMember.scope}
                  onChange={(e) => setNewMember({ ...newMember, scope: e.target.value })}
                  placeholder="Semua Dapil / Spesifik Dapil"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
                >
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
