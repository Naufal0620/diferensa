import { useState } from 'react';
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Ear,
  Eye,
  HeartHandshake,
  Save,
  Volume2,
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';
import {
  INCLUSIVE_ACCOMMODATIONS,
  INCLUSIVE_NEED_GUIDES,
  INCLUSIVE_PILLARS,
} from '../data/extendedContent';
import type {
  InclusiveNeedId,
  NavRoute,
  SavedInclusivePlan,
} from '../types/diferensa';

interface PembelajaranInklusifPageProps {
  savedPlan: SavedInclusivePlan | null;
  onSavePlan: (plan: SavedInclusivePlan) => void;
  onNavigate: (route: NavRoute) => void;
}

const NEED_ICONS: Record<InclusiveNeedId, typeof Eye> = {
  penglihatan: Eye,
  pendengaran: Ear,
  mobilitas: Accessibility,
  membaca: BookOpen,
  konsentrasi: Brain,
};

export function PembelajaranInklusifPage({
  savedPlan,
  onSavePlan,
  onNavigate,
}: PembelajaranInklusifPageProps) {
  const [selectedNeed, setSelectedNeed] = useState<InclusiveNeedId>(
    savedPlan?.selectedNeed ?? 'penglihatan'
  );
  const [enabledAccommodations, setEnabledAccommodations] = useState<string[]>(
    savedPlan?.enabledAccommodations ?? ['acc-font', 'acc-step-instruction', 'acc-flex-time']
  );
  const [teacherNote, setTeacherNote] = useState<string>(savedPlan?.teacherNote ?? '');
  const [savedToast, setSavedToast] = useState<string>('');
  const [audioNotice, setAudioNotice] = useState<string>('');

  const activeGuide =
    INCLUSIVE_NEED_GUIDES.find((g) => g.id === selectedNeed) ?? INCLUSIVE_NEED_GUIDES[0];

  const hasFontBoost = enabledAccommodations.includes('acc-font');
  const hasAudio = enabledAccommodations.includes('acc-audio');
  const hasSubtitle = enabledAccommodations.includes('acc-subtitle');
  const hasVisualLabel = enabledAccommodations.includes('acc-visual-label');
  const hasStepInstruction = enabledAccommodations.includes('acc-step-instruction');
  const hasFlexTime = enabledAccommodations.includes('acc-flex-time');
  const hasEvalChoice = enabledAccommodations.includes('acc-eval-choice');

  const toggleAccommodation = (id: string) => {
    setEnabledAccommodations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveInclusivePlan = () => {
    onSavePlan({
      selectedNeed,
      enabledAccommodations,
      teacherNote: teacherNote.trim(),
      updatedAt: new Date().toISOString(),
    });
    setSavedToast('Rancangan penyesuaian pembelajaran inklusif berhasil disimpan.');
    setTimeout(() => setSavedToast(''), 3500);
  };

  const handleReadSampleAloud = () => {
    const sampleText =
      'Tugas IPAS Kelas 4: Amati gambar akar dan daun tumbuhan. Sebutkan fungsi akar menyerap air bagi tumbuhan.';
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(sampleText);
        utterance.lang = 'id-ID';
        utterance.rate = 0.92;
        window.speechSynthesis.speak(utterance);
        setAudioNotice('Membacakan contoh materi inklusif...');
        return;
      } catch {
        // Fallback notice below
      }
    }
    setAudioNotice('Teks audio: "' + sampleText + '"');
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner with Inclusive Classroom Illustration */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700">
              <HeartHandshake className="w-4 h-4" aria-hidden="true" />
              <span>Ruang Belajar Setara & Ramah Anak</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Pembelajaran Inklusif di Sekolah Dasar
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Pembelajaran inklusif membantu guru merancang kelas yang menerima dan memfasilitasi
              keberagaman kemampuan serta kebutuhan murid—termasuk anak berkebutuhan khusus—agar
              tumbuh belajar bersama secara positif, setara, dan tidak diskriminatif.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('evaluasi-akhir')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>Coba Evaluasi Ramah Inklusif</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-sky-100 bg-sky-50/40">
              <SafeImage
                src="/src/assets/images/inclusive_classroom_1795505158150.jpg"
                alt="Suasana kelas SD inklusif yang positif dan setara: guru mendampingi siswa berkursi roda, siswa dengan alat bantu dengar, siswa membaca buku berhuruf besar, dan teman sebaya belajar bersama"
                className="w-full h-full min-h-[240px] object-cover"
                fallbackTitle="Ilustrasi Kelas Inklusif Sekolah Dasar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6 Pillars of Inclusive Learning */}
      <section aria-labelledby="pilar-inklusif-heading" className="space-y-4">
        <div>
          <h2 id="pilar-inklusif-heading" className="font-display text-xl font-bold text-slate-900">
            Enam Pilar Pemahaman Pembelajaran Inklusif
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Panduan konseptual dan praktis untuk membangun ekosistem kelas SD yang ramah semua murid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INCLUSIVE_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                {pillar.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Student Needs Explorer */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Contoh Penyesuaian untuk Kebutuhan Belajar yang Beragam
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih kondisi kebutuhan belajar murid di bawah untuk melihat penyesuaian materi,
            aktivitas, media, dan evaluasi di kelas SD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {INCLUSIVE_NEED_GUIDES.map((need) => {
            const Icon = NEED_ICONS[need.id];
            const active = need.id === selectedNeed;
            return (
              <button
                key={need.id}
                type="button"
                onClick={() => setSelectedNeed(need.id)}
                aria-pressed={active}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                  active
                    ? 'bg-sky-50 border-blue-900 ring-1 ring-blue-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    active ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-slate-900 leading-snug">{need.title}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">{activeGuide.title}</h3>
            <p className="text-sm text-slate-600 mt-0.5">{activeGuide.shortDesc}</p>
            <p className="text-xs font-semibold text-violet-800 mt-2">
              Situasi Kelas SD: {activeGuide.classroomExample}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-sky-900 mb-1">Penyesuaian Materi</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeGuide.materialAdjustment}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-violet-900 mb-1">Penyesuaian Aktivitas</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeGuide.activityAdjustment}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-teal-900 mb-1">Penyesuaian Media</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeGuide.mediaAdjustment}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-blue-900 mb-1">Penyesuaian Evaluasi</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeGuide.evaluationAdjustment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Accommodation Simulator & Plan Builder */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Pilih Penyesuaian Akses Belajar Kelas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Aktifkan pilihan penyesuaian berikut untuk melihat pratinjau langsung tampilan tugas yang
            ramah inklusif di sebelah kanan.
          </p>

          <div className="space-y-2.5">
            {INCLUSIVE_ACCOMMODATIONS.map((acc) => {
              const checked = enabledAccommodations.includes(acc.id);
              return (
                <label
                  key={acc.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    checked
                      ? 'bg-teal-50/70 border-teal-600'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAccommodation(acc.id)}
                    className="mt-1 accent-teal-700"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">{acc.label}</div>
                    <p className="text-xs text-slate-600 mt-0.5">{acc.description}</p>
                  </div>
                </label>
              );
            })}
          </div>

          <div>
            <label
              htmlFor="inclusive-note"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Catatan Akomodasi Guru untuk Kelas Anda
            </label>
            <textarea
              id="inclusive-note"
              rows={2}
              placeholder="Contoh: Tempatkan Budi di barisan depan dekat cahaya dan sediakan kartu langkah..."
              value={teacherNote}
              onChange={(e) => setTeacherNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
            />
          </div>

          {savedToast && (
            <div
              role="status"
              className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-2.5 text-xs font-semibold text-teal-900"
            >
              {savedToast}
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveInclusivePlan}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold cursor-pointer"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>Simpan Pengaturan Akomodasi Inklusif</span>
          </button>
        </div>

        {/* Live Adapted Student Task Preview */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Pratinjau Lembar Tugas Ramah Inklusif
              </h2>
              <p className="text-xs text-slate-500">
                Menyesuaikan otomatis sesuai opsi yang Anda centang ({enabledAccommodations.length}{' '}
                aktif)
              </p>
            </div>
            {hasFlexTime && (
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg">
                Waktu Fleksibel (Tanpa Batas Detik)
              </span>
            )}
          </div>

          <div
            className={`rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4 ${
              hasFontBoost ? 'text-base leading-loose' : 'text-sm leading-relaxed'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className={`font-display font-bold text-slate-900 ${hasFontBoost ? 'text-xl' : 'text-base'}`}>
                Tugas IPAS Kelas 4: Mengenal Bagian Tumbuhan
              </h3>
              {hasAudio && (
                <button
                  type="button"
                  onClick={handleReadSampleAloud}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 text-white text-xs font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dengarkan Soal</span>
                </button>
              )}
            </div>

            {audioNotice && (
              <p className="text-xs font-medium text-blue-900 bg-sky-50 border border-sky-200 rounded-lg px-3 py-2">
                {audioNotice}
              </p>
            )}

            {hasVisualLabel && (
              <div className="rounded-xl bg-white border border-slate-200 p-3.5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 text-xs font-bold text-teal-800">
                  Akar
                </div>
                <p className="text-xs text-slate-700">
                  <strong>Keterangan Gambar Jelas:</strong> Akar berada di dalam tanah untuk
                  menyerap air dan mengokohkan batang tumbuhan.
                </p>
              </div>
            )}

            {hasSubtitle && (
              <div className="rounded-xl bg-slate-900 text-white px-4 py-3 text-xs">
                [Subtitle Video]: &ldquo;Perhatikan bagaimana air naik dari akar menuju daun hijau.&rdquo;
              </div>
            )}

            {hasStepInstruction ? (
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 font-medium">
                <li>Langkah 1: Amati bagian akar pada gambar tumbuhan.</li>
                <li>Langkah 2: Pilih fungsi utama akar bagi tanaman.</li>
                <li>Langkah 3: Sampaikan jawaban dengan cara yang paling nyaman bagi Anda.</li>
              </ol>
            ) : (
              <p className="text-slate-700">
                Bacalah wacana mengenai bagian tumbuhan dan jelaskan keterkaitan antara fungsi akar,
                batang, serta daun dalam proses pertumbuhan tanaman secara lengkap.
              </p>
            )}

            <div className="pt-2 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-700 mb-2">
                Cara Menjawab yang Tersedia:
              </div>
              {hasEvalChoice ? (
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                    Pilih Kartu Jawaban
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                    Jawab Lisan / Audio
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                    Tulis Singkat
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-600">Jawaban tertulis standar di lembar kertas.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
