'use client';

import { useState, useEffect } from 'react';
import { PillarType } from '@/data/differentiationData';

export interface TestScoreBreakdown {
  totalQuestions: number;
  correctCount: number;
  misconceptionCount: number;
  percentageScore: number;
  byPillar: {
    konten: { correct: number; total: number; misconceptionRate: number };
    proses: { correct: number; total: number; misconceptionRate: number };
    produk: { correct: number; total: number; misconceptionRate: number };
  };
  answers: Record<string, string>;
  completedAt: string;
}

export interface UserProgressState {
  preTest: TestScoreBreakdown | null;
  postTest: TestScoreBreakdown | null;
  simulationScore: {
    optimalChoices: number;
    totalStages: number;
    completed: boolean;
  } | null;
  completedSteps: number[]; // e.g. [1, 2, 3]
  customLessonPlan: {
    subject: string;
    topic: string;
    learningObjective: string;
    targetAudience: string;
    content: string;
    process: string;
    product: string;
  } | null;
}

const STORAGE_KEY = 'diferensa_user_progress_v1';

const defaultState: UserProgressState = {
  preTest: null,
  postTest: null,
  simulationScore: null,
  completedSteps: [],
  customLessonPlan: null,
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProgress(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to parse localStorage progress:', e);
      } finally {
        setIsLoaded(true);
      }
    } else {
      setIsLoaded(true);
    }
  }, []);

  const saveProgress = (nextState: UserProgressState) => {
    setProgress(nextState);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch (e) {
        console.warn('Failed to save progress to localStorage:', e);
      }
    }
  };

  const markStepComplete = (stepNumber: number) => {
    setProgress((prev) => {
      const steps = prev.completedSteps.includes(stepNumber)
        ? prev.completedSteps
        : [...prev.completedSteps, stepNumber].sort();
      const next = { ...prev, completedSteps: steps };
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn(e);
        }
      }
      return next;
    });
  };

  const savePreTestResult = (result: TestScoreBreakdown) => {
    const nextSteps = progress.completedSteps.includes(1)
      ? progress.completedSteps
      : [...progress.completedSteps, 1].sort();
    const next: UserProgressState = {
      ...progress,
      preTest: result,
      completedSteps: nextSteps,
    };
    saveProgress(next);
  };

  const savePostTestResult = (result: TestScoreBreakdown) => {
    const nextSteps = progress.completedSteps.includes(5)
      ? progress.completedSteps
      : [...progress.completedSteps, 5].sort();
    const next: UserProgressState = {
      ...progress,
      postTest: result,
      completedSteps: nextSteps,
    };
    saveProgress(next);
  };

  const saveSimulationScore = (optimalCount: number, total: number) => {
    const nextSteps = progress.completedSteps.includes(3)
      ? progress.completedSteps
      : [...progress.completedSteps, 3].sort();
    const next: UserProgressState = {
      ...progress,
      simulationScore: {
        optimalChoices: optimalCount,
        totalStages: total,
        completed: true,
      },
      completedSteps: nextSteps,
    };
    saveProgress(next);
  };

  const saveLessonPlan = (plan: UserProgressState['customLessonPlan']) => {
    const nextSteps = progress.completedSteps.includes(4)
      ? progress.completedSteps
      : [...progress.completedSteps, 4].sort();
    const next: UserProgressState = {
      ...progress,
      customLessonPlan: plan,
      completedSteps: nextSteps,
    };
    saveProgress(next);
  };

  const resetAllProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setProgress(defaultState);
  };

  const loadDemoData = () => {
    const demoState: UserProgressState = {
      preTest: {
        totalQuestions: 6,
        correctCount: 2,
        misconceptionCount: 4,
        percentageScore: 33,
        byPillar: {
          konten: { correct: 1, total: 2, misconceptionRate: 50 },
          proses: { correct: 0, total: 2, misconceptionRate: 100 },
          produk: { correct: 1, total: 2, misconceptionRate: 50 },
        },
        answers: {
          'diag-1': 'a',
          'diag-2': 'a',
          'diag-3': 'b',
          'diag-4': 'a',
          'diag-5': 'a',
          'diag-6': 'a',
        },
        completedAt: new Date().toLocaleDateString('id-ID'),
      },
      postTest: {
        totalQuestions: 6,
        correctCount: 6,
        misconceptionCount: 0,
        percentageScore: 100,
        byPillar: {
          konten: { correct: 2, total: 2, misconceptionRate: 0 },
          proses: { correct: 2, total: 2, misconceptionRate: 0 },
          produk: { correct: 2, total: 2, misconceptionRate: 0 },
        },
        answers: {
          'post-1': 'a',
          'post-2': 'a',
          'post-3': 'a',
          'post-4': 'a',
          'post-5': 'a',
          'post-6': 'a',
        },
        completedAt: new Date().toLocaleDateString('id-ID'),
      },
      simulationScore: {
        optimalChoices: 3,
        totalStages: 3,
        completed: true,
      },
      completedSteps: [1, 2, 3, 4, 5],
      customLessonPlan: {
        subject: 'Matematika SD Kelas 4',
        topic: 'Pecahan Senilai',
        learningObjective: 'Siswa mampu membuktikan 2 pasang pecahan senilai melalui alat peraga atau gambar.',
        targetAudience: '28 Siswa Fase B',
        content: 'Alat peraga pizza kertas (konkret), kartu gambar pecahan berarsir (visual), soal pemecahan masalah resep masakan (abstrak).',
        process: 'Guru mendampingi kelompok konkret di awal, kelompok visual berpasangan, kelompok abstrak eksplorasi mandiri.',
        product: 'Pilihan produk: presentasi lisan dengan lipatan kertas, poster gambar pecahan, atau buklet teka-teki pecahan.'
      }
    };
    saveProgress(demoState);
  };

  return {
    progress,
    isLoaded,
    markStepComplete,
    savePreTestResult,
    savePostTestResult,
    saveSimulationScore,
    saveLessonPlan,
    resetAllProgress,
    loadDemoData,
  };
}
