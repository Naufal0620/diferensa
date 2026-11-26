'use client';

import { useProgress } from '@/hooks/useProgress';

export function Footer() {
  const { resetAllProgress, loadDemoData } = useProgress();

  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white py-6 text-xs text-slate-500 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-[#1e3a8a]">DIFERENSA</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Panduan Interaktif Penerapan Pembelajaran Berdiferensiasi Guru Sekolah Dasar &bull; Kurikulum Merdeka.
          </p>
        </div>

        {/* Discreet Data Control for Presentation/Testing */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <button
            onClick={() => {
              loadDemoData();
              window.location.reload();
            }}
            className="hover:text-[#1e3a8a] transition-colors cursor-pointer min-h-[40px] flex items-center touch-manipulation"
          >
            Muat Contoh Data
          </button>
          <span className="text-slate-200 select-none">&bull;</span>
          <button
            onClick={() => {
              if (confirm('Reset seluruh data progres belajar?')) {
                resetAllProgress();
                window.location.reload();
              }
            }}
            className="hover:text-rose-600 transition-colors cursor-pointer min-h-[40px] flex items-center touch-manipulation"
          >
            Reset Data
          </button>
        </div>
      </div>
    </footer>
  );
}
