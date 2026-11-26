'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  'Bagaimana mendiferensiasi materi IPAS Siklus Air jika ada 5 siswa di kelas yang belum lancar membaca?',
  'Siswa yang cepat selesai selalu mulai membuat kegaduhan. Diferensiasi proses apa yang mendidik dan bermakna untuk mereka?',
  'Apakah rubrik penilaian boleh dibedakan jika bentuk produk akhir siswa berbeda-beda?'
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Selamat datang di Ruang Konsultasi DIFERENSA. Silakan sampaikan topik materi atau kendala kesiapan murid di kelas SD Anda. Mari kita petakan strategi diferensiasi Konten, Proses, atau Produk yang tepat sasaran dan realistis.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
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
        { id: assistantMsgId, role: 'assistant', content: '' },
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
          content: 'Terjadi kendala saat memproses jawaban. Pastikan API key Google AI telah dikonfigurasi di lingkungan kerja Anda.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06525c]/10 text-[#06525c] border border-[#06525c]/20 text-xs font-semibold">
          <span>Bantuan Guru / Konsultasi AI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#06525c] tracking-tight">
          Konsultasi Diferensiasi Pembelajaran SD
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
          Ajukan pertanyaan spesifik seputar manajemen kelas, penyusunan modul ajar, atau penyesuaian materi pembelajaran Kurikulum Merdeka.
        </p>
      </div>

      {/* Starter Prompts (FIX.md item 3.1: Pertanyaan Riil Tanpa Buzzword) */}
      <div className="space-y-2 border-t border-slate-200 pt-4">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Pilihan Topik Pembahasan Cepat:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(prompt)}
              className="text-left p-3 rounded-md border border-slate-200 bg-white hover:border-slate-300 min-h-[44px] text-xs text-slate-700 leading-relaxed transition-colors cursor-pointer touch-manipulation"
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="border border-slate-200 bg-white rounded-lg p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-4 shadow-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {m.role === 'user' ? 'Pertanyaan Anda' : 'Pendamping Diferensa'}
            </span>
            <div
              className={`p-4 rounded-lg text-xs sm:text-sm leading-relaxed max-w-2xl whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-[#06525c] text-white shadow-xs'
                  : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-xs text-slate-600 italic">
            Pendamping sedang merumuskan alternatif diferensiasi...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ketik topik materi atau permasalahan kelas SD Anda..."
          disabled={isLoading}
          aria-label="Ketik pesan atau topik konsultasi diferensiasi"
          className="flex-1 px-4 py-2.5 min-h-[44px] rounded border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-900 bg-white"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading || !input.trim()}
          className={`px-6 py-2.5 min-h-[44px] rounded-md text-xs font-bold transition-colors cursor-pointer touch-manipulation shadow-xs ${
            isLoading || !input.trim()
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-[#06525c] hover:bg-[#086572] text-white'
          }`}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
