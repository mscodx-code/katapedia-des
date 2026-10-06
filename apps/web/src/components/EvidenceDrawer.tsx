import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle, AlertTriangle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../lib/api';

interface EvidenceItem {
  id: string;
  sourceUrl: string;
  platform: string;
  publishedAt: string;
  evidenceText: string;
  excerptSnippet: string;
  findingType: string;
  reviewStatus: 'PENDING_REVIEW' | 'VERIFIED' | 'DISPUTED' | 'NEEDS_REVIEW';
  reviewerNote?: string | null;
  reviewedAt?: string | null;
}

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceItem[];
  title?: string;
  dimensionCode?: string;
  tenantSlug: string;
  onStatusUpdated?: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  evidence,
  title,
  dimensionCode,
  tenantSlug,
  onStatusUpdated
}) => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpdateStatus = async (item: EvidenceItem, newStatus: string) => {
    try {
      setUpdatingId(item.id);
      await api.updateEvidenceStatus(tenantSlug, item.id, {
        reviewStatus: newStatus,
        reviewerNote: `Tinjauan analis diperbarui pada ${new Date().toLocaleDateString('id-ID')}`
      });
      if (onStatusUpdated) onStatusUpdated();
    } catch (err: any) {
      alert(`Gagal memperbarui status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {dimensionCode ? `Bukti ${dimensionCode}` : 'Evidence & Explainability'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                FRD V1.0 M08
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {title || 'Daftar Bukti Konten & Temuan AI'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {evidence.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-600">Belum ada bukti yang terhubung untuk dimensi ini.</p>
              <p className="text-xs text-slate-400 mt-1">
                Data postingan media sosial akan muncul setelah siklus sinkronisasi selesai.
              </p>
            </div>
          ) : (
            evidence.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition-all"
              >
                {/* Top info */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-700 border border-slate-300">
                      {item.platform}
                    </span>
                    <span className="text-slate-500 flex items-center text-[11px]">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Review Status badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center space-x-1 ${
                      item.reviewStatus === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : item.reviewStatus === 'DISPUTED'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span>{item.reviewStatus}</span>
                  </span>
                </div>

                {/* Excerpt Snippet */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed italic">
                  "{item.evidenceText}"
                </div>

                {/* Finding Type */}
                <div className="text-[11px] text-slate-500">
                  <span>Indikator Temuan:</span>{' '}
                  <span className="text-slate-800 font-semibold">{item.findingType}</span>
                </div>

                {/* Reviewer Note if available */}
                {item.reviewerNote && (
                  <div className="text-[11px] text-emerald-700 flex items-start space-x-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{item.reviewerNote}</span>
                  </div>
                )}

                {/* Action Controls (Human in the loop) */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 font-bold space-x-1"
                  >
                    <span>Buka Tautan Asli</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center space-x-2">
                    <button
                      disabled={updatingId === item.id}
                      onClick={() => handleUpdateStatus(item, 'VERIFIED')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                    >
                      Verifikasi
                    </button>
                    <button
                      disabled={updatingId === item.id}
                      onClick={() => handleUpdateStatus(item, 'DISPUTED')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 transition-colors"
                    >
                      Bantah
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Prinsip FRD: Evidence-based AI</span>
          <span className="text-slate-500">Human-in-the-Loop review</span>
        </div>
      </div>
    </div>
  );
};
