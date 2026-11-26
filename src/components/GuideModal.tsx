import { useEffect } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Layers,
  MonitorPlay,
  X,
} from 'lucide-react';
import type { NavRoute } from '../types/diferensa';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: NavRoute) => void;
}

const GUIDE_STEPS: {
  step: string;
  title: string;
  description: string;
  route: NavRoute;
  ctaLabel: string;
  icon: typeof ClipboardCheck;
  accentClass: string;
}[] = [
  {
    step: 'Tahap 1',
    title: 'Tes Diagnostik Awal',
    description:
      'Petakan kecenderungan kesiapan, minat, dan profil belajar siswa di kelas Anda melalui 6 skenario singkat.',
    route: 'tes-diagnostik',
    ctaLabel: 'Buka Tes Diagnostik',
    icon: ClipboardCheck,
    accentClass: 'bg-sky-50 text-sky-700',
  },
  {
    step: 'Tahap 2',
    title: 'Materi Pembelajaran Inti',
    description:
      'Pelajari pengertian, prinsip, tiga jenis diferensiasi, karakteristik siswa, dan langkah praktis penerapan di SD.',
    route: 'materi-pembelajaran',
    ctaLabel: 'Baca Materi',
    icon: BookOpen,
    accentClass: 'bg-violet-50 text-violet-700',
  },
  {
    step: 'Tahap 3',
    title: 'Simulasi Kelas SD',
    description:
      'Uji pengambilan keputusan Anda menghadapi kasus nyata kelas Matematika, IPAS, dan Bahasa Indonesia.',
    route: 'simulasi-kelas',
    ctaLabel: 'Coba Simulasi',
    icon: MonitorPlay,
    accentClass: 'bg-teal-50 text-teal-700',
  },
  {
    step: 'Tahap 4',
    title: 'Rencana Ajar Digital',
    description:
      'Susun rancangan pembelajaran berdiferensiasi otomatis yang dapat disunting langsung sesuai kebutuhan kelas Anda.',
    route: 'rencana-ajar',
    ctaLabel: 'Buat Rencana Ajar',
    icon: Layers,
    accentClass: 'bg-blue-50 text-blue-900',
  },
  {
    step: 'Tahap 5',
    title: 'Evaluasi Akhir & Komunitas',
    description:
      'Uji pemahaman melalui kuis otomatis dan bagikan pengalaman mengajar bersama rekan guru SD se-Indonesia.',
    route: 'evaluasi-akhir',
    ctaLabel: 'Mulai Evaluasi',
    icon: FileText,
    accentClass: 'bg-sky-50 text-sky-800',
  },
];

export function GuideModal({ isOpen, onClose, onNavigate }: GuideModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold text-teal-700 mb-1">
              Panduan Penggunaan DIFERENSA
            </p>
            <h2 id="guide-modal-title" className="text-xl font-bold text-slate-900">
              Alur Belajar Guru SD dalam 5 Tahap
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            DIFERENSA dirancang agar guru SD dapat memahami konsep pembelajaran berdiferensiasi
            secara bertahap sekaligus langsung menghasilkan rancangan ajar yang siap diterapkan di
            kelas.
          </p>

          <div className="space-y-3">
            {GUIDE_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accentClass}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-0.5">{item.step}</div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.route);
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-blue-900 bg-white border border-slate-200 hover:bg-sky-50 hover:border-sky-200 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                  >
                    {item.ctaLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('tes-diagnostik');
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors"
          >
            Mulai dari Tes Diagnostik
          </button>
        </div>
      </div>
    </div>
  );
}
