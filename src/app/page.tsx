'use client';

import { useEffect, useState } from 'react';
import { GuideModal } from '@/components/GuideModal';
import { Sidebar } from '@/components/Sidebar';
import {
  CLASSROOM_SCENARIOS,
  DEFAULT_TEACHER_PROFILE,
  INITIAL_COMMUNITY_POSTS,
  LEARNING_MODULES,
} from '@/data/educationalContent';
import { BerandaPage } from '@/views/BerandaPage';
import { DiferensiasiKontenPage } from '@/views/DiferensiasiKontenPage';
import { DiferensiasiProdukPage } from '@/views/DiferensiasiProdukPage';
import { DiferensiasiProsesPage } from '@/views/DiferensiasiProsesPage';
import { EvaluasiAkhirPage } from '@/views/EvaluasiAkhirPage';
import { KomunitasGuruPage } from '@/views/KomunitasGuruPage';
import { MateriPembelajaranPage } from '@/views/MateriPembelajaranPage';
import { PembelajaranInklusifPage } from '@/views/PembelajaranInklusifPage';
import { ProfilSayaPage } from '@/views/ProfilSayaPage';
import { RencanaAjarPage } from '@/views/RencanaAjarPage';
import { SimulasiKelasPage } from '@/views/SimulasiKelasPage';
import { TesDiagnostikPage } from '@/views/TesDiagnostikPage';
import type {
  CommunityPost,
  DiagnosticSummary,
  GeneratedLessonPlan,
  LearningProgress,
  NavRoute,
  SavedInclusivePlan,
  SavedKontenPlan,
  SavedProdukPlan,
  SavedProsesPlan,
  TeacherProfile,
  TieredLevelResult,
} from '@/types/diferensa';
import { calculateOverallProgress } from '@/utils/diferensaEngine';

const STORAGE_KEYS = {
  PROGRESS: 'diferensa_progress_v2',
  POSTS: 'diferensa_community_posts_v1',
  PROFILE: 'diferensa_teacher_profile_v1',
};

const EMPTY_PROGRESS: LearningProgress = {
  diagnosticResult: null,
  completedModules: [],
  completedSimulations: {},
  savedLessonPlans: [],
  evaluationResult: null,
  communityPostsCount: 0,
  kontenPlans: [],
  prosesPlans: [],
  produkPlans: [],
  inclusivePlan: null,
  tieredEvaluations: {},
};

