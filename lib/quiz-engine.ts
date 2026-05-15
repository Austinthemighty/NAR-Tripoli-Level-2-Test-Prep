import {
  CERT_META,
  Cert,
  Question,
  Section,
  getQuestionsBySection,
  getQuestionsByCert,
} from "./questions";

export interface PracticeExam {
  cert: Cert;
  questions: Question[];
  createdAt: number;
}

export interface ExamAnswer {
  questionId: string;
  selected: string | null;
}

export interface SectionResult {
  section: Section;
  label: string;
  correct: number;
  total: number;
}

export interface ExamResult {
  cert: Cert;
  score: number;
  total: number;
  passed: boolean;
  percent: number;
  passingScore: number;
  sectionResults: SectionResult[];
  missed: { question: Question; selected: string | null }[];
}

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function buildPracticeExam(cert: Cert, seed: number = Date.now()): PracticeExam {
  const rand = mulberry32(seed);
  const meta = CERT_META[cert];
  const questions: Question[] = [];

  for (const section of meta.sections) {
    const pool = getQuestionsBySection(cert, section.id);
    const picked = shuffle(pool, rand).slice(0, Math.min(section.count, pool.length));
    questions.push(...picked);
  }

  return { cert, questions, createdAt: Date.now() };
}

export function gradeExam(exam: PracticeExam, answers: ExamAnswer[]): ExamResult {
  const meta = CERT_META[exam.cert];
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selected]));

  let correct = 0;
  const sectionTally = new Map<Section, { correct: number; total: number }>();
  for (const s of meta.sections) sectionTally.set(s.id, { correct: 0, total: 0 });

  const missed: { question: Question; selected: string | null }[] = [];

  for (const q of exam.questions) {
    const tally = sectionTally.get(q.section);
    if (tally) tally.total += 1;

    const selected = answerMap.get(q.id) ?? null;
    const isCorrect = selected !== null && selected === q.correctAnswer;

    if (isCorrect) {
      correct += 1;
      if (tally) tally.correct += 1;
    } else {
      missed.push({ question: q, selected });
    }
  }

  const total = exam.questions.length;
  const percent = total === 0 ? 0 : (correct / total) * 100;

  return {
    cert: exam.cert,
    score: correct,
    total,
    passed: correct >= meta.passingScore,
    percent,
    passingScore: meta.passingScore,
    sectionResults: meta.sections.map((s) => ({
      section: s.id,
      label: s.label,
      correct: sectionTally.get(s.id)?.correct ?? 0,
      total: sectionTally.get(s.id)?.total ?? 0,
    })),
    missed,
  };
}

export function buildTopicQuiz(cert: Cert, topic: string, size = 10, seed = Date.now()): Question[] {
  const rand = mulberry32(seed);
  const pool = getQuestionsByCert(cert).filter((q) => q.topic === topic);
  return shuffle(pool, rand).slice(0, Math.min(size, pool.length));
}

export function buildSectionQuiz(
  cert: Cert,
  section: Section,
  size = 10,
  seed = Date.now()
): Question[] {
  const rand = mulberry32(seed);
  const pool = getQuestionsBySection(cert, section);
  return shuffle(pool, rand).slice(0, Math.min(size, pool.length));
}
