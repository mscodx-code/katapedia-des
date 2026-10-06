import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  Share2,
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  type: 'PDF' | 'EXCEL' | 'AUDIT';
  date: string;
  size: string;
  status: 'READY' | 'PROCESSING';
  description: string;
}

const REPORTS: ReportItem[] = [
  {
    id: 'rep-01',
    title: 'Executive Briefing: Evaluasi Kesiapan Digital 10 Dimensi DES',
    type: 'PDF',
    date: '06 Oktober 2026',
    size: '4.2 MB',
    status: 'READY',
    description: 'Ringkasan komprehensif audit digital untuk Dewan Pembina & Pimpinan Partai (DPP).'
  },
  {
    id: 'rep-02',
    title: 'Roadmap Pemenangan Dapil DPR RI & DPRD Provinsi (Jabar & DKI)',
    type: 'PDF',
    date: '04 Oktober 2026',
    size: '6.8 MB',
    status: 'READY',
    description: 'Daftar butir aksi Prioritas Utama, Pantau, Pertahankan, dan Tunda per calon legislatif.'
  },
  {
    id: 'rep-03',
    title: 'Matriks Bukti Konten Viral & Rekomendasi Winning Formula',
    type: 'EXCEL',
    date: '02 Oktober 2026',
    size: '1.4 MB',
    status: 'READY',
    description: 'Dataset tabel transkrip hook video dengan rasio share > 5.0x dan engagement tertinggi.'
  },
  {
    id: 'rep-04',
    title: 'Audit Log & Raw Data Ekspor Multi-Platform (TikTok & IG)',
    type: 'AUDIT',
    date: '28 September 2026',
    size: '14.2 MB',
    status: 'READY',
    description: 'Rekam jejak mention mentah, sentimen terklasifikasi, dan audit integritas data.'
  }
];

export const ReportsPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string>('');

  const handleDownload = (title: string) => {
    setDownloadSuccess(`Mengunduh berkas: ${title}`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Executive Reporting</span>
            <span>•</span>
            <span>PRD §13.2 & FRD V1.0</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Laporan Eksekutif & Dokumen Pemenangan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Unduh laporan terbitan resmi untuk pimpinan partai, konsultan politik, dan kandidat binaan.
          </p>
        </div>

        <button
          onClick={() => handleDownload('Executive Summary Baru (Otomatis)')}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Buat Ringkasan Eksekutif Baru</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((rep) => (
          <div
            key={rep.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  rep.type === 'PDF' 
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : rep.type === 'EXCEL'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {rep.type} Report
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {rep.date} • {rep.size}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {rep.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {rep.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center text-xs text-emerald-600 font-medium">
                <FileCheck className="w-3.5 h-3.5 mr-1" /> Terverifikasi Katapedia
              </span>

              <button
                onClick={() => handleDownload(rep.title)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
