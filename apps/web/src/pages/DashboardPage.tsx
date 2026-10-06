import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { 
  Users, 
  Share2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Filter,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  BarChart2,
  PieChart,
  Activity,
  Layers
} from 'lucide-react';
import { api } from '../lib/api';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getOverview(tenantSlug, selectedLevel);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedLevel]);

  // ECharts Option 1: National DES Trend & Interaction
  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E293B',
      borderColor: '#334155',
      textStyle: { color: '#F8FAFC', fontSize: 12 }
    },
    legend: {
      data: ['Rata-Rata Skor DES', 'Volume Interaksi (Ribuan)'],
      top: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6'],
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Skor DES',
        min: 0,
        max: 5,
        splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
        axisLabel: { color: '#64748B', fontSize: 11 }
      },
      {
        type: 'value',
        name: 'Engagement (k)',
        splitLine: { show: false },
        axisLabel: { color: '#64748B', fontSize: 11 }
      }
    ],
    series: [
      {
        name: 'Rata-Rata Skor DES',
        type: 'line',
        smooth: true,
        data: [3.4, 3.6, 3.8, 3.9, 4.0, 4.2],
        itemStyle: { color: '#2563EB' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37, 99, 235, 0.25)' },
              { offset: 1, color: 'rgba(37, 99, 235, 0.0)' }
            ]
          }
        }
      },
      {
        name: 'Volume Interaksi (Ribuan)',
        type: 'bar',
        yAxisIndex: 1,
        data: [120, 185, 240, 310, 450, 520],
        itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  // ECharts Option 2: Public Sentiment Donut Chart
  const sentimentChartOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    legend: { bottom: '0%', textStyle: { color: '#475569', fontSize: 11 } },
    series: [
      {
        name: 'Sentimen Publik',
        type: 'pie',
        radius: ['50%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#1E293B' }
        },
        data: [
          { value: 72, name: 'Positif (72%)', itemStyle: { color: '#10B981' } },
          { value: 21, name: 'Netral (21%)', itemStyle: { color: '#94A3B8' } },
          { value: 7, name: 'Negatif / Kritis (7%)', itemStyle: { color: '#EF4444' } }
        ]
      }
    ]
  };

  // ECharts Option 3: Electoral Conversion Funnel (4 Steps)
  const funnelOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [
      {
        name: 'Funnel Konversi',
        type: 'funnel',
        left: '10%',
        top: 10,
        bottom: 10,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 3,
        label: {
          show: true,
          position: 'inside',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 11
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        data: [
          { value: 100, name: '1. Terlihat (D01-Seen)', itemStyle: { color: '#2563EB' } },
          { value: 78, name: '2. Dikenal (D02-Known)', itemStyle: { color: '#3B82F6' } },
          { value: 54, name: '3. Dipercaya (D07-Trusted)', itemStyle: { color: '#60A5FA' } },
          { value: 32, name: '4. Dipilih (D09-Chosen)', itemStyle: { color: '#10B981' } }
        ]
      }
    ]
  };

  if (loading && !data) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-medium text-slate-500">Memuat Central Monitoring Dashboard...</p>
        </div>
      </div>
    );
  }

  const {
    totalCandidates = 0,
    connectedAccounts = 0,
    coverageStats = { complete: 0, partial: 0, insufficient: 0, stale: 0 },
    topPerformers = [],
    needsAttention = [],
    anomalySignals = [],
    summary = { averageDES: '—' }
  } = data || {};

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Departemen Pemenangan Pemilu</span>
            <span>•</span>
            <span>FRD V1.0 M08</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Monitoring Pusat Elektabilitas Digital
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pemantauan agregat performa bakal caleg di Instagram & TikTok berdasarkan metodologi 10 Dimensi DES.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <Filter className="w-4 h-4 text-slate-400 ml-2" />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-800 py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Tingkat Pemilu</option>
            <option value="DPR_RI">DPR RI</option>
            <option value="DPRD_PROVINSI">DPRD Provinsi</option>
            <option value="DPRD_KAB_KOTA">DPRD Kab/Kota</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bakal Caleg</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-heading">{totalCandidates}</span>
            <span className="text-xs text-slate-500 font-medium">calon terpantau</span>
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center font-medium">
            <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Primary cohort terisolasi
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Akun Sosial Terhubung</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-heading">{connectedAccounts}</span>
            <span className="text-xs text-slate-500 font-medium">IG & TikTok</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" /> Sinkronisasi otomatis aktif
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-Rata Skor DES</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-amber-600 font-heading">{summary.averageDES}</span>
            <span className="text-xs text-slate-500 font-medium">/ 5.0 (Skala DES)</span>
          </div>
          <div className="text-[11px] text-amber-700 flex items-center font-medium">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> Evaluasi 90 hari Katapedia
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cakupan Data (*Coverage*)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-heading">
              {totalCandidates > 0 ? Math.round((coverageStats.complete / totalCandidates) * 100) : 0}%
            </span>
            <span className="text-xs text-slate-500 font-medium">Complete Data</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-semibold">
            <span className="text-emerald-700">{coverageStats.complete} Lengkap</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700">{coverageStats.partial} Parsial</span>
          </div>
        </div>
      </div>

      {/* Graphical Analytics Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Tren Kenaikan Skor DES & Volume Keterlibatan</span>
              </h2>
              <p className="text-xs text-slate-500">
                Korelasi antara konsistensi konten viral dengan lonjakan skor 10 Dimensi DES.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Agregat Nasional
            </span>
          </div>
          <div className="h-72 w-full">
            <ReactECharts option={trendChartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* Sentiment Donut Chart (1 Col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                <span>Komposisi Sentimen Publik</span>
              </h2>
              <p className="text-xs text-slate-500">
                Porsi sentimen komentar organik audiens.
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ReactECharts option={sentimentChartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Funnel Konversi Elektoral */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Funnel Konversi Elektoral (Dari Viral ke Pemilih Fisik)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Perjalanan calon dari fase <strong>Terlihat</strong> (D01), <strong>Dikenal</strong> (D02), <strong>Dipercaya</strong> (D07) hingga <strong>Dipilih</strong> (D09).
            </p>
          </div>
          <button
            onClick={() => navigate('/analytics')}
            className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center"
          >
            Lihat Detail Analitik <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
        <div className="h-56 w-full">
          <ReactECharts option={funnelOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      {/* Sinyal Anomali Perlu Tinjauan (FRD Bagian 18) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Sinyal Anomali Memerlukan Tinjauan Analis</h2>
              <p className="text-xs text-slate-500">
                Sinyal lonjakan data atau perubahan mendadak untuk review manusia (bukan kesimpulan otomatis).
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            {anomalySignals.length} Sinyal Terdeteksi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {anomalySignals.map((sig: any) => (
            <div
              key={sig.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{sig.candidateName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {sig.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sig.description}
              </p>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Rekomendasi:</span>
                <span className="text-blue-700 font-bold">{sig.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Rankings: Top Performers vs Prioritas Perbaikan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Calon Kinerja Digital Tertinggi</span>
            </h2>
            <button
              onClick={() => navigate('/candidates')}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center font-bold"
            >
              Lihat Semua <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {topPerformers.map((c: any, index: number) => (
              <div
                key={c.id}
                onClick={() => navigate(`/candidates/${c.id}`)}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-blue-50/50 hover:border-blue-200 cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {c.dapil} • {c.party}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-amber-600 font-heading">
                      {c.score?.toFixed(1) || '—'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">DES Score</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention / Prioritas Utama */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Kandidat Perlu Intervensi Roadmap (Prioritas)</span>
            </h2>
            <button
              onClick={() => navigate('/candidates')}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center font-bold"
            >
              Kelola <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {needsAttention.map((c: any) => (
              <div
                key={c.id}
                onClick={() => navigate(`/candidates/${c.id}`)}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-rose-50/50 hover:border-rose-200 cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center border border-rose-200">
                    !
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {c.dapil} • {c.priorityItemsCount} Butir Prioritas Utama
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-700 font-heading">
                      {c.score?.toFixed(1) || '—'}
                    </span>
                    <span className="text-[10px] text-rose-600 font-semibold block">Perlu Boost</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
