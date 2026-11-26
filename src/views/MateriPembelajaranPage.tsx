import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Layers,
  Lightbulb,
  Palette,
  Route,
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/educationalContent';
import type { NavRoute } from '../types/diferensa';

interface MateriPembelajaranPageProps {
  completedModules: string[];
  kontenCount: number;
  prosesCount: number;
  produkCount: number;
  onToggleComplete: (moduleId: string) => void;
  onNavigate: (route: NavRoute) => void;
}

export function MateriPembelajaranPage({
  completedModules,
  kontenCount,
  prosesCount,
  produkCount,
  onToggleComplete,
  onNavigate,
}: MateriPembelajaranPageProps) {
  const [activeId, setActiveId] = useState<string>(LEARNING_MODULES[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const activeModule =
    LEARNING_MODULES.find((m) => m.id === activeId) ?? LEARNING_MODULES[0];
  const isCompleted = completedModules.includes(activeModule.id);
  const quickAnswer = selectedAnswers[activeModule.id];
  const hasAnsweredQuickCheck = quickAnswer !== undefined;
  const isQuickCheckCorrect = quickAnswer === activeModule.quickCheck.correctIndex;

  const mainCategories: {
    route: NavRoute;
    code: string;
    title: string;
    description: string;
    savedCount: number;
    icon: typeof Layers;
    iconBg: string;
    ctaColor: string;
  }[] = [
    {
      route: 'diferensiasi-konten',
      code: 'Kategori A',
      title: 'Diferensiasi Konten',
      description:
        'Penyesuaian materi & sumber belajar (teks, gambar, video, audio, tingkat kompleksitas) dilengkapi formulir perancangan guru.',
      savedCount: kontenCount,
      icon: Layers,
      iconBg: 'bg-sky-100 text-sky-800',
      ctaColor: 'text-sky-800',
    },
    {
      route: 'diferensiasi-proses',
      code: 'Kategori B',
      title: 'Diferensiasi Proses',
      description:
        'Penyesuaian aktivitas belajar (individu, kelompok, diskusi, eksperimen, permainan edukatif, media interaktif) & formulir kelas.',
      savedCount: prosesCount,
      icon: Route,
      iconBg: 'bg-violet-100 text-violet-800',
      ctaColor: 'text-violet-800',
    },
    {
      route: 'diferensiasi-produk',
      code: 'Kategori C',
      title: 'Diferensiasi Produk',
      description:
        'Pilihan bentuk karya siswa (poster, presentasi, peta konsep, maket, laporan, video/audio) lengkap dengan rubrik penilaian.',
      savedCount: produkCount,
      icon: Palette,
      iconBg: 'bg-teal-100 text-teal-800',
      ctaColor: 'text-teal-800',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-violet-700 mb-1">
              Tahap 02 · Modul Konsep & Laboratorium Praktik SD
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Materi Pembelajaran Berdiferensiasi
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Pilih salah satu dari tiga kategori utama di bawah untuk membuka halaman materi
              khusus beserta formulir perancangannya, atau pelajari 5 fondasi konsep inti.
            </p>
          </div>
          <div className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 shrink-0 tabular-nums">
            {completedModules.length} / {LEARNING_MODULES.length} modul selesai
          </div>
        </div>
      </header>

      {/* Three Clickable Category Cards */}
      <section aria-labelledby="kategori-utama-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 id="kategori-utama-heading" className="font-display text-lg font-bold text-slate-900">
            Tiga Kategori Utama Pembelajaran Berdiferensiasi
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('pembelajaran-inklusif')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 cursor-pointer self-start sm:self-auto"
          >
            <HeartHandshake className="w-4 h-4" aria-hidden="true" />
            <span>Buka Modul Pembelajaran Inklusif</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.route}
                type="button"
                onClick={() => onNavigate(cat.route)}
                className="group text-left rounded-2xl bg-white border border-slate-200 hover:border-blue-900 hover:shadow-sm p-6 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${cat.iconBg}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {cat.code} · <span className="tabular-nums">{cat.savedCount} rancangan</span>
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-900">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-bold ${cat.ctaColor}`}>
                  <span>Buka Halaman {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5 Core Conceptual Modules */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            Fondasi Konsep Pembelajaran Berdiferensiasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pelajari pengertian, prinsip, jenis, karakteristik kebutuhan siswa, dan langkah penerapannya.
          </p>

          <div
            role="tablist"
            aria-label="Topik Materi Pembelajaran"
            className="mt-4 flex flex-wrap gap-2"
          >
            {LEARNING_MODULES.map((mod) => {
              const active = mod.id === activeModule.id;
              const done = completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(mod.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {done && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${active ? 'text-teal-300' : 'text-teal-600'}`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{mod.orderLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <article className="space-y-6 pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1.5">
                <span>{activeModule.orderLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {activeModule.durationMinutes} menit baca
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {activeModule.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{activeModule.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(activeModule.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isCompleted
                  ? 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>{isCompleted ? 'Selesai Dipelajari' : 'Tandai Selesai'}</span>
            </button>
          </div>

          <div className="rounded-xl bg-sky-50/70 border border-sky-100 p-5">
            <h4 className="text-sm font-bold text-blue-900 mb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Gagasan Inti</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {activeModule.coreIdea}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeModule.keyPoints.map((point) => (
              <div
                key={point.heading}
                className="rounded-xl border border-slate-200 p-4 bg-white"
              >
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{point.heading}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-800 mb-1">
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
              <span>Contoh Nyata di Sekolah Dasar · {activeModule.sdExample.kelas}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{activeModule.sdExample.topik}</h4>
            <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
              {activeModule.sdExample.praktik}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Cek Pemahaman Cepat</h4>
            <p className="text-sm text-slate-700">{activeModule.quickCheck.question}</p>

            <div className="space-y-2">
              {activeModule.quickCheck.options.map((opt, idx) => {
                const selected = quickAnswer === idx;
                const isCorrectOption = idx === activeModule.quickCheck.correctIndex;
                let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';
                if (hasAnsweredQuickCheck) {
                  if (isCorrectOption) {
                    btnStyle = 'bg-teal-50 border-teal-500 text-teal-900 font-semibold';
                  } else if (selected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedAnswers((prev) => ({ ...prev, [activeModule.id]: idx }));
                      if (idx === activeModule.quickCheck.correctIndex && !isCompleted) {
                        onToggleComplete(activeModule.id);
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {hasAnsweredQuickCheck && (
              <div
                className={`rounded-xl px-4 py-3 text-xs sm:text-sm ${
                  isQuickCheckCorrect
                    ? 'bg-teal-50 border border-teal-200 text-teal-900'
                    : 'bg-amber-50 border border-amber-200 text-amber-900'
                }`}
              >
                <strong>{isQuickCheckCorrect ? 'Tepat! ' : 'Belum tepat. '}</strong>
                {activeModule.quickCheck.explanation}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-500">
              Lanjutkan ke simulasi kelas atau jelajahi modul Pembelajaran Inklusif.
            </span>
            <button
              type="button"
              onClick={() => onNavigate('simulasi-kelas')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Lanjut ke Simulasi Kelas</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