function loadProgressFromStorage(): LearningProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS;
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEYS.PROGRESS) ??
      window.localStorage.getItem('diferensa_progress_v1');
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      ...EMPTY_PROGRESS,
      ...parsed,
      kontenPlans: parsed.kontenPlans ?? [],
      prosesPlans: parsed.prosesPlans ?? [],
      produkPlans: parsed.produkPlans ?? [],
      inclusivePlan: parsed.inclusivePlan ?? null,
      tieredEvaluations: parsed.tieredEvaluations ?? {},
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function DiferensaDashboard() {
  const [activeRoute, setActiveRoute] = useState<NavRoute>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const [progress, setProgress] = useState<LearningProgress>(() => loadProgressFromStorage());
  const [posts, setPosts] = useState<CommunityPost[]>(() =>
    loadFromStorage<CommunityPost[]>(STORAGE_KEYS.POSTS, INITIAL_COMMUNITY_POSTS)
  );
  const [profile, setProfile] = useState<TeacherProfile>(() =>
    loadFromStorage<TeacherProfile>(STORAGE_KEYS.PROFILE, DEFAULT_TEACHER_PROFILE)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch {
      // Ignore storage quota errors
    }
  }, [posts]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  }, [profile]);

  const handleNavigate = (route: NavRoute) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDiagnostic = (summary: DiagnosticSummary) => {
    setProgress((prev) => ({ ...prev, diagnosticResult: summary }));
  };

  const handleToggleModule = (moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.completedModules.includes(moduleId);
      return {
        ...prev,
        completedModules: exists
          ? prev.completedModules.filter((id) => id !== moduleId)
          : [...prev.completedModules, moduleId],
      };
    });
  };

  const handleSaveKontenPlan = (plan: SavedKontenPlan) => {
    setProgress((prev) => ({ ...prev, kontenPlans: [plan, ...prev.kontenPlans] }));
  };

  const handleDeleteKontenPlan = (planId: string) => {
    setProgress((prev) => ({
      ...prev,
      kontenPlans: prev.kontenPlans.filter((p) => p.id !== planId),
    }));
  };

  const handleSaveProsesPlan = (plan: SavedProsesPlan) => {
    setProgress((prev) => ({ ...prev, prosesPlans: [plan, ...prev.prosesPlans] }));
  };

  const handleDeleteProsesPlan = (planId: string) => {
    setProgress((prev) => ({
      ...prev,
      prosesPlans: prev.prosesPlans.filter((p) => p.id !== planId),
    }));
  };

  const handleSaveProdukPlan = (plan: SavedProdukPlan) => {
    setProgress((prev) => ({ ...prev, produkPlans: [plan, ...prev.produkPlans] }));
  };

  const handleDeleteProdukPlan = (planId: string) => {
    setProgress((prev) => ({
      ...prev,
      produkPlans: prev.produkPlans.filter((p) => p.id !== planId),
    }));
  };

  const handleSaveInclusivePlan = (plan: SavedInclusivePlan) => {
    setProgress((prev) => ({ ...prev, inclusivePlan: plan }));
  };

  const handleSimulationDecision = (scenarioId: string, optionId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedSimulations: {
        ...prev.completedSimulations,
        [scenarioId]: optionId,
      },
    }));
  };

  const handleSaveLessonPlan = (plan: GeneratedLessonPlan) => {
    setProgress((prev) => {
      const exists = prev.savedLessonPlans.some((p) => p.id === plan.id);
      const updated = exists
        ? prev.savedLessonPlans.map((p) => (p.id === plan.id ? plan : p))
        : [plan, ...prev.savedLessonPlans];
      return {
        ...prev,
        savedLessonPlans: updated,
      };
    });
  };

  const handleDeleteLessonPlan = (planId: string) => {
    setProgress((prev) => ({
      ...prev,
      savedLessonPlans: prev.savedLessonPlans.filter((p) => p.id !== planId),
    }));
  };

  const handleSaveTieredEvaluation = (result: TieredLevelResult) => {
    const key = `${result.topicId}-L${result.level}`;
    setProgress((prev) => ({
      ...prev,
      tieredEvaluations: {
        ...prev.tieredEvaluations,
        [key]: result,
      },
    }));
  };

  const handleAddPost = (
    newPost: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'replies'>
  ) => {
    const created: CommunityPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      createdAt: 'Baru saja',
      likes: 0,
      likedByUser: false,
      replies: [],
    };
    setPosts((prev) => [created, ...prev]);
    setProgress((prev) => ({ ...prev, communityPostsCount: prev.communityPostsCount + 1 }));
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const liked = !post.likedByUser;
        return {
          ...post,
          likedByUser: liked,
          likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1),
        };
      })
    );
  };

  const handleAddReply = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              author: profile.name,
              school: profile.school,
              createdAt: 'Baru saja',
              content,
            },
          ],
        };
      })
    );
  };

  const handleResetProgress = () => {
    setProgress(EMPTY_PROGRESS);
  };

  const overall = calculateOverallProgress(
    progress,
    LEARNING_MODULES.length,
    CLASSROOM_SCENARIOS.length
  );

  // 1. Landing Page Mode (Beranda): Tanpa Sidebar / Bottom Bar
  if (activeRoute === 'beranda') {
    return (
      <>
        <BerandaPage
          progress={progress}
          totalModules={LEARNING_MODULES.length}
          totalSimulations={CLASSROOM_SCENARIOS.length}
          onNavigate={handleNavigate}
          onOpenGuide={() => setGuideOpen(true)}
        />
        <GuideModal
          isOpen={guideOpen}
          onClose={() => setGuideOpen(false)}
          onNavigate={handleNavigate}
        />
      </>
    );
  }

  // 2. Application Dashboard Mode: Dengan Sidebar & Navigasi Lengkap
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      <Sidebar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        progressPercent={overall.percent}
        completedStages={overall.completedStages}
        totalStages={overall.totalStages}
        teacherName={profile.name}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={setMobileMenuOpen}
      />

      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeRoute === 'tes-diagnostik' && (
            <TesDiagnostikPage
              savedResult={progress.diagnosticResult}
              onSaveResult={handleSaveDiagnostic}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'materi-pembelajaran' && (
            <MateriPembelajaranPage
              completedModules={progress.completedModules}
              kontenCount={progress.kontenPlans.length}
              prosesCount={progress.prosesPlans.length}
              produkCount={progress.produkPlans.length}
              onToggleComplete={handleToggleModule}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'diferensiasi-konten' && (
            <DiferensiasiKontenPage
              savedPlans={progress.kontenPlans}
              onSavePlan={handleSaveKontenPlan}
              onDeletePlan={handleDeleteKontenPlan}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'diferensiasi-proses' && (
            <DiferensiasiProsesPage
              savedPlans={progress.prosesPlans}
              onSavePlan={handleSaveProsesPlan}
              onDeletePlan={handleDeleteProsesPlan}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'diferensiasi-produk' && (
            <DiferensiasiProdukPage
              savedPlans={progress.produkPlans}
              onSavePlan={handleSaveProdukPlan}
              onDeletePlan={handleDeleteProdukPlan}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'pembelajaran-inklusif' && (
            <PembelajaranInklusifPage
              savedPlan={progress.inclusivePlan}
              onSavePlan={handleSaveInclusivePlan}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'simulasi-kelas' && (
            <SimulasiKelasPage
              completedSimulations={progress.completedSimulations}
              onSelectSimulationDecision={handleSimulationDecision}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'rencana-ajar' && (
            <RencanaAjarPage
              savedPlans={progress.savedLessonPlans}
              onSavePlan={handleSaveLessonPlan}
              onDeletePlan={handleDeleteLessonPlan}
            />
          )}

          {activeRoute === 'evaluasi-akhir' && (
            <EvaluasiAkhirPage
              tieredEvaluations={progress.tieredEvaluations}
              onSaveTieredResult={handleSaveTieredEvaluation}
              onNavigate={handleNavigate}
            />
          )}

          {activeRoute === 'komunitas-guru' && (
            <KomunitasGuruPage
              posts={posts}
              profile={profile}
              onAddPost={handleAddPost}
              onToggleLike={handleToggleLike}
              onAddReply={handleAddReply}
            />
          )}

          {activeRoute === 'profil-saya' && (
            <ProfilSayaPage
              profile={profile}
              progress={progress}
              onUpdateProfile={setProfile}
              onResetProgress={handleResetProgress}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>

      <GuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
