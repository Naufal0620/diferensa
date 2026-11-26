'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import type { NavRoute } from '@/types/diferensa';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const STARTER_PROMPTS = [
  'Bagaimana mendiferensiasi materi IPAS Siklus Air jika ada 5 siswa di kelas yang belum lancar membaca?',
  'Siswa yang cepat selesai selalu mulai membuat kegaduhan. Diferensiasi proses apa yang mendidik dan bermakna untuk mereka?',
  'Apakah rubrik penilaian boleh dibedakan jika bentuk produk akhir siswa berbeda-beda?',
  'Bagaimana menyusun pengelompokan yang fleksibel (*flexible grouping*) di kelas SD tanpa membuat siswa merasa dicap "kurang pandai"?'
];

interface KonsultasiAiPageProps {
  onNavigate?: (route: NavRoute) => void;
}

export function KonsultasiAiPage({ onNavigate }: KonsultasiAiPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Selamat datang di Ruang Konsultasi DIFERENSA. Silakan sampaikan topik materi pembelajaran atau kendala kesiapan murid di kelas SD Anda.\n\nMari kita bedah dan petakan strategi diferensiasi (Konten, Proses, atau Produk) yang tepat sasaran, realistis, dan ramah anak sesuai Kurikulum Merdeka.',
      timestamp: 'Baru saja',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi asisten');
      }

      if (!response.body) {
        throw new Error('Tidak ada stream body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = '';

      const assistantMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantReply += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: assistantReply } : msg
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content:
            'Terjadi kendala saat memproses jawaban. Pastikan koneksi internet stabil atau API key Google AI telah dikonfigurasi.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 min-h-0 bg-white">
      {/* Top Header Panel */}
      <header className="px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('beranda')}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
              aria-label="Kembali ke beranda"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-tight">
                Pendamping AI Diferensiasi SD
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-blue-900 border border-sky-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Sokratik &amp; Praktis
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Konsultasi modul ajar, penyesuaian asesmen, dan diferensiasi kelas ramah anak
            </p>
          </div>
        </div>

        {messages.length > 1 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Bersihkan riwayat percakapan konsultasi?')) {
                setMessages([messages[0]]);
              }
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Mulai sesi obrolan baru"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Percakapan Baru</span>
          </button>
        )}
      </header>

      {/* Main Chat Flow (Full Screen Vertical Flow) */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6 space-y-6 bg-slate-50/50">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 sm:gap-4 ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                    isUser
                      ? 'bg-blue-900 text-white'
                      : 'bg-blue-800 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1.5 max-w-[85%] sm:max-w-[80%]">
                  <div
                    className={`flex items-center gap-2 text-[11px] font-medium ${
                      isUser ? 'justify-end text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    <span className="font-semibold text-slate-700">
                      {isUser ? 'Anda' : 'Pendamping DIFERENSA'}
                    </span>
                    {m.timestamp && <span>&bull; {m.timestamp}</span>}
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words shadow-xs ${
                      isUser
                        ? 'bg-blue-900 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 sm:gap-4 mr-auto">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-xs bg-white border border-slate-200/80 shadow-xs text-xs sm:text-sm text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>Menganalisis strategi diferensiasi...</span>
                </div>
                <p className="text-slate-500 text-xs">
                  Menyusun rekomendasi konkret berdasarkan prinsip 3 Pilar Diferensiasi Kurikulum Merdeka.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Starter Prompts Bar (Ketika obrolan masih ringkas) */}
      {messages.length <= 2 && (
        <div className="px-4 sm:px-8 lg:px-12 py-3 bg-white border-t border-slate-100 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Pilihan Kasus Cepat dari Guru SD:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSubmit(prompt)}
                  className="text-left px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-sky-50 hover:border-sky-200 hover:text-blue-950 text-xs text-slate-700 leading-snug shrink-0 max-w-xs transition-colors cursor-pointer"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Message Input Form Footer */}
      <footer className="p-3 sm:p-4 sm:px-8 lg:px-12 bg-white border-t border-slate-200 shrink-0">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 relative rounded-xl border border-slate-300 focus-within:border-blue-900 focus-within:ring-2 focus-within:ring-blue-900/10 transition-all bg-white overflow-hidden">
              <textarea
                ref={textareaRef}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan kendala diferensiasi di kelas SD Anda (Tekan Enter untuk kirim, Shift+Enter untuk baris baru)..."
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none bg-transparent"
                aria-label="Ketik pertanyaan untuk Pendamping AI"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`h-11 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
                isLoading || !input.trim()
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-blue-900 hover:bg-blue-800 text-white shadow-xs'
              }`}
            >
              <span>Kirim</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Pendamping AI menyajikan rekomendasi pedagogis untuk guru SD. Harap sesuaikan dengan karakteristik nyata siswa di kelas Anda.
          </p>
        </div>
      </footer>
    </div>
  );
}
