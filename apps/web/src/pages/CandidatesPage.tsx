import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  Instagram, 
  Video, 
  ExternalLink,
  ShieldCheck, 
  Compass,
  LayoutGrid,
  List,
  ArrowUpDown,
  TrendingUp,
  Award
} from 'lucide-react';
import { api } from '../lib/api';

export const CandidatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'GRID' | 'TABLE'>('GRID');
  const [sortBy, setSortBy] = useState<'SCORE_DESC' | 'NAME_ASC'>('SCORE_DESC');

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const res = await api.getCandidates(tenantSlug, {
        level: levelFilter,
        search: search.trim() || undefined
      });
      setCandidates(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, [levelFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCandidates();
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'SCORE_DESC') {
      return (b.desScore || 0) - (a.desScore || 0);
    }
    return a.name.localeCompare(b.name);
  });

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'DPR_RI':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            DPR RI
          </span>
        );
      case 'DPRD_PROVINSI':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            DPRD Provinsi
          </span>
        );
      case 'DPRD_KAB_KOTA':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
            DPRD Kab/Kota
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
            {level}
          </span>
        );
    }
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 4.5) return { label: 'Sangat Kuat', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 3.8) return { label: 'Kuat', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 3.0) return { label: 'Sedang', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Perlu Akselerasi', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Executive Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Candidate Master Registry</span>
            <span>•</span>
            <span>FRD V1.0 M01</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Daftar Caleg & Hierarki Dapil
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Basis data profil bakal caleg legislatif DPR RI, DPRD Provinsi, dan DPRD Kabupaten/Kota.
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setViewMode('GRID')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'GRID' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Kartu Eksekutif"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('TABLE')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'TABLE' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tampilan Tabel Data"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none shadow-sm cursor-pointer"
          >
            <option value="SCORE_DESC">Urutkan: Skor DES Tertinggi</option>
            <option value="NAME_ASC">Urutkan: Nama Calon (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          {/* Level Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: 'ALL', label: 'Semua Tingkat' },
              { id: 'DPR_RI', label: 'DPR RI' },
              { id: 'DPRD_PROVINSI', label: 'DPRD Provinsi' },
              { id: 'DPRD_KAB_KOTA', label: 'DPRD Kab/Kota' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setLevelFilter(lvl.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  levelFilter === lvl.id
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, partai, dapil..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs font-medium text-slate-600">Memuat profil calon legislatif...</p>
        </div>
      ) : sortedCandidates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-500 space-y-2">
          <Users className="w-10 h-10 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">Tidak ada kandidat ditemukan</p>
          <p className="text-xs">Coba ubah kata kunci pencarian atau filter tingkat pemilihan.</p>
        </div>
      ) : viewMode === 'GRID' ? (
        /* GRID VIEW: Executive Candidate Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCandidates.map((c) => {
            const scoreInterp = getScoreInterpretation(c.desScore || 0);
            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top Banner */}
                <div className="p-5 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getLevelBadge(c.electionLevel)}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        No. Urut {c.ballotNumber || '-'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{c.desScore?.toFixed(1) || '—'} DES</span>
                    </div>
                  </div>

                  {/* Profile Header Block */}
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-slate-100 shadow-sm shrink-0 bg-slate-100">
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {c.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-1">
                        {c.party || 'Calon Independen'}
                      </p>
                      <p className="text-xs text-blue-700 font-medium mt-0.5 truncate">
                        {c.dapil}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreInterp.color}`}>
                          {scoreInterp.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body: Social Channels & Metrics */}
                <div className="p-5 space-y-4">
                  {/* Social accounts bar */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-around text-xs">
                    {c.accounts?.map((acc: any, i: number) => (
                      <div key={i} className="flex items-center space-x-1.5">
                        {acc.platform === 'INSTAGRAM' ? (
                          <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        ) : (
                          <Video className="w-3.5 h-3.5 text-sky-600" />
                        )}
                        <span className="font-semibold text-slate-700 text-[11px]">{acc.handle}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({(acc.followers / 1000).toFixed(0)}k)
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <button
                    onClick={() => navigate(`/candidates/${c.id}`)}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Lihat 10 Dimensi & Roadmap</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW: Executive Data Table */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Caleg</th>
                  <th className="py-3 px-4">Tingkat & Dapil</th>
                  <th className="py-3 px-4">Partai & No. Urut</th>
                  <th className="py-3 px-4">Kanal Sosial</th>
                  <th className="py-3 px-4 text-center">Skor DES</th>
                  <th className="py-3 px-4 text-center">Evaluasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedCandidates.map((c) => {
                  const scoreInterp = getScoreInterpretation(c.desScore || 0);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={c.avatarUrl}
                            alt={c.name}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{c.name}</p>
                            <p className="text-[11px] text-slate-400">{c.candidateCode || 'CAND-REG'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          {getLevelBadge(c.electionLevel)}
                          <p className="font-semibold text-slate-800 text-[11px] pt-1">{c.dapil}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{c.party}</p>
                        <p className="text-slate-500 text-[11px]">No. Urut {c.ballotNumber || '-'}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col space-y-1">
                          {c.accounts?.map((acc: any, i: number) => (
                            <span key={i} className="text-[11px] text-slate-600 font-medium">
                              {acc.platform === 'INSTAGRAM' ? 'IG: ' : 'TikTok: '} {acc.handle}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-sm font-extrabold text-slate-900 font-heading">
                          {c.desScore?.toFixed(1) || '—'}
                        </span>
                        <span className="text-[10px] text-slate-400 block">/ 5.0</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreInterp.color}`}>
                          {scoreInterp.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => navigate(`/candidates/${c.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold transition-all"
                        >
                          Buka Profil
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
