import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  TrendingUp, 
  FileCheck2, 
  RefreshCw, 
  ExternalLink,
  Instagram,
  Video,
  Share2,
  Calendar,
  AlertCircle,
  HelpCircle,
  BarChart,
  ListTodo
} from 'lucide-react';
import { api } from '../lib/api';
import { RadarChart } from '../components/RadarChart';
import { EvidenceDrawer } from '../components/EvidenceDrawer';
import { desDimensionsMeta } from '@katapedia/design-tokens';

export const CandidateProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [candidate, setCandidate] = useState<any>(null);
  const [scoresData, setScoresData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [recomputing, setRecomputing] = useState<boolean>(false);

  // Evidence Drawer state
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);
  const [evidenceList, setEvidenceList] = useState<any[]>([]);
  const [selectedDimensionCode, setSelectedDimensionCode] = useState<string>('');

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [candRes, scoreRes, evRes] = await Promise.all([
        api.getCandidateDetail(tenantSlug, id),
        api.getCandidateScores(tenantSlug, id),
        api.getEvidence(tenantSlug, id)
      ]);
      setCandidate(candRes);
      setScoresData(scoreRes);
      setEvidenceList(evRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleRecompute = async () => {
    if (!id) return;
    try {
      setRecomputing(true);
      await api.recomputeScore(tenantSlug, id);
      await loadData();
      alert('Kalkulasi baseline dan scoring 10 Dimensi DES berhasil diperbarui!');
    } catch (err: any) {
      alert(`Gagal kalkulasi ulang: ${err.message}`);
    } finally {
      setRecomputing(false);
    }
  };

  const handleOpenEvidence = (dimensionCode: string) => {
    setSelectedDimensionCode(dimensionCode);
    setIsEvidenceOpen(true);
  };

  if (loading && !candidate) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-medium text-slate-500">Memuat profil calon & 10 Dimensi DES...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Kandidat tidak ditemukan.</p>
        <button
          onClick={() => navigate('/candidates')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl"
        >
          Kembali ke Daftar Calon
        </button>
      </div>
    );
  }

  const dimensions = scoresData?.dimensions || [];
  const baseline = scoresData?.baseline;

  const filteredEvidence = selectedDimensionCode
    ? evidenceList.filter((e) => e.dimensionScore?.dimensionCode === selectedDimensionCode || e.findingType?.includes(selectedDimensionCode))
    : evidenceList;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top back button */}
      <button
        onClick={() => navigate('/candidates')}
        className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Caleg</span>
      </button>

      {/* Candidate Profile Hero Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={candidate.avatarUrl || '/avatars/rangga.jpg'}
            alt={candidate.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm shrink-0"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                {candidate.electionLevel.replace(/_/g, ' ')}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Data {candidate.dataCoverage}
              </span>
              <span className="text-xs text-slate-400">
                Kode: {candidate.candidateCode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {candidate.name}
            </h1>

            <p className="text-sm text-slate-600">
              {candidate.party} • No. Urut {candidate.ballotNumber || '-'} • Dapil: <span className="text-blue-700 font-bold">{candidate.dapil}</span>
            </p>

            {/* Social accounts */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {candidate.accounts?.map((acc: any) => (
                <a
                  key={acc.id}
                  href={acc.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-700 hover:text-blue-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  {acc.platform === 'INSTAGRAM' ? (
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  ) : (
                    <Video className="w-3.5 h-3.5 text-sky-600" />
                  )}
                  <span>{acc.handle}</span>
                  <span className="text-slate-400 font-mono">({(acc.followersCount || 0).toLocaleString('id-ID')} fol)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big DES Score badge & Recompute button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center border-t sm:border-t-0 lg:border-l border-slate-100 pt-4 sm:pt-0 lg:pl-8 space-y-3 sm:space-y-0 lg:space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-left lg:text-right">
              Digital Electability Score
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-600 font-heading">
                {scoresData?.overallScore?.toFixed(1) || '—'}
              </span>
              <span className="text-sm text-slate-400 font-semibold">/ 5.0</span>
            </div>
            <span className="text-[11px] text-slate-500 block text-left lg:text-right">
              Metodologi Katapedia 10 Dimensi
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(`/candidates/${candidate.id}/roadmap`)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <ListTodo className="w-4 h-4" />
              <span>Buka Roadmap 90 Hari</span>
            </button>

            <button
              disabled={recomputing}
              onClick={handleRecompute}
              title="Kalkulasi ulang baseline dan skor"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${recomputing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Flagship Radar Chart & Personal Baseline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Radar 10 Dimensi Digital Electoral Journey
                </h2>
              </div>
              <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                10 Langkah Lengkap
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visualisasi kekuatan kandidat dari D01 (Terlihat) hingga D10 (Menjadi Sistem Pemenangan).
            </p>
          </div>

          <RadarChart dimensions={dimensions} candidateName={candidate.name} />

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Rujukan: Katapedia #9 (Deddy Rahman)</span>
            <span className="text-amber-700 font-bold">Skala 1.0 (Kosong) s/d 5.0 (Sistemik)</span>
          </div>
        </div>

        {/* Personal Baseline Engine (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Personal Baseline Engine (FRD M05)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Kinerja Konten vs Baseline Mandiri
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-1">
              Kandidat dievaluasi terhadap kinerja historisnya sendiri (median views & median engagement rate), bukan perbandingan membabi buta.
            </p>
          </div>

          <div className="space-y-3 py-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600">Median Views Konten:</span>
              <span className="text-base font-extrabold text-slate-900 font-heading">
                {baseline?.medianViews ? baseline.medianViews.toLocaleString('id-ID') : '12.500'} tayangan
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600">Median Engagement Rate:</span>
              <span className="text-base font-extrabold text-emerald-600 font-heading">
                {baseline?.medianEngagementRate ? `${baseline.medianEngagementRate}%` : '4.8%'}
              </span>
            </div>

            {/* Distribution */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-600 font-medium block">Distribusi Kinerja Konten:</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <span className="font-bold block text-sm">{baseline?.aboveBaselineCount || 8}</span>
                  <span className="text-[10px]">Above (&gt;1.5x)</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                  <span className="font-bold block text-sm">{baseline?.nearBaselineCount || 18}</span>
                  <span className="text-[10px]">Near Baseline</span>
                </div>
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
                  <span className="font-bold block text-sm">{baseline?.belowBaselineCount || 4}</span>
                  <span className="text-[10px]">Below (&lt;0.8x)</span>
                </div>
              </div>
            </div>

            {/* Winning Formula */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
              <span className="text-xs font-bold text-amber-800 flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 mr-1" /> Pola Winning Formula Terdeteksi:
              </span>
              <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                {baseline?.winningFormulas?.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                )) || (
                  <>
                    <li>Video 30-45 detik dengan hook testimoni warga</li>
                    <li>Penyebutan nama dapil di 3 detik pertama</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={() => navigate(`/candidates/${candidate.id}/contents`)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors"
          >
            Buka Content Explorer Lengkap
          </button>
        </div>
      </div>

      {/* 10 Dimensi Detail Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Rincian 10 Dimensi DES & Temuan AI
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik "Lihat Bukti" pada setiap dimensi untuk menelusuri sumber konten asli dan verifikasi analis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim: any) => {
            const meta = desDimensionsMeta.find((m) => m.code === dim.dimensionCode);
            return (
              <div
                key={dim.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3.5 flex flex-col justify-between hover:border-blue-300 transition-all"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center font-mono">
                        {dim.journeyStep}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{dim.dimensionName}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs text-slate-500 font-medium">{dim.journeyTitle}</span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200 font-heading">
                        {dim.score.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Reflective question */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-relaxed italic">
                    💬 {meta?.question || dim.reflectiveQuestion}
                  </div>

                  {/* AI findings */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    {dim.findingsSummary}
                  </p>
                </div>

                {/* Evidence trigger */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {dim.evidenceCount} bukti konten terverifikasi
                  </span>
                  <button
                    onClick={() => handleOpenEvidence(dim.dimensionCode)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-bold transition-colors"
                  >
                    <span>Lihat Bukti</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        evidence={filteredEvidence}
        dimensionCode={selectedDimensionCode}
        title={`Bukti Sumber untuk ${selectedDimensionCode}`}
        tenantSlug={tenantSlug}
        onStatusUpdated={loadData}
      />
    </div>
  );
};
