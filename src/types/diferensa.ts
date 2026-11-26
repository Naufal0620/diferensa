export type NavRoute =
  | 'beranda'
  | 'tes-diagnostik'
  | 'materi-pembelajaran'
  | 'diferensiasi-konten'
  | 'diferensiasi-proses'
  | 'diferensiasi-produk'
  | 'pembelajaran-inklusif'
  | 'simulasi-kelas'
  | 'rencana-ajar'
  | 'evaluasi-akhir'
  | 'komunitas-guru'
  | 'profil-saya';

export type LearningDimension = 'kesiapan' | 'minat' | 'profil';
export type LearningStyle = 'Visual' | 'Auditori' | 'Kinestetik';
export type DifferentiationType = 'Konten' | 'Proses' | 'Produk';

export interface DiagnosticOption {
  id: string;
  label: string;
  description: string;
  styleTag: LearningStyle;
  readinessWeight: number;
}

export interface DiagnosticQuestion {
  id: string;
  dimension: LearningDimension;
  contextLabel: string;
  prompt: string;
  options: DiagnosticOption[];
}

export interface DiagnosticSummary {
  completedAt: string;
  dominantStyle: LearningStyle;
  styleBreakdown: Record<LearningStyle, number>;
  readinessAverage: number;
  readinessCategory: 'Perlu Bimbingan Intensif' | 'Siap dengan Penguatan' | 'Mandiri & Siap Pengayaan';
  recommendedContent: string;
  recommendedProcess: string;
  recommendedProduct: string;
}

