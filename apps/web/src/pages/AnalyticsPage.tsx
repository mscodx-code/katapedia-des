import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart, 
  Calendar, 
  Filter, 
  Share2, 
  Sparkles,
  Download
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30D');
  const [platform, setPlatform] = useState('ALL');

  // Chart 1: Time Series Trend Line
  const trendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1E293B',
      borderColor: '#334155',
      textStyle: { color: '#F8FAFC', fontSize: 12 }
    },
    legend: {
      data: ['Sentimen Positif', 'Netral', 'Sentimen Negatif', 'Total Engagement'],
      top: 10,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['01 Sep', '05 Sep', '10 Sep', '15 Sep', '20 Sep', '25 Sep', '30 Sep', '05 Okt'],
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisLabel: { color: '#64748B', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#F1F5F9', type: 'dashed' } },
      axisLabel: { color: '#64748B', fontSize: 11 }
    },
    series: [
      {
        name: 'Sentimen Positif',
        type: 'line',
        smooth: true,
        data: [1200, 1500, 2100, 3400, 4200, 3900, 5100, 6200],
        itemStyle: { color: '#10B981' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.25)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.0)' }
            ]
          }
        }
      },
      {
        name: 'Netral',
        type: 'line',
        smooth: true,
        data: [800, 950, 1100, 1400, 1800, 1600, 2000, 2400],
        itemStyle: { color: '#64748B' }
      },
      {
        name: 'Sentimen Negatif',
        type: 'line',
        smooth: true,
        data: [150, 180, 220, 310, 290, 420, 380, 410],
        itemStyle: { color: '#EF4444' }
      },
      {
        name: 'Total Engagement',
        type: 'line',
        smooth: true,
        data: [4500, 5600, 8200, 12400, 16800, 15200, 19800, 24600],
        itemStyle: { color: '#2563EB' }
      }
    ]
  };

  // Chart 2: Platform Breakdown Donut
  const platformOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} mention ({d}%)'
    },
    legend: {
      bottom: '5%',
      left: 'center',
      textStyle: { color: '#475569', fontSize: 11 }
    },
    series: [
      {
        name: 'Distribusi Platform',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1E293B'
          }
        },
        data: [
          { value: 124500, name: 'TikTok (Shorts)', itemStyle: { color: '#0EA5E9' } },
          { value: 98400, name: 'Instagram (Reels/Feed)', itemStyle: { color: '#EC4899' } },
          { value: 34200, name: 'YouTube & Podcast', itemStyle: { color: '#EF4444' } },
          { value: 18900, name: 'Online Media & Berita', itemStyle: { color: '#F59E0B' } }
        ]
      }
    ]
  };

  // Chart 3: Share of Voice Horizontal Bar
  const sovOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value', splitLine: { lineStyle: { color: '#F1F5F9' } } },
    yAxis: {
      type: 'category',
      data: ['Hendro Kusumo', 'Anisa Wardani', 'Dr. Tjatur Saptoedy', 'Rangga Pradipta', 'Prof. Ridha', 'Komjen Oegroseno'],
      axisLabel: { color: '#334155', fontWeight: 600, fontSize: 11 }
    },
    series: [
      {
        name: 'Share of Voice (SoV %)',
        type: 'bar',
        data: [12.4, 18.2, 24.5, 31.8, 48.6, 56.2],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#3B82F6' },
              { offset: 1, color: '#1D4ED8' }
            ]
          },
          borderRadius: [0, 6, 6, 0]
        }
      }
    ]
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Analitik Lintas Saluran</span>
            <span>•</span>
            <span>PRD §13.2 Brand & Trend</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Analisis Tren & Sentimen Elektoral
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Grafik komparatif pergerakan suara digital, reaksi publik, dan jangkauan algoritma pemilu.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm text-xs font-semibold">
            {['7D', '30D', '90D', 'YTD'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === t
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Grafik</span>
          </button>
        </div>
      </div>

      {/* Main Trend Line Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pergerakan Tren Sentimen & Engagement 30 Hari</h2>
            <p className="text-xs text-slate-500">Agregasi interaksi dari 276.000+ audiens di seluruh dapil binaan.</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Sentimen Positif 88.4%
          </span>
        </div>
        <div className="h-80 w-full">
          <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      {/* Two Columns: Platform Share & Share of Voice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Share Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pangsa Platform Digital</h2>
              <p className="text-xs text-slate-500">Distribusi sebaran interaksi berdasarkan kanal</p>
            </div>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-72 w-full">
            <ReactECharts option={platformOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* Share of Voice Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Share of Voice (SoV) Caleg Terpopuler</h2>
              <p className="text-xs text-slate-500">Persentase dominasi percakapan pemilih di media sosial</p>
            </div>
            <BarChart2 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-72 w-full">
            <ReactECharts option={sovOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
