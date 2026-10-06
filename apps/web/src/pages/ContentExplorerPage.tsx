import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Instagram, 
  Video, 
  Sparkles, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ExternalLink,
  Filter,
  TrendingUp,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { api } from '../lib/api';

export const ContentExplorerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tenantSlug] = useState('pemilu-2029');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [activeCandidateId, setActiveCandidateId] = useState<string>(id || '');
  const [candidate, setCandidate] = useState<any>(null);
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [selectedBaseline, setSelectedBaseline] = useState<string>('ALL');

  // Load candidate list first
  useEffect(() => {
    const initCandidates = async () => {
      try {
        const cList = await api.getCandidates(tenantSlug);
        setCandidates(cList);
        if (!id && cList.length > 0) {
          setActiveCandidateId(cList[0].id);
        } else if (id) {
          setActiveCandidateId(id);
        }
      } catch (err) {
        console.error('Failed to load candidate list:', err);
      }
    };
    initCandidates();
  }, [id, tenantSlug]);

  // Load contents whenever activeCandidateId, selectedPlatform, or selectedBaseline changes
  useEffect(() => {
    if (!activeCandidateId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [cRes, contRes] = await Promise.all([
          api.getCandidateDetail(tenantSlug, activeCandidateId),
          api.getCandidateContents(tenantSlug, activeCandidateId, {
            platform: selectedPlatform,
            baselineCategory: selectedBaseline
          })
        ]);
        setCandidate(cRes);
        setContents(contRes);
      } catch (err) {
        console.error('Failed to load contents:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeCandidateId, selectedPlatform, selectedBaseline, tenantSlug]);

  const getBaselineBadge = (category: string) => {
    switch (category) {
      case 'ABOVE_BASELINE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />
            <span>Above Baseline (&gt;1.5x)</span>
          </span>
        );
      case 'NEAR_BASELINE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Near Baseline
          </span>
        );
      case 'BELOW_BASELINE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Below Baseline (&lt;0.8x)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
            {category}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top back & Candidate Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {id ? (
          <button
            onClick={() => navigate(`/candidates/${id}`)}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Profil {candidate?.name || 'Caleg'}</span>
          </button>
        ) : (
          <div className="text-xs font-semibold text-slate-400">
            <span>Repository Konten Multi-Dapil</span>
          </div>
        )}

        {/* Candidate Dropdown Selector */}
        {candidates.length > 0 && (
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="font-bold text-slate-500">Kandidat:</span>
            <select
              value={activeCandidateId}
              onChange={(e) => setActiveCandidateId(e.target.value)}
              className="bg-transparent font-bold text-blue-700 focus:outline-none cursor-pointer text-xs"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.dapil}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>Content Repository & Baseline Analysis</span>
            <span>•</span>
            <span>FRD V1.0 M04 & M05</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Content Explorer & Formula Pemenang
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Postingan Instagram & TikTok milik{' '}
            <strong className="text-slate-800 font-bold">{candidate?.name || 'Kandidat'}</strong> yang dianalisis oleh Personal Baseline Engine.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-white text-xs font-semibold text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="ALL">Semua Platform</option>
            <option value="INSTAGRAM">Instagram (Reels)</option>
            <option value="TIKTOK">TikTok</option>
          </select>

          <select
            value={selectedBaseline}
            onChange={(e) => setSelectedBaseline(e.target.value)}
            className="bg-white text-xs font-semibold text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="ALL">Semua Kinerja Konten</option>
            <option value="ABOVE_BASELINE">Above Baseline (&gt;1.5x)</option>
            <option value="NEAR_BASELINE">Near Baseline</option>
            <option value="BELOW_BASELINE">Below Baseline (&lt;0.8x)</option>
          </select>
        </div>
      </div>

      {/* Content List Body */}
      {loading ? (
        <div className="text-center py-24 text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-medium text-slate-600">Mengambil repository konten {candidate?.name || 'kandidat'}...</p>
        </div>
      ) : contents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-500 space-y-2">
          <Video className="w-10 h-10 mx-auto text-slate-400" />
          <p className="text-base font-bold text-slate-800">Tidak ada konten ditemukan</p>
          <p className="text-xs">Coba sesuaikan filter platform atau kategori baseline performa.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Header */}
              <div className="p-5 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    {item.platform === 'INSTAGRAM' ? (
                      <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 border border-pink-100">
                        <Instagram className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                        <Video className="w-4 h-4" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-700">{item.platform}</span>
                  </div>

                  {getBaselineBadge(item.baselineCategory)}
                </div>

                {/* Published Date */}
                <div className="text-[11px] text-slate-400">
                  Tayang: {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>

                {/* Winning Formula Highlight */}
                {item.winningFormulaTag && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        Winning Formula Terverifikasi
                      </span>
                      <p className="text-xs font-semibold text-amber-900 mt-0.5">
                        {item.winningFormulaTag}
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption / Hook Preview */}
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                  "{item.caption || item.hookTranscript || 'Konten video kampanye edukatif caleg.'}"
                </p>
              </div>

              {/* Metrics & Footer */}
              <div className="p-5 pt-3 bg-slate-50/50 border-t border-slate-100 space-y-3">
                {/* 4 Key Engagement Metrics */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-center text-slate-400 mb-0.5">
                      <Eye className="w-3 h-3 mr-0.5" />
                    </div>
                    <span className="font-extrabold text-slate-900 block text-xs font-heading">
                      {(item.views / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[9px] text-slate-400">Views</span>
                  </div>

                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-center text-rose-500 mb-0.5">
                      <Heart className="w-3 h-3 mr-0.5" />
                    </div>
                    <span className="font-extrabold text-slate-900 block text-xs font-heading">
                      {(item.likes / 1000).toFixed(1)}k
                    </span>
                    <span className="text-[9px] text-slate-400">Likes</span>
                  </div>

                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-center text-blue-500 mb-0.5">
                      <MessageCircle className="w-3 h-3 mr-0.5" />
                    </div>
                    <span className="font-extrabold text-slate-900 block text-xs font-heading">
                      {item.comments}
                    </span>
                    <span className="text-[9px] text-slate-400">Komen</span>
                  </div>

                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-center text-emerald-500 mb-0.5">
                      <Share2 className="w-3 h-3 mr-0.5" />
                    </div>
                    <span className="font-extrabold text-slate-900 block text-xs font-heading">
                      {item.shares || 120}
                    </span>
                    <span className="text-[9px] text-slate-400">Share</span>
                  </div>
                </div>

                {/* External link */}
                {item.postUrl && (
                  <a
                    href={item.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center space-x-1 py-1.5 text-xs text-blue-600 hover:text-blue-700 font-bold transition-colors"
                  >
                    <span>Buka Postingan Asli</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
