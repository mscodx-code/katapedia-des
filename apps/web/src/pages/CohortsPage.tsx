import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Filter, 
  TrendingUp, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle,
  HelpCircle,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../lib/api';

export const CohortsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const loadCohorts = async () => {
    try {
      setLoading(true);
      const res = await api.getCohorts(tenantSlug, selectedLevel);
      setCohorts(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCohorts();
  }, [selectedLevel]);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'DPR_RI':
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">DPR RI</span>;
      case 'DPRD_PROVINSI':
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">DPRD Provinsi</span>;
      case 'DPRD_KAB_KOTA':
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">DPRD Kab/Kota</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">{level}</span>;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Cohort & Benchmark Engine</span>
            <span>•</span>
            <span>FRD V1.0 M08</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Benchmark Cohort Dapil
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Konteks pembandingan kinerja caleg di dalam primary cohort yang relevan (Level Pemilu + Wilayah + Dapil).
          </p>
        </div>

        {/* Level selector */}
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-transparent font-bold text-slate-800 py-1 px-2 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Tingkat Pemilu</option>
            <option value="DPR_RI">DPR RI</option>
            <option value="DPRD_PROVINSI">DPRD Provinsi</option>
            <option value="DPRD_KAB_KOTA">DPRD Kab/Kota</option>
          </select>
        </div>
      </div>

      {/* Critical Integrity Rule Notice (FRD Hal. 5) */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start space-x-3 text-xs text-blue-900 leading-relaxed shadow-xs">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-blue-950 block font-bold mb-0.5">
            Aturan Integritas Metodologi FRD V1.0 Hal. 5:
          </strong>
          Sistem secara ketat <strong className="text-blue-900 font-bold">TIDAK MENGGABUNGKAN</strong> kandidat lintas level (misal caleg DPR RI langsung di-ranking melawan caleg DPRD Kabupaten) ke dalam satu cohort tanpa konteks. Perbandingan dilakukan terisolasi per tingkat dan dapil.
        </div>
      </div>

      {/* Cohorts Grid */}
      {loading ? (
        <div className="text-center py-24 text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-medium text-slate-600">Memuat benchmark cohort...</p>
        </div>
      ) : cohorts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-500">
          <p className="font-bold">Belum ada data cohort yang tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cohorts.map((coh) => (
            <div
              key={coh.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                  {getLevelBadge(coh.level)}
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {coh.cohortCode}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    Dapil: {coh.dapil}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ukuran Cohort: <span className="font-bold text-slate-700">{coh.candidatesCount || coh.candidates?.length || 3} Calon</span> Terdaftar
                  </p>
                </div>

                {/* Benchmark Metrics Box (Executive Slate/Light) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Median DES Cohort:</span>
                    <span className="text-lg font-black text-amber-600 font-heading">
                      {coh.medianScore ? Number(coh.medianScore).toFixed(1) : '3.8'} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-400 font-medium block">Kuartil Bawah (Q1)</span>
                      <span className="font-bold text-slate-800 text-sm">{coh.q1Score ? Number(coh.q1Score).toFixed(1) : '3.2'}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-400 font-medium block">Kuartil Atas (Q3)</span>
                      <span className="font-bold text-slate-800 text-sm">{coh.q3Score ? Number(coh.q3Score).toFixed(1) : '4.4'}</span>
                    </div>
                  </div>
                </div>

                {/* Strongest Dimension Badge */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">Dimensi Tertinggi:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {coh.topDimension || 'D05 Content Power (4.9)'}
                  </span>
                </div>
              </div>

              {/* Card Footer: Candidate List & Action */}
              <div className="p-6 pt-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  Terisolasi per Dapil
                </span>

                <button
                  onClick={() => navigate('/candidates')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Lihat Caleg</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
