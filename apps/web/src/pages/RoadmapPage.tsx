import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  ListTodo, 
  Target, 
  UserCheck, 
  Sparkles,
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers
} from 'lucide-react';
import { api } from '../lib/api';

export const RoadmapPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'matrix' | 'monthly'>('matrix');

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [rRes, cRes] = await Promise.all([
        api.getRoadmap(tenantSlug, id),
        api.getCandidateDetail(tenantSlug, id)
      ]);
      setRoadmapData(rRes);
      setCandidate(cRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleToggleCompleted = async (item: any) => {
    try {
      await api.updateRoadmapItem(tenantSlug, item.id, {
        isCompleted: !item.isCompleted
      });
      loadData();
    } catch (err: any) {
      alert(`Gagal memperbarui status: ${err.message}`);
    }
  };

  if (loading && !roadmapData) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-medium text-slate-500">Memuat Roadmap 90 Hari & Matriks Prioritas...</p>
        </div>
      </div>
    );
  }

  const { quadrants, months, totalItems = 0, completedCount = 0 } = roadmapData || {};

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(`/candidates/${id}`)}
        className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Profil {candidate?.name || 'Caleg'}</span>
      </button>

      {/* Hero Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Katapedia #9 — Halaman 26-31</span>
            <span>•</span>
            <span>Roadmap 90 Hari</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Roadmap 90 Hari & Matriks Prioritas
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Calon: <strong className="text-slate-900 font-bold">{candidate?.name}</strong> ({candidate?.dapil}) — Mengubah hasil pengukuran 10 Dimensi DES menjadi rencana aksi terstruktur bagi tim pemenangan.
          </p>
        </div>

        {/* Progress stat */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 text-right">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Progres Eksekusi Roadmap</span>
          <div className="flex items-baseline space-x-2 justify-end mt-1">
            <span className="text-3xl font-black text-blue-600 font-heading">{completedCount}</span>
            <span className="text-xs text-slate-500 font-bold">/ {totalItems} Butir Selesai</span>
          </div>
          <div className="w-48 bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalItems > 0 ? (completedCount / totalItems) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Matriks 4 Kuadran vs Rencana 3 Bulan */}
      <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'matrix'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Matriks 4 Kuadran Prioritas
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'monthly'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Rencana Aksi 3 Bulan (Fondasi, Kepercayaan, Perluasan)
        </button>
      </div>

      {/* VIEW 1: 4 QUADRANTS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed shadow-2xs">
            💡 <strong>Prinsip Matriks Katapedia:</strong> Dari 10 dimensi, roadmap memaksa tim memilih 3–4 yang paling mendesak dikerjakan lebih dulu — bukan mengerjakan semuanya sekaligus. Kuadran <strong>Prioritas Utama</strong> wajib diselesaikan di 30-60 hari pertama!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kuadran 1: PRIORITAS UTAMA */}
            <div className="bg-white p-6 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-200">
                    Kuadran I • Wajib Fokus
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">PRIORITAS UTAMA</h3>
                  <p className="text-xs text-slate-500">Skor Rendah (&lt;3.5), Dampak ke Elektabilitas Tinggi</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {quadrants?.PRIORITAS_UTAMA?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">Tidak ada dimensi di kuadran ini.</p>
                ) : (
                  quadrants?.PRIORITAS_UTAMA?.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleCompleted(item)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                        item.isCompleted
                          ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                          : 'bg-amber-50/40 border-amber-200 text-slate-800 hover:border-amber-400 shadow-2xs'
                      }`}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">
                            {item.dimensionCode} — {item.dimensionName}
                          </span>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Target: {item.targetScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 leading-snug">{item.actionTitle}</p>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 pt-1">
                          <UserCheck className="w-3 h-3 text-slate-400" />
                          <span>PIC: {item.pic}</span>
                          <span>•</span>
                          <span>{item.timelineDays} Hari</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Kuadran 2: PERTAHANKAN */}
            <div className="bg-white p-6 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Kuadran II • Kekuatan Utama
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">PERTAHANKAN</h3>
                  <p className="text-xs text-slate-500">Skor Tinggi (≥3.5), Dampak ke Elektabilitas Tinggi</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {quadrants?.PERTAHANKAN?.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCompleted(item)}
                    className="p-3.5 rounded-2xl bg-emerald-50/30 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer flex items-start space-x-3 shadow-2xs"
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">
                          {item.dimensionCode} — {item.dimensionName}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Skor: {item.currentScore}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-snug">{item.actionTitle}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 pt-1">
                        <UserCheck className="w-3 h-3 text-slate-400" />
                        <span>PIC: {item.pic}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kuadran 3: PANTAU */}
            <div className="bg-white p-6 rounded-3xl border border-blue-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 border border-blue-200">
                    Kuadran III • Jaga Momentum
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">PANTAU</h3>
                  <p className="text-xs text-slate-500">Skor Tinggi (≥3.5), Dampak Rendah ke Konversi Langsung</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {quadrants?.PANTAU?.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCompleted(item)}
                    className="p-3.5 rounded-2xl bg-blue-50/30 border border-blue-200 hover:border-blue-300 transition-all cursor-pointer flex items-start space-x-3 shadow-2xs"
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">
                          {item.dimensionCode} — {item.dimensionName}
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Skor: {item.currentScore}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-snug">{item.actionTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kuadran 4: TUNDA */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    Kuadran IV • Bertahap
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">TUNDA</h3>
                  <p className="text-xs text-slate-500">Skor Rendah, Dampak Rendah di Tahap Awal</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {quadrants?.TUNDA?.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleCompleted(item)}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-start space-x-3 shadow-2xs"
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-700">
                          {item.dimensionCode} — {item.dimensionName}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                          Skor: {item.currentScore}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{item.actionTitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 3-MONTH EXECUTION PLAN */}
      {activeTab === 'monthly' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BULAN 1: FONDASI */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Bulan 1 • Hari 1-30</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">FONDASI</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fokus: <strong>D01 (Visibility)</strong> & <strong>D02 (Positioning)</strong>
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside mt-3">
                <li>Bersihkan & satukan jejak digital lama</li>
                <li>Tetapkan satu kalimat positioning unik</li>
                <li>Aktifkan profil di seluruh platform utama</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Butir Aksi Aktif:</span>
              {months?.BULAN_1_FONDASI?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleCompleted(item)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between cursor-pointer hover:border-blue-300"
                >
                  <span className="font-semibold text-slate-800">{item.dimensionCode}: {item.actionTitle}</span>
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BULAN 2: KEPERCAYAAN */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Bulan 2 • Hari 31-60</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">KEPERCAYAAN</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fokus: <strong>D03 (Issue)</strong>, <strong>D04 (Narrative)</strong> & <strong>D07 (Trust)</strong>
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside mt-3">
                <li>Publikasi konsisten konten isu pilihan dapil</li>
                <li>Uji & temukan winning formula konten</li>
                <li>Mulai laporan transparansi kerja berkala</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Butir Aksi Aktif:</span>
              {months?.BULAN_2_KEPERCAYAAN?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleCompleted(item)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between cursor-pointer hover:border-amber-300"
                >
                  <span className="font-semibold text-slate-800">{item.dimensionCode}: {item.actionTitle}</span>
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BULAN 3: PERLUASAN */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Bulan 3 • Hari 61-90</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">PERLUASAN</h3>
              <p className="text-xs text-slate-500 mt-1">
                Fokus: <strong>D06 (Audience)</strong>, <strong>D08 (Reach)</strong> & <strong>D09 (Conversion)</strong>
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside mt-3">
                <li>Bangun komunitas aktif dari audiens komentar</li>
                <li>Dorong konten menjangkau non-follower (FYP)</li>
                <li>Ajak audiens ke aksi nyata (pendaftaran relawan)</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-600 block">Butir Aksi Aktif:</span>
              {months?.BULAN_3_PERLUASAN?.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleCompleted(item)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between cursor-pointer hover:border-emerald-300"
                >
                  <span className="font-semibold text-slate-800">{item.dimensionCode}: {item.actionTitle}</span>
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