export interface LearningModule {
  id: string;
  slug: 'pengertian' | 'prinsip' | 'jenis' | 'karakteristik' | 'penerapan';
  orderLabel: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  coreIdea: string;
  keyPoints: {
    heading: string;
    detail: string;
  }[];
  sdExample: {
    kelas: string;
    topik: string;
    praktik: string;
  };
  quickCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface KontenPlanInput {
  mataPelajaran: string;
  kelas: string;
  topik: string;
  tujuanPembelajaran: string;
  karakteristikSiswa: string;
  jenisMateri: string[];
  tingkatKesulitan: 'Dasar (Perlu Bimbingan)' | 'Bertingkat (Dasar - Mahir)' | 'Pengayaan Lanjutan';
}

export interface SavedKontenPlan extends KontenPlanInput {
  id: string;
  createdAt: string;
  ringkasanRancangan: string;
}

export interface ProsesPlanInput {
  materi: string;
  tujuanKegiatan: string;
  bentukAktivitas: string[];
  pengelompokanSiswa: string;
  mediaDigunakan: string;
  pendampinganSiswa: string;
}

export interface SavedProsesPlan extends ProsesPlanInput {
  id: string;
  createdAt: string;
  ringkasanAktivitas: string;
}

export interface ProdukPlanInput {
  materi: string;
  tujuanKompetensi: string;
  jenisProduk: string[];
  kriteriaPenilaian: string;
  indikatorKeberhasilan: string;
}

export interface SavedProdukPlan extends ProdukPlanInput {
  id: string;
  createdAt: string;
  ringkasanRubrik: string;
}

export type InclusiveNeedId =
  | 'penglihatan'
  | 'pendengaran'
  | 'mobilitas'
  | 'membaca'
  | 'konsentrasi';

export interface InclusiveNeedGuide {
  id: InclusiveNeedId;
  title: string;
  shortDesc: string;
  classroomExample: string;
  materialAdjustment: string;
  activityAdjustment: string;
  mediaAdjustment: string;
  evaluationAdjustment: string;
}

export interface InclusiveAccommodationOption {
  id: string;
  label: string;
  description: string;
}

export interface SavedInclusivePlan {
  selectedNeed: InclusiveNeedId;
  enabledAccommodations: string[];
  teacherNote: string;
  updatedAt: string;
}

export interface SimulationOption {
  id: string;
  approachType: DifferentiationType;
  title: string;
  actionSummary: string;
  isOptimal: boolean;
  effectivenessScore: number;
  studentImpact: {
    perluBimbingan: string;
    cakap: string;
    mahir: string;
  };
  pedagogicalFeedback: string;
}

export interface ClassroomScenario {
  id: string;
  kelas: string;
  mataPelajaran: string;
  topik: string;
  classroomContext: string;
  challenge: string;
  studentGroups: {
    perluBimbingan: string;
    cakap: string;
    mahir: string;
  };
  options: SimulationOption[];
}

export interface LessonPlanInput {
  kelas: string;
  mataPelajaran: string;
  materi: string;
  tujuanPembelajaran: string;
  kebutuhanBelajar: string;
  fokusDimensi: LearningDimension;
}

export interface GeneratedLessonPlan extends LessonPlanInput {
  id: string;
  createdAt: string;
  updatedAt: string;
  diferensiasiKonten: string;
  diferensiasiProses: string;
  diferensiasiProduk: string;
  langkahPembelajaran: string;
  asesmenFormatif: string;
}

export interface EvaluationQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EvaluationResult {
  completedAt: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  predicate: 'Sangat Mahir' | 'Mahir' | 'Berkembang' | 'Perlu Pendampingan';
  answers: Record<string, number>;
}

export type EvaluationTopicId =
  | 'diferensiasi-konten'
  | 'diferensiasi-proses'
  | 'diferensiasi-produk'
  | 'pembelajaran-inklusif'
  | 'konsep-umum';

export type EvaluationLevel = 1 | 2 | 3;

export type TieredQuestionKind = 'mcq' | 'true-false' | 'image-match' | 'case-mcq' | 'problem-solve';

export interface ImageMatchItem {
  id: string;
  visualLabel: string;
  iconKey: 'book' | 'headphones' | 'chart' | 'puzzle' | 'poster' | 'model' | 'accessibility';
  targetConcept: string;
}

export interface TieredQuestion {
  id: string;
  topicId: EvaluationTopicId;
  level: EvaluationLevel;
  kind: TieredQuestionKind;
  prompt: string;
  scenarioContext?: string;
  stepHint: string;
  options?: string[];
  correctIndex?: number;
  matchItems?: ImageMatchItem[];
  correctMatchMap?: Record<string, string>; // itemId -> targetConcept
  reasonPrompt?: string;
  reasonKeywords?: string[];
  explanation: string;
}

export interface TieredAnswerEntry {
  selectedIndex?: number;
  matchSelections?: Record<string, string>;
  reasonText?: string;
}

export interface TieredLevelResult {
  topicId: EvaluationTopicId;
  level: EvaluationLevel;
  completedAt: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  predicate: 'Sangat Mahir' | 'Mahir' | 'Berkembang' | 'Perlu Pendampingan';
  answers: Record<string, TieredAnswerEntry>;
  questionOutcomes: Record<string, boolean>;
}

export interface CommunityReply {
  id: string;
  author: string;
  school: string;
  createdAt: string;
  content: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  school: string;
  category: 'Strategi Konten' | 'Manajemen Kelas' | 'Asesmen Diagnostik' | 'Berbagi RPP';
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByUser?: boolean;
  replies: CommunityReply[];
}

export interface TeacherProfile {
  name: string;
  nipOrId: string;
  school: string;
  gradeTaught: string;
  bio: string;
}

export interface LearningProgress {
  diagnosticResult: DiagnosticSummary | null;
  completedModules: string[];
  completedSimulations: Record<string, string>;
  savedLessonPlans: GeneratedLessonPlan[];
  evaluationResult: EvaluationResult | null;
  communityPostsCount: number;
  kontenPlans: SavedKontenPlan[];
  prosesPlans: SavedProsesPlan[];
  produkPlans: SavedProdukPlan[];
  inclusivePlan: SavedInclusivePlan | null;
  tieredEvaluations: Record<string, TieredLevelResult>; // key: `${topicId}-L${level}`
}
