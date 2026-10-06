import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  Compass, 
  TrendingUp, 
  HelpCircle,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { api } from '../lib/api';

export const AIWorkspacePage: React.FC = () => {
  const [tenantSlug] = useState('pemilu-2029');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getCandidates(tenantSlug);
        setCandidates(res);
        if (res.length > 0) {
          setSelectedCandidateId(res[0].id);
          setMessages([
            {
              sender: 'assistant',
              text: `Halo! Saya asisten intelijen elektabilitas **Katapedia DES**.\n\nSaya telah memuat data audit digital untuk **${res[0].name}** (${res[0].dapil}) dengan skor **${res[0].desScore?.toFixed(1) || '4.0'} DES**.\n\nAnda dapat menanyakan analisis kelemahan dimensi, formula konten yang terbukti viral, evaluasi audiens, maupun rekomendasi taktis menuju 2029.`,
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to load candidates for AI:', err);
      }
    };
    load();
  }, [tenantSlug]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleCandidateChange = (candId: string) => {
    setSelectedCandidateId(candId);
    const cand = candidates.find((c) => c.id === candId);
    setMessages([
      {
        sender: 'assistant',
        text: `Konteks audit analitik kini beralih ke **${cand?.name}** (${cand?.dapil}) — Skor DES: **${cand?.desScore?.toFixed(1) || '—'}**.\n\nSilakan ajukan pertanyaan terkait strategi pemenangan atau evaluasi 10 Dimensi calon ini.`,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryText = customText || prompt;
    if (!queryText.trim() || !selectedCandidateId) return;

    const userMsg = {
      sender: 'user' as const,
      text: queryText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await api.askAIChat(tenantSlug, selectedCandidateId, queryText);
      const botMsg = {
        sender: 'assistant' as const,
        text: res.answer,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant' as const,
          text: `Maaf, terjadi kendala saat memproses data: ${err.message}`,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectedCand = candidates.find((c) => c.id === selectedCandidateId);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <span>AI Content Intelligence & Analytics</span>
            <span>•</span>
            <span>FRD V1.0 M06</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            AI Intelligence Studio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tanya jawab terverifikasi (*Grounded Data*) berbasis jejak 10 Dimensi DES dan postingan media sosial.
          </p>
        </div>

        {/* Candidate Selector Card */}
        {candidates.length > 0 && (
          <div className="flex items-center space-x-3 bg-white p-2 px-3 rounded-2xl border border-slate-200 shadow-sm">
            {selectedCand && (
              <img
                src={selectedCand.avatarUrl || '/avatars/rangga.jpg'}
                alt={selectedCand.name}
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
              />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Konteks Calon:</span>
              <select
                value={selectedCandidateId}
                onChange={(e) => handleCandidateChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-blue-700 focus:outline-none cursor-pointer"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.dapil})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Strategic Prompts */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {[
          'Apa dimensi yang paling lemah dan butuh prioritas perbaikan?',
          'Bagaimana formula konten yang terbukti menang?',
          'Tampilkan ringkasan kesiapan elektabilitas caleg',
          'Analisis risiko konversi suara pemilih (D09)'
        ].map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(undefined, q)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 shadow-2xs transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Body Container */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-y-auto space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-1.5 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium ml-12 rounded-tr-none shadow-sm'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 mr-12 rounded-tl-none whitespace-pre-line shadow-2xs'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="flex items-center space-x-1.5 text-[10px] text-blue-700 font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Katapedia DES Engine • Grounded Evidence</span>
                  </div>
                )}
                <div className="text-xs leading-relaxed">{m.text}</div>
                <div
                  className={`text-[10px] text-right font-mono pt-1 ${
                    m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 font-bold" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                <span className="font-medium">Menganalisis indikator 10 dimensi {selectedCand?.name}...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => handleSend(e)} className="flex items-center space-x-3 shrink-0">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ajukan pertanyaan strategi pemenangan untuk ${selectedCand?.name || 'kandidat'}...`}
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-sm shadow-blue-500/20 shrink-0"
        >
          <span>Kirim</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
